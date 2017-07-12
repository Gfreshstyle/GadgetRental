auth_user = ''

function showlogin(){
	$('#login_register').show();
	$('#login_register_title').show();
	$('#slider').hide();
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
