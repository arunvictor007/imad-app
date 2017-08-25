var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var pageOne={
    title:'Welcome to Page One',
    heading:'Page One(P-1)',
    date:'August 25, 2017',
    content:`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <br>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
};

function createTemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;

var htmlTemplate= `<html>
    <head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width=device-width, intial-scale=1" />
   <link rel="stylesheet" href="/ui/style.css" />
    </head>
<body>
    
        <a href="/"> Return Home</a>
            <hr>
            <h1>${heading}</h1>
            <br>
            <h3>${date}</h3>
        <div class="container">
            ${content}
        </div>
        
</body>
</html>`;
return htmlTemplate;}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/page-one', function(req,res)
{
    res.send(createTemplate(pageOne));
});

app.get('/page-three', function(req,res)
{
    res.sendFile(path.join(__dirname, 'ui', 'page-three.html'));
});
app.get('/page-two', function(req,res)
{
    res.sendFile(path.join(__dirname, 'ui', 'page-two.html'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
