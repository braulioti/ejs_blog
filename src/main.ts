import * as path from 'path';

const express = require('express');
const app = express();

app.use('/assets', express.static(`${__dirname}/../views/default/assets`));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/../views/default'));

app.get('/', function (req, res) {
    res.render('index.ejs')
});

app.listen(3000, function () {
    console.log(`Blog.js listening on port 3000!`)
}).json
