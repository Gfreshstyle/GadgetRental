auth_user = "";

$(document).ready(function(){


});

var auth_user = "";
var user_role;
var timer = 0;

$(document).ready(function(){

	// decryptCookie();

});


function login(){
	var email_address = $('#login_email').val();
	var password = $('#login_password').val();

	var data = JSON.stringify({'email_address':email_address, 'password':password});

	$.ajax({

		type:"POST",
		url:"http://localhost:5000/login/",
		contentType:"application/json; charset=utf-8",
		data:data,
		dataType:"json",

		success: function(res){
			
			if(res.status == 'Ok'){

				var token = res.token;

				//user_tk is abbrev of user_token
				document.cookie = "user_tk=" + token;


				// for system admin
				if(res.entries[0].role_id == 1){
					
					user_role = res.entries[0].role_id;
					
                	document.location.href="../../partials/admin/dashboard.html";
				}


				// for customer
				if(res.entries[0].role_id == 2){


					user_role = res.entries[0].role_id;		

					$('#header-options2').show();
					$('#header-options1').hide();
				}


				alert("You successfully logged in, " + res.entries[0].fname);
			}

			if(res.status == 'Error'){
				$('#login-alert').html(
					'<div class="alert alert-danger"><strong>'+ res.message +'</div>');
			}

		},

		error: function(e){
				alert(e);
		}

	});
}