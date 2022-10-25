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
    cb(null, originalname); //save just with the name of the file
    //cb(null, `${uuid()}-${originalname}`); //save unique id + file name
  }
})

const upload = multer({ storage: storage })

const app = express();

app.use(express.static('public')); 


//The word video === public/index.html name="video"
app.post('/upload', upload.array('video'), (req, res) => {
  return res.json({status: 'Ok'
  // , uploaded: req.files.length //Comment out to upload multiple files
})
})

// If we want to add multiple files change upload.single for upload.array and check note in index.html

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));