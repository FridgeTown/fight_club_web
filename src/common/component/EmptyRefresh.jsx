import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import styles from './EmptyRefresh.module.css'

export default function EmptyRefresh() {
  const refreshRef = useRef(null);

  return (
    <div className={styles.container} ref={refreshRef}>
      <div className={styles.refresh_icon}>
        <FontAwesomeIcon icon={faRefresh} />
      </div>
      <p>진행중인 경기가 없습니다!</p>
    </div>
  )
}
