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
                        '<a href="#" data-placement="top" data-target="#quick-view" data-trigger="hover" data-toggle="modal" data-original-title="Quick View"><i class="fa fa-eye"></i></a>'+
                    '</div>'+
			    '</div>' +
			'</div>'

}
function getgadgetscustomer(){
	$.ajax({
		url: 'http://127.0.0.1:5000/gadgets/',
		type: 'GET',
		dataType: 'json',
		success: function(res){
			$("single-gadget-box").html("");
			$('#single-gadget-box').empty();
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