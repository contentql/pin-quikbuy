'use client'

import type { SiteSetting, User } from '@payload-types'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { CartSummaryNav } from '@/ui/nav/cart-summary-nav'
import {
  SearchInput,
  SearchInputPlaceholder,
} from '@/ui/nav/search-input.client'
import { generateMenuLinks } from '@/utils/generateMenuLinks'

import ProfileDropdown from './ProfileDropdown'

const Navbar = ({
  metadata,
  user,
}: {
  metadata: SiteSetting
  user: User | null
}) => {
  const { navbar } = metadata
  const { logo, menuLinks } = navbar

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

  return (
    <header className='nav-border-reveal sticky top-0 z-20 bg-white/90 py-4 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-7xl flex-row items-center gap-2 px-4 sm:px-6 lg:px-8'>
        {/* Left: Categories */}
        {/* <div className='flex items-center space-x-4'>
          <CategoryDropdown />
        </div> */}
        {logoDetails.url && (
          <div>
            <Link href='/' className='flex flex-1 gap-x-2'>
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
              {navLinks.map(({ label, children, href = '', newTab }) => (
                <li key={label}>
                  <Link
                    href={`/products?category=${href.substring(1, href.length)}`}
                    target={newTab ? '_blank' : '_self'}
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='ml-auto mr-3 sm:ml-0'>
          <label className='flex w-full min-w-9 items-center justify-end'>
            <span className='sr-only'>Search</span>
            <Suspense
              fallback={
                <SearchInputPlaceholder placeholder='Search for products…' />
              }>
              <SearchInput placeholder='Search for products…' />
            </Suspense>
            <SearchIcon className='block h-5 w-5 max-smb:z-10 max-smb:cursor-pointer xs:-ml-7' />
          </label>
        </div>

        <CartSummaryNav />
        {/* Center: Search */}

        {/* Right: Icons */}
        <div className='flex items-center space-x-4'>
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
          <ProfileDropdown user={user} navLinks={navLinks} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
