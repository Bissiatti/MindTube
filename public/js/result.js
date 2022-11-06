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
		this.createTumnail();
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
}