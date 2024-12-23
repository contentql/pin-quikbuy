'use client'

import { ChevronDown, Heart, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

// Dropdown component for categories
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

// Main Navbar Component
const SecondNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?rawQuery=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className='fixed z-[50] mt-14 w-full bg-popover/50 backdrop-blur-3xl'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Left: Categories */}
        <div className='flex items-center space-x-4'>
          <CategoryDropdown />
        </div>

        {/* Center: Search */}
        <form onSubmit={handleSearch} className='mx-2 max-w-lg flex-1'>
          <div className='relative'>
            <input
              type='search'
              placeholder='Search for products, brands and more'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary'
            />
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
          </div>
        </form>

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

          <button className='relative rounded p-2 hover:bg-gray-100'>
            <ShoppingCart className='h-6 w-6' />
            <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white'>
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default SecondNavbar
