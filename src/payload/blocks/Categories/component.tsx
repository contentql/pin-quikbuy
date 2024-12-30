import { CategoriesType, Category, Media } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

const Categories: React.FC<CategoriesType> = ({ ...block }) => {
  const { categories } = block

  return (
    <section className='w-full py-8'>
      <div className='grid gap-8 lg:grid-cols-2'>
        {categories?.map(category => {
          if (typeof category?.category === 'string') return null
          const cat = category?.category as Category

          return (
            <Link
              href={`/products?category=${category?.category?.name.toLowerCase()}`}
              key={category?.id}
              className='group relative'>
              <div className='relative overflow-hidden rounded-lg'>
                <Image
                  alt={cat.name || 'Category image'}
                  className='w-full scale-105 object-cover transition-all group-hover:scale-100 group-hover:opacity-75'
                  sizes='(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 620px'
                  src={(cat.image as Media).url || '/fallback-image.jpg'}
                  width={500}
                  height={300}
                />
              </div>
              <div className='justify-end gap-2 px-4 py-2 text-neutral-600'>
                <h3 className='text-lg font-bold tracking-tight'>{cat.name}</h3>
                <p>Shop now</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Categories
