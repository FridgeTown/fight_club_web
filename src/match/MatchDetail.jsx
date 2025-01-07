import React from 'react'
import styles from './MatchDetail.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faCheckToSlot, faHandFist } from '@fortawesome/free-solid-svg-icons'
import { faClipboard, faClock, faHeart, faHandBackFist } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types'

function InfoTitle({ icon, title }) {
  return (
    <>
      <FontAwesomeIcon icon={icon} />
      <span>{title}</span>
    </>
  )
}

InfoTitle.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string.isRequired
};

function InfoHeader({ children }) {
  return (
    <div className={styles.info_header}>
      {children}
    </div>
  )
}

InfoHeader.propTypes = {
  children: PropTypes.node,
};

function InfoContent({ left, center, right }) {
  return (
    <div className={styles.info_content}>
      <div><span>{left}</span></div>
      <div><span>{center}</span></div>
      <div><span>{right}</span></div>
    </div>
  )
}

InfoContent.propTypes = {
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node,
};


export default function MatchDetail() {
  return (
    <div className={styles.container}>
      <div>
        <InfoHeader>
          <InfoTitle icon={faClock} title="경기시간"/>
        </InfoHeader>
        <InfoContent center="3:00" />
      </div>
      <div>
        <InfoHeader>
          <InfoTitle icon={faClipboard} title="총 라운드"/>
        </InfoHeader>
        <InfoContent center="3" />
      </div>
      <hr className={styles.divider}/>
      <div>
        <InfoContent 
          left="2" 
          center={<InfoTitle icon={faAward} title="승리"/>} 
          right="1" 
        />
      </div>
      <div>
        <InfoContent 
          left="112" 
          center={<InfoTitle icon={faCheckToSlot} title="투표"/>} 
          right="220" 
        />
      </div>
      <div>
        <InfoContent 
          left="81" 
          center={<InfoTitle icon={faHandFist} title="펀치"/>} 
          right="123" 
        />
      </div>
      <div>
        <InfoContent 
          left="25" 
          center={<InfoTitle icon={faHandBackFist} title="크로스"/>} 
          right="31" 
        />
      </div>
      <div>
        <InfoContent 
          left="128 bpm" 
          center={<InfoTitle icon={faHeart} title="심박수"/>} 
          right="116 bpm" 
        />
      </div>
    </div>
  )
}
