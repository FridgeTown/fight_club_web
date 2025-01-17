# FightClub Web
스트리밍 송출용 웹 페이지입니다. 
## install
```
## 설치 (package-lock.json 파일 기반 패키지 의존성 보존)
$ npm ci
## 설치 (package-lock.json 무관하게 package.json 기준으로 package-lock.json 생성)
$ npm install
```
### dev
```
## 개발환경
$ npm run dev
```
### build
```
## build 파일 생성 (dist 파일이 생성됨)
$ npm run build
```
```
## aws 서버에 dist 파일 복사
1. [aws ec2 인스턴스] - [인스턴스 ID] - [네트워킹] - [보안그룹] - [인바운드 규칙] - [인바운드 규칙 편집]
2. SSH 소스 IP 주소에 본인 IP 주소 추가
3. SSH 접속 ssh -i {보안키페어.pem} ubuntu@{퍼블릭 IPv4 주소 또는 퍼블릭 IPv4 DNS}
ex)
$ ssh -i ~/.ssh/aws_key_pair.pem ubuntu@<AWS_PUBLIC_IP>
3-1. 보안 키 permission denied 같이 막히면 권한 수정해줘야 할 수도?
$ chmod 400 ~/.ssh/aws_key_pair.pem
4. SSH 접속 완료 후 ls 입력하면 dist 파일 있음 그거 삭제하고 새로 만들어진 dist 폴더로 교체해주면 됨
$ scp -r ./dist/ ubuntu@<AWS_PUBLIC_IP>:/home/ubuntu/
```
