import { Product } from '@payload-types'
import { CollectionBeforeChangeHook } from 'payload'

export const manageProductAttributes: CollectionBeforeChangeHook<
  Product
> = async ({ collection, context, data, operation, req, originalDoc }) => {
  const formattedAttributes = data?.attributes?.map(attr => {
    if (attr?.value?.type === 'select') {
      return {
        ...attr,
        value: {
          ...attr.value,
          textValue: undefined,
        },
      }
    }

    if (attr?.value?.type === 'text') {
      return {
        ...attr,
        value: {
          ...attr.value,
          selectOptions: [],
        },
      }
    }

    return attr
  })

  data.attributes = formattedAttributes

  return data
}
