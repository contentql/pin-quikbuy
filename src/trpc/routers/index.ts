import { router } from '@/trpc'
import { pageRouter } from '@/trpc/routers/page'
import { siteSettingsRouter } from '@/trpc/routers/site-settings'

import { authRouter } from './auth'
import { categoryRouter } from './categories'
import { formRouter } from './form'
import { productRouter } from './products'
import { searchRouter } from './search'
import { seedRouter } from './seed'
import { userRouter } from './user/user-route'

export const appRouter = router({
  auth: authRouter,
  page: pageRouter,
  siteSettings: siteSettingsRouter,
  user: userRouter,
  seed: seedRouter,
  // this is used for global search
  search: searchRouter,
  form: formRouter,
  product: productRouter,
  category: categoryRouter,
})

export type AppRouter = typeof appRouter
