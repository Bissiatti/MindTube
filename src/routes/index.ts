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


function readHTML(){
	let fileContent = fs.readFileSync(result_html, 'utf8');
	let body = fileContent.split("<body>")[1].split("</body>")[0]
	return body
}

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

		python.stdout.on('data',(data: any)=>{
			let graph : string = readHTML()
			res.send({'result': graph, 'title': title})
		// 	res.sendFile('graph.html', {
		// 		root: path.join(__dirname, './')
		// }	)
		})
		
		python.on('close',(code: any)=>{
			console.log("exit: " + code)
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