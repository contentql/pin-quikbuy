import { RequiredDataFromCollectionSlug } from 'payload'

export type OrdersDataType = RequiredDataFromCollectionSlug<'orders'>

export const ordersData: OrdersDataType[] = [
  {
    // id: 1,
    user: {
      id: 1,
      displayName: null,
      username: 'manikanta',
      imageUrl: null,

      role: ['admin'],
      emailVerified: '2025-01-01T00:00:00.000Z',

      socialLinks: [],
      bio: null,
      updatedAt: '2025-01-01T11:51:15.916Z',
      createdAt: '2025-01-01T11:32:51.978Z',
      email: 'manikanta.potnuru@resonateaes.com',
      _verified: true,
      loginAttempts: 0,
    },

    items: [
      {
        id: 'shadowstride-shoes',
        uniqueId: '7ce87c7b-74fe-4439-99f5-e3bdce97c7ff',

        product: {
          id: 2,
          name: 'ShadowStride Shoes',
          slug: 'shadowstride-shoes',
          description:
            'These classic black shoes are a wardrobe essential. Designed for both comfort and versatility, they pair well with any attire. The cushioned sole ensures all-day comfort.',
          brand: 'temp2',
          stock: 10,
          price: 20,

          discount: {
            percentage: null,
            startDate: null,
            endDate: null,
          },
          finalPrice: 20,
          category: 1,

          tags: [],

          attributes: [],

          images: [9],
          isFeatured: false,
          isNewArrival: false,
          isSpecialOffer: false,
          isShippable: true,

          additionalInformationSections: [],
          snipcartId: null,
          updatedAt: '2025-01-01T12:15:58.674Z',
          createdAt: '2025-01-01T12:15:58.674Z',
          _status: 'published',
        },
        name: 'ShadowStride Shoes',
        price: 20,
        description:
          'These classic black shoes are a wardrobe essential. Designed for both comfort and versatility, they pair well with any attire. The cushioned sole ensures all-day comfort.',
        hasTaxesIncluded: false,
        url: 'https://quikbuy.contentql.io/product/shadowstride-shoes',
        image: null,
        quantity: 1,
        shippable: true,
        taxable: true,
        unitPrice: 20,
        totalPrice: 20,
        totalPriceWithoutTaxes: 20,
        totalPriceWithoutDiscountsAndTaxes: 20,
        totalPriceWithoutDiscountsAndTaxesLegacy: 20,
        addedOn: '2025-01-01T00:00:00.000Z',
        modificationDate: '2025-01-01T00:00:00.000Z',
        paymentGatewayId: '',

        categories: [
          {
            id: '677577bc1b9f8900018f5180',
            category: 'Apparel',
          },
        ],

        taxes: [],

        attributes: [],

        dimensions: {
          width: null,
          height: null,
          length: null,
          weight: null,
        },
      },
    ],
    totalCount: 1,
    totalPrice: 20,
    shipToBillingAddress: true,

    billingAddress: {
      fullName: 'Manikanta Potnuru',
      firstName: null,
      name: 'Manikanta Potnuru',
      company: null,
      address1: ' Durgam Cheruvu Road',
      address2: '',
      fullAddress: ' Durgam Cheruvu Road',
      city: 'Hyderabad',
      country: 'IN',
      postalCode: '500081',
      province: 'TS',
      phone: '',
      vatNumber: null,
    },

    shippingAddress: {
      fullName: 'Manikanta Potnuru',
      firstName: null,
      name: 'Manikanta Potnuru',
      company: null,
      address1: ' Durgam Cheruvu Road',
      address2: '',
      fullAddress: ' Durgam Cheruvu Road',
      city: 'Hyderabad',
      country: 'IN',
      postalCode: '500081',
      province: 'TS',
      phone: '',
      vatNumber: null,
    },

    shippingDetails: {
      cost: 10,
      method: 'SwiftPath Delivery',
      status: 2,
    },

    shippingRates: {
      loading: false,
      status: 'Stale',

      items: [],
    },

    discounts: [],
    status: 3,
    token: '1fc7a72f-2765-4416-8973-ed65c9555b32',
    email: 'manikanta.potnuru@resonateaes.com',

    taxes: {
      loading: false,
      status: 'Loaded',

      items: [],
    },
    discountInducedTaxesVariation: 0,
    currency: 'usd',
    subtotal: 20,
    total: 30,
    invoiceNumber: 'CONTENTQL9189',

    card: {
      last4: '4242',
      brand: 'Visa',
    },

    paymentDetails: {
      method: 'CreditCard',
      status: 'paid',

      details: {},
      iconUrl: null,
      instructions: null,
      display: 'CreditCard',
    },
    // updatedAt: '2025-01-01T17:13:32.558Z',
    // createdAt: '2025-01-01T17:13:32.558Z',
    _status: 'draft',
  },
  {
    // id: 2,

    user: {
      id: 1,
      displayName: null,
      username: 'manikanta',
      imageUrl: null,

      role: ['admin'],
      emailVerified: '2025-01-01T00:00:00.000Z',

      socialLinks: [],
      bio: null,
      updatedAt: '2025-01-01T11:51:15.916Z',
      createdAt: '2025-01-01T11:32:51.978Z',
      email: 'manikanta.potnuru@resonateaes.com',
      _verified: true,
      loginAttempts: 0,
    },

    items: [
      {
        id: 'sunbeam-tote',
        uniqueId: '362663be-3f6c-426a-acb9-31ea3318bef0',

        product: {
          id: 1,
          name: 'Sunbeam Tote',
          slug: 'sunbeam-tote',
          description:
            "Brighten your day with this cheerful yellow bag. Its vibrant color and ample storage space make it an excellent choice for shopping or day trips. Lightweight and durable, it's designed for comfort and convenience. Test",
          brand: 'temp',
          stock: 5,
          price: 25,

          discount: {
            percentage: 5,
            startDate: '2025-01-02T11:30:00.000Z',
            endDate: '2025-01-04T11:30:00.000Z',
          },
          finalPrice: 23.75,
          category: 1,

          tags: [],

          attributes: [],

          images: [3, 4, 5, 6],
          isFeatured: false,
          isNewArrival: false,
          isSpecialOffer: false,
          isShippable: true,

          additionalInformationSections: [],
          snipcartId: null,
          updatedAt: '2025-01-05T15:23:29.989Z',
          createdAt: '2025-01-01T12:06:09.590Z',
          _status: 'published',
        },
        name: 'Sunbeam Tote',
        price: 23.75,
        description:
          "Brighten your day with this cheerful yellow bag. Its vibrant color and ample storage space make it an excellent choice for shopping or day trips. Lightweight and durable, it's designed for comfort and convenience.",
        hasTaxesIncluded: false,
        url: 'https://quikbuy.contentql.io/product/sunbeam-tote',
        image: null,
        quantity: 1,
        shippable: true,
        taxable: true,
        unitPrice: 23.75,
        totalPrice: 23.75,
        totalPriceWithoutTaxes: 23.75,
        totalPriceWithoutDiscountsAndTaxes: 23.75,
        totalPriceWithoutDiscountsAndTaxesLegacy: 23.75,
        addedOn: '2025-01-03T00:00:00.000Z',
        modificationDate: '2025-01-03T00:00:00.000Z',
        paymentGatewayId: '',

        categories: [
          {
            id: '677769352329ba0001180191',
            category: 'Apparel',
          },
        ],

        taxes: [],

        attributes: [],

        dimensions: {
          width: null,
          height: null,
          length: null,
          weight: null,
        },
      },
    ],
    totalCount: 1,
    totalPrice: 23.75,
    shipToBillingAddress: true,

    billingAddress: {
      fullName: 'Manikanta Potnuru',
      firstName: null,
      name: 'Manikanta Potnuru',
      company: null,
      address1: ' Durgam Cheruvu Road',
      address2: '',
      fullAddress: ' Durgam Cheruvu Road',
      city: 'Hyderabad',
      country: 'IN',
      postalCode: '500081',
      province: 'TS',
      phone: '',
      vatNumber: null,
    },

    shippingAddress: {
      fullName: 'Manikanta Potnuru',
      firstName: null,
      name: 'Manikanta Potnuru',
      company: null,
      address1: ' Durgam Cheruvu Road',
      address2: '',
      fullAddress: ' Durgam Cheruvu Road',
      city: 'Hyderabad',
      country: 'IN',
      postalCode: '500081',
      province: 'TS',
      phone: '',
      vatNumber: null,
    },

    shippingDetails: {
      cost: 10,
      method: 'SwiftPath Delivery',
      status: 2,
    },

    shippingRates: {
      loading: false,
      status: 'Stale',

      items: [],
    },

    discounts: [],
    status: 3,
    token: '57e9110f-43d0-4804-9f04-1a12076a67e1',
    email: 'manikanta.potnuru@resonateaes.com',

    taxes: {
      loading: false,
      status: 'Loaded',

      items: [],
    },
    discountInducedTaxesVariation: 0,
    currency: 'usd',
    subtotal: 23.75,
    total: 33.75,
    invoiceNumber: 'CONTENTQL9190',

    card: {
      last4: '4242',
      brand: 'Visa',
    },

    paymentDetails: {
      method: 'CreditCard',
      status: 'paid',

      details: {},
      iconUrl: null,
      instructions: null,
      display: 'CreditCard',
    },
    // updatedAt: '2025-01-03T04:36:06.072Z',
    // createdAt: '2025-01-03T04:36:06.072Z',
    _status: 'draft',
  },
]
