'use client'

import { formatCurrency } from '@contentql/core/client'
import { Media, Product, SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { trpc } from '@/trpc/client'

export default function ShopPage({
  products,
  slicedSlug,
  currency,
}: {
  products: Product[]
  slicedSlug: string
  currency: SiteSetting['general']['currency']
}) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const { data: categoryId } = trpc.category.getCategoryByName.useQuery({
    categoryName: category ?? '',
  })

  const { data: productsByCategories } =
    trpc.product.getProductsByCategory.useQuery({
      categoryId: categoryId,
    })

  const displayProducts = category ? productsByCategories : products

  return (
    <>
      <div className='text-3xl font-bold leading-none tracking-tight text-foreground'>
        {category ? `${category} Products` : 'All Products'}
      </div>
      <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {displayProducts?.map((product, idx) => {
          const productImage = product.images[0] as Media

          return (
            <li key={product.id} className='group'>
              <Link href={`${slicedSlug}${product.slug}`}>
                <article className='overflow-hidden bg-white'>
                  {product.images[0] && (
                    <div className='aspect-square w-full overflow-hidden rounded-lg bg-neutral-100'>
                      <Image
                        className='group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75'
                        src={productImage?.url ?? '/contentql-logo.png'}
                        width={768}
                        height={768}
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        priority={idx < 3}
                        sizes='(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 700px'
                        alt=''
                      />
                    </div>
                  )}
                  <div className='p-2'>
                    <h2 className='text-xl font-medium text-neutral-700'>
                      {product.name}
                    </h2>
                    <footer className='text-base font-normal text-neutral-900'>
                      {product?.finalPrice && (
                        <p className='mt-2 font-medium leading-none tracking-tight text-foreground/70'>
                          {product?.finalPrice
                            ? `${formatCurrency({ amount: product?.finalPrice, currencyCode: currency })}`
                            : 'Price not available'}
                        </p>
                      )}
                      {/* <p>
                        {product.finalPrice
                          ? `${productInformation?.currency === 'USD' ? '$' : '₹'}${product.finalPrice}`
                          : 'Price not available'}
                      </p> */}
                    </footer>
                  </div>
                </article>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
