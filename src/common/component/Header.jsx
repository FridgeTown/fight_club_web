import PropTypes from 'prop-types'
import React from 'react'
import styles from './Header.module.css'

export default function Header({ title, description }) {
  return (
    <header className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}