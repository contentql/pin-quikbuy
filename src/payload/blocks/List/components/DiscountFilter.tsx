import { useState } from 'react'

interface DiscountFilterProps {
  onFilterChange: (selected: string[]) => void
}

const DiscountFilter: React.FC<DiscountFilterProps> = ({ onFilterChange }) => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([])

  const discountRanges = [
    { label: '0-10%', value: '0-10' },
    { label: '10-20%', value: '10-20' },
    { label: '20-30%', value: '20-30' },
    { label: '30%+', value: '30-100' },
  ]

  const handleDiscountToggle = (discountRange: string) => {
    const newSelectedDiscounts = selectedDiscounts.includes(discountRange)
      ? selectedDiscounts.filter(d => d !== discountRange)
      : [...selectedDiscounts, discountRange]

    setSelectedDiscounts(newSelectedDiscounts)
    onFilterChange(newSelectedDiscounts)
  }

  return (
    <div className='mb-4'>
      <h3 className='mb-2 font-semibold'>Discount Range</h3>
      <div className='space-y-2'>
        {discountRanges.map(({ label, value }) => (
          <div key={value} className='flex items-center'>
            <input
              type='checkbox'
              id={`discount-${value}`}
              checked={selectedDiscounts.includes(value)}
              onChange={() => handleDiscountToggle(value)}
              className='mr-2 text-primary focus:ring-primary'
            />
            <label htmlFor={`discount-${value}`} className='text-gray-700'>
              {label} Discount
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiscountFilter
