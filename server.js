var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config=
{
    host:'db.imad.hasura-app.io',
    port:'5432', 
    user:'arunvictor007',
    password:process.env.DB_PASSWORD,
    database:'arunvictor007'
};
var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
   pool.query('SELECT * FROM test',function(err,result)
   {
       if(err)
       {
           res.status(500).send(err.toString());
       }else
       {
           res.send(JSON.stringify(result));
       }
   }); 
});

var app = express();
app.use(morgan('combined'));
var pages={
    'page-one':{
    title:'Welcome to Page One',
    heading:'Page One',
    date:'August 25, 2017',
    content:`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <br>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
},
    'page-two':{
        title:'Page Two',
    heading:'Page Two',
    date:'August 26, 2017',
    content:`<p>This is the second Page</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            `
    },
    'page-three':{title:'Page Three',
    heading:'Page Three',
    date:'August 27, 2017',
    content:`<p>Third Page</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>`}
 
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
        <div class="container">
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

app.get('/:pageNumber', function(req,res)
{
    var pageNumber=req.params.pageNumber;
    res.send(createTemplate(pages[pageNumber]));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
