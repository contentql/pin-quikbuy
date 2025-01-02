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
  const [cart, setCart] = useState<{ itemsCount: number; totalPrice: number }>({
    itemsCount: 0,
    totalPrice: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Check if Snipcart is available and client-side rendering
    if (typeof window !== 'undefined') {
      setIsMounted(true)

      const updateCart = () => {
        const state = window.Snipcart.store.getState()
        const itemsCount = state.cart.items.count
        const totalPrice = state.cart.total

        setCart({
          itemsCount,
          totalPrice,
        })
      }

      // Subscribe to the Snipcart store updates
      const unsubscribe = window.Snipcart.store.subscribe(() => {
        updateCart() // Update cart details on state change
      })

      // Initial cart state update
      updateCart()

      // Cleanup the subscription when the component is unmounted
      return () => unsubscribe()
    }
  }, [])

  if (!isMounted) {
    return <CartFallback />
  }

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
              <span className='sr-only'>
                Total:{' '}
                <span className='snipcart-total-price'>{cart.totalPrice}</span>
              </span>
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
            <span className='snipcart-total-price'>
              {cart.totalPrice.toFixed(2)}
            </span>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
