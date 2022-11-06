// get tumblemail by youtube id and send to client
class Result{
	constructor(app, id){
		this.app = app;
		this.id = id;
		this.createResult();
	}

	createResult(){
		this.createSideBar();
	}

	createSideBar(){
		this.sideBar = document.createElement('div');
		this.sideBar.classList.add('sideBar');
		this.app.appendChild(this.sideBar);
		this.createVideo(0);
	}

	createTumnail(){
		this.tumb = document.createElement('img');
		this.tumb.setAttribute('src', 'http://img.youtube.com/vi/' + this.id + '/0.jpg');
		this.tumb.setAttribute('id', 'tumb');
		this.sideBar.appendChild(this.tumb);
	}

	createTitle(title){
		this.title = document.createElement('h3');
		this.title.setAttribute('id', 'videoTitle');
		this.title.innerHTML = title;
		this.sideBar.appendChild(this.title);
	}

	createData(data){
		this.data = document.createElement('div');
		this.data.setAttribute('id', 'data');
		this.app.appendChild(this.data);
		this.data.innerHTML = data;
	}

	createScript(script){
		this.script = document.createElement('script');
		this.script.setAttribute('type', 'text/javascript');
		this.script.innerHTML = script;
		console.log(this.script);
		this.app.appendChild(this.script);
	}

	createVideo(time){
		this.video = document.createElement('iframe');
		this.video.setAttribute('src', 'https://www.youtube.com/embed/' + this.id + '?start'+time);
		this.video.setAttribute('id', 'video');
		this.sideBar.appendChild(this.video);
	}
}