auth_user = ''

function show_login(){
	$('#login').show();
	$('#login_signup_title').show();
	$('#slider').hide();
	$('#signup').hide();
}


function show_signup(){
	$('#signup').show();
	$('#login_signup_title').show();
	$('#slider').hide();
	$('#login').hide();
}


function show_rented(){
     $("#rent").show();
     $("#dash").hide();
     $("#gads").hide();
}

function show_dashboard(){
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").show();

}

function show_gadgets(){
     $("#rent").hide();
     $("#gads").show();
     $("#dash").hide();

}