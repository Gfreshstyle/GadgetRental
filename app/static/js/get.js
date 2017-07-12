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

function getgadget( gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is-rented) {
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
					owner = res.entries[i].first_name;
					is_rented = res.entries[i].rented

					$("#gadgets").append(getrental(gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, brand_name, category_name, owner, is_rented));
				}
			} else {
				$("#gadgets").html("");
				alert('Error')
			}
		}
	})
};

