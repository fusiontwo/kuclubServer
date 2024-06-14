const admin = require('firebase-admin');
const express = require('express');
const serviceAccount = require('./ku-club-management-firebase-adminsdk-ddg50-5000ecf75a.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());

app.get('/login', (req, res) => {
    res.send('<h1>Kuclub 토큰 생성 서버</h1>');
});

app.get('/verifyToken', (req, res) => {
    res.send('<h1>Kuclub 토큰 검증 서버</h1>');
});

// Create JWT
app.post('/login', async (req, res) => {
    const { userId } = req.body;
    console.log('Received login request:', userId);

    try {
        const customToken = await admin.auth().createCustomToken(userId);
        console.log('Sent login response to client');
        res.json({ token: customToken });
    } catch (error) {
        console.log('Error creating custom token:', error);
        res.status(500).send('Internal server error');
    }
});

// Verify JWT
app.post('/verifyToken', async (req, res) => {
    const { token } = req.body;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Please give the JWT' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        console.log(uid);
        req.user = uid;
        res.json({ message: 'Valid JWT' });
        console.log('Sent verifyToken response to client');
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid JWT' });
    }
});

// 서버에게 ID 토큰을 전송하는 엔드포인트 정의
app.post('/sendIdToken', async (req, res) => {
    // 클라이언트로부터 받은 ID 토큰 처리
    const { idToken } = req.body;

    // 예: ID 토큰을 출력하여 확인
    console.log('Received ID token from client:', idToken);

    // 클라이언트에게 응답 반환
    res.json({ success: true, message: 'Received ID token successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});