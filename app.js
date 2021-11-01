const http = require('http');
const fs = require('fs');
const mammoth = require("mammoth");
//const app = require('./app');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;


app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

// for demo
app.get('/upload-file', (req, res) => {
    mammoth.convertToHtml({path: './uploads/Demo.docx'})
                .then(function(result){
                    let html = result.value; // The generated HTML
                    let messages = result.messages; // Any messages, such as warnings during conversion
    
                    //send response
                    res.send({
                        html: html
                    });
                }).done();

});
/*
app.post('/upload-file', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);
            
            // convert file to html
            mammoth.convertToHtml({path: './uploads/' + avatar.name})
            .then(function(result){
                let html = result.value; // The generated HTML
                let messages = result.messages; // Any messages, such as warnings during conversion

                //send response
                res.send({
                    html: html
                });
            }).done();
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
*/

//http.createServer(app).listen(process.env.PORT);