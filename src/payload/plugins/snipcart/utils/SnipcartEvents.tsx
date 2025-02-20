'use client'

import { addItemToPayloadCart } from '../helpers/cart/addItemToPayloadCart'
import { createPayloadCart } from '../helpers/cart/createPayloadCart'
import { removeItemFromPayloadCart } from '../helpers/cart/removeItemFromPayloadCart'
import { updateItemInPayloadCart } from '../helpers/cart/updateItemInPayloadCart'
import { checkAndCreateUser } from '../helpers/checkAndCreateUser'
import { checkAndSetSnipcartCart } from '../helpers/checkAndSetSnipcartCart'
import { createPayloadOrder } from '../helpers/createPayloadOrder'
import { fetchCurrentUser } from '../helpers/fetchCurrentUser'
import { updateSnipcartCheckout } from '../helpers/updateSnipcartCheckout'
// Helper to add order to the cart collection
import { useEffect, useRef } from 'react'

import { trpc } from '@/trpc/client'

const SnipcartEvents: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const unsubscribeRef = useRef<(() => void)[]>([])

  const trpcUtils = trpc.useUtils()

  function generatePassword(length = 6) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  useEffect(() => {
    const updateSnipcartCart = async () => {
      const user = await fetchCurrentUser()
      if (!user) {
        return
      }

      const data = await checkAndSetSnipcartCart({ user })
      if (data?.snipcartId !== data?.oldSnipcartId) {
        // Notify Snipcart to reload the page
        document.dispatchEvent(new CustomEvent('snipcartCartUpdated'))
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
        // Dispatch a event to do something in frontend
        document.dispatchEvent(new CustomEvent('itemAddingToCart'))
      })

      registerEvent('item.added', async item => {
        // Dispatch a event to do something in frontend
        document.dispatchEvent(new CustomEvent('itemAddedSuccessfullyToCart'))

        const user = await fetchCurrentUser()
        if (!user) {
          return
        }

        // Serialize the item object to remove unsupported properties
        const plainItem = JSON.parse(JSON.stringify(item))

        await addItemToPayloadCart(user, plainItem)
      })

      registerEvent('item.updated', async item => {
        // Dispatch a event to do something in frontend
        document.dispatchEvent(new CustomEvent('itemUpdatedSuccessfullyToCart'))

        const user = await fetchCurrentUser()
        if (!user) {
          return
        }

        // Serialize the item object to remove unsupported properties
        const plainItem = JSON.parse(JSON.stringify(item))

        await updateItemInPayloadCart(user, plainItem)
      })

      registerEvent('item.removed', async item => {
        const user = await fetchCurrentUser()
        if (!user) {
          return
        }

        // Serialize the item object to remove unsupported properties
        const plainItem = JSON.parse(JSON.stringify(item))

        await removeItemFromPayloadCart(user, plainItem)
      })

      // Cart-related events
      registerEvent('cart.created', async cart => {
        const user = await fetchCurrentUser()
        if (!user) {
          return
        }

        // Serialize the cart object to remove unsupported properties
        const plainCart = JSON.parse(JSON.stringify(cart))

        await createPayloadCart(user, plainCart)
      })

      registerEvent('cart.confirmed', async cart => {
        // Serialize the item object to remove unsupported properties
        const plainOrder = JSON.parse(JSON.stringify(cart))

        const currentUser = await fetchCurrentUser()
        if (!currentUser) {
          const user = await checkAndCreateUser({
            email: plainOrder.email,
            password: generatePassword(),
            username:
              plainOrder.billingAddress.fullName ||
              plainOrder.billingAddress.name,
          })
          if (user) {
            trpcUtils.user.getUser.invalidate()
            await createPayloadOrder(user, plainOrder)
          }

          return
        }

        await createPayloadOrder(currentUser, plainOrder)
      })

      // registerEvent('cart.confirm.error', confirmError => {
      //   console.log('Cart confirm error: ', confirmError)
      // })

      // registerEvent('cart.reset', cart => {
      //   console.log('Cart reset:', cart)
      // })

      // // Payment-related events
      // registerEvent('payment.failed', error => {
      //   console.log('Payment failed:', error)
      // })

      // // Discount-related events
      // registerEvent('discount.applied', discount => {
      //   console.log('Discount applied:', discount)
      // })

      // // Shipping-related events
      // registerEvent('shipping.selected', shipping => {
      //   console.log('Shipping selected:', shipping)
      // })

      // // Customer-related events
      // registerEvent('customer.registered', customer => {
      //   console.log('Customer registered:', customer)
      // })

      // registerEvent('customer.signedin', customer => {
      //   console.log('Customer signed in:', customer)
      // })

      // registerEvent('customer.signedout', () => {
      //   console.log('Customer signed out')
      // })

      // // Initialization and theme-related events
      // registerEvent('snipcart.initialized', state => {
      //   console.log('Snipcart initialized:', state)
      // })

      // registerEvent('theme.routechanged', routes => {
      //   console.log('Theme route changed:', routes)
      // })

      // Summary-related events
      registerEvent('summary.checkout_clicked', async () => {
        const user = await fetchCurrentUser()
        if (!user) {
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
