<?php
session_start();
if (isset($_SESSION['email'])) {
  $email = $_SESSION['email'];
} else if (isset($_COOKIE['email'])) {
  $email = $_COOKIE['email'];
} else {
  $email = 0;
}
$log = false;
require_once "../parts/header.php";
?>

<body>
  <h1 style="padding-top:100px ;" class="animate__animated animate__zoomInDown top">petek </h1>
  <h1 class="animate__animated animate__zoomInDown">now you are going to save money!!</h1>
  <input type="hidden" id="session_something" value="<?= $email ?>">

  <?php if (isset($_GET["status"]) && $_GET["status"] === "fail") : ?>
    <?php $log = 'fail'; ?>
  <?php endif; ?>
  <?php if (isset($_GET["status"]) && $_GET["status"] === "password") : ?>
    <?php $log = 'password'; ?>
  <?php endif; ?>
  <?php if (isset($_GET["status"]) && $_GET["status"] === "showMsg") : ?>
    <?php $log = 'view'; ?>
  <?php endif; ?>
  <?php if (isset($_GET["idCreator"]) && ($email)) : ?>
    <?php
    $log = 'addingFamilyList';
    ?>
  <?php endif; ?>
  <div class="container">
    <div class="row" style="padding-top: 50px; padding-bottom: 50px;">
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <img class="card-img-top" src="../images/lists.jpg" alt="">
          <div class="card-body">
            <h4 class="card-title">Organize</h4>
            <p class="card-text">Manage multiple grocery lists. A shopping list can prevent impulse buying by directing
              your focus on the stuff you really need. </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <img class="card-img-top" src="../images/cart.jpg" alt="">
          <div class="card-body">
            <h4 class="card-title">Shop Faster</h4>
            <p class="card-text">When you have a list of items to buy, you simply need to locate them in their
              designated shelves instead of wandering aimlessly around the store aisles.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <img class="card-img-top" src="../images/money.jpg" alt="">
          <div class="card-body">
            <h4 class="card-title">Save Money</h4>
            <p class="card-text">Having a list of to-buys lets you prioritise your spending on what you really need at
              the moment.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modals -->
  <!-- login -->
  <!-- The tabindex attribute explicitly defines the navigation order for focusable elements (typically links and form controls) within a page. It can also be used to define whether elements should be focusable or not. -->
  <div class="modal fade" id="loginModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <!-- : The document role tells assistive technologies with reading or browse modes to use the document mode to read the content contained within this element. -->
      <div class="modal-content">
        <div>
          <button style="padding: 15px;" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2 class="modal-title col-sm-4" style="padding-left: 15px;padding-top: 15px;">
            log in</h2>
        </div>
        <div class="row justify-content-center">
          <script src="https://unpkg.com/@lottiefiles/lottie-player@0.5.1/dist/lottie-player.js"></script>
          <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_UDRFuD.json" background="transparent" speed="1" style="width: 140px;" loop autoplay></lottie-player>
        </div>
        <form class="form-horizontal" id="logIn" method="POST" action="main.php">
          <div style="padding-left: 20px;">
            <div class="row">
              <div class="col-3 col-sm-4 marginSpace">
                <label for="email" class="control-label">Email:</label>
              </div>
              <div class="col-8 col-sm-5">
                <input type="text" id="email-logIn" name="email" class="form-control" placeholder="Enter email" required>
              </div>
            </div>
            <div class="row">
              <div class="col-3 col-sm-4 marginSpace">
                <label for="password" class="control-label">Password:</label>
              </div>
              <div class="col-8 col-sm-5" style="padding-top: 10px;">
                <input type="password" id="password" name="password" class="form-control" placeholder="Enter password" required>
                <div class="form-check">
                  <label>
                    <input type="checkbox" class="form-check-input" style="margin-bottom: 0px!important;" name="stayloggedin" id="stayloggedin" value="on" checked>
                    Stay logged in
                  </label>
                </div>
                <div class="row" style="margin-left : 0px!important; margin-right: 0px!important;padding-left: 10px;">
                  <p class="password" style="text-align:center;"><a href="" data-toggle="modal">Forget Password?</a></p>
                </div>
              </div>
            </div>
          </div>
          <h5 class="newAccount" style="text-align:center;"><a href="" style="font-size:20px; color:black;" data-toggle="modal">Need an
              account? Sign Up</a></h5>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- register -->
  <div class="modal fade" id="register" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div>
          <button style="padding: 15px;" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2 class="modal-title" style="padding-left: 15px;padding-top: 15px;">Create an
            account</h2>
        </div>
        <div class="alert alert-danger" id="user-exist">
          <strong> You allready have acoount with this email go back and change the email </strong>
        </div>
        <div class="alert alert-success" id="email-sent">
          <strong> wonderful! We send you an email to confirm your email address</strong>
        </div>

        <div class="row justify-content-center">
          <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_AXoQyR.json" background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay></lottie-player>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" id="form-register">
            <div style="padding-left: 20px;">
              <div class="row">
                <div class="col-4">
                  <label for="email" class="col-sm-4 control-label">Email:</label>
                </div>
                <div class="col-8 col-sm-5">
                  <input type="text" id="email" name="email" class="form-control" placeholder="Enter email" required>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <label for="nickname" class="col-sm-4 control-label">nickname:</label>
                </div>
                <div class="col-8 col-sm-5" style="padding-top: 10px;">
                  <input type="text" id="nickname" name="nickname" class="form-control" placeholder="Enter nickname">
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <label for="phone" class="col-sm-4 control-label">phone:</label>
                </div>
                <div class="col-8 col-sm-5" style="padding-top: 10px; padding-bottom: 10px;">
                  <input type="text" id="phone" name="phone" class="form-control" placeholder="Enter phone number">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" id="saveAccount" class="btn btn-primary">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- send a new password -->
  <div class="modal fade" id="passwordMail" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div>
          <button style="padding: 15px;" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2 class="modal-title" style="padding-left: 15px;padding-top: 15px;">Send a new password</h2>
        </div>
        <div class="alert alert-success" id="mail-password">
          <strong> We send you your new password to the mail </strong>
        </div>
        <div class="row justify-content-center">
          <lottie-player src="https://assets7.lottiefiles.com/private_files/lf30_GjhcdO.json" background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay></lottie-player>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" id="MailPassword">
            <div style="padding-left: 20px;">
              <div class="row">
                <div class="col-4">
                  <label for="email" class="col-sm-4 control-label">Email:</label>
                </div>
                <div class="col-8 col-sm-5" style="padding-bottom: 20px;">
                  <input type="text" id="emailPassword" name="email" class="form-control" placeholder="Enter email" required>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" id="sendMail" value="Submit" class="btn btn-primary">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- password -->
  <div class="modal fade" id="passwordPage" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div>
          <button style="padding: 15px;" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2 class="modal-title" style="padding-left: 15px;padding-top: 15px;">Create an
            account</h2>
        </div>
        <div class="alert alert-success" id="user-created">
          <strong> wonderful! You success to create an account! </strong>
        </div>
        <div class="row justify-content-center">
          <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_IQ2Fuq.json" background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay></lottie-player>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" id="formPassword">
            <div style="padding-left: 20px;">
              <div class="row">
                <div class="col-3 col-sm-4">
                  <label for="registerpassword" class="control-label" required>password:</label>
                </div>
                <div class="col-8 col-sm-5">
                  <input type="password" id="registerpassword" name="registerpassword" class="form-control" placeholder="Enter password">
                </div>
              </div>
              <div class="row">
                <div class="col-3 col-sm-4">
                  <label for="confirmPassword" class="control-label" required>confirm:</label>
                </div>
                <div class="col-8 col-sm-5" style="padding-top: 10px; padding-bottom: 10px;">
                  <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" placeholder="Enter password">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" id="savePassword" value="Submit" class="btn btn-primary">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--log failed modal -->
  <div class="modal fade" id="loginProblem" tabindex="-1" role="dialog">
    <div class="modal-dialog  modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">login problem</h5>
          <button style="padding: 15px;" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Login Failed wrong username or password.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--adding family list failed modal -->
  <div class="modal fade" id="addingFamilyListProblem" tabindex="-1" role="dialog">
    <div class="modal-dialog  modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">login problem</h5>
          <button style="padding: 15px;" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Adding share list failed you have allready have list with the same name</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Optional JavaScript -->
  <!-- jQuery first -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" />
  <script src="index.js"></script>

  <script>
    <?php if ($log) : ?>
      $(document).ready(function() {
        <?php if ($log === 'view') : ?>
          $('#loginProblem').find('.modal-body').text(`You must be logged in in order to view the page`)
          $("#loginProblem").modal('show');
        <?php endif; ?>
        <?php if ($log === 'fail') : ?>
          $("#loginProblem").modal('show');
        <?php endif; ?>
        <?php if ($log === 'password') : ?>
          $("#passwordPage").modal('show');
        <?php endif; ?>
        <?php if ($log === 'addingFamilyList') {
          require_once("db.php");
          $idCreator = htmlspecialchars($_GET["idCreator"]);
          $listId = htmlspecialchars($_GET["listId"]);
          $listName = htmlspecialchars($_GET["listName"]);
          $idUsers = $email;
          if ($idCreator !== $idUsers) { // checking if the user is not the creator of the share list
            $sql = "SELECT * FROM lists WHERE listName = '$listName' && email = '$email'"; // checking if the user dont have allready a list with the same name
            $result = $conn->query($sql);
            if (!($result && $result->num_rows > 0)) {
              $sql = "SELECT * FROM FamilyLists WHERE idCreator= '$idCreator' && idUsers= '$idUsers'  && listId= '$listId'"; //checking if the user allredy added this share list
              $result = $conn->query($sql);
              if (!($result && $result->num_rows > 0)) {
                $sql = "INSERT INTO `FamilyLists`(`listId`,`idCreator`,`idUsers`,`listName`)VALUES ('$listId','$idCreator','$idUsers','$listName')";
                if ($conn->query($sql) === TRUE) {
                  echo "";
                } else {
                  echo "didnt created ";
                }
                $conn->close();
              } else {
                echo "didnt created ";
              }
            } else {
              $flag = true;
              // $("#addingFamilyListProblem").modal('show');
            }
          }
        }
        ?>

      });
    <?php endif; ?>
  </script>

  <?php require_once "../parts/footer.php"; ?>
</body>