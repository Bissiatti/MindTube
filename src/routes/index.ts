import { Router } from "express";
const {spawn} = require('child_process');
import axios from 'axios';

const url:string = "https://www.youtube.com/watch?v="
const AxiosInstance = axios.create();

export const router = Router()

router.get('/',(req,res)=>{
	console.log("yes")
})

router.get('/api/video/:data',(req,res)=>{
	let data: string = req.params.data
	//console.log(str)

	AxiosInstance.get(url + 'Mm2eYfj0SgA').then((response: any)=>{
		const html = response.data;
		let title:string = html.match(/(?<=<title>)(.*)(?=<\/title>)/g);
		title = title[0].replace(" - YouTube", "");
	
		return title;
	}).then((title:string)=>{
		const python = spawn('python',["calculate.py",data,title]);

		python.stdout.on('data',(data: any)=>{
		  res.send({'result': String(data), 'title': title})
		})
		
		python.on('close',(code: any)=>{
		  console.log("exit: " + code)
		})
	
		python.stderr.on("data",(error: any)=>{
			console.error("stderr: " + error)
		})
	})

})


// // Send an async HTTP Get request to the url
// AxiosInstance.get(url + 'ZjM8Wq5pQ2o')
//   .then( // Once we have data returned ...
//     response => {
//       const html = response.data; // Get the HTML from the HTTP request
//       const $ = cheerio.load(html); // Load the HTML string into cheerio
// 	  console.log(html)
//     //   const statsTable: any = $('.statsTableContainer > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
//     //   console.log(statsTable); // Log the number of captured elements
//     }
//   )
//   .catch(console.error); // Error handling