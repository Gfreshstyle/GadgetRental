auth_user = ''

function add_gadget()
{
	var gadget_name = $('#gadget_name').val();
	var gadget_description = $('#gadget_description').val();
	var gadget_model = $('#gadget_model').val();
	var gadget_color = $('#gadget_color').val();
	var gadget_image = $('#gadget_image').val();
	var rental_rate = $('#rental_rate').val();
	var gadget_brand_id = $('#gadget_brand_id').val();
	var gadget_category_id = $('#gadget_category_id').val();
	var gadget_owner_id = $('#gadget_owner_id').val();


    var data = JSON.stringify({'gadget_name': gadget_name, 'gadget_description': gadget_description, 'gadget_model': gadget_model, 'gadget_color': gadget_color, 'gadget_image': gadget_image, 'rental_rate': rental_rate, 'gadget_brand_id': gadget_brand_id, 'gadget_category_id': gadget_category_id, 'gadget_owner_id': gadget_owner_id });
    
    $.ajax({
        url:'http://127.0.0.1:5000/gadgets/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',

        success: function(res){

            if(res.status == 'Ok' && res.message == 'Ok') {
                $('#add-gadget-alert').html('<div class="alert alert-success"><strong>Successfully added gadget! </div>');

                var form = document.getElementById("add-gadget-form");
                form.reset();

            }else if(res.status =='Error'){
                $('#add-gadget-alert').html('<div class="alert alert-danger"><strong>'+ res.message +'</div>');            	
            }

        },

        error: function(e){
                alert("ERROR: " + e);
        },

        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}

function addrent(id){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var transac = date;
    var due_date = date;
    var overdue_cost = 0;
    var gadget_id = id;
    var user_id = $('user_id').val();

    var data = JSON.stringify({'transaction_date': transac, 'rent_due_date': due_date,'rent_overdue_cost': overdue_cost, 'gadget_id': gadget_id, 'user_id': user_id});
    console.log(data);
    $.ajax({
        url:'http://127.0.0.1:5000/gadget/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            if(res.status == 'OK'){
                alert('Success')
            } else {
                alert('Already Rented')
            }
        }
    })
}