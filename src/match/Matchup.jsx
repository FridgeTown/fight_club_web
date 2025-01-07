import React from 'react'
import Avatar from './component/Avatar'
import styles from './Matchup.module.css'
import PropTypes from 'prop-types'

export default function Matchup({ user1, user2, matchClass }) {
  return (
    <div className={styles.container}>
      <Avatar
        src={user1.imageUrl} 
        name={user1.name}
      />
      <div className={styles.middle}>
        <div className={styles.vs}>
          <p>VS</p>
        </div>
        <div className={styles.match_class}>
          <p>&lt; {matchClass} &gt;</p>
        </div>
      </div>
      <Avatar
        src={user2.imageUrl}
        name={user2.name}
        flipped 
      />
    </div>
  )
}

Matchup.propTypes = {
  user1: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
  }).isRequired, 
  user2: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
  }).isRequired, 
  matchClass: PropTypes.string
};