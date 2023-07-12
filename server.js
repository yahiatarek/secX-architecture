const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { getLinesArray, getPassOneAddress, getPassOneAddressSicxe } = require('./read-file');
const { getObjectCode } = require('./op-codes');
const { getHteRecord } = require('./hte-record');

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
    passOneAddressesArray: [],
    objectCodeArray: [[],[]],
    hteRecord: [],
    passOneAddressesArraySicxe: []
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
        passOneAddressesArray: [],
        objectCodeArray: [[],[]],
        hteRecord: [],
        passOneAddressesArraySicxe: []
      });
    } catch (err) {
      console.log(err)
    }
  });
});

app.get('/passone', (req, res)=> {
  fs.readdir('uploads', (err, files) => {
    try {
      files = files.map(file => {
        const filePath = path.join('uploads', file);
    
        const stats = fs.statSync(filePath);
        const mtime = stats.mtime.getTime();
    
        return { file, mtime };
      }).sort((a, b) => b.mtime - a.mtime);

      if (files.length > 0) {
        const filePath = path.join('uploads', files[0].file);
        fs.readFile(filePath, 'utf8', (err, data) => {
          res.render('index', {
            linesArray: getLinesArray(data),
            passOneAddressesArray: getPassOneAddress(data),
            objectCodeArray: [[],[]],
            hteRecord: [],
            passOneAddressesArraySicxe: []
          });
        })
      }
    } catch (err) {
      console.log(err)
    }
  })
})

app.get('/passonesicxe', (req, res)=> {
  fs.readdir('uploads', (err, files) => {
    try {
      files = files.map(file => {
        const filePath = path.join('uploads', file);
    
        const stats = fs.statSync(filePath);
        const mtime = stats.mtime.getTime();
    
        return { file, mtime };
      }).sort((a, b) => b.mtime - a.mtime);

      if (files.length > 0) {
        const filePath = path.join('uploads', files[0].file);
        fs.readFile(filePath, 'utf8', (err, data) => {
          res.render('index', {
            linesArray: getLinesArray(data),
            passOneAddressesArray: [],
            objectCodeArray: [[],[]],
            hteRecord: [],
            passOneAddressesArraySicxe: getPassOneAddressSicxe(data)
          });
        })
      }
    } catch (err) {
      console.log(err)
    }
  })
})

app.get('/objectcode', (req, res)=> {
  fs.readdir('uploads', (err, files) => {
    try {
      files = files.map(file => {
        const filePath = path.join('uploads', file);
    
        const stats = fs.statSync(filePath);
        const mtime = stats.mtime.getTime();
    
        return { file, mtime };
      })

      if (files.length > 0) {
        const filePath = path.join('uploads', files[0].file);
        fs.readFile(filePath, 'utf8', (err, data) => {
          res.render('index', {
            linesArray: getLinesArray(data),
            passOneAddressesArray: getPassOneAddress(data),
            objectCodeArray: getObjectCode(data, getPassOneAddress(data)),
            hteRecord: [],
            passOneAddressesArraySicxe: getPassOneAddressSicxe(data)
          });
        })
      }
    } catch (err) {
      console.log(err)
    }
  })
})

app.get('/hterecord', (req, res)=> {
  fs.readdir('uploads', (err, files) => {
    try {
      files = files.map(file => {
        const filePath = path.join('uploads', file);
    
        const stats = fs.statSync(filePath);
        const mtime = stats.mtime.getTime();
    
        return { file, mtime };
      })

      if (files.length > 0) {
        const filePath = path.join('uploads', files[0].file);
        fs.readFile(filePath, 'utf8', (err, data) => {
          res.render('index', {
            linesArray: getLinesArray(data),
            passOneAddressesArray: getPassOneAddress(data),
            objectCodeArray: getObjectCode(data, getPassOneAddress(data)),
            hteRecord: getHteRecord(data)
          });
        })
      }
    } catch (err) {
      console.log(err)
    }
  })
})

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
