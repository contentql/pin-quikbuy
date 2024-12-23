import { ChevronRight, Home, X } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbsProps {
  currentPage: string
  appliedFilters: Record<string, string[]>
  onClearFilters: () => void
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  appliedFilters,
  onClearFilters,
}) => {
  const hasFilters = Object.keys(appliedFilters).length > 0

  return (
    <div className='mb-4 flex items-center justify-between bg-white p-4 shadow-sm'>
      <nav className='flex items-center space-x-2'>
        <Link href='/' className='text-gray-600 hover:text-primary'>
          <Home className='h-5 w-5' />
        </Link>
        <ChevronRight className='h-4 w-4 text-gray-400' />
        <span className='font-medium text-gray-900'>{currentPage}</span>
      </nav>

      {hasFilters && (
        <div className='flex items-center space-x-2'>
          <button
            onClick={onClearFilters}
            className='flex items-center space-x-2 text-red-600 transition-colors hover:text-red-800'>
            <X className='h-5 w-5' />
            <span>Clear All Filters</span>
          </button>
        </div>
      )}
    </div>
  )
}
