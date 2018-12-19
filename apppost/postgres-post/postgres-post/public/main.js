
function updateUsername(userId, newUsername) {
	fetch(
		'/users/'+userId, 
		{
			method: 'post',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: newUsername
			})
		}
	).then(res=>res.json())
	  .then(res => console.log(res));
}
