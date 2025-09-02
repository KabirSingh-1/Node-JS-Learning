const http = require("http");
const fs = require("fs");
const url = require("url")
const myServer = http.createServer((req ,res) => {
    const log = `${Date.now()} : ${req.method}  ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt",log,(err ,data)=>{
        // res.end("Hello From Server");
        switch(myUrl.pathname){
            case '/': res.end("HomePage");
            break
            case '/about':
                const username = myUrl.query.myname;
                res.end(`I am ${username}`)
            break
            case '/singup':
                if(req.method === "GET") res.end("this is a singup Form");
                else if(req.method === "POST"){
                    res.end("Success")
                }
            default: res.end("404 Not Found")
        }
    });
});

myServer.listen(8000,()=> console.log("Server Started...."))
