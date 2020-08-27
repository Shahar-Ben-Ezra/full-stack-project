<?php
require_once("db.php");
session_start();
//isset — Determine if a variable is declared and is different than NULL
if (isset($_SESSION['email'])) {
    $email = $_SESSION['email'];
} else if (isset($_COOKIE['email'])) {
    $email = $_COOKIE['email'];
} else {
    $email = null;
}
if (isset($_POST["email"])) {
    //htmlspecialchars — Convert special characters to HTML entities
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);
    $sql = "SELECT  password  FROM users WHERE email= '$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        if (password_verify($password, $data['password'])) {
            $_SESSION['email'] = $email;
            if (isset($_POST['stayloggedin'])) {
                setcookie('email', $email, time() + (60 * 60 * 24));
            }
        } else {
            header("Location:index.php?status=fail");
        }
    } else {
        header("Location:index.php?status=fail");
    }
}
if (is_null($email)) {
    header("Location:index.php?status=showMsg");
}
?>

<?php require_once "../parts/header.php"; ?>

<body>

    <input type="hidden" value="<?= $email ?>" class="user_email">
    <!-- lists -->
    <div class="container pt-3" id="start">
        <h4 class="welcome" style="text-align: center; margin-bottom:18px">Welcome <small> You are logged in with <?= $email ?></small> </h4>
        <div class="row">
            <div class="col-12 col-md-10">
                <select class="autocomplete" id="selectedOptions" style=" width:250px;  display: unset!important;">
                    <option value="" selected disabled hidden>Choose list</option>
                    <?php
                    $sql = "SELECT * FROM FamilyLists WHERE idCreator= '$email' && idUsers ='$email'";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                    ?>
                        <?php while ($row = $result->fetch_assoc()) : ?>
                            <option data-name=<?php echo $row['listName']; ?> data-id=<?php echo $row['listId']; ?>><?= $row['listName']; ?></option>
                        <?php endwhile; ?>
                    <?php } else {
                        echo "0 results";
                    }
                    ?>
                </select>
            </div>
        </div>
        <!-- table -->
        <div class="container" id="notPadding">
            <div class="row">
                <div class="col-md-9 col-12 " style="margin-top:10px">
                    <table class="table table-bordered" id="usersShare">
                        <thead>
                            <tr>
                                <th scope="col">Family member</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- lottie animate -->
        <div class="col justify-content-center" id="emptyTable" style="padding-bottom: 15px;">
            <div class="col text-center" `>
                <div class="row justify-content-center ">
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@0.5.1/dist/lottie-player.js"></script>
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_EMTsq1.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>
                </div>
                <h2 class="animate__animated animate__zoomInDown welcome">You didnt share the list</h2>
            </div>
        </div>
    </div>

    <!--Stop share modal -->
    <div class="modal fade" id="deletingshareUserModal" tabindex="-1" role="dialog" aria-labelledby="deletingProduct" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Stop sharing</h5>
                    <button style="padding: 15px;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Delete Product ?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="deleteProductBtn" class="btn btn-primary">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="shareList.js"></script>

    <?php require_once "../parts/footer.php"; ?>

</body>