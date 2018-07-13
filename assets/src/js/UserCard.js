class UserCard {

  constructor(login, avatar, url, repos_url) {
    this.login = login;
    this.avatar = avatar;
    this.url = url;
    this.repos_url = repos_url;
  }

  render() {
	  let  user_card = document.createElement('div');
	  user_card.onclick = () => { this.showUser() };
	  user_card.className = "user-card";
	  user_card.innerHTML = '<img class="avatar" src="'+this.avatar+'"><span>'+this.login+'</span>';
	  return(user_card)
  }

  async showUser() {
  	document.getElementById('users').innerHTML = null;
  	document.getElementById('repos-section').innerHTML = null;
  	document.getElementById('users').classList.remove('users-block');
  	document.getElementById('user-profile-section').innerHTML = null;
  	let userElement = document.createElement('div');
  	userElement.className = "user-profile";
		let response = await fetch(this.url);
		let user = await response.json();
		userElement.innerHTML = 
			'<div class="user-profile__card">'
			+'<img class="avatar" src="'+user.avatar_url+'">'
			+'<div class="user-profile__info">'
			+'<span class="login">'+user.login+'</span>'
			+'<span>Name: '+user.name+'</span>'
			+'<span>Company: '+user.company+'</span>'
			+'<span>E-mail: '+user.email+'</span>'
			+'<span>Followers: '+user.followers+'</span>'
			+'<span>Date of registration: '+user.created_at+'</span>'
			+'</div>'
			+'</div>'
			+'<div id="repositories" class="user-profile__repositories"></div>';
	  	this.showRepos();
	  document.getElementById('user-profile-section').appendChild(userElement);
  }

  async showRepos() {
	let response = await fetch(this.repos_url);
	let repos = await response.json();
	repos.forEach((item) => {
		let reposcard = new ReposCard(item.name, item.language, item.url);
		let reposcard_elemnt = reposcard.render();
		document.getElementById('repositories').appendChild(reposcard_elemnt);
	});
  }

}