<!doctype html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <title>Petek</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <link rel="icon" type="image/png" href="../images/shopping-cart-icon.png">
    <link rel="stylesheet" type="text/css" href="../css/index.css">
    <link rel="stylesheet/less" type="text/css" href="../css/index.less" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js"></script>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">


</head>

<header>
    <div class="container">
        <nav class="navbar fixed-top navbar-expand-lg navbar-light light">
            <div class="container">
                <a href="#"><i class="fa fa-shopping-cart"></i> Petek</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php"><i class="fa fa-fw fa-home"></i>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="loginNav" href="" data-toggle="modal" data-target="#loginModal"><i class="fa fa-fw fa-user"></i>Login</a>
                        </li>
                        <li class="nav-item">
                            <a style="display: none" class="nav-link" id="listsNav" href="main.php"><i class="fa fa-fw fa-list"></i>lists</a>
                        </li>
                        <li class="nav-item">
                            <a style="display: none" class="nav-link" id="shareListNav" href="shareList.php"><i class="fa fa-fw fa-share"></i>Share lists</a>
                        </li>
                        <li class="nav-item">
                            <a style="display: none" class="nav-link" id="boughtProductsNav" href="boughtProducts.php"><i class="fa fa-fw fa-cutlery"></i>Bought products</a>
                        </li>
                        <li class="nav-item">
                            <a style="display: none" class="nav-link" id="logoutNav" href="#" data-toggle="modal" data-target="#logoutModal"><i class="fa fa-fw fa-user"></i>logout</a>
                        </li>
                    </ul>
                    <button id="ChangeBackground" class="btn btn-outline-success my-2 my-sm-0" type="submit">background</button>
                </div>
            </div>
        </nav>
    </div>
</header>
<script>
    $(document).ready(function() {
        let color;
        if (localStorage.getItem("background") === 'black') {
            less.modifyVars({
                '@background-color': '#000000!important',
                '@welcome-color': '#FFFFFF!important',
                '@nav-color': '#000000!important',
                '@navbar-color': '#FFFFFF!important',
                '@border-color': '#FFFFFF!important',
                '@images-color': '#FFFFFF!important',
                '@footer-color': '#000000!important'

            });
            color = 'white';
        }

        $("#ChangeBackground").click(function() {


            if (color === 'white') {
                less.modifyVars({
                    '@background-color': 'url(../images/photo-1500964757637-c85e8a162699.jpg)no-repeat center center fixed !important',
                    '@welcome-color': '#000000!important',
                    '@nav-color': '#f8f9fa!important',
                    '@navbar-color': 'rgba(0,0,0,.5)!important',
                    '@border-color': 'rgba(0,0,0,.1)!important',
                    '@images-color': 'inherit!important',
                    '@footer-color': 'gainsboro!important'
                });
                color = 'black'
                localStorage.setItem("background", "white");
            } else {
                color = 'white';
                less.modifyVars({
                    '@background-color': '#000000!important',
                    '@welcome-color': '#FFFFFF!important',
                    '@nav-color': '#000000!important',
                    '@navbar-color': '#FFFFFF!important',
                    '@border-color': '#FFFFFF!important',
                    '@images-color': '#FFFFFF!important',
                    '@footer-color': '#000000!important'

                });
                localStorage.setItem("background", "black");

            }
        });
    });
</script>