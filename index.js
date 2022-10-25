const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const PORT = process.env.PORT || 3500;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const {originalname } = file;
    cb(null, originalname);
  }
})

const upload = multer({ storage: storage })

const app = express();

app.use(express.static('public')); 


//The word video === public/index.html name="video"
app.post('/upload', upload.single('video'), (req, res) => {
  return res.json({status: 'Ok'})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));