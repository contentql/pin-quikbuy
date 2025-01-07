import { Params } from '../types'
import { HomeType, Media } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Keep existing interfaces and dummy data
interface HomeProps extends HomeType {
  params: Params
}

const Home: React.FC<HomeProps> = ({ params, ...block }) => {
  return (
    <section className='rounded bg-neutral-100 py-8 sm:py-12'>
      <div className='mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2'>
        <div className='max-w-md space-y-4'>
          <h2 className='text-balance text-3xl font-bold tracking-tight md:text-4xl'>
            {block?.title}
          </h2>
          <p className='text-pretty text-neutral-600'>{block?.description}</p>
          <Link
            className='inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-1 focus:ring-neutral-950'
            href={'/products'}>
            Shop Now
          </Link>
        </div>
        <Image
          alt='Cup of Coffee'
          loading='eager'
          priority={true}
          className='rounded'
          height={450}
          width={450}
          src={(block?.image as Media)?.url!}
          style={{
            objectFit: 'cover',
          }}
          sizes='(max-width: 640px) 70vw, 450px'
        />
      </div>
    </section>
  )
}

export default Home
