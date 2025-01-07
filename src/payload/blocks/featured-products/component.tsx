import { FeaturedProductsType } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { formatCurrency } from '@/utils/formatCurrency'
import { getCachedSiteSettings } from '@/utils/getCachedSiteSettings'

const FeaturedProducts: React.FC<FeaturedProductsType> = async ({
  ...block
}) => {
  const metadata = await getCachedSiteSettings()
  const {
    general: { currency: currencyCode },
    redirectionLinks,
  } = metadata

  const productRedirectionLink = redirectionLinks?.productLink
  const slug =
    productRedirectionLink && typeof productRedirectionLink.value === 'object'
      ? productRedirectionLink.value.path!
      : ''
  const slicedSlug = slug ? slug.split('[')[0] : ''

  return (
    <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {block?.featuredProducts?.map((prod: any, idx: any) => {
        const product = prod.products[0]

        return (
          <li key={product.id} className='group'>
            <Link href={`${slicedSlug}${product.slug}`}>
              <article className='overflow-hidden bg-white'>
                {product.images[0] && (
                  <div className='aspect-square w-full overflow-hidden rounded-lg bg-neutral-100'>
                    <Image
                      className='group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75'
                      src={product.images[0]?.url ?? '/contentql-logo.png'}
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
                    {product.name}
                  </h2>
                  <footer className='text-base font-normal text-neutral-900'>
                    <p>
                      {formatCurrency({
                        amount: product.price,
                        currencyCode,
                      })}
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
