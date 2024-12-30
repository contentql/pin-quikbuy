'use client'

import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'

export const Newsletter = () => {
  const [loading, setLoading] = useState(false)
  return (
    <form
      className='flex gap-x-2'
      onSubmit={() => {
        setLoading(true)
      }}>
      <Input
        className='max-w-lg flex-1'
        placeholder={'Enter your email'}
        type='email'
        name='email'
        required
      />
      <Button
        type='submit'
        className='w-24 rounded-full'
        variant='default'
        disabled={loading}>
        {loading ? (
          <Loader2Icon className='h-4 w-4 animate-spin' />
        ) : (
          'Subscribe'
        )}
      </Button>
    </form>
  )
}
