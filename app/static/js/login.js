auth_user = "";

$(document).ready(function(){


});

var user_role;
var user_id;
var timer = 0;

$(document).ready(function(){

	// decryptCookie();

});


function readCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function eraseCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

	stop();
	show_home2();

	var signup_form = document.getElementById("signup_form");
	signup_form.reset();

	var login_form = document.getElementById("login_form");
	login_form.reset();

	$('#login-alert').html(
		'<div class="alert alert-success" role="alert"><strong>Success ' +
		 '!</strong> Successfully logged out.</div>');

}

function decryptCookie(){

	var myCookie = readCookie('user_tk');
	var data = JSON.stringify({'token':myCookie});

	$.ajax({

		type:"POST",
	    url:"http://localhost:5000/decrypt",
	    contentType: "application/json; charset=utf-8",
	    data:data,
	    dataType:"json",

	    success: function(results){
	    	auth_user = results.token;
	    	home();
	    },

	    error: function(e, stats, err){
	    	$('#Home').show();
	    	$('#login').show();
	    	$('#top-right').show();
	    }

	});

}

function home(){

	var myCookie = readCookie('user_tk');

	$.ajax({

		type:"GET",
	    url:"http://localhost:5000/api/foodcart/home/" + myCookie,
	    dataType:"json",

	    success: function(results){

	    	$('#login-form').hide();

	    	if(results.status == 'OK'){
				var token = results.token;
				//user_tk is abbrev of user_token
				document.cookie = "user_tk=" + token;

				$('#login').hide(0);
				$('#Home').hide(0);

				if(results.data[0].role == 1){


					user_role = results.data[0].role;

				}

				if(results.data[0].role == 2){

					user_role = results.data[0].role;
					getNotification();
				}

				if(results.data[0].role == 3){

					user_role = results.data[0].role;
				}
			}

			if(results.status == 'FAILED'){
				console.log('FAILED');
			}

	    },

	    error: function(e, stats, err){
	    	console.log(err);
	    	console.log(stats);
			eraseCookie();
	    	$('#login-form').show();
	    },

	    beforeSend: function (xhrObj){

      		xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

	});

}


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
					
					user_id = res.entries[0].id;
					user_role = res.entries[0].role_id;
					
                	document.location.href="../../partials/admin/dashboard.html";
				}


				// for customer
				if(res.entries[0].role_id == 2){

					user_id = res.entries[0].id;
					user_role = res.entries[0].role_id;

					show_home(user_id);					
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