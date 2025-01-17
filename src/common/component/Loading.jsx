import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Loading() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      <p>로딩 중...</p>
    </div>
  )
}
