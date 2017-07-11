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

    $.ajax({
        url:'http://127.0.0.1:5000/signup',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);

            if(res.message == 'Ok') {
                alert('Registeration successful');
            }

            else if (res.message == 'Please fill the require field/s'){
                alert('Please fill the require field/s')
            }

            else if (res.message == 'User already exists'){
                alert('User already exists')
            }

            else if (res.message == 'Email already exists'){
                alert('Email already exists')
            }

            else if( (password != password2) || (password == null || password2 == null) ){
                alert("Password mismatch")
            }

            else if( res.message =='Ok' && (password != password2))
                alert("Password mismatch")

        },

        error: function(e){
                alert("Error in database or report to admin charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}
