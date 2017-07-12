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
	$("#dash").hide();
	$("#rent").show();
}

$(document).ready(function() {
    $("#rent_button").click(function () {
        $("#rent").show();
        $("#dash").hide();
     
    });
    $("#dashb").click(function () {
        $("#rent").hide();
        $("#dash").show();

    });
});