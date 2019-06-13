$(document).ready(function(){
	$('#topics').on('click',function(e){
		$.ajax({
		url:'https://api.github.com/repos/Shuvalov Anton/awesome-backbone/topics',
		dataType:'application/vnd.github.mercy-preview+json',
		data:{
			client_id:'588cbfd64b0949fd3cdc',
			client_secret:'0e6d7d80ecdf5bf1b01066e5e731de525353f3d6',
			sort:'created',
				direction:'asc',
				per_page:1
		}
	}).then(function(res){
		console.log(res);
	});
	});

	$('#create').on('click',function(e){
		$.ajax({
		method :'POST',
		url:'https://api.github.com/anjali-jain0/repos',
		data:{
			client_id:'588cbfd64b0949fd3cdc',
			client_secret:'0e6d7d80ecdf5bf1b01066e5e731de525353f3d6',
			"name": "Hello-World",
		  	"description": "This is your first repository",
		  	"homepage": "https://github.com",
		  	"private": false,
		  	"has_issues": true,
		  	"has_projects": true,
		  	"has_wiki": true
		}
	}).then(function(res){
		console.log(res);
	});
	});

	$('#searchUser').on('keyup',function(e){
		$('#inrepo').remove();
		let username = e.target.value;

		$.ajax({
			url:'https://api.github.com/users/' + username,
			data:{
				client_id:'588cbfd64b0949fd3cdc',
				client_secret:'0e6d7d80ecdf5bf1b01066e5e731de525353f3d6',
				sort:'created',
				direction:'asc',
				per_page:1
			}
		}).then(function(user){
			$.ajax({
				url:'https://api.github.com/users/' + username + '/repos',
				data:{
				client_id:'588cbfd64b0949fd3cdc',
				client_secret:'0e6d7d80ecdf5bf1b01066e5e731de525353f3d6'
			}
			}).then(function(repos){
				$.each(repos,function(index,repo){
					$('#repos').append(`
						<div class="card bg-light">
    						<div class="card-body">
							<div class='row'>
								<div class='col-md-7'>
									<strong>${repo.name}</strong> : ${repo.description}
								</div> 
								<div class='col-md-3'>
									<span class="badge badge-primary">Forks: ${repo.forks_count}</span>
									<span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
									<span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class='col-md-2'>
								<a href="${repo.html_url}" target='_blank'>
								<button type="button" class="btn btn-secondary">
								Repo Page
								</button></a>
								</div>
							</div>
						</div></div>
						`)
				});
			});
			$('#inprofile').html(`
			<div class="panel panel-default">
			  <div class="panel-heading">
			    <h3 class="panel-title">${user.name}</h3>
			  </div>
			  <div class="panel-body">
			   	<div class='row'>
			   		<div class='col-md-3'>
			   			<img class='thumbnail avatar' src='${user.avatar_url}'>
			   			<a target='_blank' class='btn btn-primary btn-block' href='${user.html_url}'>View Profile</a>
			   		</div>
			   		<div class='col-md-9'>
			   			<span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
						<span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
						<span class="badge badge-success">Followers: ${user.followers}</span>
						<span class="badge badge-info">Following: ${user.following}</span>
						<br><br>
						<ul class='list-group'>
							<li class='list-group-item'>Company: ${user.company}</li>
							<li class='list-group-item'>Website/Blog: ${user.blog}</li>
							<li class='list-group-item'>Location: ${user.location}</li>
							<li class='list-group-item'>Member Since: ${user.created_at}</li>
						</ul>
					</div>
			   	</div>
			  </div>
			</div>
			<br><br>
			<h3 class='page-header'>Latest Repos</h3>
			`);
		});
	});

	$('#myUsr').on('click',function(e){
		$('#inprofile').remove();
		$('#repos').remove();
		$.ajax({
			url:'https://api.github.com/repositories',
			data:{
				client_id:'588cbfd64b0949fd3cdc',
				client_secret:'0e6d7d80ecdf5bf1b01066e5e731de525353f3d6',
				sort:'created',
				direction:'asc',
				per_page:1
			}
		}).then(function(repos){
				$.each(repos,function(index,repo){
					$('#inrepo').append(`
						<div class="card bg-light">
    						<div class="card-body">
							<div class='row'>
								<div class='col-md-7'>
									<strong>${repo.full_name}</strong> : ${repo.description}
								</div> 
								<div class='col-md-3'>
									<a href='${repo.forks_url}'><button type='button' class="btn btn-primary">Forks</button></a>
								</div>
								<div class='col-md-2'>
								<a href="${repo.html_url}" target='_blank'>
								<button type="button" class="btn btn-secondary">
								Repo Page
								</button></a>
								</div>
							</div>
						</div></div>
						`)
				});});
	});
});
