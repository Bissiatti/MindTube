class Search{
	constructor(){
		this.search = document.createElement('input');
		this.search.setAttribute('type', 'text');
		this.search.setAttribute('placeholder', 'Cole aqui o link do vídeo');	
		this.search.setAttribute('id', 'search');

		this.sendSearch();

	}

	appendSearch(app){
		app.appendChild(this.search);
	}
	
	sendSearch(){
		this.search.addEventListener('keypress', (e) => {
			if(e.key == 'Enter'){
				console.log(this.search.value);
				fetch('http://localhost:3000/api/search/' + this.search.value, {
					method: 'GET',
				}).then
				(response => response.json()).then(data => {
					console.log(data);
				});
			}
		});
	}
}