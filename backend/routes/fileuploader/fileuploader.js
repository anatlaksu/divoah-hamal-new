'use strict';
const express = require('express');
const router = express.Router()
const {upload} = require('../../helpers/filehelper');
const {singleFileUpload, multipleFileUpload,
     getallSingleFiles, getallMultipleFiles, downloadFile,getallFiles,findfile} = require('../../controllers/fileuploader/fileuploader');

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);
router.get('/downloadFile', downloadFile);
router.get('/getfile', getallFiles);
router.get('/file/:id', findfile);
//new


module.exports = router