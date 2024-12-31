import { ShoppingBagIcon } from 'lucide-react'
import { Suspense } from 'react'

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
            <button className='snipcart-checkout relative block h-6 w-6'>
              <ShoppingBagIcon />
              <span className='absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-center text-xs'>
                <span className='sr-only'>Items in cart: </span>
                <span className='snipcart-items-count'>{0}</span>
              </span>
              <span className='sr-only'>
                Total:<span className='snipcart-total-price'>{0}</span>
                {/* {formatMoney({
                  amount: total,
                  currency: cart.cart.currency,
                  locale,
                })} */}
              </span>
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent side='left' sideOffset={25}>
          <p>
            <span className='snipcart-items-count'>{0}</span> items in cart
          </p>
          <p>
            Total:<span className='snipcart-total-price'>{0}</span>
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
