import React from 'react'
import PropTypes from 'prop-types';
import styles from "./Stat.module.css";

export default function Stat({ icon, value, label }) {
  return (
    <div className={styles.statItem}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  )
}

Stat.propTypes = {
  icon: PropTypes.node,
  value: PropTypes.string,
  label: PropTypes.string,
}
