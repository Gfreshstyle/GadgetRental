function addowner() {
	var owner_first_name = $('#owner_first_name').val();
	var owner_last_name = $('#owner_last_name').val();
	var owner_address1 = $('#owner_address1').val();
  	var owner_mobile_no = $('#owner_mobile_no').val();

	var data = JSON.stringify({"owner_first_name": owner_first_name, "owner_last_name": owner_last_name,
							"owner_address1": owner_address1, "owner_mobile_no": owner_mobile_no})

	$.ajax({
		url: 'http://127.0.0.1:5000/owner/'+owner_last_name+'/'+owner_last_name,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: data,
		dataType: 'json',
		success: function(res){
			console.log(res);
            if(res.status==='Ok') {
                alert("Owner Added")
            } else {
                alert("Error")
            }
        }

	});

}

function addgadget() {
	var gadget_item_id = $('#gadget_item_id').val();
	var gadget_owner_id = $('#gadget_owner_id').val();
	var gadget_category_name = $('#gadget_category_name').val();
	var gadget_brandname = $('#gadget_brandname').val();
	var gadget_model = $('#gadget_model').val();
	var gadget_color = $('#gadget_color').val();
	var gadget_image = $('#gadget_image').val();
	var gadget_scale = $('#gadget_scale').val();
	var gadget_ram = $('#gadget_ram').val();
	var gadget_memory = $('#gadget_memory').val();
	var gadget_description = $('#gadget_description').val();
	var gadget_rental_rate = $('#gadget_rental_rate').val();

	var data = JSON.stringify({"gadget_item_id": gadget_item_id, "gadget_owner_id": gadget_owner_id, "gadget_brandname": gadget_brandname,
							"gadget_model": gadget_model, "gadget_color": gadget_color, "gadget_image": gadget_image, "gadget_scale": gadget_scale, "gadget_ram": gadget_ram, "gadget_memory": gadget_memory, "gadget_description": gadget_description, "gadget_rental_rate": gadget_rental_rate,
							"gadget_category_name": gadget_category_name})

	$.ajax({
		url: 'http://127.0.0.1:5000/gadget/'+gadget_item_id,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
        	console.log(res);
            if(res.message==='Ok') {
                alert("Vehicle Added!")
            } else {
                alert(res.message)
            }
        }
	});

}