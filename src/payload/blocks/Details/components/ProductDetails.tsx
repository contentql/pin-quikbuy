import { Media, Product } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/common/Breadcrumb'
import { AddToCartButton } from '@/ui/add-to-cart-button'
import { MainProductImage } from '@/ui/products/main-product-image'
import { ProductImageModal } from '@/ui/products/product-image-modal'
import { StickyBottom } from '@/ui/sticky-bottom'
import { getCachedSiteSettings } from '@/utils/getCachedSiteSettings'

export default async function ProductDetails({
  route,
  product,
}: {
  route: string
  product: Product | undefined
}) {
  const images = product?.images.map(image => image) ?? []
  const metadata = await getCachedSiteSettings()
  const { productInformation } = metadata

  return (
    <article className='pb-12'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className='inline-flex min-h-12 min-w-12 items-center justify-center'>
              <Link href='/products'>All Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* {category && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className='inline-flex min-h-12 min-w-12 items-center justify-center'
                asChild>
                <YnsLink href={`/category/${category}`}>
                  {deslugify(category)}
                </YnsLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )} */}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.name}</BreadcrumbPage>
          </BreadcrumbItem>
          {/* {selectedVariant && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{deslugify(selectedVariant)}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )} */}
        </BreadcrumbList>
      </Breadcrumb>

      <StickyBottom product={product} route={route}>
        <div className='mt-4 grid gap-4 lg:grid-cols-12'>
          <div className='lg:col-span-5 lg:col-start-8'>
            <h1 className='text-3xl font-bold leading-none tracking-tight text-foreground'>
              {product?.name}
            </h1>
            {product?.finalPrice && (
              <p className='mt-2 text-2xl font-medium leading-none tracking-tight text-foreground/70'>
                {product?.finalPrice
                  ? `${productInformation?.currency === 'USD' ? '$' : '₹'}${product?.finalPrice}`
                  : 'Price not available'}
              </p>
            )}
            <div className='mt-2'>
              {(product?.stock ?? 0) <= 0 && <div>Out of stock</div>}
            </div>
          </div>

          <div className='lg:col-span-7 lg:row-span-3 lg:row-start-1'>
            <h2 className='sr-only'>Images</h2>

            <div className='grid gap-4 lg:grid-cols-3 [&>*:first-child]:col-span-3'>
              {/* {product.metadata.preview && (
								<ProductModel3D model3d={product.metadata.preview} imageSrc={product.images[0]} />
							)} */}
              {images.map((image, idx) => {
                const params = new URLSearchParams({
                  image: idx.toString(),
                })
                // if (searchParams.variant) {
                //   params.set('variant', searchParams.variant)
                // }
                return (
                  <Link key={idx} href={`?${params}`} scroll={false}>
                    {idx === 0 ? (
                      <MainProductImage
                        key={(image as Media)?.url}
                        className='w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity'
                        src={(image as Media)?.url!}
                        loading='eager'
                        priority
                        alt=''
                      />
                    ) : (
                      <Image
                        key={(image as Media)?.url}
                        className='w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity'
                        src={(image as Media)?.url!}
                        width={700 / 3}
                        height={700 / 3}
                        sizes='(max-width: 1024x) 33vw, (max-width: 1280px) 20vw, 225px'
                        loading='eager'
                        priority
                        alt=''
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className='grid gap-8 lg:col-span-5'>
            <section>
              <h2 className='sr-only'>Description</h2>
              <div className='prose text-secondary-foreground'>
                {product?.description}
                {/* <Markdown source={product?.description || ''} /> */}
              </div>
            </section>

            {/* {variants.length > 1 && (
              <div className='grid gap-2'>
                <p className='text-base font-medium' id='variant-label'>
                  {t('variantTitle')}
                </p>
                <ul
                  role='list'
                  className='grid grid-cols-4 gap-2'
                  aria-labelledby='variant-label'>
                  {variants.map(variant => {
                    const isSelected =
                      selectedVariant === variant.metadata.variant
                    return (
                      variant.metadata.variant && (
                        <li key={variant.id}>
                          <Link
                            scroll={false}
                            prefetch={true}
                            href={`/product/${variant.metadata.slug}?variant=${variant.metadata.variant}`}
                            className={cn(
                              'flex cursor-pointer items-center justify-center gap-2 rounded-md border p-2 transition-colors hover:bg-neutral-100',
                              isSelected &&
                                'border-black bg-neutral-50 font-medium',
                            )}
                            aria-selected={isSelected}>
                            {deslugify(variant.metadata.variant)}
                          </Link>
                        </li>
                      )
                    )
                  })}
                </ul>
              </div>
            )} */}

            <AddToCartButton
              product={product}
              route={route}
              disabled={(product?.stock ?? 0) <= 0}
            />
          </div>
        </div>
      </StickyBottom>

      {/* <Suspense>
        <SimilarProducts id={product.id} />
      </Suspense> */}

      <Suspense>
        {product && (
          <ProductImageModal
            images={product.images.map(image => (image as Media).url)}
          />
        )}
      </Suspense>

      {/* <JsonLd jsonLd={mappedProductToJsonLd(product)} /> */}
    </article>
  )
}
