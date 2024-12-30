'use client'

import { Params } from '../types'
import { HomeType } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Keep existing interfaces and dummy data
interface HomeProps extends HomeType {
  params: Params
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image?: {
    url: string
    alt?: string
  }
  slug: string
  category?: string
  tags?: string[]
}

export interface HomeBlockType {
  blockType: 'heroSlider'
  products: Product[]
  heading?: string
  subHeading?: string
  backgroundImage?: {
    url: string
    alt?: string
  }
}

export const homepageBlockData: HomeBlockType = {
  blockType: 'heroSlider',
  heading: 'Summer Fashion Collection',
  subHeading: 'Discover the Latest Trends',
  products: [
    {
      id: 'prod_001',
      name: 'Urban Leather Jacket',
      description: 'Premium leather jacket with modern cut and sleek design',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: {
        url: '/images/products/nikeshoe.jpg',
        alt: 'Stylish leather jacket',
      },
      slug: 'urban-leather-jacket',
      category: 'Outerwear',
      tags: ['leather', 'jacket', 'men'],
    },
    {
      id: 'prod_002',
      name: 'Smart Wireless Earbuds',
      description: 'Noise-cancelling earbuds with crystal clear sound quality',
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      image: {
        url: '/images/products/camera.jpg',
        alt: 'Modern wireless earbuds',
      },
      slug: 'smart-wireless-earbuds',
      category: 'Electronics',
      tags: ['earbuds', 'wireless', 'tech'],
    },
    {
      id: 'prod_003',
      name: 'Minimalist Smartwatch',
      description: 'Sleek smartwatch with advanced health tracking features',
      price: 249.99,
      originalPrice: 299.99,
      discount: 15,
      image: {
        url: '/images/products/watch2.jpg',
        alt: 'Elegant smartwatch',
      },
      slug: 'minimalist-smartwatch',
      category: 'Accessories',
      tags: ['smartwatch', 'fitness', 'tech'],
    },
  ],
}

const Home: React.FC<HomeProps> = ({ params, ...block }) => {
  const data = homepageBlockData
  const products = data.products || []

  // If no products, return null or a placeholder
  if (products.length === 0) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-gray-100'>
        <p className='text-2xl text-gray-500'>No products available</p>
      </div>
    )
  }

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
            href={'/accessories'}>
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
          src='/images/blocks/hero-block.jpg'
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
