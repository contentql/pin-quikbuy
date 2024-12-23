import BrandFilter from './BrandFilter'
import CategoryFilter from './CategoryFilter'
import DiscountFilter from './DiscountFilter'
import PriceRangeFilter from './PriceRangeFilter'

interface SideNavbarProps {
  categories: string[]
  brands: string[]
  onFilterChange: (filterType: string, values: string[]) => void
}

export const SideNavbar: React.FC<SideNavbarProps> = ({
  categories,
  brands,
  onFilterChange,
}) => {
  return (
    <div className='h-full w-64 overflow-y-auto bg-white p-4 shadow-md'>
      <h2 className='mb-4 text-xl font-bold'>Filters</h2>

      <CategoryFilter
        categories={categories}
        onFilterChange={selected => onFilterChange('category', selected)}
      />

      <BrandFilter
        brands={brands}
        onFilterChange={selected => onFilterChange('brand', selected)}
      />

      <PriceRangeFilter
        onFilterChange={(min, max) =>
          onFilterChange('price', [`${min}-${max}`])
        }
      />

      <DiscountFilter
        onFilterChange={selected => onFilterChange('discount', selected)}
      />
    </div>
  )
}
