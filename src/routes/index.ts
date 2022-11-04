import { Router } from "express";

export const router = Router()

router.get('/',(req,res)=>{
	console.log("yes")
})

router.get('/api/search/:data',(req,res)=>{
	console.log(req)
	res.send({"test":"test"})
})