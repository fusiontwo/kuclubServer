### 실행 환경
- AWS EC2
- kuclubServer.js는 pm2로 실행
- noticeCronJob.js는 crontab 설정을 수정하여 실행
  
### kuclubServer.js
- express 서버
- Json Web Token(JWT)를 생성하고 검증함.
- 동아리 앱 자동 로그인 기능 구현을 위해 JWT를 사용하였음.
- firebase-admin 모듈, 서비스 계정 json 파일 필요함.
  (npm install firebase-admin 커맨드로 모듈 설치.)
### noticeCronJob.js
- Snapshot으로 현재 DB에 저장된 값을 읽어서, 마지막으로 저장된 공지사항 번호의 다음 번호부터 생성.
- 새로운 공지사항을 DB에 Insert 하며, 공지사항 등록 날짜는 'Asia/Seoul' 시간을 가공하여 사용함.
- firebase-admin 모듈, 서비스 계정 json 파일, firebase databaseURL을 사용하여, Firebase Realtime Database와 연동.
(firebaseURL의 경우, Firebase Realtime Database 상단의 URL을 적으면 됨.)

### noticeCronJob.js 함수 호출
- Crontab 설정 진입
crontab -e
- 진입한 파일에 설정 추가 및 저장
*/30 * * * * /usr/bin/node /home/ubuntu/server/noticeCronJob.js
