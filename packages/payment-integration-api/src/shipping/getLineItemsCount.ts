import { reduce } from 'lodash';

import { LineItem } from '../cart';

export default function getLineItemsCount(lineItems: LineItem[]): number {
    return reduce(lineItems, (total, item: LineItem) => total + item.quantity, 0);
}
