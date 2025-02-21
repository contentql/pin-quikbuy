// SearchContext.tsx
'use client'

import { Product } from '@payload-types'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

// SearchContext.tsx

// SearchContext.tsx

interface SearchContextType {
  searchResults: Product[]
  setSearchResults: (results: Product[]) => void
  searchTitle: string
  setSearchTitle: (title: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [searchTitle, setSearchTitle] = useState<string>('')

  // Memoizing setSearchResults to prevent unnecessary re-renders
  const updateSearchResults = useCallback((results: Product[]) => {
    setSearchResults(prevResults => {
      if (JSON.stringify(prevResults) !== JSON.stringify(results)) {
        return results
      }
      return prevResults
    })
  }, [])

  // Memoizing setSearchTitle
  const updateSearchTitle = useCallback((title: string) => {
    setSearchTitle(prevTitle => (prevTitle !== title ? title : prevTitle))
  }, [])

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults: updateSearchResults,
        searchTitle,
        setSearchTitle: updateSearchTitle,
      }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
