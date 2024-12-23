'use client'

import { Category, Media, Product } from '@payload-types'
import { Heart, Info, Minus, Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// Utility function to safely access nested properties
function safeAccess<T>(obj: any, path: string[], defaultValue: T): T {
  return path.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue),
    obj,
  )
}

export default function ProductDetails({
  route,
  product,
}: {
  route: string
  product: Product | undefined
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >(() => {
    const defaults: Record<string, string> = {} // Define the type explicitly here
    product?.attributes?.forEach(attr => {
      if (attr.value.type === 'select' && attr.value.selectOptions) {
        defaults[attr.key] = attr.value.selectOptions[0]?.option || ''
      } else {
        defaults[attr.key] = attr.value.textValue || ''
      }
    })
    return defaults
  })

  // Handle null or undefined product
  if (!product) {
    return (
      <div className='container mx-auto px-4 py-8 text-center text-red-500'>
        Product Not Found
      </div>
    )
  }

  const handleAttributeSelection = (attributeKey: string, option: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeKey]: option,
    }))
  }

  // Safe image handling
  const productImages =
    product.images && product.images.length > 0
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
    ((product.category as Category)?.parentCategory as Category)?.name,
    (product.category as Category).name,
    ...((product.category as Category).subCategories?.map(
      category => (category as Category).name,
    ) || []),
  ].filter(Boolean)

  const customAttributes =
    product.attributes
      ?.map((attr, index) => {
        const selectedValue = selectedAttributes[attr.key]

        if (attr.value.type === 'select') {
          return {
            [`data-item-custom${index + 1}-name`]: attr.key,
            [`data-item-custom${index + 1}-options`]: attr.value.selectOptions
              ?.map(
                option =>
                  `${option.option}${
                    option.extraPrice
                      ? `[+${option.extraPrice.toFixed(2)}]`
                      : ''
                  }`,
              )
              .join('|'),
            [`data-item-custom${index + 1}-value`]: selectedValue || '',
            [`data-item-custom${index + 1}-placeholder`]:
              'Please select an option', // Add placeholder for select
          }
        } else if (attr.value.type === 'text') {
          return {
            [`data-item-custom${index + 1}-name`]: attr.key,
            [`data-item-custom${index + 1}-type`]: 'readonly',
            [`data-item-custom${index + 1}-value`]: attr.value.textValue || '',
            [`data-item-custom${index + 1}-placeholder`]: 'Enter text',
          }
        }
        return {}
      })
      .reduce(
        (acc, curr) => {
          return { ...acc, ...curr }
        },
        {} as Record<string, string>,
      ) || {}

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {/* Image Gallery */}
        <div className='w-full'>
          <div className='relative mb-4'>
            <div
              className='relative w-full'
              style={{
                paddingBottom: '100%',
                position: 'relative',
              }}>
              <Image
                src={(productImages[selectedImage] as Media).url || ''}
                alt={
                  (productImages[selectedImage] as Media).alt || product.name
                }
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='absolute inset-0 rounded-lg object-cover shadow-md'
              />
            </div>
            {productImages.length > 1 && (
              <div className='absolute right-4 top-4 rounded-full bg-white/70 px-3 py-1'>
                {selectedImage + 1} / {productImages.length}
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {productImages.length > 1 && (
            <div className='mt-4 flex flex-wrap justify-center gap-2'>
              {productImages.map((image, index) => (
                <Image
                  key={(image as Media).id}
                  src={(image as Media).url || ''}
                  alt={
                    (image as Media)?.alt ||
                    `${product.name} - Image ${index + 1}`
                  }
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(index)}
                  className={`h-16 w-16 cursor-pointer rounded-lg object-cover transition md:h-20 md:w-20 
                    ${
                      selectedImage === index
                        ? 'border-2 border-primary opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className='w-full'>
          {/* Header */}
          <div className='mb-4 flex flex-col items-start justify-between sm:flex-row'>
            <div className='mb-2 flex-grow sm:mb-0'>
              <h1 className='text-2xl font-bold md:text-3xl'>{product.name}</h1>
              <p className='text-sm text-gray-600 md:text-base'>
                {product.brand}
              </p>
            </div>

            {/* Tags */}
            {product.tags && (
              <div className='flex flex-wrap justify-end gap-1'>
                {product.tags.map(tag => (
                  <span
                    key={tag.id}
                    className='rounded bg-gray-100 px-2 py-1 text-xs text-gray-700'>
                    {tag.tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className='mb-4 flex flex-wrap items-center gap-2'>
            {product.discount ? (
              <>
                <span className='text-xl font-bold text-primary md:text-2xl'>
                  ${product?.finalPrice?.toFixed(2)}
                </span>
                <span className='text-gray-400 line-through'>
                  ${product.price.toFixed(2)}
                </span>
                <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-800'>
                  {product.discount.percentage}% OFF
                </span>
              </>
            ) : (
              <span className='text-xl font-bold md:text-2xl'>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className='mb-6 text-sm text-gray-700 md:text-base'>
            {product.description}
          </p>

          {/* Attributes */}
          {product.attributes &&
            product.attributes.map(attr => (
              <div key={attr.id} className='mb-4'>
                <h3 className='mb-2 font-semibold capitalize'>{attr.key}</h3>
                {attr.value.type === 'select' ? (
                  <div className='flex flex-wrap gap-2'>
                    {attr.value.selectOptions?.map(option => (
                      <button
                        key={option.id}
                        onClick={() =>
                          handleAttributeSelection(attr.key, option.option)
                        }
                        className={`rounded border px-3 py-1 text-sm transition
                        ${
                          selectedAttributes[attr.key] === option.option
                            ? 'border-black bg-black text-white'
                            : 'hover:bg-gray-100'
                        }`}>
                        {option.option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-700'>{attr.value.textValue}</p>
                )}
              </div>
            ))}

          {/* Quantity Selector */}
          <div className='mb-6 flex flex-wrap items-center gap-4'>
            <span className='font-medium'>Quantity:</span>
            <div className='flex items-center rounded border'>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='p-2 hover:bg-gray-100'>
                <Minus className='h-5 w-5' />
              </button>
              <span className='px-4 font-semibold'>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='p-2 hover:bg-gray-100'>
                <Plus className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-4 sm:flex-row'>
            <button className='hover:bg-primary-dark flex flex-1 items-center justify-center space-x-2 rounded border bg-primary px-4 py-3 text-black transition'>
              <Heart className='h-5 w-5' />
              <span>Wishlist</span>
            </button>
            <button
              className='snipcart-add-item flex flex-1 items-center justify-center space-x-2 rounded bg-black px-4 py-3 text-white transition hover:bg-gray-800'
              data-item-id={product.id}
              data-item-name={product.name}
              data-item-description={product.description}
              data-item-price={product.price}
              data-item-url={route}
              data-item-image={(productImages.at(0) as Media).url}
              data-item-quantity={quantity}
              data-item-min-quantity={1}
              data-item-categories={categories}
              {...customAttributes}
              data-item-stackable={'auto'}
              data-item-max-quantity={product.stock}
              data-item-shippable={product.isShippable}>
              <ShoppingCart className='h-5 w-5' />
              <span>Add To Cart</span>
            </button>
          </div>

          {/* Additional Information Sections */}
          {product.additionalInformationSections &&
            product.additionalInformationSections.map(section => (
              <div key={section.id} className='mt-8'>
                <h2 className='mb-4 flex items-center text-lg font-bold md:text-xl'>
                  <Info className='mr-2 text-primary' />
                  {section.sectionTitle}
                </h2>
                <div className='overflow-hidden rounded-lg border'>
                  {section?.sectionContent?.map(item => (
                    <div
                      key={item.id}
                      className='flex flex-col justify-between border-b bg-gray-50/50 p-4 last:border-b-0 sm:flex-row'>
                      <span className='mb-1 font-medium text-gray-700 sm:mb-0'>
                        {item.attributeName}
                      </span>
                      <span className='text-gray-900'>
                        {item.attributeValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
