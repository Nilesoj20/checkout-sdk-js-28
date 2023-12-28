import { FormPoster } from '@bigcommerce/form-poster';

import {
    InvalidArgumentError,
    isHostedInstrumentLike,
    isVaultedInstrument,
    MissingDataError,
    MissingDataErrorType,
    NotInitializedError,
    NotInitializedErrorType,
    OrderFinalizationNotRequiredError,
    OrderPaymentRequestBody,
    OrderRequestBody,
    PaymentArgumentInvalidError,
    PaymentInitializeOptions,
    PaymentIntegrationService,
    PaymentRequestOptions,
    PaymentStrategy,
} from '@bigcommerce/checkout-sdk/payment-integration-api';

import { isTdOnlineMartAdditionalAction } from './isTdOnlineMartAdditionalAction';
import {
    FieldType,
    TDCustomCheckoutSDK,
    TdOnlineMartElement,
    TdOnlineMartThreeDSErrorBody,
} from './td-online-mart';
import TDOnlineMartScriptLoader from './td-online-mart-script-loader';

export default class TDOnlineMartPaymentStrategy implements PaymentStrategy {
    private tdOnlineMartClient?: TDCustomCheckoutSDK;
    private cardNumberInput?: TdOnlineMartElement;
    private cvvInput?: TdOnlineMartElement;
    private expiryInput?: TdOnlineMartElement;

    constructor(
        private paymentIntegrationService: PaymentIntegrationService,
        private tdOnlineMartScriptLoader: TDOnlineMartScriptLoader,
        private formPoster: FormPoster,
    ) {}

    async initialize(options: PaymentInitializeOptions): Promise<void> {
        const { methodId } = options;

        if (!methodId) {
            throw new InvalidArgumentError(
                'Unable to initialize payment because "options.methodId" argument is not provided.',
            );
        }

        this.tdOnlineMartClient = await this.loadTDOnlineMartJs();

        this.mountHostedFields(methodId);
    }

    async execute(payload: OrderRequestBody, options?: PaymentRequestOptions): Promise<void> {
        const { payment, ...order } = payload;

        if (!payment) {
            throw new PaymentArgumentInvalidError(['payment']);
        }

        if (!payment.methodId) {
            throw new MissingDataError(MissingDataErrorType.MissingPaymentMethod);
        }

        await this.paymentIntegrationService.submitOrder(order, options);

        const paymentPayload = await this.getPaymentPayload(payment);

        try {
            await this.paymentIntegrationService.submitPayment(paymentPayload);
        } catch (error: unknown) {
            await this.processWithAdditionalAction(error);
        }
    }

    finalize(): Promise<void> {
        return Promise.reject(new OrderFinalizationNotRequiredError());
    }

    deinitialize(): Promise<void> {
        this.cardNumberInput?.unmount();
        this.cvvInput?.unmount();
        this.expiryInput?.unmount();

        return Promise.resolve();
    }

    private async getPaymentPayload(payment: OrderPaymentRequestBody) {
        const { methodId, paymentData } = payment;

        const { shouldSaveInstrument = false, shouldSetAsDefaultInstrument = false } =
            isHostedInstrumentLike(paymentData) ? paymentData : {};

        if (
            isHostedInstrumentLike(paymentData) &&
            isVaultedInstrument(paymentData) &&
            paymentData.instrumentId
        ) {
            return {
                methodId,
                paymentData: {
                    instrumentId: paymentData.instrumentId,
                    shouldSetAsDefaultInstrument,
                },
            };
        }

        const paymentToken = await this.getTokenOrThrow();

        return {
            methodId,
            paymentData: {
                nonce: paymentToken,
                shouldSaveInstrument,
                shouldSetAsDefaultInstrument,
            },
        };
    }

    private mountHostedFields(methodId: string): void {
        const tdOnlineMartClient = this.getTDOnlineMartClientOrThrow();

        this.cardNumberInput = tdOnlineMartClient.create(FieldType.CARD_NUMBER);
        this.cvvInput = tdOnlineMartClient.create(FieldType.CVV);
        this.expiryInput = tdOnlineMartClient.create(FieldType.EXPIRY);

        this.cardNumberInput.mount(`#${methodId}-ccNumber`);
        this.cvvInput.mount(`#${methodId}-ccCvv`);
        this.expiryInput.mount(`#${methodId}-ccExpiry`);
    }

    private async loadTDOnlineMartJs(): Promise<TDCustomCheckoutSDK> {
        if (this.tdOnlineMartClient) {
            return this.tdOnlineMartClient;
        }

        return this.tdOnlineMartScriptLoader.load();
    }

    private getTokenOrThrow(): Promise<string> {
        return new Promise((resolve) => {
            this.getTDOnlineMartClientOrThrow().createToken((result) => {
                const { error, token } = result;

                if (error || !token) {
                    throw new MissingDataError(MissingDataErrorType.MissingPaymentToken);
                }

                resolve(token);
            });
        });
    }

    private getTDOnlineMartClientOrThrow(): TDCustomCheckoutSDK {
        if (!this.tdOnlineMartClient) {
            throw new NotInitializedError(NotInitializedErrorType.PaymentNotInitialized);
        }

        return this.tdOnlineMartClient;
    }

    private async processWithAdditionalAction(error: unknown): Promise<void> {
        if (!isTdOnlineMartAdditionalAction(error)) {
            throw error;
        }

        const { three_ds_result: threeDSResult }: TdOnlineMartThreeDSErrorBody = error.body;
        const { formUrl, threeDSSessionData, creq } = threeDSResult || {};

        if (!formUrl || !threeDSSessionData || !creq) {
            throw new PaymentArgumentInvalidError(['formUrl', 'threeDSSessionData', 'sreq']);
        }

        return new Promise((resolve) => {
            this.formPoster.postForm(
                formUrl,
                {
                    threeDSSessionData,
                    creq,
                },
                resolve,
                '_top',
            );
        });
    }
}