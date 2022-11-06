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
						this.H.swapDisplay(true);
						this.sendResult(data.title,data.result);
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

	sendResult(title,data){
		this.app.innerHTML = "";
		this.r = document.createElement('div');
		this.r.classList.add('result');
		this.app.style.display = 'none';
		document.querySelector("#app").appendChild(this.r);
		this.result = new Result(this.r,this.search.value.split("=")[1]);
		this.result.createTitle(title);
		this.result.createData(data);
	}
}