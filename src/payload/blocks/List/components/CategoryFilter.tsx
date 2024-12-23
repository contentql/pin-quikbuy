import { useState } from 'react'

interface CategoryFilterProps {
  categories: string[]
  onFilterChange: (selected: string[]) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryToggle = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(newSelectedCategories)
    onFilterChange(newSelectedCategories)
  }

  return (
    <div className='mb-4'>
      <h3 className='mb-2 font-semibold'>Categories</h3>
      <div className='space-y-2'>
        {categories.map(category => (
          <div key={category} className='flex items-center'>
            <input
              type='checkbox'
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
              className='mr-2 text-primary focus:ring-primary'
            />
            <label htmlFor={`category-${category}`} className='text-gray-700'>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
