'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Input } from '@/components/common/Input'
import { useDebouncedValue } from '@/lib/hooks'
import { cn } from '@/utils/cn'

const inputClasses = cn(
  'appearance-none rounded-md absolute border bg-white py-2 pl-4 pr-10 w-9 opacity-0 transition-opacity ease-linear',
  'max-smb:focus:w-[calc(100vw-2rem)] max-smb:cursor-default max-smb:focus:left-4 max-smb:focus:z-20 max-smb:focus:opacity-100',
  'smb:opacity-100 smb:w-full smb:pl-4 smb:pr-10 smb:inline-block smb:static',
  'md:pl-2 md:pr-8 md:max-w-72',
  'lg:pl-4 lg:pr-10',
)

export const SearchInputPlaceholder = ({
  placeholder,
}: {
  placeholder: string
}) => {
  return (
    <Input
      className={cn('pointer-events-none', inputClasses)}
      placeholder={placeholder}
      type='search'
      aria-busy
      aria-disabled
    />
  )
}

export const SearchInput = ({
  placeholder,
  onSearch,
}: {
  placeholder: string
  onSearch: (query: string) => void
}) => {
  const searchParams = useSearchParams()

  const searchParamQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(searchParamQuery)
  const [_isQueryPending, debouncedQuery] = useDebouncedValue(query, 300)

  useEffect(() => {
    if (debouncedQuery || query === '') {
      onSearch(debouncedQuery)
    }
  }, [debouncedQuery, query, onSearch])

  return (
    <Input
      className={inputClasses}
      placeholder={placeholder}
      type='search'
      enterKeyHint='search'
      name='search'
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}
