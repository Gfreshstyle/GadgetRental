function getrental( gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, username) {
	return '<tr>' +
					'<td>' + gadget_name + '</td>' +
					'<td>' + gadget_description + '</td>' +
					'<td>' + gadget_model + '</td>' +
					'<td>' + gadget_color + '</td>' +
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

function getsinglegadget(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented){
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
             '<center><h4> Gadget </h4></center>'+
             '<div class="clearfix"></div>' +
             '<form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">'+
                    '<div class="form-group">' +
                      '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="gadget_name">Name<span class="required">*</span>' +
                      '</label>' +
                      '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<input type="text" required="required" class="form-control col-md-7 col-xs-12" value = "'+ gadget_name+'">' +
                      '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="gadget_description">Description<span class="required">*</span>' +
                      '</label>' +
                      '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<input type="text"  required="required" class="form-control col-md-7 col-xs-12" value = "'+ gadget_description+'">' +
                      '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="gadget_model">Model<span class="required">*</span>' +
                      '</label>' +
                      '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<input type="text"  required="required" class="form-control col-md-7 col-xs-12" value = "'+ gadget_model+'">' +
                      '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="gadget_color">Color<span class="required">*</span>' +
                      '</label>' +
                      '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<input type="text"  required="required" class="form-control col-md-7 col-xs-12" value = "'+ gadget_color+'">' +
                      '</div>' +
                      '</div>' +
                      '<div class="form-group">' +
                      '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="rental_rate">Rental Rate<span class="required">*</span>' +
                      '</label>' +
                      '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<input type="text"  required="required" class="form-control col-md-7 col-xs-12" value = "'+ rental_rate+'">' +
                    '</div>' +
                    '</div>' + 
                    '<div class="form-group">' +
                      '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="brand_name">Brand<span class="required">*</span>' +
                      '</label>' +
                      '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<input type="text"  required="required" class="form-control col-md-7 col-xs-12" value = "'+ brand_name+'">' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="category_name">Category<span class="required">*</span>' +
                      '</label>' +
                      '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<input type="text"  required="required" class="form-control col-md-7 col-xs-12" value = "'+ category_name+'">' +
                    '</div>' +
                    '</div>' +
			'</form>' +
			 '<div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">' +
                        '<button type="submit" class="btn btn-primary">Update</button>' +
                        '<button type="submit" class="btn btn-danger">Delete</button>' +
                      '</div>' +
                
            '</div>'
}

function getgadgetadmin(id){
	$.ajax({
		url: 'http://127.0.0.1:5000/gadgets/'+ id +'/',
		type: 'GET',
		dataType: 'json',

		success: function(res){	
			$("gadgetadmin").html("");
			$('#gadgetadmin').empty();
			
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
					category_name = res.entries[i].gadget_category_name;
					owner = res.entries[i].gadget_owner_first_name;
					is_rented = res.entries[i].rented
			
					$("#gadgetadmin").append(getsinglegadget(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented));
				}
			} else {
				alert('Error')
			} 

			
		},
		beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }
	})
}

function getgadget(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented) {
	return '<tr>' +
					'<td>' + gadget_name + '</td>' +
					'<td>' + gadget_model + '</td>' +
					'<td>' + gadget_color + '</td>' +
					'<td>' + rental_rate + '</td>' +
					'<td>' + brand_name + '</td>' +
					'<td>' + category_name + '</td>' +
					'<td>' + owner + '</td>' +
					'<td>' + is_rented + '</td>' +
					'<td>' + '<button class="btn btn-primary"  onclick = "show_gadget_admin(); getgadgetadmin(' + gadget_id + ');">View</button>' + '</td>' +


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

					$("#gadgets").append(getgadget(gadget_id, gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented));
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