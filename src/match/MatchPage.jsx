import React from 'react'

import Matchup from './Matchup';
import Header from '../common/component/Header';
import MatchDetail from './MatchDetail';
import Ali from '../assets/ali.jpg'

export default function MatchPage() {
  const user1 = {
    imageUrl: Ali,
    name: "홍길동"
  }

  const user2 = {
    imageUrl: Ali,
    name: "홍길동"
  }
  return (
    <>
      <Header title='스파링 결과' description='매칭된 상대와 대화를 나누어보세요' />
      <Matchup user1={user1} user2={user2} matchClass={"라이트 플라이"}/>
      <MatchDetail />
    </>
  )
}
// 라이브 경기 + 실시간 처리 or 라이브 경기 후 처리
