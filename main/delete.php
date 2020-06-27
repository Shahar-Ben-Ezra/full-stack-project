<?php
 require_once('db.php');
$id=$_GET['id'];

$sql="DELETE FROM `productlist` 
WHERE id=$id" ;
  
 if ($conn->query($sql) === TRUE) {
    header("location:main.php");
}
else{
    echo "didnt  created ";

}

$conn->close();