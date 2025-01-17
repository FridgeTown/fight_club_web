import React from 'react'
import Logo from '../../assets/logo-removebg-preview.png'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
      </div>
    </footer>
  )
}
