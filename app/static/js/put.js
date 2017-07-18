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