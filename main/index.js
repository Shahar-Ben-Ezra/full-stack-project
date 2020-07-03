var admin = {
    email: "iS@gmail.com",
    password: "12345"
};
let user;
$(document).ready(function () {
    $('#user-exist').hide();
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

    // sign in validation
    $('form#signIn').validate({
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

    /// submit password form
    $('form#formPassword').submit(function (event) {
        if ($(this).valid()) {
            event.preventDefault();
            const confirmPassword = $('#confirmPassword').val();
            $.ajax({
                url: "../api/addUser.php",
                type: "POST",
                data: ({ confirmPassword, email: user.email, nickname: user.nickname ,phone:user.phone}),
                success: function (data) {
                    console.log(data);
                    alert("success");
                    $("#passwordPage").modal('hide');
                },
                error: function (err) {
                    $("#user-exist").fadeTo(2000, 500, function () {
                        $(this).slideUp(1000);
                    });
                }
            })
        }
    });
    //back
    $("#backBtn").on("click", function () {
        $("#register").modal('show');
      });
    
    /// logout
    $("#logountBtn").on("click", function () {
        location.href = 'logout.php';
    });

});