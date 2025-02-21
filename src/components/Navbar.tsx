'use client'

import type { Category, Product, SiteSetting, User } from '@payload-types'
import { ChevronDown, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown'
import { CartSummaryNav } from '@/ui/nav/cart-summary-nav'
import {
  SearchInput,
  SearchInputPlaceholder,
} from '@/ui/nav/search-input.client'
import { generateMenuLinks } from '@/utils/generateMenuLinks'

import ProfileDropdown from './ProfileDropdown'
import { useSearch } from './SearchContext'

const Navbar = ({
  metadata,
  user,
  categoriesData,
  productsData,
}: {
  metadata: SiteSetting
  user: User | null
  categoriesData: Category[]
  productsData: Product[]
}) => {
  const router = useRouter()
  const { navbar } = metadata
  const { logo, menuLinks } = navbar
  const { setSearchResults, setSearchTitle } = useSearch()

  let logoDetails = {
    url: '',
    alt: '',
  }

  const navLinks = menuLinks?.length ? generateMenuLinks(menuLinks) : []

  if (Object.keys(logo).length && typeof logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl === 'object') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
    }
  }

  // if in case image or nav-links are not specified hiding the navbar
  // if (!logoDetails.url && navLinks?.length === 0) {
  //   return null
  // }

  const { height, width } = logo

  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
  }

  return (
    <header className='nav-border-reveal sticky top-0 z-20 bg-white/90 py-4 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-7xl flex-row items-center gap-2 px-4 sm:px-6 lg:px-8'>
        {/* Left: Categories */}
        {/* <div className='flex items-center space-x-4'>
          <CategoryDropdown />
        </div> */}
        {logoDetails.url && (
          <div>
            <Link href='/' className='flex items-center gap-x-2'>
              <div className='-mt-0.5 whitespace-nowrap text-xl font-bold'>
                QuikBuy
              </div>
              <Image
                src={logoDetails.url}
                alt={logoDetails.alt}
                width={width || 24}
                height={height || 24}
              />
            </Link>
          </div>
        )}

        <div className='flex w-auto max-w-full flex-shrink overflow-auto max-sm:order-2 sm:mr-auto'>
          <div className='hidden sm:block'>
            <ul className='flex flex-row items-center justify-center gap-x-1'>
              {categoriesData &&
                (categoriesData?.length > 3 ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className='group hidden h-9 w-max items-center justify-center gap-1 rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none lg:flex'>
                      <span> Categories</span>
                      <ChevronDown size={20} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className='z-[60] max-w-56'
                      align='center'>
                      {categoriesData?.map((category, index) => (
                        <Link
                          key={index}
                          href={`/products?category=${category?.name.toLowerCase()}`}>
                          <DropdownMenuItem className='cursor-pointer'>
                            {capitalizeFirstLetter(category?.name)}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  categoriesData?.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/products?category=${category?.name.toLowerCase()}`}
                        className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none'>
                        {capitalizeFirstLetter(category?.name)}
                      </Link>
                    </li>
                  ))
                ))}
            </ul>
          </div>
        </div>

        <div className='ml-auto mr-3 flex items-center sm:ml-0'>
          <div className='flex w-auto max-w-full flex-shrink max-sm:order-2 sm:mr-auto'>
            <div className='hidden sm:block'>
              <ul className='flex flex-row items-center justify-center gap-x-1'>
                {navLinks.map(({ label, children, href = '', newTab }) => {
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        target={newTab ? '_blank' : '_self'}
                        className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none'>
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <label className='flex w-full min-w-9 items-center justify-end'>
            <span className='sr-only'>Search</span>
            <Suspense
              fallback={
                <SearchInputPlaceholder placeholder='Search for products…' />
              }>
              <SearchInput
                placeholder='Search for products…'
                onSearch={async query => {
                  try {
                    query && router.push('/products')
                    // Assuming `products` is an already available array of product data
                    const filteredProducts = productsData.filter(product =>
                      product.name.toLowerCase().includes(query.toLowerCase()),
                    )
                    setSearchTitle(query)
                    setSearchResults(filteredProducts)
                    return filteredProducts // Send back the filtered results
                  } catch (error) {
                    console.error('Search API Error:', error)
                  }

                  // Handle the search query as needed
                }}
              />
            </Suspense>

            <SearchIcon className='block h-5 w-5 max-smb:z-10 max-smb:cursor-pointer xs:-ml-7' />
          </label>
        </div>

        <div className='flex items-center space-x-4'>
          <CartSummaryNav />
          {/* Center: Search */}

          {/* Right: Icons */}
          {/* <Link
            href='/wishlist'
            className='relative rounded p-2 hover:bg-gray-100'>
            <Heart className='h-6 w-6' />
            <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
              0
            </span>
          </Link> */}

          {/* <Button className='snipcart-checkout relative rounded p-2 hover:bg-gray-100'>
            <ShoppingCart className='h-6 w-6' />
            <span className='snipcart-items-count absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white'></span>
          </Button> */}

          {/* <CommandBar /> */}
          <ProfileDropdown
            categoriesData={categoriesData}
            user={user}
            navLinks={navLinks}
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar
