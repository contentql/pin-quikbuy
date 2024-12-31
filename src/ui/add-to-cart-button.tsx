import { Category, Media, Product } from '@payload-types'
import { Loader2Icon } from 'lucide-react'

import { Button } from '@/components/common/Button'
import { SNIPCART_LOCAL_DEV_URL } from '@/payload/plugins/snipcart/utils/constants'
import { cn } from '@/utils/cn'

export const AddToCartButton = ({
  product,
  disabled,
  className,
  route,
}: {
  product: Product | undefined
  route: string
  disabled?: boolean
  className?: string
}) => {
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
      data-item-url={`${process.env.NODE_ENV === 'development' ? SNIPCART_LOCAL_DEV_URL : ''}/${route}`}
      data-item-image={(productImages.at(0) as Media).url}
      data-item-quantity={1}
      data-item-min-quantity={1}
      data-item-categories={categories}
      // {...customAttributes}
      data-item-stackable={'auto'}
      data-item-max-quantity={product?.stock}
      data-item-shippable={product?.isShippable}>
      <span
        className={cn(
          'transition-opacity ease-in',
          false ? 'opacity-0' : 'opacity-100',
        )}>
        {disabled ? 'Out of stock' : 'Add to cart'}
      </span>
      <span
        className={cn(
          'pointer-events-none absolute z-10 transition-opacity ease-out',
          false ? 'opacity-100' : 'opacity-0',
        )}>
        <Loader2Icon className='h-4 w-4 animate-spin' />
      </span>
    </Button>
  )
}
