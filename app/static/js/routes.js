auth_user = ''

function show_login(){
     $('#login-section').show();
     $('#slider').hide();
     $('#signup-section').hide();
}

function show_signup(){
     $('#signup-section').show();
     $('#slider').hide();
     $('#login-section').hide();
}

function show_rented(){
     $("#rent").show();
     $("#dash").hide();
     $("#gads").hide();
     $("#trans").hide();
     $('#add-gadget').hide();
     $("#customers").hide();
}

function show_dashboard(){
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").show();
     $("#trans").hide();
     $('#add-gadget').hide();
     $("#customers").hide();
}

function show_gadgets(){
     $("#rent").hide();
     $("#gads").show();
     $("#dash").hide();
     $("#trans").hide();
     $('#add-gadget').hide();
     $("#customers").hide();
}

function show_trans(){
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").show();
     $('#add-gadget-section').hide();
     $("#customers").hide();
}

function show_all_gadgets_customer(){
     $('#get-all-gadgets-customer-section').show();
     $('#login-section').hide();
     $('#slider').hide();
     $('#signup-section').hide();
}

function show_gadget_customer(){
     $('#gadget-section').show();
     $('#login-section').hide();
     $('#slider').hide();
     $('#signup-section').hide();
}

function show_add_gadget(){
     $("#add-gadget").show();
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").hide();
}

function show_customers(){
     $("#customers").show();
     $("#rent").hide();
     $("#gads").hide();
     $("#dash").hide();
     $("#trans").hide();
     $("#add-gadget").hide();
}