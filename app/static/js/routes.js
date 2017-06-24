// window.onload = function(){
//     $("#userprofile").hide();
//     $("#addgadget").hide();
//     $("#tableforgadgets").hide();

// } 

function showmainpage() {
	$("#mainpage").show();
	$("#userprofilepage").hide();
	$("#addgadgetpage").hide();
	$("#gadgetspage").hide();
	$("#addownerpage").hide();
	$("#updategadgetpage").hide();
	$("#accountcustomerspage").hide();
	$("#updateownerpage").hide();
	$("#gadgetdetailspage").hide();
	$("#gadgetownersdetailspage").hide();
	$("#allrentalspage").hide();

}

function showuserprofilepage() {
	$("#mainpage").hide();
	$("#userprofilepage").show();
	$("#addgadgetpage").hide();
	$("#gadgetspage").hide();
	$("#addownerpage").hide();
	$("#updategadgetpage").hide();

}

function showaddgadgetpage() {
	$("#mainpage").hide();
	$("#userprofilepage").hide();
	$("#addgadgetpage").show();
	$("#gadgetspage").hide();
	$("#addownerpage").hide();
	$("#updategadgetpage").hide();
	$("#gadgetownerspage").hide();
	$("#gadgetownersdetailspage").hide();
	$("#accountcustomerspage").hide();
	$("#updateownerpage").hide();
	$("#allrentalspage").hide();

}

// function showtableforgadgets() {
// 	$("#main").hide();
// 	$("#userprofile").hide();
// 	$("#addgadget").hide();
// 	$("#tableforgadgets").show();
// }

function showaddownerpage() {
	$("#mainpage").hide();
	$("#userprofilepage").hide();
	$("#addgadgetpage").hide();
	$("#gadgetspage").hide();
	$("#addownerpage").show();
	$("#updategadgetpage").hide();
	$("#gadgetownerspage").hide();
	$("#gadgetdetailspage").hide();
	$("#accountcustomerspage").hide();
	$("#updateownerpage").hide();
	$("#gadgetownersdetailspage").hide();
	$("#allrentalspage").hide();

}

function showshophomepage() {
	$("#accountpage").show();
	$("#homepage").hide();
	$("#shoppage").hide();
	$("#gadgetdetailspage").hide();
	$("#gadgettpage").hide();
	$("#checkoutpage").hide();
	$('#gadgetdetailsecommercepage').hide();
	$("#profilepage").hide();

}	

function showshophomepage2() {
	$("#accountpage").hide();
	$("#homepage").show();
	$("#shoppage").hide();
	$("#gadgetdetailspage").hide();
	$("#gadgettpage").hide();
	$("#checkoutpage").hide();
	$('#gadgetdetailsecommercepage').hide();
	$('#profilepage').hide();
}