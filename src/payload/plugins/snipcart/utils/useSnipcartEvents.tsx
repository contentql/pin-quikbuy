'use client'

import { useEffect } from 'react'

export default function useSnipcartEvents() {
  useEffect(() => {
    const handleSnipcartReady = () => {
      if (typeof window.Snipcart === 'undefined') return

      const { Snipcart } = window

      // Attach event listeners with specific operations
      Snipcart.events.on('item.added', item => {
        console.log('Item added:', item)
      })

      Snipcart.events.on('item.adding', item => {
        console.log('Item adding:', item)
      })

      Snipcart.events.on('item.updated', item => {
        console.log('Item updated:', item)
      })

      Snipcart.events.on('item.removed', item => {
        console.log('Item removed:', item)
      })

      Snipcart.events.on('order.completed', order => {
        console.log('Order completed:', order)
      })

      Snipcart.events.on('cart.closed', () => {
        console.log('Cart closed')
      })

      Snipcart.events.on('cart.created', cart => {
        console.log('Cart created:', cart)
      })

      Snipcart.events.on('cart.confirmed', cart => {
        console.log('Cart confirmed:', cart)
      })

      Snipcart.events.on('cart.reset', cart => {
        console.log('Cart reset:', cart)
      })

      Snipcart.events.on('payment.failed', error => {
        console.log('Payment failed:', error)
      })

      Snipcart.events.on('discount.applied', discount => {
        console.log('Discount applied:', discount)
      })

      Snipcart.events.on('shipping.selected', shipping => {
        console.log('Shipping selected:', shipping)
      })

      Snipcart.events.on('customer.registered', customer => {
        console.log('Customer registered:', customer)
      })

      Snipcart.events.on('customer.signedin', customer => {
        console.log('Customer signed in:', customer)
      })

      Snipcart.events.on('customer.signedout', () => {
        console.log('Customer signed out')
      })

      Snipcart.events.on('snipcart.initialized', state => {
        console.log('Snipcart initialized:', state)
      })

      Snipcart.events.on('theme.routechanged', routes => {
        console.log('Theme route changed:', routes)
      })

      Snipcart.events.on('summary.checkout_clicked', () => {
        console.log('Checkout clicked')
      })
    }

    document.addEventListener('snipcart.ready', handleSnipcartReady)

    return () => {
      // Cleanup event listeners
      if (typeof window.Snipcart !== 'undefined') {
        const { Snipcart } = window
        const events = [
          'item.added',
          'item.adding',
          'item.updated',
          'item.removed',
          'order.completed',
          'cart.closed',
          'cart.created',
          'cart.confirmed',
          'cart.reset',
          'payment.failed',
          'discount.applied',
          'shipping.selected',
          'customer.registered',
          'customer.signedin',
          'customer.signedout',
          'snipcart.initialized',
          'theme.routechanged',
          'summary.checkout_clicked',
        ] as SnipcartEvent[]
        events.forEach(event => Snipcart.events.off(event))
      }
      document.removeEventListener('snipcart.ready', handleSnipcartReady)
    }
  }, [])
}
