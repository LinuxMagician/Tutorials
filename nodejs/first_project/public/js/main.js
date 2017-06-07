$(document).ready(function(){
	$('.deleteUser').on('click',deleteUser);
});

function deleteUser(){
	var confirmation = true;
//	var confirmation = confirm('Are you sure?');
	var id = $(this).data('id') ;
	if (confirmation){
		console.log(id); 
		alert('You tried to delete user ' + id);
		$.ajax({
			type:'DELETE',
			url:  '/users/delete/'+id
			}).done(function(response){
				console.log('Done.');
				window.location.replace('/');
			});
		window.location.replace('/');
	}
	else
	{
		return false;
	}

};

