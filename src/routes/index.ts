import { Router } from "express";
const {spawn} = require('child_process');

var getYoutubeTitle : any = require('get-youtube-title')

export const router = Router()

router.get('/',(req,res)=>{
	console.log("yes")
})

router.get('/api/video/:data',(req,res)=>{
	let data: string = req.params.data
	//console.log(str)
	const python = spawn('python',["calculate.py",data]);

	python.stdout.on('data',(data: any)=>{
	  console.log('stdout:' + data)
	  res.send({'result': String(data)})
	})
	
	python.on('close',(code: any)=>{
	  console.log("exit: " + code)
	})

	python.stderr.on("data",(error: any)=>{
		console.error("stderr: " + error)
	})
})