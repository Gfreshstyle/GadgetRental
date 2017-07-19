function getrental( gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, username) {
	return '<tr>' +
					'<td>' + gadget_name + '</td>' +
					'<td>' + gadget_description + '</td>' +
					'<td>' + gadget_model + '</td>' +
					'<td>' + gadget_color + '</td>' +
					'<td>' + gadget_image + '</td>' +
					'<td>' + rental_rate + '</td>' +
					'<td>' + brand_name + '</td>' +
					'<td>' + category_name + '</td>' +
					'<td>' + username + '</td>' +
				'</tr>'
}

function getrentals(){
	$.ajax({
		url: 'http://127.0.0.1:5000/rentals/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("rentals").html("");
			$('#rentals').empty();
			if (res.status == 'OK') {
				for (i=0; i<res.count; i++) {
					gadget_name = res.entries[i].gadget_name;
					gadget_description = res.entries[i].gadget_description;
					gadget_model = res.entries[i].gadget_model;
					gadget_color = res.entries[i].gadget_color;
					gadget_image = res.entries[i].gadget_image;
					rental_rate = res.entries[i].rental_rate;
					brand_name = res.entries[i].brand_name;
					category_name = res.entries[i].category_name;
					username = res.entries[i].first_name;

					$("#rentals").append(getrental(gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, username));
				}
			} else {
				$("#rentals").html("");
				alert('Error')
			}
		}
	})
};

function getgadget( gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented) {
	return '<tr>' +
					'<td>' + gadget_name + '</td>' +
					'<td>' + gadget_description + '</td>' +
					'<td>' + gadget_model + '</td>' +
					'<td>' + gadget_color + '</td>' +
					'<td>' + gadget_image + '</td>' +
					'<td>' + rental_rate + '</td>' +
					'<td>' + brand_name + '</td>' +
					'<td>' + category_name + '</td>' +
					'<td>' + owner + '</td>' +
					'<td>' + is_rented + '</td>' +


				'</tr>'
}

function getgadgets(){
	$.ajax({
		url: 'http://127.0.0.1:5000/gadgets/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("gadgets").html("");
			$('#gadgets').empty();
			if (res.status == 'Ok') {
				for (i=0; i<res.count; i++) {
					gadget_name = res.entries[i].gadget_name;
					gadget_description = res.entries[i].gadget_description;
					gadget_model = res.entries[i].gadget_model;
					gadget_color = res.entries[i].gadget_color;
					gadget_image = res.entries[i].gadget_image;
					rental_rate = res.entries[i].rental_rate;
					brand_name = res.entries[i].brand_name;
					category_name = res.entries[i].category_name;
					owner = res.entries[i].first_name;
					is_rented = res.entries[i].rented

					$("#gadgets").append(getgadget(gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented));
				}
			} else {
				$("#gadgets").html("");
				alert('Error')
			}
		}
	})
};

function getgadgetcustomer(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented) {

	return	'<div class="col-md-4 col-lg-4 col-sm-6">'+
				'<div class="single-product" style="margin-bottom: 30px;">' +
			        '<div class="product-img">' +
			            '<a href="#">' +
			                '<img src="../../template-customer/img/products/1.jpg" alt="Product Title" />' +
			            '</a>' +
			        '</div>' +
			        '<div class="product-dsc">' +
			            '<h3><a href="#">'  + ' ' + brand_name + ' ' + gadget_name + ' ' + gadget_model + '</a></h3>' +
			            '<div class="star-price">' +
			                '<span class="price-left">P' + rental_rate+ '</span>' +
			                '<span class="star-right">' +
			                    '<i class="fa fa-star"></i>' +
			                    '<i class="fa fa-star"></i>' +
			                    '<i class="fa fa-star"></i>' +
			                    '<i class="fa fa-star"></i>' +
			                    '<i class="fa fa-star-half-o"></i>' +
			                '</span>' +
			            '</div>' +
			        '</div>' +
			        '<div class="actions-btn">'+
                        // '<a onclick="$(\'#gadget-section\').show();getgadgetbyid('+ gadget_id +');"><i class="fa fa-eye"></i></a>'+
                        '<a data-placement="top" data-target="#quick-view" data-trigger="hover" data-toggle="modal" data-original-title="Quick View" onclick="show_gadget_customer();getgadgetbyid('+ gadget_id +');"><i class="fa fa-eye"></i></a>'+
                    '</div>'+
			    '</div>' +
			'</div>'

}

function getgadgetview(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented) {
	return  '<div class="col-xs-12 col-sm-5">' +
                '<div class="quick-image">' +
                    '<div class="single-quick-image tab-content text-center">' +
                        '<div class="tab-pane  fade in active" id="sin-pro-1">' +
                            '<img src="../../template-customer/img/products/' + gadget_image +'" alt="" />' +
                            // '<img src="../../template-customer/img/quick-view/'+ gadget_image +'" alt="" />' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
             '<div class="col-xs-12 col-sm-7">' +
                '<div class="quick-right">' +
                    '<div class="quick-right-text">' +
                        '<h3><strong>'+ brand_name +' '+ gadget_name +' '+ gadget_model +'</strong></h3>' +
                        '<div class="rating">' +
                            '<i class="fa fa-star"></i>' +
                            '<i class="fa fa-star"></i>' +
                            '<i class="fa fa-star"></i>' +
                            '<i class="fa fa-star-half-o"></i>' +
                            '<i class="fa fa-star-o"></i>' +
                            '<a href="#">06 Review</a>' +
                            '<a href="#">Add review</a>' +
                        '</div>' +
                        '<div class="amount">' +
                            '<h4>₱' + rental_rate +'</h4>' +
                        '</div>' +
                        '<p>'+ gadget_description +'</p>' +
                        '<div class="row m-p-b">' +
                            '<div class="col-sm-12 col-md-6">' +
                                '<div class="por-dse responsive-strok clearfix">' +
                                    '<ul>' +
                                        '<li><span>color</span><strong>:</strong> <a href="#">'+ gadget_color +'</a></li>' +
                                        '<li><span>Category</span><strong>:</strong> <a href="#">'+ category_name +'</a></li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-sm-12 col-md-6">' +
                            '</div>' +
                        '</div>' +
                        '<div class="dse-btn">' +
                            '<div class="row">' +
                                '<div class="col-sm-12 col-md-6">' +
                                    '<div class="por-dse clearfix">' +
                                        '<ul>' +
                                            '<li class="share-btn qty clearfix"><span>quantity</span>' +
                                                '<form action="#" method="POST">' +
                                                    '<div class="plus-minus">' +
                                                        '<a class="dec qtybutton">-</a>' +
                                                        '<input type="text" value="02" name="qtybutton" class="plus-minus-box">' +
                                                        '<a class="inc qtybutton">+</a>' +
                                                    '</div>' +
                                                '</form>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-sm-12 col-md-6">' +
                                    '<div class="por-dse clearfix responsive-othre">' +
                                        '<a class="btn btn-success" role="button">Rent</a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
}

function getgadgetbyid(id){
	$.ajax({
		url: 'http://127.0.0.1:5000/gadgets/'+ id +'/',
		type: 'GET',
		dataType: 'json',

		success: function(res){	
			$("single-gadget").html("");
			$('#single-gadget').empty();
			
			if (res.status == 'Ok') {

				for (i=0; i<res.count; i++) {
					gadget_id = res.entries[i].id;
					gadget_name = res.entries[i].gadget_name;
					gadget_description = res.entries[i].gadget_description;
					gadget_model = res.entries[i].gadget_model;
					gadget_color = res.entries[i].gadget_color;
					gadget_image = res.entries[i].gadget_image;
					rental_rate = res.entries[i].rental_rate;
					brand_name = res.entries[i].gadget_brand_name;
					category_name = res.entries[i].category_name;
					owner = res.entries[i].gadget_owner_first_name;
					is_rented = res.entries[i].rented
			
					$("#single-gadget").append(getgadgetview(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented));
				}
			} 

			if(res.status == 'Error'){

				$('#single-gadget-alert').html(
						'<div class="alert alert-danger"><strong>FAILED ' +

						 '!</strong>'+ res.message +' </div>');
				$("#single-gadget-alert").fadeTo(2000, 500).slideUp(500);

			}
		},
		beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }
	})
}

function getgadgetscustomer(){
	$.ajax({
		url: 'http://127.0.0.1:5000/gadgets/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("single-gadget-box").html("");
			$('#single-gadget-box').empty();;
			
			if (res.status == 'Ok') {
				for (i=0; i<res.count; i++) {
					gadget_id = res.entries[i].gadget_id;
					gadget_name = res.entries[i].gadget_name;
					gadget_description = res.entries[i].gadget_description;
					gadget_model = res.entries[i].gadget_model;
					gadget_color = res.entries[i].gadget_color;
					gadget_image = res.entries[i].gadget_image;
					rental_rate = res.entries[i].rental_rate;
					brand_name = res.entries[i].brand_name;
					category_name = res.entries[i].category_name;
					owner = res.entries[i].first_name;
					is_rented = res.entries[i].rented

					$("#single-gadget-box").append(getgadgetcustomer(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented));
				}
			} 

			if(res.status == 'Error'){

				$('#single-gadget-box-alert').html(
						'<div class="alert alert-danger"><strong>FAILED ' +

						 '!</strong>'+ res.message +' </div>');
				$("#single-gadget-box-alert").fadeTo(2000, 500).slideUp(500);

			}
		}
	})
}

function getransac(transaction_date, rent_due_date, rent_overdue_cost, gadget_name, owner){
	return '<tr>' +		
					'<td>' + transaction_date + '</td>' +
					'<td>' + rent_due_date + '</td>' +
					'<td>' + rent_overdue_cost + '</td>' +
					'<td>' + gadget_name + '</td>' +
					'<td>' + owner + '</td>' +
			'</tr>'
}

function gettransactions(){
	$.ajax({
		url: 'http://127.0.0.1:5000/transaction/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("#transaction").html("");
			$('#transaction').empty();
			if (res.status == 'OK') {
				for (i=0; i<res.count; i++) {
					transaction_date = res.entries[i].transaction_date;
					rent_due_date = res.entries[i].rent_due_date;
					rent_overdue_cost = res.entries[i].rent_overdue_cost;
					gadget_name = res.entries[i].gadget_name;
					owner = res.entries[i].owner;
					

					$("#transaction").append(getransac(transaction_date, rent_due_date, rent_overdue_cost, gadget_name, owner));
				}
			} else {
				$("#transaction").html("");
				alert('Error')
			}
		}
	})
};

function get_categories(){
	$.ajax({
		url: 'http://127.0.0.1:5000/categories/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("gadget_category_id").html("");
			$('#gadget_category_id').empty();;
			
			if (res.status == 'Ok') {
				for (i=0; i<res.count; i++) {
					category_id = res.entries[i].id;
					category_name = res.entries[i].category_name;

					$("#gadget_category_id").append('<option value="'+ category_id +'">'+ category_name +'</option>');
				}
			} 

			if(res.status == 'Error'){

				$('#single-gadget-box-alert').html(
						'<div class="alert alert-danger"><strong>FAILED ' +

						 '!</strong>'+ res.message +' </div>');
				$("#single-gadget-box-alert").fadeTo(2000, 500).slideUp(500);

			}
		}
	})	
}

function get_brands(){
	$.ajax({
		url: 'http://127.0.0.1:5000/brands/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("gadget_brand_id").html("");
			$('#gadget_brand_id').empty();;
			
			if (res.status == 'Ok') {
				for (i=0; i<res.count; i++) {
					brand_id = res.entries[i].id;
					brand_name = res.entries[i].brand_name;

					$("#gadget_brand_id").append('<option value="'+ brand_id +'">'+ brand_name +'</option>');
				}
			} 

			if(res.status == 'Error'){

				$('#single-gadget-box-alert').html(
						'<div class="alert alert-danger"><strong>FAILED ' +

						 '!</strong>'+ res.message +' </div>');
				$("#single-gadget-box-alert").fadeTo(2000, 500).slideUp(500);

			}
		}
	})	
}

function getcustomers(){
	$.ajax({
		url: 'http://127.0.0.1:5000/customers/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("customer").html("");
			$('#customer').empty();
			if (res.status == 'Ok') {
				for (i=0; i<res.count; i++) {
					id = res.entries[i].id;
					fname = res.entries[i].fname;
					mname = res.entries[i].mname;
					lname = res.entries[i].lname;
					email = res.entries[i].email;
					address = res.entries[i].address;
					mobile_no = res.entries[i].mobile_no

					$("#customer").append(getcustomer(id,fname,mname,lname,email,address,mobile_no));
				}
			} else {
				$("#customer").html("");
				alert('Error')
			}
		}
	})
}


function getcustomer(id,fname,mname,lname,email,address,mobile_no) {
	return '<tr>' +
				'<td>' + fname + ' ' + mname + ' ' + lname + '</td>' +
				'<td>' +  email + '</td>' +
				'<td>' + address + '</td>' +
				'<td>' + mobile_no + '</td>' +
			'</tr>'
}

function getusergadgetrental(gadget_id, gadget_name, gadget_description, gadget_model, gadget_model, gadget_color, rental_rate, brand_name, category_name){
    return  '<div class="col-md-4 col-lg-4 col-sm-6">'+
                '<div class="single-product">' +
                    '<div class="product-img">' +
                        '<a href="#">' +
                            '<img src="../../template-customer/img/products/1.jpg" alt="Product Title" />' +
                        '</a>' +
                    '</div>' +
                    '<div class="product-dsc">' +
                        '<h3><a href="#">'  + ' ' + brand_name + ' ' + gadget_name + ' ' + gadget_model + '</a></h3>' +
                        '<div class="star-price">' +
                            '<span class="price-left">P' + rental_rate+ '</span>' +
                            '<span class="star-right">' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star"></i>' +
                                '<i class="fa fa-star-half-o"></i>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'

}

function getusergadgetrentals(user_id){
    $.ajax({
        url: 'http://127.0.0.1:5000/rentals/' + user_id +'/',
        type: 'GET',
        dataType: 'json',
        success: function(res){
            $("single-rented-gadget").html("");
            $('#single-rented-gadget').empty();
            if (res.status == 'Ok') {
                for (i=0; i<res.count; i++) {
                    gadget_id = res.entries[i].gadget_id
                    gadget_name = res.entries[i].gadget_name
                    gadget_description = res.entries[i].gadget_description
                    gadget_model = res.entries[i].gadget_model
                    gadget_color = res.entries[i].gadget_color
                    gadget_image = res.entries[i].gadget_image
                    rental_rate = res.entries[i].rental_rate
                    brand_name = res.entries[i].brand_name
                    category_name = res.entries[i].category_name

                    $("#single-rented-gadget").append(getusergadgetrental(gadget_id, gadget_name, gadget_description, gadget_model, gadget_model, gadget_color, rental_rate, brand_name, category_name));
                }
            } else {
                $("#single-rented-gadget").html("");
                alert('Error')
            }
        }
    })
}

function getusercustomer(id, fname, mname, lname, password, email, address, mobile_no, role_id){
	return '<div class="panel-heading" role="tab" id="headingOne">' +
                '<h4 class="panel-title" style="color:#fff;">' +
                    'Personal Details' + 
                '</h4>' +
            '</div>' +
            '<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" >' +
               ' <div class="row">' +
               		'<div class="easy2">' +
		                '<h2>' + fname + ' ' + mname + ' ' +  lname +'</h2>' +
		                '<hr>' +                
						'<div class="col-md-4">' +
							'<p>Email</p>' +
							'<p>Address</p>' +
							'<p>Mobile No.</p>' +
						'</div>' +
						'<div class="col-md-6">' +
							'<p>'+ email +'</p>' +
			                '<p>'+ address +'</p>' +
			                '<p>'+ mobile_no +'</p>' +
						'</div>' +
						'<div class="col-md-2">' +
                			// '<a class="btn btn-primary" onclick="updateforuserhtml('+ id + ', \''+ fname +'\', \''+ mname +'\', \''+ lname +'\', \''+ email +'\', \''+ address +'\', \''+ mobile_no +'\', \''+ ');show_user_update();"><i class="fa fa-pencil fa-fw"></i> Edit</a>' +
                			'<a class="btn btn-primary" onclick="updateforuserhtml('+ id + ', \''+ fname +'\', \'' + mname +'\', \'' + lname  +'\', \'' + email  +'\', \'' + address +'\', \'' + mobile_no +'\');show_user_update();"><i class="fa fa-pencil fa-fw"></i> Edit</a>' +
						'</div>' +
		            '</div>' +                    
                '</div>' +
            '</div>'					
}

function getuseradmin(id, fname, mname, lname, password, email, address, mobile_no, role_id){
	return '<div class="col-xs-5" >' +
	          '<ul class="nav side-menu">' +
	            '<b>' +
	              '<li style="margin-bottom: 10px;">Name</li><hr>' +
	              '<li style="margin-bottom: 10px;">Email</li><hr>' +
	              '<li style="margin-bottom: 10px;">Address</li><hr>' +
	              '<li style="margin-bottom: 10px;">Mobile No.</li>' +
	            '</b>                      ' +
	          '</ul> ' +
	        '</div>' +
	        '<div class="col-xs-7">' +
	          '<ul class="nav side-menu">' +
	              '<li style="margin-bottom: 10px;">' + fname + ' ' + mname + ' ' + lname + '</li><hr>' +
	              '<li style="margin-bottom: 10px;">' + email + '</li>' +
	              '<li style="margin-bottom: 10px;">' + address + '</li>' +
	              '<li style="margin-bottom: 10px;">' + mobile_no + '</li>' +
	          '</ul>' +
	        '</div> '
}

function getuserbyid(user_id){
	$.ajax({
        url: 'http://127.0.0.1:5000/users/' + user_id +'/',
        type: 'GET',
        dataType: 'json',
        success: function(res){
            $("user-info-customer").html("");
            $('#user-info-customer').empty();

            $("user-info-admin").html("");
            $('#user-info-admin').empty();
            
            if (res.status == 'Ok') {
                id = res.entries[0].id
				fname = res.entries[0].fname
				mname = res.entries[0].mname
				lname = res.entries[0].lname
				password = res.entries[0].password
				email = res.entries[0].email
				address = res.entries[0].address
				mobile_no = res.entries[0].mobile_no
				role_id = res.entries[0].role_id

                $("#user-info-customer").append(getusercustomer(id, fname, mname, lname, password, email, address, mobile_no, role_id));
                $("#user-info-admin").append(getuseradmin(id, fname, mname, lname, password, email, address, mobile_no, role_id));
            
            } else {
                $("#user-info-customer").html("");
                $("#user-info-admin").html("");
                alert('Error')
            }
        }
    })	
}

function updateforuserhtml(id, fname, mname, lname, email, address, mobile_no){
	$("#user-info-customer-update").append('<div class="panel-heading" role="tab" id="headingOne">' +
							                '<h4 class="panel-title" style="color:#fff;">' +
							                    'Edit Personal Details' + 
							                '</h4>' +
							            '</div>' +
							            '<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" >' +
								            '<div class="easy2">' +
								                '<form class="form-horizontal" action="#">' +
								                    '<fieldset>' +
								                        '<div class="form-group required">' +
								                            '<label class="col-sm-2 control-label">First Name </label>' +
								                            '<div class="col-sm-10">' +
								                                '<input id="update-fname" class="form-control" type="text" value="'+ fname +'">' +
								                            '</div>' +
								                        '</div>' +
								                        '<div class="form-group required">' +
								                            '<label class="col-sm-2 control-label">Middle Name</label>' +
								                            '<div class="col-sm-10">' +
								                                '<input id="update-mname" class="form-control" type="text" value="'+ mname +'">' +
								                            '</div>' +
								                        '</div>' +
								                        '<div class="form-group required">' +
								                            '<label class="col-sm-2 control-label">Last Name</label>' +
								                            '<div class="col-sm-10">' +
								                                '<input id="update-lname" class="form-control" type="text" value="'+ lname +'">' +
								                            '</div>' +
								                        '</div>' +
								                        '<div class="form-group required">' +
								                            '<label class="col-sm-2 control-label">Email</label>' +
								                            '<div class="col-sm-10">' +
								                                '<input id="update-email" class="form-control" type="email" value="'+ email +'">' +
								                            '</div>' +
								                        '</div>' +
								                        '<div class="form-group required">' +
								                            '<label class="col-sm-2 control-label">Address</label>' +
								                            '<div class="col-sm-10">' +
								                                '<input id="update-address" class="form-control" type="tel" value="'+ address +'">' +
								                            '</div>' +
								                        '</div>' +
								                        '<div class="form-group required">' +
								                            '<label class="col-sm-2 control-label">Mobile No.</label>' +
								                            '<div class="col-sm-10">' +
								                                '<input id="update-mobile" class="form-control" type="tel" value="'+ mobile_no +'">' +
								                            '</div>' +
								                        '</div>' +
								                    '</fieldset>' +
								                    '<div class="buttons clearfix">' +
								                        '<div class="pull-left">' +
								                            '<a class="btn btn-default ce5" href="#">Back</a>' +
								                        '</div>' +
								                        '<div class="pull-right">' +
								                            '<input id="updateuser('+ id +')" class="btn btn-primary ce5" type="submit" value="Continue">' +
								                        '</div>' +
								                    '</div>' +
								                '</form>' +
							            	'</div>' +
										'</div>');
}