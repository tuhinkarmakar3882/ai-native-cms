'use client'

import React, { useMemo, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'
import { DynamicIcon } from 'lucide-react/dynamic'
import { LucideIconsList } from '@/constants/icons'

const COLUMN_COUNT = 6
const CELL_SIZE = 40
const VISIBLE_ROWS = 6 // only show 6 rows at a time for virtualization

export const IconPickerComponent = ({ path, field }) => {
  const { value, setValue } = useField<string>({ path })
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter icons
  const filteredIcons = useMemo(() => {
    const lower = search.toLowerCase()
    return LucideIconsList.filter((icon) => icon.toLowerCase().includes(lower))
  }, [search])

  const rowCount = Math.ceil(filteredIcons.length / COLUMN_COUNT)

  // Virtualization: only render visible rows
  const startRow = Math.floor(scrollTop / CELL_SIZE)
  const endRow = Math.min(startRow + VISIBLE_ROWS, rowCount)

  const visibleIcons = useMemo(() => {
    const icons: string[] = []
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const index = row * COLUMN_COUNT + col
        if (filteredIcons[index]) icons.push(filteredIcons[index])
      }
    }
    return icons
  }, [filteredIcons, startRow, endRow])

  const handleScroll = () => {
    if (containerRef.current) setScrollTop(containerRef.current.scrollTop)
  }

  return (
    <div
      style={{ marginBottom: '1.5rem', width: field?.admin?.width || '100%', position: 'relative' }}
    >
      <label>Icon</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          marginTop: '5px',
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
          transitionDuration: '0.1s, 0.1s, 0.5s',
          transitionTimingFunction: 'cubic-bezier(0, 0.2, 0.2, 1)',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px -1px',
        }}
      >
        {value && <DynamicIcon name={value} size={16} />} {value || 'Select icon'}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            background: 'var(--color-base-900)',
            border: '1px solid var(--color-base-550)',
            borderRadius: 8,
            padding: 10,
            width: 260,
            marginTop: 6,
            top: 68,
          }}
        >
          <input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: 6 }}
          />
          <button
            style={{
              width: '100%',
              marginBottom: 8,
            }}
            onClick={() => {
              setValue('')
              setOpen(!open)
            }}
          >
            Clear
          </button>

          <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{
              width: '100%',
              height: VISIBLE_ROWS * CELL_SIZE,
              overflowY: 'auto',
              position: 'relative',
              border: '1px solid var(--color-base-550)',
            }}
          >
            <div
              style={{
                height: rowCount * CELL_SIZE,
                position: 'relative',
              }}
            >
              {visibleIcons.map((iconName, i) => {
                const row = Math.floor((startRow * COLUMN_COUNT + i) / COLUMN_COUNT)
                const col = (startRow * COLUMN_COUNT + i) % COLUMN_COUNT
                return (
                  <button
                    key={iconName}
                    title={iconName}
                    onClick={() => {
                      setValue(iconName)
                      setOpen(false)
                    }}
                    style={{
                      position: 'absolute',
                      top: row * CELL_SIZE,
                      left: col * CELL_SIZE,
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <DynamicIcon name={iconName} size={18} color={'var(--theme-text)'} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
