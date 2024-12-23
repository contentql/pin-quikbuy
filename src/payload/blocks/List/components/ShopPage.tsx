'use client'

import { Product } from '@payload-types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Breadcrumbs } from './ProductBreadCrums'
import { ProductGrid } from './ProductGrid'
import { SideNavbar } from './SideNavBar'

export default function ShopPage({ products }: { products: Product[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({})

  const parseQuery = (query: string) => {
    const parsed: Record<string, string[]> = {}
    new URLSearchParams(query).forEach((value, key) => {
      parsed[key] = value.split(',')
    })
    return parsed
  }

  useEffect(() => {
    const filters = parseQuery(searchParams.toString())
    setAppliedFilters(filters)
    applyFilters(filters)
  }, [searchParams])

  const applyFilters = (filters: Record<string, string[]>) => {
    const filtered = products.filter(product => {
      return Object.entries(filters).every(([type, filterValues]) => {
        if (filterValues.length === 0) return true

        switch (type) {
          case 'category':
            return filterValues.includes(product.category?.name || '')
          case 'brand':
            return filterValues.includes(product.brand || '')
          case 'price':
            const [min, max] = filterValues[0].split('-').map(Number)
            const price = product.finalPrice || product.price || 0
            return price >= min && price <= max
          case 'discount':
            const discount = product.discount?.percentage || 0
            return filterValues.some(discountRange => {
              const [minDiscount, maxDiscount] = discountRange
                .split('-')
                .map(Number)
              return discount >= minDiscount && discount <= maxDiscount
            })
          default:
            return true
        }
      })
    })

    setFilteredProducts(filtered)
  }

  const handleFilterChange = (filterType: string, values: string[]) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (values.length > 0) {
      current.set(filterType, values.join(','))
    } else {
      current.delete(filterType)
    }

    router.push(`/shop?${current.toString()}`)
  }

  const handleClearFilters = () => {
    setAppliedFilters({})
    setFilteredProducts(products)
    router.push('/shop')
  }

  const uniqueCategories = [
    ...new Set(products.map(p => p.category?.name || '')),
  ]
  const uniqueBrands = [...new Set(products.map(p => p.brand || ''))]

  return (
    <div className='flex'>
      <SideNavbar
        categories={uniqueCategories}
        brands={uniqueBrands}
        onFilterChange={handleFilterChange}
      />

      <div className='flex-1 p-4'>
        <Breadcrumbs
          currentPage='Shop'
          appliedFilters={appliedFilters}
          onClearFilters={handleClearFilters}
        />

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
