import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

export default function PdfDownloader({}) {
  const handleClickSave = () => {
    alert('Print to PDF feature coming soon! Please stay tuned.')
  }
  return (
    <button onClick={handleClickSave}>
      <Icon icon="teenyicons:pdf-outline" className="text-lg" /> Save as PDF
    </button>
  )
}
