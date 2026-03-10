'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import { Input } from '@/components/ui/input'

export const ColorInputComponent: React.FC<any> = ({ path, field, ...rest }) => {
  const { value, setValue } = useField<string>({ path })

  const color = value || '#000000'

  return (
    <div style={{ marginBottom: '1.5rem', width: field?.admin?.width || '100%' }}>
      {field?.label && (
        <label style={{ display: 'block', fontWeight: 400, marginBottom: '1px' }}>
          {field.label}
        </label>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Input
          type="color"
          value={color}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: 48,
            height: 48,
            margin: 0,
            border: 'none transparent',
            padding: 0,
            cursor: 'pointer',
            background: 'transparent',
          }}
        />

        <Input
          type="text"
          value={color}
          onChange={(e) => setValue(e.target.value)}
          style={{
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 'var(--style-radius-s)',
            background: 'var(--theme-input-bg)',
            width: '100%',
            color: 'var(--theme-elevation-800)',
            height: '40px',
            padding: '8px 15px',
            fontSize: '1rem',
            lineHeight: '20px',
            transitionProperty: 'border, box-shadow, background-color',
            transitionDuration: '.1s, .1s, .5s',
            transitionTimingFunction: 'cubic-bezier(0, .2, .2, 1)',
            boxShadow: '0 2px 2px -1px #0000001a',
          }}
        />
      </div>
    </div>
  )
}
