'use client'

import { Loader2Icon } from 'lucide-react'
import { useTransition } from 'react'

import { Button } from '@/components/common/Button'
import { cn } from '@/utils/cn'

export const AddToCartButton = ({
  productId,
  disabled,
  className,
}: {
  productId: string
  disabled?: boolean
  className?: string
}) => {
  const [pending, startTransition] = useTransition()
  const isDisabled = disabled || pending

  return (
    <Button
      id='button-add-to-cart'
      size='lg'
      type='submit'
      className={cn('relative rounded-full text-lg', className)}
      aria-disabled={isDisabled}>
      <span
        className={cn(
          'transition-opacity ease-in',
          pending ? 'opacity-0' : 'opacity-100',
        )}>
        {disabled ? 'Out of stock' : 'Add to cart'}
      </span>
      <span
        className={cn(
          'pointer-events-none absolute z-10 transition-opacity ease-out',
          pending ? 'opacity-100' : 'opacity-0',
        )}>
        <Loader2Icon className='h-4 w-4 animate-spin' />
      </span>
    </Button>
  )
}
