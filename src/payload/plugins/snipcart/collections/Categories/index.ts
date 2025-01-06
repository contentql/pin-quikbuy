import { isAdmin } from '../../access/isAdmin'
import { revalidateCategories } from '../../hooks/revalidateCategories'
import { slugField } from '@node_modules/@contentql/core/dist/payload/fields/slug'
import { CollectionConfig, ValueWithRelation } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parentCategory', 'subCategories'],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCategories],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Enter category name',
                    description:
                      'The name of the category. This will be displayed across the application.',
                  },
                },
                slugField({
                  fieldToUse: 'name',
                  overrides: {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    admin: {
                      placeholder: 'Auto-generated slug based on category name',
                      description: 'SEO-friendly URL for this category.',
                    },
                  },
                }),
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description:
                  'Provide a rich text description to explain this category.',
              },
            },
          ],
        },
        {
          label: 'Category Hierarchy',
          fields: [
            {
              name: 'parentCategory',
              type: 'relationship',
              relationTo: 'categories',
              label: 'Parent Category',
              admin: {
                description:
                  'Select the parent category if this category belongs to a hierarchy.',
              },
            },
            {
              name: 'subCategories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Subcategories',
              admin: {
                description: 'Select subcategories related to this category.',
                condition: (_, siblingData) => !siblingData.parentCategory,
              },
              validate: (value, { id }) => {
                if (
                  Array.isArray(value) &&
                  id !== undefined &&
                  value.includes(id as (string | number) & ValueWithRelation)
                ) {
                  return 'A category cannot be a subcategory of itself.'
                }
                return true
              },
            },
          ],
        },
        {
          label: 'Category Features',
          fields: [
            {
              name: 'isFeatured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Show in Featured Categories',
              admin: {
                description:
                  'Mark this category as featured to highlight it on the homepage or special sections.',
              },
            },
          ],
        },
        {
          label: 'Images and Media',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Category Image',
              required: true,
              admin: {
                description: 'Upload an image that represents this category.',
              },
            },
          ],
        },
        {
          label: 'Associated Products',
          fields: [
            {
              name: 'products',
              type: 'join',
              label: 'Associated Products',
              collection: 'products',
              on: 'category',
              admin: {
                allowCreate: false,
                description: 'View the products associated with this category.',
              },
            },
            {
              name: 'productCount',
              type: 'number',
              label: 'Product Count',
              admin: {
                readOnly: true,
                description:
                  'The total number of products under this category.',
              },
            },
          ],
        },
      ],
    },
  ],
}
