const fs = require("fs");
    const http = require("http");
    const index= fs.readFileSync("index.html","utf-8");

    const nums =[0,1,2,3,4,5,6,7,8,9];
 
    const replaceVal = (tempval,orgval,rn)=>{
        let question = tempval.replace("{%tempval%}",orgval[rn].question);
        question = question.replace("{%tempoption1%}",orgval[rn].options[0]);
        question = question.replace("{%tempoption2%}",orgval[rn].options[1]);
        question = question.replace("{%tempoption3%}",orgval[rn].options[2]);
        question = question.replace("{%tempoption4%}",orgval[rn].options[3]);
        question = question.replace("{%tempans%}",orgval[rn].answer);
        question = question.replace("{%checkans%}",orgval[rn].anscheck);
        return question;
    }
    const server = http.createServer((req,res)=>{
        if(req.url=="/"){
               fs.readFile("ques.json","utf-8",(err,data)=>{
                const q1 = Math.floor(Math.random()*10);
                nums.splice(q1,1);
                console.log(q1);
                const objdata = JSON.parse(data);
                const arrdata = [objdata];
                const qus = objdata[q1].question;
                //res.writeHead(404,{"Content-type":"text/html"});
                console.log(qus);
              //  res.end(`<h1>${qus}</br>1.)${objdata[q1].options[0]}</br>2.)${objdata[q1].options[1]}</br>3.)${objdata[q1].options[2]}</br>4.)${objdata[q1].options[3]}</h1>`);
             const realvalue= arrdata.map((val => replaceVal(index,val,q1))).join("");
             res.write(realvalue);
             res.end();
        })
        }
        
    });

        server.listen(5000,"127.0.0.1",()=>{
            console.log("listening to the port no 5000");
        })