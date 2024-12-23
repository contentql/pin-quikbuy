'use client'

import { Params } from '../types'
import { HomeType } from '@payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

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
    <div className='relative h-5/6 w-full items-center overflow-hidden rounded-lg'>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className='relative'>
        {products.map((product, index) => (
          <SwiperSlide
            key={product.id || index}
            className='relative h-5/6 pb-10'>
            {/* Blurred Background */}
            <div
              className='absolute inset-0 -z-10 h-full w-full bg-cover bg-center blur-xl filter'
              style={{
                backgroundImage: `url(${
                  typeof product.image === 'object'
                    ? product.image?.url || '/placeholder.jpg'
                    : product.image || '/placeholder.jpg'
                })`,
              }}></div>

            {/* Overlay */}
            <div className='-z-5 absolute inset-0 bg-black/20'></div>

            <div className='grid h-full items-center gap-8 p-6 md:grid-cols-2 md:p-12'>
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='relative flex h-full w-full items-center justify-center'>
                <div className='relative aspect-square w-full max-w-md'>
                  <Image
                    src={
                      typeof product.image === 'object'
                        ? product.image?.url || '/placeholder.jpg'
                        : product.image || '/placeholder.jpg'
                    }
                    alt={product.image?.alt || product.name || 'Product Image'}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='rounded-2xl object-cover shadow-2xl 
                    transition-transform duration-500 hover:scale-105'
                    priority={index === 0}
                  />
                  {product.discount && product.discount > 0 && (
                    <div
                      className='absolute right-4 top-4 rounded-full bg-red-500 
                    px-3 py-1 text-sm font-semibold text-white'>
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='relative space-y-6 text-center md:text-left'>
                <h2 className='mb-4 text-3xl font-bold text-white md:text-5xl'>
                  {product.name}
                </h2>
                <p className='mb-6 text-lg text-white md:text-xl'>
                  {product.description}
                </p>

                {/* Price Section */}
                <div className='mb-6 flex items-center justify-center space-x-4 md:justify-start'>
                  <span className='text-2xl font-bold text-white md:text-3xl'>
                    ${product.price?.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className='text-lg text-white line-through'>
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Call to Action */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/product/${product.id}`}
                    className='inline-block rounded-full bg-black px-8 py-3 
                    text-lg font-semibold text-white 
                    transition-all duration-300 ease-in-out 
                    hover:bg-gray-800 hover:shadow-xl'>
                    Shop Now
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className='absolute top-1/2 z-50 flex w-full -translate-y-1/2 justify-between'>
          <div className='swiper-button-prev left-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/75'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
          </div>
          <div className='swiper-button-next right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/75'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          </div>
        </div>
      </Swiper>
    </div>
  )
}

export default Home
