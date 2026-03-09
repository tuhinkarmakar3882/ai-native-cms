'use client'
import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

const PageBreadcrumb = () => {
  const { data } = useDocumentInfo<{ fullSlug: string }>()

  if (!data?.fullSlug) return null

  const segments = data.fullSlug.split('/')
  const showSegments = segments.length > 3 ? segments.slice(-3) : segments
  let cumulativePath = ''

  return (
    <div style={{ marginBottom: '0.5rem', fontSize: '13px', color: '#666' }}>
      {segments.length > 3 && (
        <>
          <span>.. / </span>
        </>
      )}
      {showSegments.map((segment, idx) => {
        cumulativePath += (cumulativePath ? '/' : '') + segment
        const isLast = idx === showSegments.length - 1

        return (
          <span key={cumulativePath}>
            {!isLast ? (
              <a
                href={`/admin/collections/pages?where[fullSlug][equals]=${encodeURIComponent(
                  cumulativePath,
                )}`}
                style={{ textDecoration: 'underline', color: '#666' }}
              >
                {segment}
              </a>
            ) : (
              <span>{segment}</span>
            )}
            {!isLast && ' / '}
          </span>
        )
      })}
    </div>
  )
}

export default PageBreadcrumb
