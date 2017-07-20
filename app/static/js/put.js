function delete_gadget(id){

	var data = JSON.stringify({'id': id});
	console.log(data);
	$.ajax({
		url:'http://127.0.0.1:5000/gadget/'+ id + '/',
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
        	if(res.status == 'OK'){
        		alert('Success')
        	} else {
        		alert('Error')
        	}
        }
	})
}

function updategadget(id){
        var gadget_name = $("#update_gadgetname").val();
        var gadget_description = $("#update_description").val();
        var gadget_model = $("#update_model").val();
        var gadget_color= $("#update_color").val();
        var rental_rate = $("#update_rentalrate").val();

        var data = JSON.stringify({'gadget_name' : gadget_name, 'gadget_description' : gadget_description, 'gadget_model' : gadget_model, 'gadget_color' : gadget_color, 'rental_rate' : rental_rate})


        $.ajax({
        url: 'http://127.0.0.1:5000/gadgets/'+ id + '/',
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        
       success: function(res){
                if(res.status == 'OK'){
                        alert('Success')
                } else {
                        alert('Error')
                }
        } 
        })
}