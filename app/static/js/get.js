auth_user=''

function getgadgetsinadmin() {
    $.ajax({
        url: 'http://127.0.0.1:5000/gadgets',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(res) {
            console.log(res);
            $("#gadgets").html("");
            $("#gadgetsecommerce").html("");
            $("#categories2").html("");
            $("#brands2").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    gadgets_item_id = res.entries[i].gadget_item_id; 
                    gadgets_brandname = res.entries[i].gadget_brandname;
                    gadgets_model = res.entries[i].gadget_model;
                    gadgets_color = res.entries[i].gadget_color;
                    gadgets_rental_rate = res.entries[i].gadget_rental_rate;
                    gadgets_image = res.entries[i].gadget_image;
                    gadgets_scale = res.entries[i].gadget_scale;
                    gadgets_ram = res.entries[i].gadget_ram;
                    gadgets_memory = res.entries[i].gadget_memory;
                    gadgets_description = res.entries[i].gadget_description;
                    gadgets_owner_id = res.entries[i].gadget_owner_id;
                    gadgets_category_name = res.entries[i].gadget_category_name;
                    $("#gadgets").append(getgadgetshtml(gadget_owner_id, gadget_category_name, gadget_item_id, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image, gadget_scale, gadget_ram, gadget_memory, gadget_description));
                    $("#gadgetsecommerce").append(getgadgetsecommercehtml(gadget_owner_id, gadget_category_name, gadget_item_id, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image, gadget_scale, gadget_ram, gadget_memory, gadget_description));

                }

                for(i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    $("#categories2").append(getecommercecategoryhtml(category_name));
                }
  
                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").show();
                $("#gadgetdetailspage").hide();
                $("#updateownerpage").hide();
                $("#accountcustomerspage").hide();
                $("#allrentalspage").hide();
                
                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").show();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#gadgetdetailsecommercepage").hide();
                $("#gadgetsecommerce").show();
                $("#gadgetbycategorybrandecommerce2").hide();
                $("#gadgetbycategoryeccomerce").hide();
                $("#profilepage").hide();

            } else {
                $("#gadgets").html("");
                alert('Error')
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }
    });
} 

// function getecommercecategoryhtml(category_name) {
//     return '<li onclick="getgadgetbycategory(\''+category_name+'\');">'+'<a href="#">' +category_name+ '</a>'+'</li>'
// }

// function getecommercebrandhtml(brandname, category_name) {
//     // return '<li onclick="getgadgetbybrand(\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'
//     // return '<li onclick="getgadgetbycategorybrandname(\''+category_name+'\''+','+'\''+brandname+'\');">'+'<a href="#">'+category_name+','+brandname+'</a>'+'</li>'
//     return '<li onclick="getgadgetbycategorybrandname(\''+category_name+'\',\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'
//     // return '<li onclick="getgadgetbycategorybrandname(\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'

// }

function getgadgetshtml(gadget_owner_id, gadget_category_name, gadget_item_id, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image, gadget_scale, gadget_ram. gadget_memory, gadget_description) {
    return '<tr> ' +
            '<td>' + gadget_owner_id + '</td>' +
            '<td>' + gadget_category_name + '</td>' +
            '<td>'+ '<a href="#" onclick="getgadgetbyitemidinadmin(\''+gadget_item_id+'\');">' + gadget_item_id + '</a>'+'</td>' +
            '<td>' + gadget_brandname + '</td>' +
            '<td>' + gadget_model + '</td>' +
            '<td>' + gadget_color + '</td>' +
            '<td>' + gadget_rental_rate + '</td>' +
            '<td>' + gadget_image + '</td>' +
            '<td>' + gadget_scale + '</td>' +
            '<td>' + gadget_ram + '</td>' +
            '<td>' + gadget_memory + '</td>' +
            '<td>' + gadget_description + '</td>' +
            '<td>' + '<a href="#" onclick="getgadgetbyitemidforupdate(\''+gadget_item_id+'\')">'+ '<div class="ti-pencil-alt"> update' +'</div>'+'</a>'+'</td>' + 
            '<td>' + '<a href="#">'+'<div class="ti-trash"> delete' + '</div>'+'</a>'+'</td>' +                     
            '</tr>'
}

// function getgadgetsecommercehtml(gadget_owner_id, gadget_category_name, gadget_item_id, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image) {
//     return '<div class="col-lg-4 col-md-4 col-sm-4">'+
//                 '<div class="single-product">'+
//                     '<div class="product-img">'+
//                         '<a href="#" onclick="getgadgetbyitemid(\''+gadget_item_id+'\');">'+
//                             '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
//                             '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
//                         '</a>'+
//                         '<h5 class="product_title">'+'<a href="#" style="text-transform: uppercase" onclick="getgadgetbyitemid(\''+gadget_item_id+'\');">'+gadget_model+'</a>'+'</h5>'+                          
//                     '</div>'+
//                 '</div>'+
//             '</div>'
// }

function getgadgetbyitemidinadmin(gadget_item_id){
    $.ajax({
        url: 'http://127.0.0.1:5000/gadget/itemid/'+gadget_item_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#gadgetdetails").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    gadget_item_id = res.entries[i].gadget_item_id;
                    gadget_color = res.entries[i].gadget_color;
                    gadget_brandname = res.entries[i].gadget_brandname;
                    gadget_model = res.entries[i].gadget_model;
                    gadget_rental_rate = res.entries[i].gadget_rental_rate;
                    gadget_image = res.entries[i].gadget_image;
                    gadget_scale = res.entries[i].gadget_scale;
                    gadget_ram = res.entries[i].gadget_ram;
                    gadget_memory = res.entries[i].gadget_memory;
                    gadget_description = res.entries[i].gadget_description;
                    gadget_owner_id = res.entries[i].gadget_owner_id;
                    gadget_category_name = res.entries[i].gadget_category_name;
                    $("#gadgetdetails").append(getgadgetbyitemidhtml(gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image))
                    // $("#gadgetdetailsecommerce").append(getgadgetdetailshtmlecommerce(gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image))
                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").show();
                $("#accountcustomerspage").hide();
                $("#allrentalspage").hide();

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").hide();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#gadgetdetailsecommercepage").show();
                $("#profilepage").hide();

            } else {
                $("#gadgetdetails").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }
    });
}

function getgadgetbyitemidhtml(gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image, gadget_scale, gadget_ram, gadget_memory, gadget_description) {
    return '<tr> ' +
            '<td>' + gadget_owner_id + '</td>' +
            '<td>' + gadget_category_name + '</td>' +
            '<td>' + gadget_brandname + '</td>' +
            '<td>' + gadget_model + '</td>' +
            '<td>' + gadget_color + '</td>' +
            '<td>' + gadget_rental_rate + '</td>' +
            '<td>' + gadget_image + '</td>' +
            '<td>' + gadget_scale + '</td>' +
            '<td>' + gadget_ram + '</td>' +
            '<td>' + gadget_memory + '</td>' +
            '<td>' + gadget_description + '</td>' +
            '</tr>'
}

// function getgadgetdetailshtmlecommerce(gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image) {
//     return '<div class="product-simple-area">'+
//         '<div class="container">'+
//             '<div class="row">'+
//                 '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
//                     '<div class="single-product-image">'+
//                         '<div class="single-product-tab">'+
//                           // <!-- Nav tabs -->
//                           '<ul class="nav nav-tabs" role="tablist">'+
//                             '<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s1.jpg"></a></li>'+
//                             '<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s2.jpg"></a></li>'+
//                             '<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s3.jpg"></a></li>'+
//                             '<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s4.jpg"></a></li>'+
//                           '</ul>'+

//                           // <!-- Tab panes -->
//                           '<div class="tab-content">'+
//                             '<div role="tabpanel" class="tab-pane active" id="home"><img alt="" src="../../shoptemplate/img/product/tab/1.jpg"></div>'+
//                             '<div role="tabpanel" class="tab-pane" id="profile"><img alt="" src="../../shoptemplate/img/product/tab/2.jpg"></div>'+
//                             '<div role="tabpanel" class="tab-pane" id="messages"><img alt="" src="../../shoptemplate/img/product/tab/3.jpg"></div>'+
//                             '<div role="tabpanel" class="tab-pane" id="settings"><img alt="" src="../../shoptemplate/img/product/tab/4.jpg"></div>'+
//                           '</div>'+
//                         '</div>'+
//                     '</div>'+
//                 '</div>'+
//                 '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
//                     '<div class="single-product-info">'+
//                         '<div class="product-nav">'+
//                             '<a href="#"><i class="fa fa-angle-right"></i></a>'+
//                         '</div>'+
//                         '<h1 class="product_title">'+gadget_model+'</h1>'+
//                         '<div class="price-box">'+
//                             '<span class="new-price">'+gadget_rental_rate+'</span>'+
//                             '<span class="old-price">£190.00</span>'+
//                         '</div>'+
//                         '<div class="pro-rating">'+
//                             // <a href="#"><i class="fa fa-star"></i></a>
//                             // <a href="#"><i class="fa fa-star"></i></a>
//                             // <a href="#"><i class="fa fa-star"></i></a>
//                             // <a href="#"><i class="fa fa-star"></i></a>
//                             '<a href="#"><i class="fa fa-star"></i></a>'+
//                         '</div>'+
//                         '<div class="short-description">'+
//                             '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>'+                      
//                         '</div>'+
//                         '<div class="stock-status">'+
//                             '<label>Availability</label>: <strong>In stock</strong>'+
//                         '</div>'+
//                         '<form action="#">'+
//                             '<div class="quantity">'+
//                                 '<input type="number" value="1" />'+
//                                 '<button>Add to gadgett</button>'+
//                             '</div>'+
//                         '</form>'+
//                         '<div class="add-to-wishlist">'+
//                             '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i></a>'+
//                             '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
//                         '</div>'+
//                         '<div class="share_buttons">'+
//                             '<a href="#"><img src="../../shoptemplate/img/share-img.png" alt="" /></a>'+
//                         '</div>'+
//                     '</div>'+
//                 '</div>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     // <!-- product-simple-area end -->

//     '<div class="product-tab-area">'+
//         '<div class="container">'+
//             '<div class="row">'+
//                 '<div class="col-lg-12 col-md-12">'+
//                     '<div class="product-tabs">'+
//                         '<div>'+
//                           // <!-- Nav tabs -->
//                           '<ul class="nav nav-tabs" role="tablist">'+
//                             '<li role="presentation" class="active"><a href="#tab-desc" aria-controls="tab-desc" role="tab" data-toggle="tab">Description</a></li>'+
//                             '<li role="presentation"><a href="#page-comments" aria-controls="page-comments" role="tab" data-toggle="tab">Reviews (1)</a></li>'+
//                           '</ul>'+
//                           // <!-- Tab panes -->
//                           '<div class="tab-content">'+
//                             '<div role="tabpanel" class="tab-pane active" id="tab-desc">'+
//                                 '<div class="product-tab-desc">'+
//                                     '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>'+
//                                     // <p>Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget.</p>
//                                 '</div>'+
//                             '</div>'+
//                           '</div>'+
//                         '</div>'+                      
//                     '</div>'+
//                     '<div class="clear"></div>'+
//                 '</div>'+
//                 '<div class="col-lg-3 col-md-3">'+         
//                 '</div>'+
//             '</div>'+
//         '</div>'+
//     '</div>'

// }

function getgadgetbyitemidforupdate(gadget_item_id){

    $.ajax({
        url: 'http://127.0.0.1:5000/gadget/itemid/'+gadget_item_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#gadgetdetailsforupdate").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    gadget_item_id = res.entries[i].gadget_item_id;
                    gadget_color = res.entries[i].gadget_color;
                    gadget_brandname = res.entries[i].gadget_brandname;
                    gadget_model = res.entries[i].gadget_model;
                    gadget_rental_rate = res.entries[i].gadget_rental_rate;
                    gadget_image = res.entries[i].gadget_image;
                    gadget_scale = res.entries[i].gadget_scale;
                    gadget_ram = res.entries[i].gadget_ram;
                    gadget_memory = res.entries[i].gadget_memory;
                    gadget_description = res.entries[i].gadget_description;
                    gadget_owner_id = res.entries[i].gadget_owner_id;
                    gadget_category_name = res.entries[i].gadget_category_name;
                    // $("#gadgetdetails").append(getgadgetbyitemidhtml(gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image))
                    // $("#gadgetdetailsecommerce").append(getgadgetdetailshtmlecommerce(gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image))
                    $("#gadgetdetailsforupdate").append(gadgetbyitemidhtmlforupdate(gadget_item_id));
                    // $("#gadgetdetailsforupdate").append(gadgetbyitemidhtmlforupdate(gadget_rental_rate, gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color,
                    //                                                                 gadget_item_id, gadget_image, gadget_item_id));
                }

                document.getElementById('update_gadget_owner_id').value = gadget_owner_id;
                document.getElementById('update_gadget_category_name').value = gadget_category_name;
                document.getElementById('update_gadget_brandname').value = gadget_brandname;
                document.getElementById('update_gadget_model').value = gadget_model;
                document.getElementById('update_gadget_color').value = gadget_color;
                document.getElementById('update_gadget_rental_rate').value = gadget_rental_rate;
                document.getElementById('update_gadget_image').value = gadget_image;
                document.getElementById('update_gadget_scale').value = gadget_scale;
                document.getElementById('update_gadget_ram').value = gadget_ram;
                document.getElementById('update_gadget_memory').value = gadget_memory;
                document.getElementById('update_gadget_description').value = gadget_description;
                document.getElementById('update_gadget_item_id').value = gadget_item_id;

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").show();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").hide();
                $("#accountcustomerspage").hide();
                $("#allrentalspage").hide();

            } else {
                $("#gadgetdetailsforupdate").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}

function gadgetbyitemidhtmlforupdate(gadget_item_id) {
    return '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Item Id</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_item_id" disabled>'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Owner</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_owner_id">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Vehicle Type</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_category_name">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Brand Name</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_brandname">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Model</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_model">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Color</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_color">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Image</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_image">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Rental Rate</label>'+
                '<input type="number" class="form-control border-input" id="update_gadget_rental_rate">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Scale</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_scale">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Ram</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_ram">'+
            '</div>'+
        '</div>'+
    '</div>'+
             
    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Memory</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_memory">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Description</label>'+
                '<input type="text" class="form-control border-input" id="update_gadget_description">'+
            '</div>'+
        '</div>'+
    '</div>'+                       
    '<div class="text-center">'+
        '<input type="button" class="btn btn-info btn-fill btn-wd" onclick="updategadgetdetails(\''+gadget_item_id+'\');" value="Update">'+
    '</div>'

}

// function getgadgetbycategory(gadget_category_name) {
//     $.ajax({
//         url: 'http://127.0.0.1:5000/gadget/category/'+gadget_category_name,
//         type: 'GET',
//         dataType: 'json',
//         success: function(res) {
//             console.log(res);
//             $("#gadgetbycategoryeccomerce").html("");
//             $("#categories2").html("");
//             $("#brands2").html("");
//             if(res.status=='Ok'){
//                 for (i=0; i<res.count; i++ ) {
//                     gadget_category_name = res.entries[i].gadget_category_name;
//                     gadget_item_id = res.entries[i].gadget_item_id; 
//                     gadget_brandname = res.entries[i].gadget_brandname;
//                     gadget_model = res.entries[i].gadget_model;
//                     gadget_color = res.entries[i].gadget_color;
//                     gadget_rental_rate = res.entries[i].gadget_rental_rate;
//                     gadget_image = res.entries[i].gadget_image;
//                     gadget_owner_id = res.entries[i].gadget_owner_id;
//                     $("#gadgetbycategoryeccomerce").append(getgadgetbycategoryhtml(gadget_category_name, gadget_owner_id, gadget_item_id,
//                                     gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image));
//                 }

//                 for (i=0; i<res.countcategories; i++ ) {
//                     category_name = res.categories[i].category_name; 
//                     $("#categories2").append(getecommercecategoryhtml(category_name));
//                 }

//                 category_name = gadget_category_name;
//                 for(i=0; i<res.countbrands; i++){
//                     brandname = res.brands[i].brandname;
//                     $("#brands2").append(getecommercebrandhtml(brandname, category_name));    
//                 }                

//                 /////////////
//                 //Ecommerce//
//                 ////////////
//                 $("#shoppage").show();
//                 $("#homepage").hide();
//                 $("#gadgetdetailsecommercepage").hide();
//                 $("#gadgetsecommerce").hide();
//                 $("#gadgetbycategorybrandecommerce2").hide();
//                 $("#gadgetbycategoryeccomerce").show();
//                 $("#profilepage").show();

//             } else if(res.status==='Error') {
//                 $("#gadgetbycategoryeccomerce").html("");
//                 $("#categories2").html("");
//                 $("#brands2").html("");
//                 alert('Error')
//             }
//         },

//         error: function(e){
//                 alert("Naay wrong charot!: " + e);
//         },
//         beforeSend: function (xhrObj){

//             xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

//         }

//     });
// }

// function getgadgetbycategoryhtml(gadget_category_name, gadget_owner_id, gadget_item_id,
//                             gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image) {
//     return '<div class="col-lg-4 col-md-4 col-sm-4">'+
//                 '<div class="single-product">'+
//                     '<div class="product-img">'+
//                         '<a href="#" onclick="getgadgetbyitemid(\''+gadget_item_id+'\');">'+
//                             '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
//                             '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
//                         '</a>'+
//                         '<h5 class="product_title"><a href="#" style="text-transform: uppercase" onclick="getgadgetbyitemid(\''+gadget_item_id+'\');">'+gadget_model+'</a></h5>'+                          
//                     '</div>'+
//                 '</div>'+
//             '</div>'

// }

// function getgadgetbycategorybrandname(categoryname, brandname) {

//     $.ajax({
//         url: 'http://127.0.0.1:5000/gadget/category/'+categoryname+'/brand/'+brandname,
//         type: 'GET',
//         dataType: 'json',
//         success: function(res) {
//             console.log(res);
//             $("#gadgetbycategorybrandecommerce2").html("");
//             if(res.status==='Ok'){
//                 for (i=0; i<res.count; i++ ) {
//                     gadget_category_name = res.entries[i].gadget_category_name;
//                     gadget_item_id = res.entries[i].gadget_item_id; 
//                     gadget_model = res.entries[i].gadget_model;
//                     gadget_color = res.entries[i].gadget_color;
//                     gadget_rental_rate = res.entries[i].gadget_rental_rate;
//                     gadget_image = res.entries[i].gadget_image;
//                     gadget_owner_id = res.entries[i].gadget_owner_id;
//                     $("#gadgetbycategorybrandecommerce2").append(getgadgetbybrandcategoryhtml(gadget_category_name, gadget_owner_id,
//                         gadget_item_id, gadget_model, gadget_color, gadget_rental_rate, gadget_image));
//                 }
//                 $("#mainpage").hide();
//                 $("#userprofilepage").hide();
//                 $("#addgadgetpage").hide();
//                 $("#gadgetspage").show();
//                 $("#addownerpage").hide();
//                 $("#updategadgetpage").hide();
//                 $("#gadgetsecommerce").hide()
//                 $("#gadgetbycategoryeccomerce").hide();
//                 $("#gadgetbycategorybrandecommerce2").show();
//                 $("#profilepage").show();

//             } else if(res.status==='Error') {
//                 $("#gadgetbycategorybrandecommerce2").html("");
//                 alert('Error')
//             }
//         },

//         error: function(e){
//                 alert("Naay wrong charot!: " + e);
//         },
//         beforeSend: function (xhrObj){

//             xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

//         }

//     });

// }

// function getgadgetbybrandcategoryhtml(gadget_category_name, gadget_owner_id, gadget_item_id,
//                             gadget_model, gadget_color, gadget_rental_rate, gadget_image) {
//     return '<div class="col-lg-4 col-md-4 col-sm-4">'+
//                 '<div class="single-product">'+
//                     '<div class="product-img">'+
//                         '<a href="#" onclick="getgadgetbyitemid(\''+gadget_item_id+'\');">'+
//                             '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
//                             '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
//                         '</a>'+
//                         '<h5 class="product_title"><a href="#" style="text-transform: uppercase" onclick="getgadgetbyitemid(\''+gadget_item_id+'\');">'+gadget_model+'</a></h5>'+                          
//                     '</div>'+
//                 '</div>'+
//             '</div>'

// }

function updategadgetdetails(item_id) {

    var gadget_owner_id = $("#update_gadget_owner_id").val();
    var gadget_category_name = $("#update_gadget_category_name").val();
    var gadget_brandname = $("#update_gadget_brandname").val();
    var gadget_model = $("#update_gadget_model").val();
    var gadget_color = $("#update_gadget_color").val();
    var gadget_image = $("#update_gadget_image").val();
    var gadget_rental_rate = $("#update_gadget_rental_rate").val();
    var gadget_image = $("#update_gadget_image").val();
    var gadget_scale = $("#update_gadget_scale").val();
    var gadget_ram = $("#update_gadget_ram").val();
    var gadget_memory = $("#update_gadget_memory").val();
    var gadget_description = $("#update_gadget_description").val();
    var gadget_item_id = $("update_gadget_item_id").val();

    var data = JSON.stringify({'gadget_owner_id': gadget_owner_id, 'gadget_category_name': gadget_category_name, 'gadget_brandname': gadget_brandname,
                                'gadget_model': gadget_model, 'gadget_color': gadget_color, 'gadget_image': gadget_image, 'gadget_rental_rate': gadget_rental_rate,
                                'gadget_image': gadget_image, 'gadget_scale': gadget_scale, 'gadget_ram': gadget_ram, 'gadget_memory': gadget_memory, 
                                'gadget_description': gadget_image, 'gadget_description': item_id})

    $.ajax({
        url: 'http://127.0.0.1:5000/gadget/update/'+item_id,
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            if(res.status==='Ok') {
                alert("gadget Updated!" + data)
            } else {
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}


function getgadgetowners() {
    $.ajax({
        url: 'http://127.0.0.1:5000/owners',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(res){
            console.log(res);
            $("#gadgetowners").html("");
            if(res.status==='Ok') {
                for(i=0; i<res.count; i++){
                    owner_id = res.entries[i].owner_id;
                    owner_firstname = res.entries[i].owner_firstname;
                    owner_lastname = res.entries[i].owner_lastname;
                    owner_address1 = res.entries[i].owner_address1;
                    owner_mobile_no = res.entries[i].owner_mobile_no;
                    $("#gadgetowners").append(getgadgetownershtml(owner_id, owner_firstname, owner_lastname, owner_address1, 
                        owner_mobile_no));
                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").show();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").hide();
                $("#updateownerpage").hide();
                $("#accountcustomerspage").hide();
                $("#allrentalspage").hide();

            } else {
                $("#gadgetowners").html();
                alert("Error");
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}

function getgadgetownershtml(owner_id, owner_firstname, owner_lastname, owner_address1, owner_mobile_no) {
    return '<tr> ' +
            '<td>' + '<a href="#" onclick="getgadgetownerbyid('+owner_id+');">'+owner_id +'</a>'+ '</td>' +
            '<td>' + owner_firstname + '</td>' +
            '<td>' + owner_lastname + '</td>' +
            '<td>' + owner_address1 + '</td>' +
            '<td>' + owner_mobile_no + '</td>' +
            '<td>' + '<a href="#" onclick="getgadgetownerbyidforupdate('+owner_id+')">'+ '<div class="ti-pencil-alt"> update' +'</div>'+'</a>'+'</td>' + 
            '<td>' + '<a href="#">'+'<div class="ti-trash"> delete' + '</div>'+'</a>'+'</td>' +                     
            '</tr>'
}

function getgadgetownerbyid(gadget_owner_id) {

    $.ajax({
        url: 'http://127.0.0.1:5000/owner/'+gadget_owner_id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#gadgetownerdetails").html("");
            if(res.status==='Ok') {
                for(i=0; i<res.count; i++) {
                    owner_id = res.entries[i].owner_id;
                    owner_firstname = res.entries[i].owner_firstname;
                    owner_lastname = res.entries[i].owner_lastname;
                    owner_address1 = res.entries[i].owner_address1;
                    owner_mobile_no = res.entries[i].owner_mobile_no;
                    $("#gadgetownerdetails").append(getgadgetownerbyidhtml(owner_id, owner_firstname, owner_lastname, owner_address1, owner_mobile_no))

                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").show();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").hide();
                $("#accountcustomerspage").hide();
                $("#updateownerpage").hide();
                $("#allrentalspage").hide();

            } else {
                $("#gadgetownerdetails").html("");
                alert("Error!");
            }

        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}

function getgadgetownerbyidhtml(owner_id, owner_firstname, owner_lastname, owner_address1, owner_mobile_no) {
    return '<tr> ' +
            '<td>' + owner_id + '</td>' +
            '<td>' + owner_firstname + '</td>' +
            '<td>' + owner_lastname + '</td>' +
            '<td>' + owner_address1 + '</td>' +
            '<td>' + owner_mobile_no + '</td>' +
            '</tr>'
}

function getgadgetownerbyidforupdate(gadget_owner_id) {

    $.ajax({
        url: 'http://127.0.0.1:5000/owner/'+gadget_owner_id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#gadgetownerdetailsforupdate").html("");
            if(res.status==='Ok') {
                for(i=0; i<res.count; i++) {
                    owner_id = res.entries[i].owner_id;
                    owner_firstname = res.entries[i].owner_firstname;
                    owner_lastname = res.entries[i].owner_lastname;
                    owner_address1 = res.entries[i].owner_address1;
                    owner_mobile_no = res.entries[i].owner_mobile_no;
                    $("#gadgetownerdetailsforupdate").append(getgadgetownerbyidforupdatehtml(owner_id))

                }

                document.getElementById('update_owner_id').value = owner_id;
                document.getElementById('update_owner_firstname').value = owner_firstname;
                document.getElementById('update_owner_lastname').value = owner_lastname;
                document.getElementById('update_owner_address1').value = owner_address1;
                document.getElementById('update_owner_mobile_no').value = owner_mobile_no;

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").hide();
                $("#updateownerpage").show();
                $("#accountcustomerspage").hide();
                $("#allrentalspage").hide();

            } else {
                $("#gadgetownerdetailsforupdate").html("");
                alert("Error!");
            }

        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });

}

function getgadgetownerbyidforupdatehtml(owner_id) {
    return '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Owner ID</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_id" disabled>'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>First Name</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_firstname">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Last Name</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_lastname">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-12">'+
            '<div class="form-group">'+
                '<label>Address 1</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_address1">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-5">'+
            '<div class="form-group">'+
                '<label>Mobile No.</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_mobile_no">'+
            '</div>'+
        '</div>'+
    '</div>'+
                                    
    '<div class="text-center">'+
        '<input type="button" class="btn btn-info btn-fill btn-wd" onclick="updategadgetowner('+owner_id+');" value="Save">'+
    '</div>'
}

function updategadgetowner(oid) {

    var owner_id = $("#update_owner_id").val();
    var owner_first_name = $("#update_owner_firstname").val();
    var owner_last_name = $("#update_owner_lastname").val();
    var owner_address1 = $("#update_owner_address1").val();
    var owner_mobile_no = $("#update_owner_mobile_no").val();

    var data = JSON.stringify({'owner_id': oid, 'owner_first_name': owner_first_name, 'owner_last_name': owner_last_name,
                'owner_address1': owner_address1, 'owner_mobile_no': owner_mobile_no})

    $.ajax({
        url: 'http://127.0.0.1:5000/owner/update/'+oid,
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            if(res.status==='Ok') {
                alert("gadget Updated!" + data)

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").hide();
                $("#updateownerpage").show();
                $("#accountcustomerspage").hide();
                $("#allrentalspage").hide();

            } else {
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}

function getcustomers() {
    
    $.ajax({
        url: 'http://127.0.0.1:5000/customers',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(res) {
            console.log(res);
            $("#accountcustomers").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    customer_user_id = res.entries[i].user_id; 
                    customer_firstname = res.entries[i].first_name;
                    customer_lastname = res.entries[i].last_name;
                    customer_address1 = res.entries[i].address1;
                    customer_mobile_no = res.entries[i].mobile_no;
                    customer_email = res.entries[i].email;
                    $("#accountcustomers").append(getcustomershtml(customer_user_id, customer_firstname, customer_lastname, customer_address1, customer_mobile_no, customer_email));
                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").hide();
                $("#accountcustomerspage").show();
                $("#updateownerpage").hide();
                $("#allrentalspage").hide();

            } else if(res.status==='Error') {
                $("#accountcustomers").html("");
                alert('Error');
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });

}

function getcustomershtml(customer_user_id, customer_firstname, customer_lastname, customer_address1, customer_mobile_no, customer_email) {
    return '<tr> ' +
            '<td>' + customer_user_id + '</td>' +
            '<td>' + customer_email + '</td>' +
            '<td>' + customer_firstname + '</td>' +
            '<td>' + customer_lastname + '</td>' +
            '<td>' + customer_address1 + '</td>' +
            '<td>' + customer_mobile_no + '</td>' +
            '</tr>'
}

function getrentalsinadmin(){
    $.ajax({
        url: 'http://127.0.0.1:5000/rentals',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#allrents").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    rental_id = res.entries[i].rental_id;
                    rent_date_rented = res.entries[i].rent_date_rented;
                    rent_date_due = res.entries[i].rent_date_due;
                    rent_total_bill = res.entries[i].rent_total_bill;
                    rent_overdue_cost = res.entries[i].rent_overdue_cost;
                    rent_item_id = res.entries[i].rent_item_id;
                    rent_user_id = res.entries[i].rent_user_id;
                    rent_quantity = res.entries[i].rent_quantity;
                    $("#allrents").append(getallrentshtml(rental_id, rent_date_rented, rent_date_due, rent_total_bill, rent_overdue_cost, rent_item_id,
                                                            rent_user_id, rent_quantity))
                    // $("#gadgetdetailsecommerce").append(getgadgetdetailshtmlecommerce(gadget_owner_id, gadget_category_name, gadget_brandname, gadget_model, gadget_color, gadget_rental_rate, gadget_image))
                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#gadgetownerspage").hide();
                $("#gadgetownersdetailspage").hide();
                $("#addgadgetpage").hide();
                $("#updategadgetpage").hide();
                $("#gadgetspage").hide();
                $("#gadgetdetailspage").hide();
                $("#accountcustomerspage").hide();
                $("#allrentalspage").show();

            } else {
                $("#allrents").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }
    });
}

function getallrentshtml(rental_id, rent_date_rented, rent_date_due, rent_total_bill, rent_overdue_cost, rent_item_id, rent_user_id, rent_quantity) {
    return '<tr> ' +
            '<td>' + rental_id + '</td>' +
            '<td>' + rent_date_rented + '</td>' +
            '<td>' + rent_date_due + '</td>' +
            '<td>' + rent_total_bill + '</td>' +
            '<td>' + rent_overdue_cost + '</td>' +
            '<td>'+ '<a href="#" onclick="getgadgetbyitemidinadmin(\''+rent_item_id+'\');">' + rent_item_id + '</a>'+'</td>' +
            '<td>' + rent_user_id+ '</td>' +
            '<td>' + rent_quantity + '</td>' +                    
            '</tr>'
}