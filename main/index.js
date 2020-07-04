// var users = {
//     'iS@gmail.com' : '12345',
//     'iS1@gmail.com' : '12213345',
//     'iS2@gmail.com' :'12312345',
//     'iS3@gmail.com' : '12123345',
//     'iS4gmail.com' : '123421321321325',
//     'iS5@gmail.com' : '123432135'
// };
 
let user;
$(document).ready(function () {
    let x = $('#session_something').val();
    if (!$('#session_something').val()) {
        $('#loginNav').show();
        $("#logoutNav").css("visibility", "hidden")
        $("#listsNav").css("visibility", "hidden")

    } else {
        $('#loginNav').hide();
        $("#logoutNav").css("visibility", "visible")
        $("#listsNav").css("visibility", "visible")
    }

    // clicking to create new account
    $(".newAccount").click(function () {
        $("#loginModal").modal('hide');
        $("#register").modal('show');
    });

    // logIn  validation
    $('form#logIn').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        highlight: function (element, erroClass) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element, erroClass) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });

    // cusror -email input
    $(document).on(' mouseenter mouseleave', '#email', function () {
        $(this).toggleClass('highlight')
            .css('cursor', 'pointer');
    });

    // register validation
    $('form#form-register').validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        highlight: function (element, erroClass) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element, erroClass) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });

    // password validation
    $('form#formPassword').validate({
        rules: {
            registerpassword: {
                required: true,
                minlength: 5
            },
            confirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "#registerpassword"
            }
        },
        messages: {
            confirmrPassword: {
                equalTo: "Please enter the same password."
            }
        },
        highlight: function (element, erroClass) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element, erroClass) {
            $(element).closest('.form-group').removeClass('has-error');
        }

    });

    // /// submit logIn form  
    // $('form#logIn').submit(function (event){
    //     event.preventDefault();
    //     const email = $('#email-logIn').val();
    //     const password = $('#password').val();
    //      if(users[email] ===password ){
    //         console.log("confirmed");
    //     }    
    // });

    /// submit register form
    $('form#form-register').submit(function (event) {
        if ($(this).valid()) {
            event.preventDefault();
            const email = $('#email').val();
            const nickname = $('#nickname').val();
            const phone = $('#phone').val();
            user = {
                email
                , nickname
                , phone
            };
            $("#register").modal('hide');
            $("#passwordPage").modal('show');
        }
    });

    /// submit password form
    $('form#formPassword').submit(function (event) {
        if ($(this).valid()) {
            event.preventDefault();
            const confirmPassword = $('#confirmPassword').val();
            // if(!users[user.email]){
            //   users[user.email] =confirmPassword;
            // }
            $.ajax({
                url: "../api/addUser.php",
                type: "POST",
                data: ({ confirmPassword, email: user.email, nickname: user.nickname, phone: user.phone }),
                success: function (data) {
                    console.log(data);
                    clear();
                    $("#user-created").fadeTo(3000, 500, function () {
                        $(this).slideUp(1000, function () {
                            $("#passwordPage").modal('hide');
                        });
                    });
                },
                error: function (err) {
                    $("#user-exist").fadeTo(3000, 500, function () {
                        $(this).slideUp(1000);
                    });
                }
            })
        }
    });
    function clear(){
        $('#email').val("");
        $('#nickname').val("");
        $('#phone').val("");
        $('#confirmPassword').val("");
        $('#registerpassword').val("");
    }
    //back
    $("#backBtn").on("click", function () {
        $("#register").modal('show');
    });

    /// logout
    $("#logountBtn").on("click", function () {
        location.href = 'logout.php';
    });
});