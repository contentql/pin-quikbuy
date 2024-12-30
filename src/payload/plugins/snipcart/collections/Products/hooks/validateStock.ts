import { Product } from '@payload-types'
import { CollectionBeforeChangeHook } from 'payload'

export const validateStock: CollectionBeforeChangeHook<Product> = async ({
  collection,
  context,
  data,
  operation,
  req,
  originalDoc,
}) => {
  // Initialize total stock from attribute-specific stocks
  const attributeStock =
    data?.attributes?.reduce((sum: number, attr: any) => {
      if (attr.value?.selectOptions) {
        return (
          sum +
          attr.value.selectOptions.reduce(
            (optSum: number, option: any) => optSum + (option.stock || 0),
            0,
          )
        )
      }
      return sum
    }, 0) ?? 0

  // Ensure `data.stock` is a valid number, or default to 0
  const totalStock = data.stock ?? 0

  // Check if total stock is less than the sum of attribute-specific stocks
  if (totalStock < attributeStock) {
    throw new Error(
      'Total stock cannot be less than the sum of attribute-specific stocks.',
    )
  }

  return data
}
