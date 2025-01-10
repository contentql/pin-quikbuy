'use client'

import { env } from '@env'
import { Category, Media, Product } from '@payload-types'
import { CircleCheck, Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/common/Button'
import { cn } from '@/utils/cn'

export const AddToCartButton = ({
  product,
  outOfStock,
  className,
  route,
}: {
  product: Product | undefined
  route: string
  outOfStock?: boolean
  className?: string
}) => {
  const [cartUpdate, setCartUpdate] = useState<boolean>(false)
  const [addingToCart, setAddingToCart] = useState<boolean>(false)

  useEffect(() => {
    const handleAddingToCart = () => {
      setAddingToCart(true)
    }

    const handleUpdatedCart = () => {
      setAddingToCart(false)
      setCartUpdate(true)
      setTimeout(() => {
        setCartUpdate(false)
      }, 2000)
    }

    document.addEventListener('itemAddingToCart', handleAddingToCart)
    document.addEventListener('itemAddedSuccessfullyToCart', handleUpdatedCart)
    document.addEventListener(
      'itemUpdatedSuccessfullyToCart',
      handleUpdatedCart,
    )

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener(
        'itemAddedSuccessfullyToCart',
        handleUpdatedCart,
      )
      document.removeEventListener(
        'itemUpdatedSuccessfullyToCart',
        handleUpdatedCart,
      )
    }
  }, [])

  // Safe image handling
  const productImages =
    product?.images && product.images.length > 0
      ? product.images
      : [
          {
            url: '/placeholder-image.png',
            alt: 'No image available',
            width: 500,
            height: 500,
            id: 'placeholder',
          },
        ]

  // Formatting categories into string[]
  const categories = [
    ((product?.category as Category)?.parentCategory as Category)?.name,
    (product?.category as Category)?.name,
    ...((product?.category as Category)?.subCategories?.map(
      category => (category as Category)?.name,
    ) || []),
  ].filter(Boolean)

  // const customAttributes =
  //   product?.attributes
  //     ?.map((attr, index) => {
  //       const selectedValue = selectedAttributes[attr.key]

  //       if (attr.value.type === 'select') {
  //         return {
  //           [`data-item-custom${index + 1}-name`]: attr.key,
  //           [`data-item-custom${index + 1}-options`]: attr.value.selectOptions
  //             ?.map(
  //               option =>
  //                 `${option.option}${
  //                   option.extraPrice
  //                     ? `[+${option.extraPrice.toFixed(2)}]`
  //                     : ''
  //                 }`,
  //             )
  //             .join('|'),
  //           [`data-item-custom${index + 1}-value`]: selectedValue || '',
  //           [`data-item-custom${index + 1}-placeholder`]:
  //             'Please select an option', // Add placeholder for select
  //         }
  //       } else if (attr.value.type === 'text') {
  //         return {
  //           [`data-item-custom${index + 1}-name`]: attr.key,
  //           [`data-item-custom${index + 1}-type`]: 'readonly',
  //           [`data-item-custom${index + 1}-value`]: attr.value.textValue || '',
  //           [`data-item-custom${index + 1}-placeholder`]: 'Enter text',
  //         }
  //       }
  //       return {}
  //     })
  //     .reduce(
  //       (acc, curr) => {
  //         return { ...acc, ...curr }
  //       },
  //       {} as Record<string, string>,
  //     ) || {}

  return (
    <Button
      id='button-add-to-cart'
      size='lg'
      type='submit'
      className={cn(
        'snipcart-add-item relative rounded-full text-lg',
        className,
      )}
      data-item-id={product?.slug}
      data-item-name={product?.name}
      data-item-description={product?.description}
      data-item-price={product?.finalPrice || product?.price}
      data-item-url={`${env.NEXT_PUBLIC_WEBSITE_URL}/${route}`}
      data-item-image={(productImages.at(0) as Media).url}
      data-item-quantity={1}
      data-item-min-quantity={1}
      data-item-categories={categories}
      // {...customAttributes}
      data-item-stackable={'auto'}
      data-item-max-quantity={product?.stock}
      data-item-shippable={product?.isShippable}
      disabled={addingToCart || cartUpdate}>
      {addingToCart ? (
        <Loader2Icon className='h-4 w-4 animate-spin' />
      ) : (
        <span
          className={cn(
            'transition-opacity ease-in',
            false ? 'opacity-0' : 'opacity-100',
          )}>
          {/* {outOfStock && 'Out of stock'} */}
          {outOfStock ? (
            'Out of stock'
          ) : cartUpdate ? (
            <div className='flex items-center gap-x-4'>
              <CircleCheck /> Added to cart
            </div>
          ) : (
            'Add to cart'
            //
          )}
        </span>
      )}
    </Button>
  )
}
