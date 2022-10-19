const express = require("express");
const cors = require("cors");
const app = express();
const socket = require("socket.io");
const {uuid} = require("uuidv4");

app.use(cors());
app.use(express.json());

PORT = 1030;

const server = app.listen(PORT, () =>
    console.log(`Server started on ${PORT}`)
);

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
//operations with file
const fs = require('fs');

async function appendFile(content) {
    try {
        await fs.appendFile('data.txt', content, error => {}); // add content to data.txt
    } catch (error) {
        console.log(error); // if error then console.log
    }
}
const WriteFile = (socketId,message) => {
    let now = new Date(Date.now());
    const info = `socketId: ${socketId} ${message} at ${now.toUTCString()} \n` // generate content
    appendFile(info);
}
io.on("connection", (socket) => {

    const matrix = new Array(10).fill("").map(() => new Array(4).fill(""));
    WriteFile(socket.id,'Connected')
    socket.on('Who', ()=> {
        console.log(`
            Автор: Сушко Діана,
            Група: К-25,
            Варіант: 5,
            Назва задачі: Електронна "дошка об'яв".
        `)
        WriteFile(socket.id, 'successfully send emit to "Who"')
    })
    socket.on("addToMatrix", ({row,column,value,priority}) => {
        matrix[row][column] = {
            priority,
            desc:value,
        };
        WriteFile(socket.id,'send emit to "addToMatrix"')
        io.to(socket.id).emit("newMatrix", matrix);
    });

    socket.on("removeFromMatrix", ({row,column}) => {
        matrix[row][column] = "";
        WriteFile(socket.id,'send emit to "removeFromMatrix"')
        io.to(socket.id).emit("newMatrix", matrix);
    });

    socket.on("updateMatrix", ({r1,c1,r2,c2}) => {
        //swap two array elements
        if(r1<0 || r2<0 || c1<0||c2 <0 || r1> 2 || r2>2 || c1>2 || c2>2) return;
        //[a,b] = [b,a];
        [matrix[r1][c1],matrix[r2][c2]] = [matrix[r2][c2], matrix[r1][c1]];
        WriteFile(socket.id,'send emit to "updateMatrix"')
        io.to(socket.id).emit("newMatrix", matrix);
    });

    socket.on("updateMatrixColumns", ({r1,c1,r2,c2}) => {
        //string to int
        r1 = parseInt(r1);
        r2 = parseInt(r2);
        c1 = parseInt(c1);
        c2 = parseInt(c2);
        // in a case of over array(mini loop)
        if(c1<0) c1 = 2;
        if(c2<0) c2 = 2;
        if(c1>2) c1 = 0;
        if(c2>2) c2 = 0;

        //when program cannot work
        if(r1<0 || r2<0 || c1<0||c2 <0 || r1> 2 || r2>2 || c1>2 || c2>2) return;

        if(matrix[r2][c2] == ""){
            matrix[r2][c2]=matrix[r1][c1];
            matrix[r1][c1] = "";
        }
        else if(r2-1 >=0 && matrix[r2-1][c2]==""){
            matrix[r2-1][c2]=matrix[r1][c1];
            matrix[r1][c1] = "";
        }
        else if (r2+1 <=2 && matrix[r2+1][c2]==""){
            matrix[r2+1][c2]=matrix[r1][c1];
            matrix[r1][c1] = "";
        }
        for(let i=0;i<=2;i++){
            if(matrix[i][c2]==""){
                matrix[i][c2]=matrix[r1][c1];
                matrix[r1][c1] = "";
            }
        }
        WriteFile(socket.id,'send emit to "updateMatrixColumns"')
        io.to(socket.id).emit("newMatrix", matrix);
    });
});
