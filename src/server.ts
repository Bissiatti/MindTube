import {app} from './app'
const express = require('express');


const port = process.env.PORT || 3000

app.set('port', port);
app.use(express.static('public'))

const server = app.listen(app.get('port'), function () {
	console.log(`App listening on port ${port}`);
  });

process.on("SIGINT",()=>{
	server.close()
	console.log("\nEnd server")
})