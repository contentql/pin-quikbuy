import { useState } from 'react'

interface PriceRangeFilterProps {
  onFilterChange: (min: number, max: number) => void
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  onFilterChange,
}) => {
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(1000)

  const handlePriceChange = () => {
    onFilterChange(minPrice, maxPrice)
  }

  return (
    <div className='mb-4'>
      <h3 className='mb-2 font-semibold'>Price Range</h3>
      <div className='flex items-center space-x-2'>
        <input
          type='number'
          placeholder='Min'
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
          className='w-full rounded border p-2'
        />
        <span>-</span>
        <input
          type='number'
          placeholder='Max'
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className='w-full rounded border p-2'
        />
      </div>
      <button
        onClick={handlePriceChange}
        className='hover:bg-primary-dark mt-2 w-full rounded bg-primary p-2 text-white'>
        Apply Price Filter
      </button>
    </div>
  )
}

export default PriceRangeFilter
