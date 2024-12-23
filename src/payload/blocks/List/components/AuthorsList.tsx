'use client'

import { ListType, User } from '@payload-types'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { TRPCClientErrorLike } from '@trpc/client'
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { authorRouter } from '@/trpc/routers/author'
import { useMetadata } from '@/utils/metadataContext'

export interface ProductCard {
  id: string
  name: string
  image: string
  price: string
}

const products: ProductCard[] = [
  {
    id: '1',
    name: 'Air Max 270',
    image: '/images/products/nikeshoe.jpg',
    price: '$150',
  },
  {
    id: '2',
    name: 'Ultraboost 22',
    image: '/images/products/ultraboost-22.jpg',
    price: '$180',
  },
  {
    id: '3',
    name: 'RS-X Hard Drive',
    image: '/images/products/rsx-hard-drive.jpg',
    price: '$120',
  },
  {
    id: '4',
    name: 'Cloudfoam Pure',
    image: '/images/products/cloudfoam-pure.jpg',
    price: '$100',
  },
  {
    id: '5',
    name: 'Revolution 5',
    image: '/images/products/revolution-5.jpg',
    price: '$80',
  },
  {
    id: '6',
    name: 'Air Max 270',
    image: '/images/products/nikeshoe.jpg',
    price: '$150',
  },
  {
    id: '7',
    name: 'Air Max 270',
    image: '/images/products/nikeshoe.jpg',
    price: '$150',
  },
  {
    id: '8',
    name: 'Air Max 270',
    image: '/images/products/nikeshoe.jpg',
    price: '$150',
  },
]

interface AuthorsListProps {
  authors?: User[]
  block: ListType
  isPending?: boolean
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      {
        pages: {
          docs: User[]
          nextCursor?: number | undefined
        }[]
        pageParams: (number | undefined)[]
      },
      TRPCClientErrorLike<typeof authorRouter>
    >
  >
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
}

const ProductCard: React.FC<ProductCard> = ({ id, name, image, price }) => {
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(0, prev - 1))

  return (
    <div className='group relative rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg'>
      {/* Product Image */}
      <div className='relative h-60 w-full overflow-hidden rounded-t-lg'>
        <Image
          src={image}
          alt={name}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-110'
        />
      </div>

      {/* Product Details */}
      <div className='p-4'>
        {/* Product Name */}
        <h3 className='line-clamp-2 text-lg font-semibold text-gray-800'>
          {name}
        </h3>

        {/* Product Price */}
        <p className='mt-2 text-xl font-bold text-orange-600'>{price}</p>

        {/* Quantity and Add to Cart Row */}
        <div className='mt-4 flex items-center justify-between'>
          <div className='flex items-center rounded-md border'>
            <button
              onClick={decrementQuantity}
              className='p-2 hover:bg-gray-100'>
              <Minus className='h-4 w-4 text-gray-600' />
            </button>
            <span className='px-4 text-sm'>{quantity}</span>
            <button
              onClick={incrementQuantity}
              className='p-2 hover:bg-gray-100'>
              <Plus className='h-4 w-4 text-gray-600' />
            </button>
          </div>
          <button className='flex items-center rounded-md bg-orange-500 px-3 py-2 text-xs text-white transition hover:bg-orange-600'>
            <ShoppingCart className='mr-1 h-4 w-4' />
            Add to Cart
          </button>
        </div>

        {/* Details and Wishlist Row */}
        <div className='mt-3 flex items-center justify-between'>
          <Link
            href='/'
            className='text-xs text-gray-700 transition-colors hover:text-orange-600 hover:underline'>
            View Details
          </Link>
          <button className='flex items-center text-xs text-gray-800 transition-colors hover:text-red-600'>
            <Heart className='mr-1 h-4 w-4' />
            Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

const AuthorsList: React.FC<AuthorsListProps> = ({
  authors,
  block,
  isPending,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { redirectionLinks } = useMetadata()
  const authorLink = redirectionLinks?.authorLink

  return (
    <div className='relative w-full py-8'>
      {/* Section Heading */}
      <div className='mb-8 flex justify-center'>
        <h1 className='transform bg-black bg-clip-text text-center text-7xl font-extrabold tracking-tighter text-transparent drop-shadow-lg transition-all duration-300 hover:scale-105 hover:drop-shadow-xl'>
          NEW ARRIVALS
        </h1>
      </div>

      {/* Swiper Component */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={5}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 5 },
        }}
        className='px-4 pb-12'>
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default AuthorsList
