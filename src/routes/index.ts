import { Router } from "express";
const {spawn} = require('child_process');
import axios from 'axios';
const path = require('path')
import * as fs from 'fs';

const url:string = "https://www.youtube.com/watch?v="
const AxiosInstance = axios.create();

export const router = Router()

const result_html = "text_network.html"

router.get('/',(req,res)=>{
	console.log("yes")
})


router.get("/graph",(req,res)=>{
	res.sendFile('graph.html', {
        root: path.join(__dirname, './')
    })
})

router.get('/api/video/:data',(req,res)=>{
	let data: string = req.params.data
	//console.log(str)

	AxiosInstance.get(url + data).then((response: any)=>{
		const html = response.data;
		let title:string = html.match(/(?<=<title>)(.*)(?=<\/title>)/g);
		title = title[0].replace(" - YouTube", "");
	
		return title;
	}).then((title:string)=>{
		const python = spawn('python',["calculate.py",data,title]);
		console.log("python")
		
		python.stdout.on('data',(data: any)=>{
			return
		})
		
		python.on('close',(code: any)=>{
			console.log("exit: " + code)
			fs.readFile(result_html, 'utf8', (err, data) => {
				console.log(err)
				console.log(data)
				res.send({'result': data, 'title': title})
			});
		})
	
		python.stderr.on("data",(error: any)=>{
			console.error("stderr: " + error)
		})
	})

})

router.get('/api/play/:id/:time',(req,res)=>{
	let id: string = req.params.id
	let time: string = req.params.time
	res.send({'id': id, 'time': time})
})