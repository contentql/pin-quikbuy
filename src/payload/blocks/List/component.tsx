import { Params } from '../types'
import configPromise from '@payload-config'
import { ListType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import React from 'react'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import ShopPage from './components/ShopPage'

interface ListProps extends ListType {
  params: Params
}

const List: React.FC<ListProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const { docs: blogs = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            depth: 5,
            draft: false,
            limit: 1000,
          }),
        ['list', 'blogs'],
        { tags: ['list-blogs'] },
      )()

      return <BlogsList blogs={blogs} title={block['title']} />
    }

    case 'products': {
      const { docs: products } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'products',
            depth: 10,
            limit: 1000,
          }),
        ['products', 'allProducts'],
        { tags: ['list-products'] },
      )()

      return (
        <div className='-mt-4'>
          <ShopPage products={products} />
        </div>
      )
    }

    case 'tags': {
      const { docs: tags = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'tags',
            depth: 5,
            draft: false,
            limit: 1000,
          }),
        ['list', 'tags'],
        { tags: ['list-tags'] },
      )()

      const { docs: blogs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            limit: 1000,
            select: {
              tags: true,
            },
            populate: {
              tags: {
                slug: true,
              },
            },
          }),
        ['list', 'tags', 'with-blog-count'],
        { tags: ['list-tags-with-blog-count'] },
      )()

      const tagsWithCount = tags.map(tag => {
        const count = blogs.filter(blog => {
          const blogTags = blog.tags

          if (blogTags) {
            return blogTags.find(({ value }) => {
              if (typeof value === 'number') {
                return value === tag.id
              } else {
                return value.id === tag.id
              }
            })
          }
        }).length

        return { ...tag, count }
      })

      return <div></div>
    }

    case 'users': {
      const { docs: authors = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'users',
            where: {
              role: {
                equals: 'author',
              },
            },
            limit: 1000,
          }),
        ['list', 'authors'],
        { tags: ['list-authors'] },
      )()

      return (
        <AuthorsList
          authors={authors.map(author => ({ ...author, count: 0 }))}
          block={block}
        />
      )
    }
  }
}

export default List
