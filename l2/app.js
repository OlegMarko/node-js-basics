const http = require('http');
const myModule = require('./module1');
const myModule2 = require('./module2');

const onRequest = (request, response) => {

    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write(myModule.myString);
    myModule.myFunction();
    myModule2.myFunction();
    console.log(myModule2.myString);
    response.end();
};

http.createServer(onRequest).listen(8000);