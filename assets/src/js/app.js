var input = document.getElementById('search');
var users = document.getElementById('users');

input.oninput = () => {
	serachUser(input.value);
}

let serachUser = async (username) => {
	users.innerHTML = null;
	users.className = "users-block";
	let response = await fetch('https://api.github.com/search/users?q='+username);
	let responseJson = await response.json();
	for (let i = 0; i < 12; i++) {
	  let item = responseJson.items[i];
	  let userclass = new UserCard(item.login, item.avatar_url, item.url, item.repos_url);
		let user_card = userclass.render();
		users.appendChild(user_card);
	}

}