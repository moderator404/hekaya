require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// ─── التحقق من الربط ───
app.post('/api/order', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'لم يتم الربط' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ 
            success: true, 
            message: 'سيتم إنشاء روم الدعم في الديسكورد' 
        });
    } catch (error) {
        res.status(401).json({ error: 'رابط الديسكورد غير صالح' });
    }
});

app.listen(3000, () => console.log('الخادم يعمل على البورت 3000'));