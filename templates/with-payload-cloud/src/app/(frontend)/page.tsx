import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import classes from './index.module.scss'

export default async function HomePage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className={classes.home}>
      <div className={classes.content}>
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={13}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className={classes.links}>
          <a className={classes.admin} href="/admin" rel="noopener noreferrer" target="_blank">
            Go to admin panel
          </a>
          <a
            className={classes.docs}
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>

      <p className={classes.footer}>
        Update this page by editing{' '}
        <a className={classes.codeLink} href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </p>
    </div>
  )
}
