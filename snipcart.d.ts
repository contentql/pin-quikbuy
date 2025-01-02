declare global {
  type SnipcartEvent =
    | 'item.adding'
    | 'item.added'
    | 'item.updated'
    | 'item.removed'
    | 'cart.created'
    | 'cart.confirmed'
    | 'cart.confirm.error'
    | 'cart.reset'
    | 'payment.failed'
    | 'discount.applied'
    | 'shipping.selected'
    | 'customer.registered'
    | 'customer.signedin'
    | 'customer.signedout'
    | 'snipcart.initialized'
    | 'theme.routechanged'
    | 'summary.checkout_clicked'

  type SnipcartItem = {
    uniqueId: string
    token: string
    id: string
    name: string
    price: number
    description: string
    hasTaxesIncluded: boolean
    categories: string[]
    url: string
    fileGuid: string | null
    image: string
    quantity: number
    quantityStep: number
    minQuantity: number
    maxQuantity: number
    stackable: string
    shippable: boolean
    taxable: boolean
    taxes: any[]
    customFields: any[]
    duplicatable: boolean
    downloadLink: string
    metadata: any
    alternatePrices: Record<string, any>
    dimensions: {
      width: number | null
      height: number | null
      length: number | null
      weight: number | null
    }
    stock: {
      isInStock: boolean
    }
    unitPrice: number
    totalPrice: number
    totalPriceWithoutTaxes: number
    totalPriceWithoutDiscountsAndTaxes: number
    totalPriceWithoutDiscountsAndTaxesLegacy: number
    addedOn: number
    initialData: string
    modificationDate: number
    pausingAction: string
    cancellationAction: string
    isRecurring: boolean
    isRecurringV2: boolean
    isRecurringV3: boolean
    availablePlans: any[]
    selectedPlanId: string
    paymentGatewayId: string
    state: {
      committing: boolean
    }
  }

  type SnipcartCart = {
    lang: string
    token: string
    email: string
    shipToBillingAddress: boolean
    status: number
    customFields: any[]
    billingAddress: {
      fullName: string
      firstName: string | null
      name: string
      company: string | null
      address1: string
      address2: string
      fullAddress: string
      city: string
      country: string
      postalCode: string
      province: string | null
      phone: string | null
      vatNumber: string | null
      hasMinimalRequiredInfo: boolean
      validationErrors: {
        city: string
        postalCode: string
      }
    }
    shippingAddress: any | null
    shippingRates: {
      loading: boolean
      status: string
      items: any[]
    }
    shippingDetails: {
      method: string | null
      status: number
    }
    items: {
      items: SnipcartItem[]
      count: number
    }
    taxes: {
      loading: boolean
      status: string
      items: any[]
    }
    discountInducedTaxesVariation: number
    discounts: {
      items: any[]
    }
    paymentDetails: {
      method: string | null
      status: number
      details: Record<string, any>
    }
    subtotal: number
    total: number
    currency: string
    card: any | null
    errors: any
    invoiceNumber: string
  }

  type SnipcartSession = {
    id: string | null
    lang: string
    loading: boolean
    settings: {
      hasActiveDiscountsTriggerableByCode: boolean
      countries: {
        name: string
        code: string
        currencyCode: string
        featured: boolean
        states: any[]
      }[]
      currency: string
      shippingEnabled: boolean
      cartSettings: {
        configModalStyle: string
        configAddProductBehavior: string
      }
      apiKey: string
      onlyAllowGuests: boolean
      allowExportAsPdf: boolean
      allowShareByEmail: boolean
      allowDeferredPayment: boolean
      onlyAllowDeferredPayment: boolean
      eCommerceAnalyticsEnabled: boolean
      expressCheckoutEnabled: boolean
      customGatewayEnabled: boolean
      paymentGateway: string
      hasPaymentServiceEnabled: boolean
      hasScaComplianceEnabled: boolean
      shippingEnabledDefault: boolean
      gateway: {
        publicApiKey: string
        gateway: string
        squareLocationId: string | null
      }
      mode: string
      splitName: boolean
      includePhone: boolean
      phoneRequired: boolean
      cultureSettings: {
        currencySymbol: string
        numberFormat: string
        negativeNumberFormat: string
        thousandSeparator: string
        decimalSeparator: string
        precision: number
      }
      squareClientId: string | null
      squareOAuthConnectClientId: string | null
      squareLocationId: string | null
      domain: string
      currencies: {
        currency: string
        precision: number
        decimalSeparator: string
        thousandSeparator: string
        negativeNumberFormat: string
        numberFormat: string
        currencySymbol: string
        id: string
      }[]
      i18n: {
        currency: string
        precision: number
        decimalSeparator: string
        thousandSeparator: string
        negativeNumberFormat: string
        numberFormat: string
        currencySymbol: string
        id: string
      }
    }
    isSandboxMode: boolean
    featureFlags: {
      name: string
      isEnabled: boolean
    }[]
    shouldRefetchShippingRates: boolean
  }

  type SnipcartStore = {
    cart: SnipcartCart
    session: SnipcartSession
    localization: {
      predictions: Record<string, any>
      addresses: Record<string, any>
    }
    customer: {
      status: string
      register: Record<string, any>
      signin: Record<string, any>
    }
    customization: Record<string, any>
  }

  interface Window {
    Snipcart: {
      events: {
        on(event: SnipcartEvent, callback: (data: any) => void): () => void
        off(event: SnipcartEvent): void
      }
      store: {
        getState: () => SnipcartStore
        subscribe: (callback: () => void) => () => void
      }
    }
  }
}

export {}
