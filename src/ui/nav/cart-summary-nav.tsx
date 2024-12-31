import { ShoppingBagIcon } from 'lucide-react'
import { Suspense } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/Tooltip'

import { CartLink } from './cart-link'

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

const CartSummaryNavInner = async () => {
  //   const cart = await getCartFromCookiesAction()
  //   if (!cart) {
  //     return <CartFallback />
  //   }
  //   if (!cart.lines.length) {
  //     return <CartFallback />
  //   }

  //   const totalItems = cart.lines.reduce((acc, line) => acc + line.quantity, 0)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className='mr-2'>
            <CartLink>
              <ShoppingBagIcon />
              <span className='absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-center text-xs'>
                <span className='sr-only'>Items in cart: </span>
                {0}
              </span>
              <span className='sr-only'>
                Total:{' '}
                {/* {formatMoney({
                  amount: total,
                  currency: cart.cart.currency,
                  locale,
                })} */}
              </span>
            </CartLink>
          </div>
        </TooltipTrigger>
        <TooltipContent side='left' sideOffset={25}>
          <p>{`${0} items in cart`}</p>
          <p>
            Total:{' '}
            {/* {formatMoney({
              amount: total,
              currency: cart.cart.currency,
              locale,
            })} */}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
