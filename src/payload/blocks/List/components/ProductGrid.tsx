import { useState } from 'react'
import ReactPaginate from 'react-paginate'

import { ProductCard } from './ProductCard'
import { Product } from './products'

interface ProductGridProps {
  products: Product[]
  productsPerPage?: number
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  productsPerPage = 16,
}) => {
  const [currentPage, setCurrentPage] = useState(0)

  const pageCount = Math.ceil(products.length / productsPerPage)
  const offset = currentPage * productsPerPage
  const currentPageProducts = products.slice(offset, offset + productsPerPage)

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected)
  }

  return (
    <div>
      <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {currentPageProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center space-x-2 mt-6'}
        pageClassName={'px-3 py-1 border rounded'}
        activeClassName={'bg-primary text-white'}
        previousClassName={'px-3 py-1 border rounded'}
        nextClassName={'px-3 py-1 border rounded'}
      />
    </div>
  )
}
