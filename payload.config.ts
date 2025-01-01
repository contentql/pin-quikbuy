import { collectionSlug, cqlConfig } from '@contentql/core'
import { env } from '@env'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'

import { ResetPassword } from '@/emails/reset-password'
import { UserAccountVerification } from '@/emails/verify-email'
import { blocksConfig } from '@/payload/blocks/blockConfig'
import { revalidateAuthors } from '@/payload/hooks/revalidateAuthors'
import { revalidatePages } from '@/payload/hooks/revalidatePages'
import { revalidateSiteSettings } from '@/payload/hooks/revalidateSiteSettings'
import { snipcart } from '@/payload/plugins/snipcart'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default cqlConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
    },
  },
  cors: [env.PAYLOAD_URL],
  csrf: [env.PAYLOAD_URL],

  baseURL: env.PAYLOAD_URL,

  secret: env.PAYLOAD_SECRET,

  // dbURI: env.DATABASE_URI,
  // dbSecret: env.DATABASE_SECRET,
  // syncDB: false,

  removeCollections: ['blogs', 'tags'],
  searchPluginOptions: {
    collections: [collectionSlug['users']],
    defaultPriorities: {
      [collectionSlug['users']]: 30,
    },
  },

  s3: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    bucket: env.S3_BUCKET,
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },

  resend: {
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: env.RESEND_SENDER_EMAIL,
    defaultFromName: env.RESEND_SENDER_NAME,
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  plugins: [
    snipcart({
      enabled: true,
      publicApiKey: env.SNIPCART_PUBLIC_API_KEY || '',
      secretApiKey: env.SNIPCART_SECRET_API_KEY || '',
    }),
  ],

  blocks: blocksConfig,

  collections: [
    {
      slug: collectionSlug.users,
      fields: [
        {
          name: 'bio',
          type: 'text',
          admin: {
            description: 'This bio will be shown in the authors details page',
          },
        },
      ],
      auth: {
        verify: {
          generateEmailHTML: ({ token, user }) => {
            return UserAccountVerification({
              actionLabel: 'verify your account',
              buttonText: 'Verify Account',
              userName: user.username,
              image: user.avatar,
              href: `${env.PAYLOAD_URL}/verify-email?token=${token}&id=${user.id}`,
            })
          },
        },
        forgotPassword: {
          generateEmailHTML: args => {
            return ResetPassword({
              resetPasswordLink: `${env.PAYLOAD_URL}/reset-password?token=${args?.token}`,
              userFirstName: args?.user.username,
            })
          },
        },
      },
      hooks: {
        afterChange: [revalidateAuthors],
      },
    },
    {
      slug: collectionSlug.pages,
      fields: [],
      hooks: {
        afterChange: [revalidatePages],
      },
    },
    // {
    //   slug: collectionSlug.blogs,
    //   fields: [],
    //   hooks: {
    //     afterChange: [revalidateBlogs],
    //   },
    // },
    // {
    //   slug: collectionSlug.tags,
    //   fields: [],
    //   hooks: {
    //     afterChange: [revalidateTags],
    //   },
    // },
  ],

  globals: [
    {
      slug: 'site-settings',
      fields: [
        {
          type: 'tabs',
          label: 'Settings',
          tabs: [
            {
              label: 'Redirection Links',
              name: 'redirectionLinks',
              fields: [
                {
                  name: 'blogLink',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Blog redirect link',
                  maxDepth: 1,
                  admin: {
                    description: 'This redirects to a blog details page',
                  },
                },
                {
                  name: 'authorLink',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Author redirect link',
                  maxDepth: 1,
                  admin: {
                    description: 'This redirects to a author details page',
                  },
                },
                {
                  name: 'tagLink',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Tag redirect link',
                  maxDepth: 1,
                  admin: {
                    description: 'This redirects to a tag details page',
                  },
                },
              ],
            },
            {
              label: 'Monetization',
              name: 'monetization',
              fields: [
                {
                  name: 'adSenseId',
                  type: 'text',
                  label: 'Google AdSense',
                  admin: {
                    description:
                      'Add the publisher-id from Google AdSense Console',
                  },
                },
              ],
              admin: {
                hidden: true,
              },
            },
            {
              label: 'Product Information',
              name: 'productInformation',
              fields: [
                {
                  name: 'currency',
                  type: 'select',
                  label: 'Currency',
                  options: [
                    {
                      label: 'USD',
                      value: 'USD',
                    },
                    {
                      label: 'INR',
                      value: 'INR',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      hooks: {
        afterChange: [revalidateSiteSettings],
      },
    },
  ],

  editor: slateEditor({
    admin: {
      leaves: [
        {
          Button: 'src/payload/slate/strong/Button',
          Leaf: 'src/payload/slate/strong/Leaf',
          name: 'strong',
        },
        {
          Button: 'src/payload/slate/pre/Button',
          Leaf: 'src/payload/slate/pre/Leaf',
          name: 'pre',
        },
        {
          Button: 'src/payload/slate/mark/Button',
          Leaf: 'src/payload/slate/mark/Leaf',
          name: 'mark',
        },
        {
          Button: 'src/payload/slate/kbd/Button',
          Leaf: 'src/payload/slate/kbd/Leaf',
          name: 'kbd',
        },
        {
          Button: 'src/payload/slate/custom-iframe/Button',
          Leaf: 'src/payload/slate/custom-iframe/Leaf',
          name: 'custom-iframe',
        },
        {
          Button: 'src/payload/slate/italic/Button',
          Leaf: 'src/payload/slate/italic/Leaf',
          name: 'italic',
        },
        {
          Button: 'src/payload/slate/Strikethrough/Button',
          Leaf: 'src/payload/slate/Strikethrough/Leaf',
          name: 'strikethrough',
        },
        {
          Button: 'src/payload/slate/underline/Button',
          Leaf: 'src/payload/slate/underline/Leaf',
          name: 'underline',
        },
      ],
    },
  }),
})
