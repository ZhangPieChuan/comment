const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // this is used for parsing the JSON object from POST
app.use(express.static(__dirname + '/public'));

let commentMap = {};

app.post('/comments',(req,res)=>{
    const comments = req.body.comments;
    commentMap = comments;
    console.log(commentMap);
    res.send(commentMap);

    //todo: log data to database like mongodb,mysql

})
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
