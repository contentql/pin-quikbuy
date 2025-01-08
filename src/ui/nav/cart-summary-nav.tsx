'use client'

import { ShoppingBagIcon } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/Tooltip'

const CartFallback = () => (
  <div className='h-6 w-6 opacity-30'>
    <ShoppingBagIcon />
  </div>
)

export const CartSummaryNav = () => {
  return (
    <Suspense fallback={<CartFallback />}>
      <CartSummaryNavInner />
    </Suspense>
  )
}

const CartSummaryNavInner = () => {
  const [cart, setCart] = useState<{
    itemsCount: number
    totalPrice: number
    currency: string
  }>({
    itemsCount: 0,
    totalPrice: 0,
    currency: '', // No default currency; keep empty if unavailable
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const updateCart = () => {
      if (
        typeof window === 'undefined' ||
        !window.Snipcart ||
        !window.Snipcart.store
      )
        return

      const state = window.Snipcart.store.getState()
      const itemsCount = state?.cart?.items?.count || 0 // Get the number of items in the cart
      const totalPrice = state?.cart?.total || 0 // Get the total price from the cart state
      const currency = state?.cart?.currency || '' // Fetch the dynamic currency, fallback to empty if not found

      setCart({
        itemsCount,
        totalPrice,
        currency,
      })
    }

    let unsubscribe: (() => void) | undefined

    if (typeof window !== 'undefined') {
      setIsMounted(true)

      if (window.Snipcart && window.Snipcart.store) {
        // Subscribe to Snipcart updates
        unsubscribe = window.Snipcart.store.subscribe(updateCart)
      }

      // Initial cart state update
      updateCart()

      // Listen for custom event to trigger reload
      const handleCartUpdateEvent = () => {
        window.location.reload()
      }

      document.addEventListener('snipcartCartUpdated', handleCartUpdateEvent)

      return () => {
        // Unsubscribe if available
        if (unsubscribe) unsubscribe()
        document.removeEventListener(
          'snipcartCartUpdated',
          handleCartUpdateEvent,
        )
      }
    }
  }, [])

  // Return fallback UI if component is not mounted yet
  if (!isMounted) {
    return <CartFallback />
  }

  // Format the price dynamically based on the currency from the cart state
  const formattedPrice = cart.currency
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: cart.currency.toUpperCase(), // Use cart currency dynamically
      }).format(cart.totalPrice || 0) // Ensure totalPrice is a number
    : cart.totalPrice.toString() // Fallback to displaying the raw totalPrice if no currency is present

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className='mr-2'>
            <button className='snipcart-checkout relative block h-6 w-6'>
              <ShoppingBagIcon />
              <span className='absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-center text-xs'>
                <span className='sr-only'>
                  Items in cart: {cart.itemsCount}
                </span>
                <span className='snipcart-items-count'>{cart.itemsCount}</span>
              </span>
              <span className='sr-only'>Total: {formattedPrice}</span>
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent side='left' sideOffset={25}>
          <p>
            <span className='snipcart-items-count'>{cart.itemsCount}</span>{' '}
            items in cart
          </p>
          <p>
            Total:{' '}
            <span className='snipcart-total-price'>{formattedPrice}</span>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
