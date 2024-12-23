'use client'

import { Blog, ListType } from '@payload-types'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { TRPCClientErrorLike } from '@trpc/client'
import Image from 'next/image'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// This handles the error type from tRPC
import { blogRouter } from '@/trpc/routers/blog'
import { useMetadata } from '@/utils/metadataContext'

interface BlogsListProps {
  blogs?: Blog[]
  title?: ListType['title']
  isPending?: boolean
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      {
        pages: {
          docs: Blog[]
          nextCursor?: number | undefined
        }[]
        pageParams: (number | undefined)[]
      },
      TRPCClientErrorLike<typeof blogRouter>
    >
  >
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
}

export interface CompanyCard {
  id: string
  name: string
  image: string
  discount: string
}

const companies: CompanyCard[] = [
  {
    id: '1',
    name: 'Nike',
    image: '/images/companies/nike.jpg',
    discount: 'Up to 40% Off',
  },
  {
    id: '2',
    name: 'Adidas',
    image: '/images/companies/adidas.jpg',
    discount: 'Up to 35% Off',
  },
  {
    id: '3',
    name: 'Puma',
    image: '/images/companies/puma.jpg',
    discount: 'Up to 50% Off',
  },
  {
    id: '4',
    name: 'Reebok',
    image: '/images/companies/fashion.jpg',
    discount: 'Up to 30% Off',
  },
  {
    id: '5',
    name: 'Under Armour',
    image: '/images/companies/fashion_kids.png',
    discount: 'Up to 25% Off',
  },
  {
    id: '6',
    name: 'New Balance',
    image: '/images/companies/fashion_men.jpg',
    discount: 'Up to 20% Off',
  },
  {
    id: '7',
    name: 'Asics',
    image: '/images/companies/fashion_women-2.png',
    discount: 'Up to 45% Off',
  },
  {
    id: '8',
    name: 'Sketchers',
    image: '/images/companies/fashion_women.jpg',
    discount: 'Up to 50% Off',
  },
  {
    id: '13',
    name: 'Puma',
    image: '/images/companies/puma.jpg',
    discount: 'Up to 50% Off',
  },
  {
    id: '14',
    name: 'Reebok',
    image: '/images/companies/fashion.jpg',
    discount: 'Up to 30% Off',
  },
  {
    id: '15',
    name: 'Under Armour',
    image: '/images/companies/fashion_kids.png',
    discount: 'Up to 25% Off',
  },
  {
    id: '16',
    name: 'New Balance',
    image: '/images/companies/fashion_men.jpg',
    discount: 'Up to 20% Off',
  },
  {
    id: '17',
    name: 'Asics',
    image: '/images/companies/fashion_women-2.png',
    discount: 'Up to 45% Off',
  },
  {
    id: '18',
    name: 'Sketchers',
    image: '/images/companies/fashion_women.jpg',
    discount: 'Up to 50% Off',
  },
  {
    id: '113',
    name: 'Puma',
    image: '/images/companies/puma.jpg',
    discount: 'Up to 50% Off',
  },
  {
    id: '114',
    name: 'Reebok',
    image: '/images/companies/fashion.jpg',
    discount: 'Up to 30% Off',
  },
  {
    id: '115',
    name: 'Under Armour',
    image: '/images/companies/fashion_kids.png',
    discount: 'Up to 25% Off',
  },
  {
    id: '116',
    name: 'New Balance',
    image: '/images/companies/fashion_men.jpg',
    discount: 'Up to 20% Off',
  },
  {
    id: '117',
    name: 'Asics',
    image: '/images/companies/fashion_women-2.png',
    discount: 'Up to 45% Off',
  },
  {
    id: '118',
    name: 'Sketchers',
    image: '/images/companies/fashion_women.jpg',
    discount: 'Up to 50% Off',
  },
]

const BlogsList: React.FC<BlogsListProps> = ({
  blogs,
  title,
  isPending,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { redirectionLinks } = useMetadata()
  const authorLink = redirectionLinks?.authorLink
  const blogLink = redirectionLinks?.blogLink
  const tagLink = redirectionLinks?.tagLink

  return (
    <div className='relative w-full py-8'>
      {/* Heading */}
      <div className='mb-8 flex justify-center'>
        <h1 className='transform bg-black bg-clip-text text-center text-7xl font-extrabold tracking-tighter text-transparent drop-shadow-lg transition-all duration-300 hover:scale-105 hover:drop-shadow-xl'>
          GREAT SALE
        </h1>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={5}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 8 },
        }}
        className='px-6 pb-12'>
        {companies.map(company => (
          <SwiperSlide key={company.id}>
            <div className='flex h-48 flex-col items-center justify-between rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'>
              {/* Company Logo */}
              <div className='relative mb-2 h-24 w-24'>
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className='rounded-lg object-contain'
                />
              </div>

              {/* Company Name */}
              <h3 className='text-center text-base font-semibold text-gray-800'>
                {company.name}
              </h3>

              {/* Discount */}
              <p className='mt-2 text-sm font-medium text-red-500'>
                {company.discount}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BlogsList
