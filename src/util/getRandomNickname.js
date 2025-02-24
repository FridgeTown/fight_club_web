const adjectives = [
  '행복한', '친절한', '빠른', '예쁜', '맑은', '게으른',
  '슬픈', '착한', '느린', '멋진', '흐린', '부러운',
  '기쁜', '똑똑한', '날쌘', '잘생긴', '쾌청한', '졸린',
  '화난', '용감한', '민첩한', '귀여운', '따뜻한', '무서운',
  '부끄러운', '게으른', '느릿느릿한', '깜찍한', '시원한', '안타까운',
  '신나는', '부지런한', '우아한', '우스운', '추운', '끈질긴',
  '차분한', '성실한', '힘찬', '날씬한', '더운', '시끄러운',
  '떨리는', '진지한', '가벼운', '통통한', '바람부는', '조용한',
  '설레는', '유쾌한', '무거운', '둥근', '고요한', '놀라운',
  '애달픈', '재밌는', '둔한', '길쭉한', '웅장한', '이상한',
  '귀여운', '엉뚱한', '반짝이는', '신비로운', '특별한',
  '사랑스러운', '소심한', '빛나는', '아름다운', '익숙한',
  '미운', '대담한', '어두운', '평화로운', '서툰',
  '자랑스러운', '활발한', '화려한', '눈부신', '달리기좋은',
  '뿌듯한', '정직한', '단정한', '청명한', '너그러운',
]

const nouns = [
  '토끼', '앵무새', '호랑이', '비둘기', '문어', '잠자리', '말',
  '판다', '미어캣', '늑대', '까치', '오징어', '반딧불이', '소',
  '땃쥐', '두더지', '곰', '펭귄', '가오리', '메뚜기', '염소',
  '알파카', '바다코끼리', '여우', '백조', '해파리', '벌', '양',
  '다람쥐', '아르마딜로', '표범', '갈매기', '바다거북', '개미', '거위',
  '고양이', '나무늘보', '치타', '까마귀', '물개', '귀뚜라미', '칠면조',
  '강아지', '고라니', '퓨마', '플라밍고', '바다사자', '거미', '당나귀',
  '햄스터', '가젤', '재규어', '공작', '조개', '딱정벌레', '라마',
  '너구리', '영양', '들소', '벌새', '새우', '풍뎅이', '알파카',
  '고슴도치', '무스', '코뿔소', '두루미', '전복', '하늘소', 
  '코알라', '이리', '하이에나', '앵무새', '성게', '하루살이', 
  '족제비', '코요테', '바다사자', '오리', '흰동가리', '나방', 
  '기니피그', '바이슨', '북극곰', '돌고래', '나비', '닭', 
  '페럿', '카리부', '독수리', '고래', '무당벌레', '오리', 
  '수달', '사자', '참새', '상어', '사마귀', '돼지'
];

const getRandomNickname = () => `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} ${Math.floor((Math.random() * 1000))}`;
export default getRandomNickname;
