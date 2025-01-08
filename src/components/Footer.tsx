import type { SiteSetting } from '@payload-types'
import Link from 'next/link'

import { Newsletter } from '@/ui/footer/newsletter.client'
import { generateMenuLinks } from '@/utils/generateMenuLinks'
import { logoMapping } from '@/utils/logoMapping'

const Footer = ({ metadata }: { metadata: SiteSetting }) => {
  const { footer, general } = metadata
  const { logo, socialLinks, footerLinks } = footer
  const { title, description } = general

  let logoDetails = {
    url: '',
    alt: '',
  }

  if (Object.keys(logo).length && typeof logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl === 'object') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
    }
  }

  // if in case image or nav-links are not specified hiding the footer
  if (
    !logoDetails.url &&
    footerLinks?.length === 0 &&
    socialLinks?.length === 0
  ) {
    return null
  }

  const menuLinks = footerLinks?.length ? generateMenuLinks(footerLinks) : []

  return (
    <footer className='w-full bg-neutral-50 p-6 text-neutral-800 md:py-12'>
      <div className='container flex max-w-7xl flex-row flex-wrap justify-center gap-16 text-sm sm:justify-between'>
        <div className=''>
          <div className='flex w-full max-w-sm flex-col gap-2'>
            <h3 className='font-semibold'>Subscribe to our newsletter</h3>
            <Newsletter />
          </div>
        </div>

        <nav className='grid grid-cols-1 gap-16'>
          {menuLinks?.map(({ children, label }, index) => {
            if (children) {
              return (
                <div key={index}>
                  <h3 className='mb-2 font-semibold'>{label}</h3>
                  <ul role='list' className='grid gap-1'>
                    {children.map(({ label, href, newTab }) => (
                      <li key={label}>
                        <a
                          className='underline-offset-4 hover:underline'
                          href={href}
                          target={newTab ? '_blank' : '_self'}>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
            return null
          })}
        </nav>
      </div>
      <div className='container mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row'>
        <div>
          <p>© 2024 {title}</p>
          <p>{description}</p>
        </div>
        <div className='flex items-center gap-4'>
          {/* <YnsLink
            className='inline-flex items-center gap-1 transition-colors hover:text-neutral-700'
            href='https://x.com/zaiste'>
            <TwitterIcon className='h-4 w-4' /> @zaiste
            <span className='sr-only'>Twitter</span>
          </YnsLink>
          <YnsLink
            className='inline-flex items-center gap-1 transition-colors hover:text-neutral-700'
            href='https://x.com/typeofweb'>
            <TwitterIcon className='h-4 w-4' /> @typeofweb
            <span className='sr-only'>Twitter</span>
          </YnsLink> */}
          {socialLinks?.map(({ platform, value, id }) => {
            const Component = logoMapping[platform]

            return Component ? (
              <Link
                key={id}
                href={value}
                target='_blank'
                className='inline-flex items-center gap-1 transition-colors hover:text-neutral-700'>
                <Component className='h-4 w-4' />
                <span className='sr-only'>{platform}</span>
              </Link>
            ) : null
          })}
        </div>
      </div>
    </footer>
    // <footer className='space-y-8 border-t pt-8'>
    //   <div className='container sm:flex sm:justify-between'>
    //     <div className='space-y-4'>
    //       {logoDetails.url && (
    //         <Link href='/'>
    //           <Image
    //             src={logoDetails.url}
    //             alt={logoDetails.alt}
    //             width={40}
    //             height={40}
    //           />
    //         </Link>
    //       )}

    //       {logo.description && (
    //         <p className='text-secondary '>{logo.description}</p>
    //       )}
    //     </div>

    //     <div className='mt-8 flex flex-wrap gap-8 sm:mt-0'>
    //       {menuLinks.map(({ children, label }, index) => {
    //         if (children) {
    //           return (
    //             <div className='text-sm' key={index}>
    //               <p className='mb-4 text-secondary'>{label}</p>

    //               <div className='space-y-2'>
    //                 {children.map(details => (
    //                   <Link
    //                     href={details.href}
    //                     key={details.label}
    //                     className='block'
    //                     target={details.newTab ? '_blank' : '_self'}>
    //                     {details.label}
    //                   </Link>
    //                 ))}
    //               </div>
    //             </div>
    //           )
    //         }

    //         return null
    //       })}
    //     </div>
    //   </div>

    //   <div className='container flex flex-col items-center justify-between gap-4 border-t pb-12 pt-4 sm:flex-row'>
    //     <p className='text-secondary'>{footer.copyright}</p>

    //     {socialLinks?.length ? (
    //       <div>
    //         <ul className='flex gap-8'>
    //           {socialLinks.map(({ platform, value, id }) => {
    //             const Component = logoMapping[platform]

    //             return Component ? (
    //               <li key={id} className='flex list-none items-center gap-1'>
    //                 <Link
    //                   href={value}
    //                   target='_blank'
    //                   aria-label={`${platform} link`}>
    //                   <Component className='size-6 [&_path]:fill-secondary' />
    //                 </Link>
    //               </li>
    //             ) : null
    //           })}
    //         </ul>
    //       </div>
    //     ) : null}
    //   </div>
    // </footer>
  )
}

export default Footer
