import { Order } from '@payload-types'
import { CheckCircleIcon } from 'lucide-react'
import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/Accordion'
import { formatDate } from '@/utils/dateFormatter'
import { getCachedSiteSettings } from '@/utils/getCachedSiteSettings'

export default async function OrderList({ orders }: { orders: Order[] }) {
  const metadata = await getCachedSiteSettings()
  const { productInformation } = metadata

  return (
    <div className='bg-white'>
      <div className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
          <div className='mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
              Order history
            </h1>
            <p className='mt-2 text-sm text-gray-500'>
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>
        </div>

        <div className='mt-16'>
          <h2 className='sr-only'>Recent orders</h2>
          <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
            <div className='mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
              {orders.map(order => (
                <Accordion
                  key={order.id}
                  type='single'
                  collapsible
                  className='w-full'
                  defaultValue='3'>
                  <AccordionItem value={order.id}>
                    <div
                      key={order.id}
                      className='shadow-xs bg-white sm:rounded-lg'>
                      <h3 className='sr-only'>
                        Order placed on{' '}
                        <time dateTime={order.createdAt}>
                          {order.createdAt}
                        </time>
                      </h3>

                      <AccordionTrigger className='hover:bg-gray-200 hover:no-underline'>
                        <div className='flex items-center p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
                          <dl className='grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
                            <div>
                              <dt className='font-medium text-gray-900'>
                                Order number
                              </dt>
                              <dd className='mt-1 text-gray-500'>
                                {order.invoiceNumber}
                              </dd>
                            </div>
                            <div className='hidden sm:block'>
                              <dt className='font-medium text-gray-900'>
                                Date placed
                              </dt>
                              <dd className='mt-1 text-gray-500'>
                                <time dateTime={order.createdAt}>
                                  {formatDate(order.createdAt)}
                                </time>
                              </dd>
                            </div>
                            <div>
                              <dt className='font-medium text-gray-900'>
                                Total amount
                              </dt>
                              <dd className='mt-1 font-medium text-gray-900'>
                                {productInformation?.currency === 'USD'
                                  ? '$'
                                  : '₹'}
                                {order.totalPrice}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </AccordionTrigger>

                      {/* Products */}
                      <h4 className='sr-only'>Items</h4>
                      <AccordionContent>
                        <ul role='list' className='divide-y divide-gray-200'>
                          {order.items.map(product => {
                            return (
                              <li key={product.id} className='p-4 sm:p-6'>
                                <div className='flex items-center sm:items-start'>
                                  {/* <div className='size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40'>
                              <Image
                                alt={''}
                                src={product.}
                                className='size-full object-cover'
                              />
                            </div> */}
                                  <div className='ml-6 flex-1 text-sm'>
                                    <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                                      <h5>
                                        {product.name}{' '}
                                        <span className='text-muted-foreground'>
                                          x
                                        </span>{' '}
                                        {product.quantity}
                                      </h5>
                                      <p className='mt-2 sm:mt-0'>
                                        {productInformation?.currency === 'USD'
                                          ? '$'
                                          : '₹'}
                                        {product.totalPrice}
                                      </p>
                                    </div>
                                    <p className='text-gray-500 sm:mt-2 sm:block'>
                                      {product.description}
                                    </p>
                                  </div>
                                </div>

                                <div className='mt-6 sm:flex sm:justify-between'>
                                  <div className='flex items-center'>
                                    <CheckCircleIcon
                                      aria-hidden='true'
                                      className='size-5 text-green-500'
                                    />
                                    <p className='ml-2 text-sm font-medium text-gray-500'>
                                      Delivered on{' '}
                                      {/* <time dateTime={order.}>
                                  {order.deliveredDate}
                                </time> */}
                                    </p>
                                  </div>

                                  <div className='mt-6 flex items-center space-x-4 divide-x divide-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:pt-0'>
                                    <div className='flex flex-1 justify-center'>
                                      <Link
                                        href={product?.url!}
                                        target='_blank'
                                        className='whitespace-nowrap text-indigo-600 hover:text-indigo-500'>
                                        View product
                                      </Link>
                                    </div>
                                    <div className='flex flex-1 justify-center pl-4'>
                                      <Link
                                        href='#'
                                        className='whitespace-nowrap text-indigo-600 hover:text-indigo-500'>
                                        Buy again
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
