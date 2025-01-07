import React from 'react'
import PropTypes from 'prop-types';
import styles from './Avatar.module.css'

export default function Avatar({ src, alt, flipped, name }) {

  return (
    <div className={styles.container}>
      <div className={styles.avatar} style={flipped ? { transform: "scaleX(-1)" } : {}}>
        <img src={src} alt={alt || src} />
      </div>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
    </div>
  )
}


Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  flipped: PropTypes.bool,
};