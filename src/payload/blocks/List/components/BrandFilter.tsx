import { useState } from 'react'

interface BrandFilterProps {
  brands: string[]
  onFilterChange: (selected: string[]) => void
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  onFilterChange,
}) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const handleBrandToggle = (brand: string) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand]

    setSelectedBrands(newSelectedBrands)
    onFilterChange(newSelectedBrands)
  }

  return (
    <div className='mb-4'>
      <h3 className='mb-2 font-semibold'>Brands</h3>
      <div className='space-y-2'>
        {brands.map(brand => (
          <div key={brand} className='flex items-center'>
            <input
              type='checkbox'
              id={`brand-${brand}`}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandToggle(brand)}
              className='mr-2 text-primary focus:ring-primary'
            />
            <label htmlFor={`brand-${brand}`} className='text-gray-700'>
              {brand}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandFilter
