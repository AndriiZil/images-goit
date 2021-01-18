const express = require('express');
const multer = require('multer');
const path = require('path');
const logger = require('morgan');

const { minifyImage } = require('./compress-image');
const { uploadGoogle } = require('./upload-google');

const app = express();

const storage = multer.diskStorage({
    destination: 'draft',
    filename: function (req, file, cb) {
      const ext = path.parse(file.originalname).ext;
      cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})
   
const upload = multer({ storage });

app.use(logger('dev'));
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.send('ok');
});

app.post('/image', upload.single('avatar'), minifyImage, (req, res) => {
    console.log(req.body);

    res.send('ok');
});

app.post('/upload-google', async (req, res) => {
    try {
        const bucketName = '';
        const filePath = './static/avatar-1610994915054.jpeg';

        const data = await uploadGoogle(bucketName, filePath);

        return res.json({ success: true, data });
    } catch(err) {
        console.error(err);
    }
});

app.listen(3000, () => {
    console.log('Server was started.');
});
