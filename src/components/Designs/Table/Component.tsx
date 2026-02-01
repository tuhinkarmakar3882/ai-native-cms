'use client' // Client component needed for API fetching

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

// Helper to safely get nested values (e.g. "user.address.city")
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

export const TableComponent = ({ title, sourceType, headers, rows, apiUrl, columnMapping }) => {
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(sourceType === 'api')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (sourceType === 'api' && apiUrl) {
      setLoading(true)
      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch data')
          return res.json()
        })
        .then((data) => {
          // Handle both Array directly or Object with data array
          const arrayData = Array.isArray(data) ? data : data.data || data.results || []
          console.log(arrayData)
          setApiData(arrayData)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setError(err.message)
          setLoading(false)
        })
    }
  }, [sourceType, apiUrl])

  // Determine Headers and Data based on mode
  const displayHeaders =
    sourceType === 'static' ? headers?.map((h) => h.label) : columnMapping?.map((c) => c.header)

  const displayRows = sourceType === 'static' ? rows : apiData

  if (error) {
    return (
      <section className="container py-10">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Table</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </section>
    )
  }

  return (
    <section className="container py-16 overflow-x-auto">
      {title && <h3 className="text-2xl font-bold mb-6">{title}</h3>}

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {displayHeaders?.map((header, i) => (
                <TableHead key={i} className="font-bold">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? // Skeleton Loading State
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {displayHeaders?.map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : // Data Rendering
                displayRows?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {sourceType === 'static'
                      ? // Static Render
                        row.cells?.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell.value}</TableCell>
                        ))
                      : // API Render
                        columnMapping?.map((col, colIndex) => (
                          <TableCell key={colIndex}>
                            {String(getNestedValue(row, col.dataKey) || '-')}
                          </TableCell>
                        ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
