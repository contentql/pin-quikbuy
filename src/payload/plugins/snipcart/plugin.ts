import type { Config, Plugin } from 'payload'

import { Cart } from './collections/Cart'
import { Categories } from './collections/Categories'
import { Offers } from './collections/Offers'
import { Orders } from './collections/Orders'
import { Products } from './collections/Products'
import { Wishlist } from './collections/Wishlist'
import { PluginTypes } from './types'

const plugin =
  (options: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const { enabled = true, publicApiKey, secretApiKey } = options

    if (!enabled) {
      return incomingConfig
    }

    const updatedCollections =
      incomingConfig.collections?.map(collection => {
        return collection
      }) || []

    const newCollections = [
      Products,
      Categories,
      Offers,
      Wishlist,
      Cart,
      Orders,
    ]

    return {
      ...incomingConfig,
      collections: [...updatedCollections, ...newCollections],
    }
  }

export default plugin
