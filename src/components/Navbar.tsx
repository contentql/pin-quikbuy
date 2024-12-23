'use client'

import type { SiteSetting, User } from '@payload-types'
import { ChevronDown, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown'
import { generateMenuLinks } from '@/utils/generateMenuLinks'

import ProfileDropdown from './ProfileDropdown'
import Button from './common/Button'

const CategoryDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const categories = [
    { name: 'Electronics', slug: 'Electronics' },
    { name: 'Clothing', slug: 'Clothing' },
    { name: 'Home & Living', slug: 'Home-living' },
    { name: 'Sports', slug: 'Sports' },
    { name: 'Accessories', slug: 'Accessories' },
  ]

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 rounded p-2 hover:bg-gray-100'>
        <span>Shop by Category</span>
        <ChevronDown className='h-4 w-4' />
      </button>

      {isOpen && (
        <div className='absolute left-0 top-full z-50 mt-2 w-56 rounded-md border bg-white shadow-lg'>
          {categories.map(category => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
              onClick={() => setIsOpen(false)}>
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

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
    <nav className='fixed z-[19] w-full bg-popover/50 backdrop-blur-3xl'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Left: Categories */}
        <div className='flex items-center space-x-4'>
          <CategoryDropdown />
        </div>

        {logoDetails.url && (
          <div className='flex-1'>
            <Link href='/'>
              <Image
                src={logoDetails.url}
                alt={logoDetails.alt}
                width={width || 24}
                height={height || 24}
              />
            </Link>
          </div>
        )}

        <div className='flex items-center gap-8'>
          {navLinks?.length > 0 && (
            <nav>
              <ul className='hidden gap-8 lg:flex'>
                {navLinks.map(({ label, children, href = '', newTab }) => (
                  <li
                    className='flex list-none items-center gap-1 text-sm'
                    key={label}>
                    {children ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center gap-1'>
                          {label}
                          <ChevronDown size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className='z-[60] max-w-56'
                          align='end'>
                          {children.map(details => (
                            <Link
                              className='text-base font-medium'
                              href={details.href}
                              key={details.label}
                              target={details.newTab ? '_blank' : '_self'}>
                              <DropdownMenuItem className='cursor-pointer'>
                                {details.label}
                              </DropdownMenuItem>
                            </Link>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link href={href} target={newTab ? '_blank' : '_self'}>
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Center: Search */}

        {/* Right: Icons */}
        <div className='flex items-center space-x-4'>
          <Link
            href='/wishlist'
            className='relative rounded p-2 hover:bg-gray-100'>
            <Heart className='h-6 w-6' />
            <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
              0
            </span>
          </Link>

          <Button className='snipcart-checkout relative rounded p-2 hover:bg-gray-100'>
            <ShoppingCart className='h-6 w-6' />
            <span className='snipcart-items-count absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white'></span>
          </Button>

          {/* <CommandBar /> */}
          <ProfileDropdown user={user} navLinks={navLinks} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
