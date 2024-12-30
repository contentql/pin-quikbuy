import { Order } from '@payload-types'
import { CheckCircleIcon } from 'lucide-react'
import Link from 'next/link'

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
                <div
                  key={order.id}
                  className='shadow-xs border-b border-t border-gray-200 bg-white sm:rounded-lg sm:border'>
                  <h3 className='sr-only'>
                    Order placed on{' '}
                    <time dateTime={order.createdAt}>{order.createdAt}</time>
                  </h3>

                  <div className='flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
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
                            {order.createdAt}
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt className='font-medium text-gray-900'>
                          Total amount
                        </dt>
                        <dd className='mt-1 font-medium text-gray-900'>
                          {productInformation?.currency === 'USD' ? '$' : '₹'}
                          {order.totalPrice}
                        </dd>
                      </div>
                    </dl>

                    {/* <Menu
                      as='div'
                      className='relative flex justify-end lg:hidden'>
                      <div className='flex items-center'>
                        <MenuButton className='-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500'>
                          <span className='sr-only'>
                            Options for order {order.number}
                          </span>
                          <EllipsisVerticalIcon
                            aria-hidden='true'
                            className='size-6'
                          />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className='focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition'>
                        <div className='py-1'>
                          <MenuItem>
                            <a
                              href={order.href}
                              className='data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700'>
                              View
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href={order.invoiceHref}
                              className='data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700'>
                              Invoice
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu> */}

                    {/* <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                      <a
                        href={order.href}
                        className='shadow-xs focus:outline-hidden flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                        <span>View Order</span>
                        <span className='sr-only'>{order.number}</span>
                      </a>
                      <a
                        href={order.invoiceHref}
                        className='shadow-xs focus:outline-hidden flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                        <span>View Invoice</span>
                        <span className='sr-only'>
                          for order {order.number}
                        </span>
                      </a>
                    </div> */}
                  </div>

                  {/* Products */}
                  <h4 className='sr-only'>Items</h4>
                  <ul role='list' className='divide-y divide-gray-200'>
                    {order.items.map(product => {
                      console.log('current product is ', product)
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
                                <h5>{product.name}</h5>
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

                            <div className='mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0'>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
