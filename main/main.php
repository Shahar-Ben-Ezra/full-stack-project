 <?php
    require_once("db.php");
    session_start();

    if (isset($_SESSION['email'])) {
        $email = $_SESSION['email'];
    } else if (isset($_COOKIE['email'])) {
        $email = $_COOKIE['email'];
    } else {
        $email = null;
    }
    if (isset($_POST["email"])) {
        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST['password']);
        $sql = "SELECT * FROM users WHERE email= '$email' && password= '$password'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $_SESSION['email'] = $email;

            if ($_POST['stayloggedin'] == 'on') {
                setcookie('email', $email, time() + (60 * 60 * 24));
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

     <!-- lists && add product && add list -->
     <div class="container pt-3" id="start">
         <div class="row">
             <div class="col-12 col-md-10">
                 <select class="form-control form-control-sm" id="selectedOptions" style=" width:250px;  display: unset!important;">
                     <option value="" selected disabled hidden>Choose list</option>
                     <?php
                        $sql = "SELECT * FROM lists WHERE email= '$email'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                        ?>
                         <?php while ($row = $result->fetch_assoc()) : ?>
                             <option data-id=<?php echo $row['listId']; ?>><?= $row['listName']; ?></option>
                         <?php endwhile; ?>
                     <?php  } else {
                            echo "0 results";
                        }
                        ?>
                 </select>
                 <a href="#" id="listClick"><label style="cursor:pointer">Add a new list</label></a>
                 <div class="alert alert-danger" id="danger-alert">
                       <strong> You allready have a list with this name </strong>
                 </div>
                 <div class="row">
                     <div class="container py-2 col-12" id="addingNewListSection">
                         <form class="form-inline" id="addNewListName">
                             <label for="nameOfNewList">A new list name:</label>
                             <input type="text" class="mx-3 mb-2 mr-sm-2" id="nameOfNewList" name="nameOfNewList" required>
                             <input type="submit" value="add" class="btn btn-primary mx-3 mx-md-2 mb-2" />
                             <a href="#" id="cancelAddList"><label style="cursor:pointer">Cancel</label></a>
                         </form>
                     </div>
                 </div>
                 <button type="button" data-toggle="modal" id="addNewProduct" data-target="#addingProductModal" class="btn btn-primary">Add
                     New
                     product</button>
             </div>
             <div class="col-12 col-sm-1" id="lottieHide">
                 <script src="https://unpkg.com/@lottiefiles/lottie-player@0.5.1/dist/lottie-player.js"></script>
                 <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_pHl01w.json" background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay></lottie-player>
             </div>
         </div>
         <!-- table -->
         <div class="container" id="notPadding">
             <div class="row">
                 <div class="col-md-9 col-12 " style="margin-top:10px">
                     <!-- html_master   last id  -->
                     <table class="table table-bordered" id="products">
                         <thead>
                             <tr>
                                 <th scope="col">Product Name</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Status</th>
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
             <div class="col text-center">
                 <div class="row justify-content-center ">
                     <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_EMTsq1.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>
                 </div>
                 <h2 class="animate__animated animate__zoomInDown" style="  color:white;">No product in your list</h2>
             </div>
         </div>
     </div>

     <!--log out modal -->
     <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logout" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title">Logout</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
                 <div class="modal-body">
                     <p>Do you want to logout?</p>
                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                     <button type="button" id="logountBtn" class="btn btn-primary">Yes</button>
                 </div>
             </div>
         </div>
     </div>
     <!--deleting product modal -->
     <div class="modal fade" id="deletingProductModal" tabindex="-1" role="dialog" aria-labelledby="deletingProduct" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title">Deleting</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
     <!--adding products from current list to the new list that i just create -->
     <div class="modal fade" id="addingProductFromCurrentList" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="deletingProduct" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title">Adding products from current list</h5>
                     <button type="button" class="close exitFromModalWitoutDuplicate" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
                 <div class="modal-body">
                     <p>Do you want to add all products from current list?</p>
                     <select class="form-control form-control-sm" id="selectedOptionsModal" style=" width:250px; display: unset!important;">
                         <?php
                            $sql = "SELECT * FROM lists WHERE email= '$email'";
                            $result = $conn->query($sql);
                            if ($result->num_rows > 0) {
                            ?>
                             <?php while ($row = $result->fetch_assoc()) : ?>
                                 <option data-id=<?php echo $row['listId']; ?>><?= $row['listName']; ?></option>
                             <?php endwhile; ?>
                         <?php  } else {
                                echo "0 results";
                            }
                            ?>
                     </select>
                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-secondary exitFromModalWitoutDuplicate" data-dismiss="modal">No</button>
                     <button type="button" id="addingProductsFrom1list2Another" class="btn btn-primary">Yes</button>
                 </div>
             </div>
         </div>
     </div>
     <!--adding product modal -->
     <div class="modal" id="addingProductModal" tabindex="-1" role="dialog" aria-labelledby="adding Product" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title">Add product</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
                 <div class="modal-body">
                     <form id="addProduct" autocomplete="off">
                         <div class="row">
                             <div class="col-6">
                                 <label for="name-of-product">Product name:</label>
                                 <div class="autocomplete row">
                                     <input name="name-of-product" type="text" class=" mx-3 mb-2 mr-sm-2 " id="name-of-product" style=" width:170px;" required>
                                 </div>
                             </div>
                             <div class="col-6" style="padding-left: 30px;">
                                 <label for="product-amount">Amount:</label>
                                 <div class="row">
                                     <input type="number" class=" mx-3 mb-2 mr-sm-2" style=" width:100px;" id="product-amount" required name="product-amount">
                                 </div>
                             </div>
                             <input type="submit" value="add" class="btn btn-primary mx-3 mx-md-0 mb-2 btnSubmit d-none" />
                         </div>
                     </form>

                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                     <button type="button" id="addProductBtn" class="btn btn-primary">Add</button>
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

     <script src="main.js"></script>

     <?php require_once "../parts/footer.php"; ?>

 </body>