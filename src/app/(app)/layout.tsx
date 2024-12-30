import { env } from '@env'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Toaster } from 'sonner'

import '@/app/(app)/globals.css'
import GoogleAdsense from '@/components/GoogleAdsense'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { PreloadResources } from '@/payload/plugins/snipcart'
import Provider from '@/trpc/Provider'
import { getCachedSiteSettings } from '@/utils/getCachedSiteSettings'

export async function generateMetadata(): Promise<Metadata> {
  try {
    // calling the site-settings to get all the data
    const metadata = await getCachedSiteSettings()
    const generalSettings = metadata?.general

    const ogImageUrl =
      typeof generalSettings?.ogImageUrl === 'object'
        ? generalSettings?.ogImageUrl?.url!
        : '/images/seed/og-image.png'

    const title = {
      default: generalSettings?.title,
      template: `%s | ${generalSettings?.title}`,
    }

    const description = generalSettings?.description
    const ogImage = [
      {
        url: `${ogImageUrl}`,
        height: 630,
        width: 1200,
        alt: `og image`,
      },
    ]

    return {
      title,
      description,
      // we're appending the http|https int the env variable
      metadataBase: env.PAYLOAD_URL as unknown as URL,
      openGraph: {
        title,
        description,
        images: ogImage,
      },
      twitter: {
        title,
        description,
        images: ogImage,
      },
      keywords: generalSettings?.keywords,
    }
  } catch (error) {
    // in error case returning a base metadata object
    console.log({ error })

    return {
      title: 'Create CQL App',
      description: 'Generated by create cql app',
    }
  }
}

export const viewport: Viewport = {
  themeColor: 'dark',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const metadata = await getCachedSiteSettings()
  const generalSettings = metadata?.general

  const faviconUrl =
    typeof generalSettings?.faviconUrl === 'object'
      ? generalSettings?.faviconUrl?.url!
      : '/favicon.ico'

  return (
    <html lang='en' className='light h-full'>
      <head>
        <link rel='icon' type='image/x-icon' href={faviconUrl} />

        <GoogleAdsense metadata={metadata} />
        <GoogleAnalytics metadata={metadata} />

        <PreloadResources />
      </head>

      <body
        className={`flex min-h-full flex-col ${GeistSans.className} ${GeistMono.variable} antialiased`}>
        <Provider>{children}</Provider>

        {/* Sonnar toast library */}
        <Toaster richColors theme='dark' />

        <Script
          src='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js'
          async></Script>
        <div
          hidden
          id='snipcart'
          data-api-key={env.SNIPCART_PUBLIC_API_KEY}
          data-config-modal-style='side'
          data-config-add-product-behavior='none'></div>
      </body>
    </html>
  )
}
