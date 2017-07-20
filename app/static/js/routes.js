auth_user = ''
var user_id;

function show_login(){
     $('#login-section').show();
     $('#slider').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').hide();
     $('#slider').hide();
     $('#get-all-gadgets-customer-section').hide();
}

function show_signup(){
     $('#signup-section').show();
     $('#slider').hide();
     $('#login-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').hide();
     $('#slider').hide();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
}

function show_rented(){
     $("#rent").show();
     $("#dash").hide();
     $("#gads").hide();
     $("#trans").hide();
     $('#add-gadget').hide();
     $("#gad_admin").hide();

}

function show_dashboard(){
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").show();
     $("#trans").hide();
     $('#add-gadget').hide();
     $("#gad_admin").hide();

}

function show_gadgets(){
     $("#rent").hide();
     $("#gads").show();
     $("#dash").hide();
     $("#trans").hide();
     $('#add-gadget').hide();
     $("#gad_admin").hide();

}

function show_trans(){
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").show();
     $('#add-gadget-section').hide();
     $("#gad_admin").hide();

}

function show_all_gadgets_customer(){
     $('#get-all-gadgets-customer-section').show();
     $('#login-section').hide();
     $('#slider').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').hide();
     $('#slider').hide();
     $('#header-options1').hide();
}

function show_gadget_customer(){
     $('#gadget-section').show();
     $('#login-section').hide();
     $('#slider').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').hide();
     $('#slider').hide();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
}

function show_add_gadget(){
     $("#add-gadget").show();
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").hide();
     $("#gad_admin").hide();

}

function show_gadget_admin(){
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").hide();
     $("#gad_admin").show();
}

function show_user_update(){
     $('#user-account-section').show();
     $('#user-info-customer-update').show();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').hide();
     $('#slider').hide();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
     $('#login-section').hide();
     $('#signup-section').hide();
}