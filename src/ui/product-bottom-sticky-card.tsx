import { Media, Product, SiteSetting } from '@payload-types'

import { MainProductImage } from '@/ui/products/main-product-image'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/formatCurrency'

import { AddToCartButton } from './add-to-cart-button'

export const ProductBottomStickyCard = ({
  product,
  show,
  route,
  currencyCode,
}: {
  product: Product | undefined
  show: boolean
  route: string
  currencyCode: SiteSetting['general']['currency']
}) => {
  return (
    <div
      tabIndex={show ? 0 : -1}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-10 max-w-[100vw] border-t bg-white/90 py-2 backdrop-blur-sm transition-all duration-300 ease-out sm:py-4',
        show
          ? 'translate-y-0 transform shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_0.1),_0_-2px_4px_-2px_rgb(0_0_0_/_0.1)]'
          : 'translate-y-full transform',
      )}>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between gap-x-2 px-4 sm:px-6 lg:px-8'>
        <div className='flex min-w-0 items-center gap-x-2 sm:gap-x-4'>
          <div className='shrink-0'>
            {product?.images[0] && (
              <MainProductImage
                className='h-16 w-16 rounded-lg bg-neutral-100 object-cover object-center'
                src={(product?.images[0] as Media)?.url!}
                loading='eager'
                priority
                alt=''
              />
            )}
          </div>
          <div className='min-w-0 flex-1'>
            <h3 className='overflow-clip text-ellipsis whitespace-nowrap text-xs font-semibold sm:text-base md:text-lg'>
              {product?.name}
            </h3>

            <p className='text-xs sm:text-sm'>
              {formatCurrency({
                amount: product?.finalPrice ?? 0,
                currencyCode,
              })}
            </p>
          </div>
        </div>

        <AddToCartButton
          product={product}
          route={route}
          disabled={(product?.stock ?? 0) <= 0}
          className='h-9 shrink-0 px-3 text-sm sm:h-10 sm:px-8 sm:text-lg'
        />
      </div>
    </div>
  )
}
