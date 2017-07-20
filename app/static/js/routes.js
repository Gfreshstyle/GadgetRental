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
     $("#customers").hide();
     $("#gad_admin").hide();

}

function show_dashboard(id){
     user_id = id;
     getuserbyid(id);
     $('#admin-dash').show();
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").show();
     $("#trans").hide();
     $('#add-gadget').hide();
     $("#customers").hide();
     $("#gad_admin").hide();

}

function show_gadgets(){
     $("#rent").hide();
     $("#gads").show();
     $("#dash").hide();
     $("#trans").hide();
     $("#gad_admin").hide();
     $('#add-gadget').hide();
     $("#customers").hide();
}

function show_trans(){
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").show();
     $('#add-gadget-section').hide();
     $("#gad_admin").hide();
     $("#customers").hide();
}

function show_all_gadgets_customer(){
     $('#get-all-gadgets-customer-section').show();
     $('#login-section').hide();
     $('#slider').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').show();
     $('#slider').hide();
     $('#rent-by-user-section').hide();
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
     $('#rented-gadget-menu').show();
     $('#header-options1').hide();
     $('#rent-by-user-section').hide();
     $('#get-all-gadgets-customer-section').show();
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
     get_categories();
     get_brands();
}

function show_customers(){
     $("#customers").show();
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").hide();
     $("#gad_admin").hide();
     $("#add-gadget").hide();
}

function show_rented_gadgets_by_user(){
     getusergadgetrentals(user_id);
     $('#rent-by-user-section').show();
     $('#login-section').hide();
     $('#slider').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').show();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
}

function show_home(id){
     user_id = id;
     get_categories();
     $('#rented-gadget-menu').show();
     $('#slider').show();
     $('#header-options2').show();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
     $('#login-section').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#user-info-customer').hide();
}

function show_user_account_customer(){
     getuserbyid(user_id);
     $('#user-account-section').show();
     $('#user-info-customer').show();
     $('#rented-gadget-menu').show();
     $('#slider').hide();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
     $('#login-section').hide();
     $('#signup-section').hide();
     $('#rent-by-user-section').hide();
     $('#user-info-customer-update').hide();
}

function show_user_account_admin(){
     getuserbyid(user_id);
     $('#user-info-customer-update').show();
     $('#user-account').show();
     $("#add-gadget").hide();
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").hide();
     $("#customers").hide();
}

function show_user_update(){
     $('#user-account-section').show();
     $('#user-info-customer-update').show();
     $('#user-info-customer').hide();
     $('#rented-gadget-menu').show();
     $('#slider').hide();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
     $('#login-section').hide();
     $('#signup-section').hide();
}

function show_home1(){
     get_categories();
     $('#rented-gadget-menu').show();
     $('#slider').show();
     $('#header-options2').show();
     $('#header-options1').hide();
     $('#get-all-gadgets-customer-section').hide();
     $('#login-section').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#rented-gadget-menu').show();
     $('#user-info-customer').hide();
     $('#rent-by-user-section').hide();
}

function show_home2(){
     get_categories();
     $('#rented-gadget-menu').show();
     $('#slider').show();
     $('#header-options1').show();
     $('#header-options2').hide();
     $('#get-all-gadgets-customer-section').hide();
     $('#login-section').hide();
     $('#signup-section').hide();
     $('#user-account-section').hide();
     $('#user-info-customer-update').hide();
     $('#rented-gadget-menu').hide();
     $('#user-info-customer').hide();
     $('#rent-by-user-section').hide();
}

function show_logout_admin(){
     document.location.href="../../partials/customer/dashboard.html";
}