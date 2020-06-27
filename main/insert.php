<?php
 require_once('db.php');
 var_dump($_POST);

$Productname=$_POST['name-of-product'];
$amount=$_POST['product-amount'];
$sql="INSERT INTO `productlist`(`Productname`,`amount`,`statusProduct`)
VALUES ('$Productname','$amount','Need to buy')";

if ($conn->query($sql) === TRUE) {
    echo "customer created ";
}
else{
    echo "didnt  created ";

}

$conn->close();