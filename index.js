const admin = {
    email: "iS@gmail.com",
    password: "12345"
};
$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    $('#login').modal({
        keyboard: false
    });

    // clicking to create new account
    $(".newAccount").click(function () {
        $("#login").modal('hide');
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

    /// submit sign-in form
    $("form#signIn").submit(function (e) {
        e.preventDefault();
        let user = $('#email-signIn').val();
        let pass = $('#password').val();
        if ($(this).valid()) {
            if (user === admin.email && pass === admin.password) {
                e.preventDefault();
                alert("we did it ");
                location.href = 'main/main.html';
            }
            else {
                alert("worng details ");
            }
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

    /// submit register  form
    $('form#form-register').submit(function (event) {
        if ($(this).valid()) {
            event.preventDefault();
            alert("success");
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
        messages:
        {

            confirmrPassword:
            {
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

    /// submit password  form
    $('form#formPassword').submit(function (event) {
        if ($(this).valid()) {
            event.preventDefault();
            alert("success");
            $("#passwordPage").modal('hide');
        }
    });
});
