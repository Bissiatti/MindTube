class App{
	constructor(){

		this.app = document.getElementById('app');
		this.mainDiv = document.createElement('div');
		this.mainDiv.setAttribute('id', 'mainDiv');

		this.header = new Header(app, this.mainDiv);
		this.createTitle();
		this.header.swapDisplay();
		this.s = new Search(this.header, this.mainDiv);
		this.s.appendSearch();

		//this.mainDiv.style.display = 'none';

	}

	createTitle(){
		this.logo = document.createElement('img');
		this.logo.setAttribute('src', 'images/ico.svg');
		this.logo.addEventListener('click', (e) => {
			console.log('click');
			window.location.reload();
		});
		this.logo.setAttribute('id', 'logo');
		
		this.titleDiv = document.createElement('div');
		this.titleDiv.setAttribute('id', 'titleDiv');
		this.title = document.createElement('h1');
		this.title.setAttribute('id', 'title');
		this.title.innerHTML = 'MindTube';
		this.titleDiv.appendChild(this.logo);
		this.titleDiv.appendChild(this.title);
		this.mainDiv.appendChild(this.titleDiv);
		this.app.appendChild(this.mainDiv);
	}
}

a = new App();


// fetch("/api/play/:id/:time")