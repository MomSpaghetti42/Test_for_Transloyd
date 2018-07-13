class ReposCard {

	constructor(name, language, url) {
		this.name = name;
		this.language = language;
		this.url = url;
	}

	render() {
		let  repos_block = document.createElement('div');
		repos_block.onclick = () => { this.showRep() };
		repos_block.innerHTML = '<div class="repos-card"><span>'+this.name+'</span><span>'+this.language+'</span></div>';
		return(repos_block);
	}

	async showRep() {
		document.getElementById('repos-section').innerHTML = null;
  	let reposElement = document.createElement('div');
  	reposElement.className = "repos";
		let response = await fetch(this.url);
		let repos = await response.json();
		reposElement.innerHTML = 
			'<span class="repos__name">'+repos.name+'</span>'
			+'<input type="text" value="'+repos.clone_url+'" readonly>'
			+'<span>Full name: '+repos.full_name+'</span>'
			+'<span>Description: '+repos.description+'</span>'
			+'<span>Date of create: '+repos.created_at+'</span>'
			+'<span>Language: '+repos.language+'</span>'
			+'<div class="repos__issues">'
			+'<span>Issues: '+repos.open_issues+'</span>'
			+'<span>Forks: '+repos.forks_count+'</span>'
			+'</div>'
			+'<span>Login</span>'
			+'<input id="login" type="text">'
			+'<span>Password</span>'
			+'<input id="pass" type="password">';
		let fork_button = document.createElement('div');	
		fork_button.onclick = () => { this.Fork() };
		fork_button.innerHTML = '<button>Fork</button>';
		reposElement.appendChild(fork_button);	
		document.getElementById('repos-section').appendChild(reposElement);											
	}

	async Fork() {
		let login = document.getElementById('login');
		let pass = document.getElementById('pass');
		if (login.value == '' || pass.value == '') {
			alert('Enter the data');
		}
		else {
			let response = await fetch(this.url);
			let repos = await response.json();
			let fork = await fetch('https://api.github.com/repos/'+repos.owner.login+'/'+repos.name+'/forks',{
				method: 'POST',
				headers: {"Authorization": "Basic " + btoa(login.value + ":" + pass.value)},
			});
			let forkJson = await fork.json();
			console.log(forkJson);
			forkJson.message == "Bad credentials" ? alert('Bad credentials') : alert('Successful fork');
		}
	}
}