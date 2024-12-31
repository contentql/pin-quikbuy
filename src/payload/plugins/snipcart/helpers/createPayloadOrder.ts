'use server'

import configPromise from '@payload-config'
import { Order, User } from '@payload-types'
import { getPayload } from 'payload'

const paymentStatus: Record<number, string> = {
  0: 'Unset',
  1: 'Saving',
  2: 'Saved',
  3: 'Processing',
  4: 'WaitingForUser',
  5: 'Paid',
  6: 'Refunded',
  7: 'Pending',
}

/**
 * Creates the order in Payload based on Snipcart order data.
 */
export const createPayloadOrder = async (
  user: User,
  order: any,
): Promise<void> => {
  try {
    const payload = await getPayload({ config: configPromise })

    // Resolve all items asynchronously and map them to the desired structure
    const items = await Promise.allSettled(
      order.items.items.map(async (item: any) => {
        const { docs: products } = await payload.find({
          collection: 'products',
          where: {
            slug: {
              equals: item.id,
            },
          },
        })
        const product = products.at(0)

        if (!product) {
          console.error('Product not found for item:', item.id)
          return null
        }

        return {
          uniqueId: item.uniqueId,
          product: product.id,
          image: item.imageUrl,
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          hasTaxesIncluded: item.hasTaxesIncluded,
          categories: item.categories.map((category: string) => ({
            category,
          })),
          url: item.url,
          quantity: item.quantity,
          shippable: item.shippable,
          taxable: item.taxable,
          // TODO: Taxes need to be configured
          taxes: [],
          attributes: item.customFields.map((field: any) => ({
            name: field.name,
            value: field.value,
          })),
          dimensions: {
            height: item.dimensions.height,
            length: item.dimensions.length,
            weight: item.dimensions.weight,
            width: item.dimensions.width,
          },
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          totalPriceWithoutTaxes: item.totalPriceWithoutTaxes,
          totalPriceWithoutDiscountsAndTaxes:
            item.totalPriceWithoutDiscountsAndTaxes,
          totalPriceWithoutDiscountsAndTaxesLegacy:
            item.totalPriceWithoutDiscountsAndTaxesLegacy,
          addedOn: new Date(item.addedOn * 1000).toDateString(),
          modificationDate: new Date(
            item.modificationDate * 1000,
          ).toDateString(),
          paymentGatewayId: item.paymentGatewayId,
          state: {
            committing: item.state.committing,
          },
        } as Order['items'][0]
      }),
    )

    // Filter out null values from items
    const filteredItems = items
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(Boolean)

    // Create the order
    await payload.create({
      collection: 'orders',
      data: {
        billingAddress: {
          fullName: order.billingAddress.fullName,
          firstName: order.billingAddress.firstName,
          name: order.billingAddress.name,
          company: order.billingAddress.company,
          address1: order.billingAddress.address1,
          address2: order.billingAddress.address2,
          fullAddress: order.billingAddress.fullAddress,
          city: order.billingAddress.city,
          country: order.billingAddress.country,
          postalCode: order.billingAddress.postalCode,
          province: order.billingAddress.province,
          phone: order.billingAddress.phone,
          vatNumber: order.billingAddress.vatNumber,
        },
        shippingAddress: {
          fullName: order.shippingAddress.fullName,
          firstName: order.shippingAddress.firstName,
          name: order.shippingAddress.name,
          company: order.shippingAddress.company,
          address1: order.shippingAddress.address1,
          address2: order.shippingAddress.address2,
          fullAddress: order.shippingAddress.fullAddress,
          city: order.shippingAddress.city,
          country: order.shippingAddress.country,
          postalCode: order.shippingAddress.postalCode,
          province: order.shippingAddress.province,
          phone: order.shippingAddress.phone,
          vatNumber: order.shippingAddress.vatNumber,
        },
        shipToBillingAddress: order.shipToBillingAddress,
        shippingDetails: {
          cost: order.shippingDetails.cost,
          method: order.shippingDetails.method,
          status: order.shippingDetails.status,
        },
        // TODO: Discount need to configured
        discounts: [],
        items: filteredItems,
        status: order.status,
        token: order.token,
        email: order.email,
        taxes: {
          // TODO: Items need to configure
          items: [],
          status: order.taxes.status,
          loading: order.taxes.loading,
        },
        discountInducedTaxesVariation: order.discountInducedTaxesVariation,
        currency: order.currency,
        subtotal: order.subtotal,
        total: order.total,
        invoiceNumber: order.invoiceNumber,
        card: {
          last4: order.card.last4,
          brand: order.card.brand,
        },
        paymentDetails: {
          method: order.paymentDetails.method,
          status: paymentStatus[
            order.paymentDetails.status
          ] as Order['paymentDetails']['status'],
          details: order.paymentDetails.details,
          iconUrl: order.paymentDetails.iconUrl,
          instructions: order.paymentDetails.instructions,
          display: order.paymentDetails.display,
        },
        shippingRates: {
          // TODO: Items need to configure
          items: [],
          loading: order.shippingRates.loading,
          status: order.shippingRates.status,
        },
        user: user.id,
      },
    })

    console.log('Order created successfully in Payload.')
  } catch (error) {
    console.error('Error creating order in Payload:', error)
  }
}
