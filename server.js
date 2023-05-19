const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { getLinesArray, getPassOneAddress } = require('./read-file');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the path for views
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.get('/', (req, res) => {
  res.render('index', {
    linesArray: [],
    passOneAddressesArray: []
  });
});

app.post('/uploadFile', upload.single('file'), (req, res) => {
  // Get the path of the uploaded file
  const fileRead = req.file.path;

  // Read the contents of the file
  fs.readFile(fileRead, 'utf8', (err, data) => {
    try {
      res.render('index', {
        linesArray: getLinesArray(data),
        passOneAddressesArray: getPassOneAddress(data)
      });
    } catch (err) {
      console.log(err)
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});