const express = require('express');
const app = express();

const {spawn} = require("child_process")


// // set localhost

// app.set('port', 3000);
// app.use(express.static('public'))

// app.listen(app.get('port'), function () {
//   console.log("App listening on port 3000!");
// });


// app.get('/:data',function(req,res){
//   const routeParams = req.params;
//   var data = routeParams.data;
  
//   const python = spawn('python',["calculate.py",data]);

//   python.stdout.on('data',(data)=>{
//     res.send(data);
//   })

//   python.stderr.on("data",(error)=>{
//     console.error("stderr: " + error)
//   })
  
// })


var data = "21, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0.2, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0, 0, 0, 0, 0, 0"

const python = spawn('python',["calculate.py",data]);

python.stdout.on('data',(data)=>{
  console.log('stdout: ' + data)
  data[0]
})

python.on('close',(code)=>{
  console.log("exit: " + code)
})

python.stderr.on("data",(error)=>{
  console.error("stderr: " + error)
})