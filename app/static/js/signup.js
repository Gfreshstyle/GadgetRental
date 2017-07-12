auth_user = ''



function signup()
{
    var fname = $('#fname').val();
    var mname = $('#mname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var password2 = $('#password_confirmation').val();
    var address = $('#address').val();
    var mobile_no = $('#mobile_no').val();
    var role_id = $('#role_id').val();;

    var data = JSON.stringify({'fname': fname,'mname': mname,'lname': lname,'email': email,'password': password, 'password2': password2, 'address': address,'mobile_no': mobile_no, 'role_id': role_id});
    console.log(data);
    $.ajax({
        url:'http://127.0.0.1:5000/signup',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);

            if(res.status == 'Ok' && res.message == 'Ok') {
                $('#signup-alert').html('<div class="alert alert-success"><strong>Successfully Registered! </div>');
                $("#signup-alert").fadeTo(2000, 500).slideUp(500);                        

                var form = document.getElementById("signup_form");
                form.reset();
            
            }else if( res.status == 'Ok' && ((password != password2) || (password == null || password2 == null)) ){
                $('#signup-alert').html('<div class="alert alert-danger"><strong>Password mismatch! </div>');
                $("#signup-alert").fadeTo(2000, 500).slideUp(500);
            }

            else if( res.status =='Ok' || res.status =='Error')
                $('#signup-alert').html('<div class="alert alert-danger"><strong>'+ res.message +'</div>');
                $("#signup-alert").fadeTo(2000, 500).slideUp(500);

        },

        error: function(e){
                alert("ERROR:" + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}