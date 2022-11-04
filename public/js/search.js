class Search{
	constructor(){
		this.search = document.createElement('input');
		this.search.setAttribute('type', 'text');
		this.search.setAttribute('placeholder', 'Cole aqui o link do vídeo');	
		this.search.setAttribute('id', 'search');

	}

	appendSearch(app){
		app.appendChild(this.search);
	}
}