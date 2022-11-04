class App{
	constructor(){

		this.app = document.getElementById('app');

		this.createTitle();
		this.s = new Search()
		this.s.appendSearch(app);
	}

	createTitle(){
		this.logo = document.createElement('img');
		this.logo.setAttribute('src', 'images/ico.svg');
		this.logo.setAttribute('id', 'logo');
		
		this.titleDiv = document.createElement('div');
		this.titleDiv.setAttribute('id', 'titleDiv');
		this.title = document.createElement('h1');
		this.title.setAttribute('id', 'title');
		this.title.innerHTML = 'MindTube';
		this.titleDiv.appendChild(this.logo);
		this.titleDiv.appendChild(this.title);
		this.app.appendChild(this.titleDiv);
	}
}

a = new App();