// get tumblemail by youtube id and send to client
class Result{
	constructor(app, id){
		this.app = app;
		this.id = id;
		this.createResult();
	}

	createResult(){
		this.result = document.createElement('div');
		this.result.classList.add('result');
		this.app.appendChild(this.result);
		this.createTumnail();
		this.createTitle();
	}


	createTumnail(){
		this.tumb = document.createElement('img');
		this.tumb.setAttribute('src', 'http://img.youtube.com/vi/' + this.id + '/0.jpg');
		this.tumb.setAttribute('id', 'tumb');
		this.result.appendChild(this.tumb);
	}

	createTitle(){
		// fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + this.id + "&key=" + ytApiKey, function(data) {
		// 	alert(data.items[0].snippet.title);
		//   })

		// fetch('http://localhost:3000/api/serach/' + this.search.value, {
		// 	method: 'GET',
		// }).then
		// (response => response.json()).then(data => {
		// 	console.log(data);
		// });
		this.loadInfo(this.id);
	}

	loadInfo(videoId) {
		var gdata = document.createElement("script");
		gdata.src = "http://gdata.youtube.com/feeds/api/videos/" + videoId + "?v=2&alt=jsonc&callback=storeInfo";
		this.title = document.createElement('div');
		this.title.setAttribute('id', 'tumb');
		this.title.innerHTML = gdata.src;
		console.log(gdata);
		this.result.appendChild(this.title);
	};
	
	storeInfo(info) {
		console.log(info.data.title);
	};


}