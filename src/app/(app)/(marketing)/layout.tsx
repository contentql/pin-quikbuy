import { headers } from 'next/headers'

import Branding from '@/components/Branding'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { MetadataProvider } from '@/utils/metadataContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <MetadataProvider metadata={metadata}>
      <div className='flex min-h-full flex-1 flex-col bg-white'>
        <Navbar metadata={metadata} user={user} />
        {/* <SecondNavbar /> */}
        <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8'>
          {children}
        </main>
        <Footer metadata={metadata} />
        <Branding />
      </div>
    </MetadataProvider>
  )
}

export default MarketingLayout
