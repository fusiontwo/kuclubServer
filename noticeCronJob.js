const admin = require('firebase-admin');
const serviceAccount = require('./ku-club-management-firebase-adminsdk-ddg50-ce3372e1ca.json');
var moment = require('moment-timezone');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '{Firebase Realtime Database 주소를 입력하시오}'
});

const db = admin.database();
const noticeRef = db.ref('/KuclubDB/Notice');
console.log(noticeRef)

async function addNotice() {
  const snapshot = await noticeRef.once('value');
  const notices = snapshot.val();
  let noticeNum = 1;

  var today = moment().tz('Asia/Seoul');
  var year = today.format('YYYY');
  var month = today.format('MM');
  var day = today.format('DD');
  var dateString = year + '-' + month + '-' + day;

 if (notices) {
    const noticeKeys = Object.keys(notices);
    const lastNoticeKey = noticeKeys[noticeKeys.length - 1];
    const lastNotice = notices[lastNoticeKey];
    noticeNum = lastNotice.noticeNum + 1;
  }

  const newNotice = {
    noticeContent: "This is a scheduled notice content.",
    noticeDt: dateString,
    noticeNum: noticeNum,
    noticeTitle: "Scheduled Notice Title"
  };

  await noticeRef.child(noticeNum.toString()).set(newNotice);

  console.log('New notice added with number:', noticeNum);
}

addNotice().catch(console.error);