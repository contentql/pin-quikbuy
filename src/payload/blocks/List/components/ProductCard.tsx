import { Media, Product } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount =
    product?.discount &&
    product?.discount?.percentage &&
    product.discount.percentage > 0

  return (
    <Link href={`/shop/${product.slug}`} passHref>
      <div className='relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl'>
        <div className='relative'>
          <Image
            src={(product?.images.at(0) as Media)?.url || ''}
            alt={product.name}
            width={300}
            height={300}
            className='h-48 w-full object-cover'
          />

          <div className='absolute top-2 flex flex-row justify-end gap-2 px-1'>
            {hasDiscount && (
              <div className='rounded-full bg-black px-2 py-1 text-xs text-white'>
                {product.discount?.percentage}% OFF
              </div>
            )}

            {product.isNewArrival && (
              <div className='rounded-full bg-black px-2 py-1 text-xs text-white'>
                NEW
              </div>
            )}
          </div>
        </div>

        <div className='p-4'>
          <h3 className='mb-1 text-lg font-semibold'>{product.name}</h3>
          <p className=' text-gray-600'>{product.brand}</p>

          <div className='flex items-center justify-between'>
            <div>
              {hasDiscount ? (
                <>
                  <span className='mr-1 text-lg text-primary'>
                    ${product?.finalPrice?.toFixed(2)}
                  </span>
                  <span className='mr-1 text-gray-400 line-through'>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-800'>
                    {product.discount?.percentage}%
                  </span>
                </>
              ) : (
                <span className='text-lg font-bold md:text-2xl'>
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
