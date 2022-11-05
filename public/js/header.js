class Header{
	constructor (app,div){
		this.app = app;
		this.createHeader();
	}

	createHeader(){
		this.header = document.createElement('header');
		this.createLogo();
		this.createSearch();
		this.app.appendChild(this.header);
		this.header;
	}

	createLogo(){
		this.logo = document.createElement('img');
		this.logo.setAttribute('src', 'images/ico.svg');
		this.logo.setAttribute('id', 'logo-h');
		this.logo.addEventListener('click', (e) => {
			console.log('click');
			window.location.reload();
		});
		this.header.appendChild(this.logo);	
	}	
	createSearch(){
		this.search = new Search(this);
		this.header.appendChild(this.search.search);
	}

	swapDisplay(t){
		if (t){
			this.header.style.display = 'flex';
		}else{
			this.header.style.display = 'none';
		}
	}
}