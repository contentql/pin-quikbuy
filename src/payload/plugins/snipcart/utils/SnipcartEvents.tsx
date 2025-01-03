'use client'

import { addItemToPayloadCart } from '../helpers/cart/addItemToPayloadCart'
import { createPayloadCart } from '../helpers/cart/createPayloadCart'
import { removeItemFromPayloadCart } from '../helpers/cart/removeItemFromPayloadCart'
import { updateItemInPayloadCart } from '../helpers/cart/updateItemInPayloadCart'
import { checkAndSetSnipcartCart } from '../helpers/checkAndSetSnipcartCart'
import { createPayloadOrder } from '../helpers/createPayloadOrder'
import { fetchCurrentUser } from '../helpers/fetchCurrentUser'
import { updateSnipcartCheckout } from '../helpers/updateSnipcartCheckout'
// Helper to add order to the cart collection
import { useEffect, useRef } from 'react'

const SnipcartEvents: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const unsubscribeRef = useRef<(() => void)[]>([])

  useEffect(() => {
    const updateSnipcartCart = async () => {
      const user = await fetchCurrentUser()
      if (!user) {
        console.log('No user found. Cannot update checkout details.')
        return
      }

      const data = await checkAndSetSnipcartCart({ user })
      if (data.snipcartId) {
        // Notify Snipcart to reload the cart
        document.dispatchEvent(new CustomEvent('snipcartCartUpdated'))
        console.log('Cart updated successfully on client')
      }
    }

    updateSnipcartCart()
  }, [])

  useEffect(() => {
    const handleSnipcartReady = () => {
      if (typeof window.Snipcart === 'undefined') return

      const { Snipcart } = window

      // Helper to register and store unsubscribe functions
      const registerEvent = (
        event: SnipcartEvent,
        callback: (data: any) => void,
      ) => {
        const unsubscribe = Snipcart.events.on(event, callback)
        unsubscribeRef.current.push(unsubscribe)
      }

      // Item-related events
      registerEvent('item.adding', item => {
        console.log('Item adding:', item)
      })

      registerEvent('item.added', async item => {
        console.log('Item added:', item)

        const user = await fetchCurrentUser()
        if (!user) {
          console.log('No user found. Cannot update item in cart.')
          return
        }

        // Serialize the item object to remove unsupported properties
        const plainItem = JSON.parse(JSON.stringify(item))

        await addItemToPayloadCart(user, plainItem)
      })

      registerEvent('item.updated', async item => {
        console.log('Item updated:', item)

        const user = await fetchCurrentUser()
        if (!user) {
          console.log('No user found. Cannot update item in cart.')
          return
        }

        // Serialize the item object to remove unsupported properties
        const plainItem = JSON.parse(JSON.stringify(item))

        await updateItemInPayloadCart(user, plainItem)
      })

      registerEvent('item.removed', async item => {
        console.log('Item removed:', item)

        const user = await fetchCurrentUser()
        if (!user) {
          console.log('No user found. Cannot update cart.')
          return
        }

        // Serialize the item object to remove unsupported properties
        const plainItem = JSON.parse(JSON.stringify(item))

        await removeItemFromPayloadCart(user, plainItem)
      })

      // Cart-related events
      registerEvent('cart.created', async cart => {
        console.log('Cart created:', cart)

        const user = await fetchCurrentUser()
        if (!user) {
          console.log('No user found. Cannot add item to cart.')
          return
        }

        // Serialize the cart object to remove unsupported properties
        const plainCart = JSON.parse(JSON.stringify(cart))

        await createPayloadCart(user, plainCart)
      })

      registerEvent('cart.confirmed', async cart => {
        console.log('Cart confirmed:', cart)

        const user = await fetchCurrentUser()
        if (!user) {
          console.log('No user found. Cannot add order to cart collection.')
          return
        }

        // Serialize the item object to remove unsupported properties
        const plainOrder = JSON.parse(JSON.stringify(cart))

        await createPayloadOrder(user, plainOrder)
      })

      registerEvent('cart.confirm.error', confirmError => {
        console.log('Cart confirm error: ', confirmError)
      })

      registerEvent('cart.reset', cart => {
        console.log('Cart reset:', cart)
      })

      // Payment-related events
      registerEvent('payment.failed', error => {
        console.log('Payment failed:', error)
      })

      // Discount-related events
      registerEvent('discount.applied', discount => {
        console.log('Discount applied:', discount)
      })

      // Shipping-related events
      registerEvent('shipping.selected', shipping => {
        console.log('Shipping selected:', shipping)
      })

      // Customer-related events
      registerEvent('customer.registered', customer => {
        console.log('Customer registered:', customer)
      })

      registerEvent('customer.signedin', customer => {
        console.log('Customer signed in:', customer)
      })

      registerEvent('customer.signedout', () => {
        console.log('Customer signed out')
      })

      // Initialization and theme-related events
      registerEvent('snipcart.initialized', state => {
        console.log('Snipcart initialized:', state)
      })

      registerEvent('theme.routechanged', routes => {
        console.log('Theme route changed:', routes)
      })

      // Summary-related events
      registerEvent('summary.checkout_clicked', async () => {
        console.log('Checkout clicked')

        const user = await fetchCurrentUser()
        if (!user) {
          console.log('No user found. Cannot update checkout details.')
          return
        }

        await updateSnipcartCheckout(user)
      })
    }

    document.addEventListener('snipcart.ready', handleSnipcartReady)

    return () => {
      // Cleanup event listeners
      unsubscribeRef.current.forEach(unsubscribe => unsubscribe())
      unsubscribeRef.current = [] // Clear the reference
      document.removeEventListener('snipcart.ready', handleSnipcartReady)
    }
  }, [])

  return <>{children}</>
}

export default SnipcartEvents
