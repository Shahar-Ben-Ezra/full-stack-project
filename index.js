const admin = {
    email: "iS@gmail.com",
    password: "12345"
};
$(document).ready(function () {

    if (localStorage.getItem("emailPass") !== 'A1234567') {
        $('#loginHref').show();
        $('#listsHref').hide();
        $('#logout').hide();

    } else {
        $('#loginHref').hide();
        $('#listsHref').show();
        $('#logout').show();
    }

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
            if (user.toLowerCase() === admin.email.toLowerCase() && pass === admin.password) {
                e.preventDefault();
                alert("we did it ");
                location.href = 'main/main.html';
                localStorage.setItem("emailPass", 'A1234567');
            } else {
                alert("wrong details ");
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

    /// submit password  form
    $('form#formPassword').submit(function (event) {
        if ($(this).valid()) {
            event.preventDefault();
            alert("success");
            $("#passwordPage").modal('hide');
        }
    });

    /// logout
    $("#logountBtn").on("click", function () {
        location.href = 'index.html';
        localStorage.setItem("emailPass", 'a');
    });

});