class Search{
	constructor(H){
		this.search = document.createElement('input');
		this.search.setAttribute('type', 'text');
		this.search.setAttribute('placeholder', 'Cole aqui o link do vídeo');	
		this.search.classList.add('search');
		this.H = H;
		this.app = document.querySelector("#mainDiv");
		this.sendSearch();

	}

	appendSearch(){
		this.app.appendChild(this.search);
	}
	
	sendSearch(){
		this.search.addEventListener('keypress', (e) => {
			if(e.key == 'Enter'){
				if(this.search.value.indexOf('=') != -1 && this.search.value.indexOf('youtube') != -1){
					fetch('http://localhost:3000/api/video/' + this.search.value.split("=")[1], {
						method: 'GET',
					}).then
					(response => response.json()).then(data => {
						document.querySelector("#mainDiv").innerHTML = data.result;
						this.H.swapDisplay(true);
						this.sendResult();
					});
				}else if(this.search.value.indexOf('http') == -1){
					fetch('http://localhost:3000/api/serach/' + this.search.value, {
						method: 'GET',
					}).then
					(response => response.json()).then(data => {
						console.log(data);
					});
				}else{
					document.querySelector("#mainDiv").innerHTML = "Sem resultados, tente novamente";
					this.H.swapDisplay(true);
				}
			}
		});
	}

	sendResult(){
		this.result = new Result(document.querySelector("#mainDiv"),this.search.value.split("=")[1]);
	}
}