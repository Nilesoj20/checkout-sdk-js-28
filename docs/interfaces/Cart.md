[@bigcommerce/checkout-sdk](../README.md) / Cart

# Interface: Cart

## Table of contents

### Properties

- [baseAmount](Cart.md#baseamount)
- [cartAmount](Cart.md#cartamount)
- [coupons](Cart.md#coupons)
- [createdTime](Cart.md#createdtime)
- [currency](Cart.md#currency)
- [customerId](Cart.md#customerid)
- [discountAmount](Cart.md#discountamount)
- [discounts](Cart.md#discounts)
- [email](Cart.md#email)
- [id](Cart.md#id)
- [isTaxIncluded](Cart.md#istaxincluded)
- [lineItems](Cart.md#lineitems)
- [source](Cart.md#source)
- [updatedTime](Cart.md#updatedtime)

## Properties

### baseAmount

• **baseAmount**: `number`

___

### cartAmount

• **cartAmount**: `number`

___

### coupons

• **coupons**: [`Coupon`](Coupon.md)[]

This is an array of all applied coupons.

___

### createdTime

• **createdTime**: `string`

___

### currency

• **currency**: [`Currency`](Currency.md)

___

### customerId

• **customerId**: `number`

___

### discountAmount

• **discountAmount**: `number`

This is the total amount of discount applied on line_items.

___

### discounts

• **discounts**: [`Discount`](Discount.md)[]

This is the total amount of discount applied on cart including coupons and line_items discounts.

___

### email

• **email**: `string`

___

### id

• **id**: `string`

___

### isTaxIncluded

• **isTaxIncluded**: `boolean`

___

### lineItems

• **lineItems**: [`LineItemMap`](LineItemMap.md)

___

### source

• `Optional` **source**: `BuyNow`

___

### updatedTime

• **updatedTime**: `string`
