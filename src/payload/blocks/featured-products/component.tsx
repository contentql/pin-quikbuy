import { FeaturedProductsType } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { getCachedSiteSettings } from '@/utils/getCachedSiteSettings'

const FeaturedProducts: React.FC<FeaturedProductsType> = async ({
  ...block
}) => {
  const metadata = await getCachedSiteSettings()
  const { productInformation } = metadata

  return (
    <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {block?.featuredProducts?.map((product: any, idx: any) => {
        return (
          <li key={product.products[0].id} className='group'>
            <Link href={`/product/${product.products[0].slug}`}>
              <article className='overflow-hidden bg-white'>
                {product.products[0].images[0] && (
                  <div className='aspect-square w-full overflow-hidden rounded-lg bg-neutral-100'>
                    <Image
                      className='group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75'
                      src={
                        product.products[0].images[0]?.url ??
                        '/contentql-logo.png'
                      }
                      width={768}
                      height={768}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      priority={idx < 3}
                      sizes='(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px'
                      alt=''
                    />
                  </div>
                )}
                <div className='p-2'>
                  <h2 className='text-xl font-medium text-neutral-700'>
                    {product.products[0].name}
                  </h2>
                  <footer className='text-base font-normal text-neutral-900'>
                    <p>
                      {product.products[0].price
                        ? `${productInformation?.currency === 'USD' ? '$' : '₹'}${product.products[0].price}`
                        : 'Price not available'}
                    </p>
                  </footer>
                </div>
              </article>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default FeaturedProducts
