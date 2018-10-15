const express=require('express');
const readline = require('readline');
const app=express();
const fs=require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('enter path of directory where the file is present : ', (answer) => {
   
    let storage;
    let data=0;
    if(answer==''|| answer==null){
        console.log('empty path');
    }
   fs.readdir(answer,(err,files)=>{
        if(err){
            console.log('no directory found');
            }
        else if(files==null||files==undefined||files==''){
            console.log('directory does not have any file');
            }
        else
            {
            storage=files;
        for(let file of storage){
            console.log("["+data+"] "+file);
            data++;
            }
    rl.question('enter the serial number of the file to be copied :', (number) => {
        if(storage[number]==undefined){
            console.log('file number is not valid')
        }
        else{
        rl.question('enter the path of the destination directory :', (destination) => {
            fs.readdir(destination,(err,file)=>{
                if(err){
                    console.log("no destination path found");
                    }
                else{
                    readfile=fs.createReadStream(answer+'/'+storage[number]);
                    let writeStream=fs.createWriteStream(destination+'/'+storage[number])
                    readfile.on('data',(chunk)=>{
                        writeStream.write(chunk);
                    });
                   
                    readfile.on('end',()=>{
                        writeStream.end();
                        console.log('file is copied, check file in directory');
                    });
                }
            })  
        });
    }
    })
}
});
});
app.listen(3001);
