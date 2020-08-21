// var users = {
//     'iS@gmail.com' : '12345',
//     'iS1@gmail.com' : '12213345',
//     'iS2@gmail.com' :'12312345',
//     'iS3@gmail.com' : '12123345',
//     'iS4gmail.com' : '123421321321325',
//     'iS5@gmail.com' : '123432135'
// };
$(document).ready(function () {
    let User = $('#session_something').val();
    if (!$('#session_something').val()) {
        $('#loginNav').show();
        $("#logoutNav").hide();
        $("#listsNav").hide();
        $("#shareListNav").hide();
        $("#boughtProductsNav").hide();
    } else {
        $('#loginNav').hide();
        $("#logoutNav").show();
        $("#listsNav").show();
        $("#shareListNav").show();
        $("#boughtProductsNav").show();
    }

    // clicking to create new account
    $(".newAccount").click(function () {
        $("#loginModal").modal('hide');
        $("#register").modal('show');
    });
    // clicking to send new password
    $(".password").click(function () {
        $("#loginModal").modal('hide');
        $("#passwordMail").modal('show');
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
    // send a new passord validation
    $('form#MailPassword').validate({
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

    /// submit new pssword form
    $('form#MailPassword').submit(function (event) {
        if ($(this).valid()) {
            event.preventDefault();
            const email = $('#emailPassword').val();
            $.ajax({
                url: "../api/sendEmail.php",
                type: "POST",
                data: ({ email, password: "true" }),
                success: function (data) {
                    $("#mail-password").fadeTo(3000, 500, function () {
                        $(this).slideUp(2000);
                        $("#passwordMail").modal('hide');
                        $('#emailPassword').val("");

                    });
                },
                error: function (err) {
                    console.log(err);
                }

            })
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
            $.ajax({
                url: "../api/findUser.php",
                type: "GET",
                data: ({ email }),
                success: function (data) {
                    if (data) {
                        $.ajax({
                            url: "../api/sendEmail.php",
                            type: "POST",
                            data: ({ email, nickname, phone }),
                            success: function () {
                                clear();
                                $("#email-sent").fadeTo(4000, 500, function () {
                                    $(this).slideUp(2000);
                                    $("#register").modal('hide');
                                });
                            },
                        })
                    }
                    else {
                        $("#user-exist").fadeTo(3000, 500, function () {
                            $(this).slideUp(1000);
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })

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
            const urlParams = new URLSearchParams(window.location.search);
            const phone = urlParams.get('phone');
            const nickname = urlParams.get('nickname');
            const email = urlParams.get('email');
            $.ajax({
                url: "../api/addUser.php",
                type: "POST",
                data: ({ confirmPassword, email, nickname, phone }),
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
                    console.log(err);
                }
            })
        }
    });

    function clear() {
        $('#email').val("");
        $('#nickname').val("");
        $('#phone').val("");
        $('#confirmPassword').val("");
        $('#registerpassword').val("");
    }
    /// logout
    $("#logountBtn").on("click", function () {
        location.href = 'logout.php';
    });
});