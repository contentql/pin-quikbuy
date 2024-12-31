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

  interface Window {
    Snipcart: {
      events: {
        on(event: SnipcartEvent, callback: (data: any) => void): () => void
        off(event: SnipcartEvent): void
      }
    }
  }
}

export {}
