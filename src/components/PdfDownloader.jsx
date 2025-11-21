import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

export default function PdfDownloader({}) {
  const handleClickPrint = () => {
    window.print()
  }
  return (
    <button onClick={handleClickPrint}>
      <Icon icon="teenyicons:pdf-outline" className="text-lg" /> Print Page
    </button>
  )
}
