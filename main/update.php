<?php
 require_once('db.php');
$id=$_GET['id'];
$status=$_GET['statusProduct'];
$statusToSend='';
if ($status==='Need to buy'){
    $statusToSend='bought';
}else{
    $statusToSend='Need to buy';
}

var_dump($statusToSend);
var_dump($id);

$sql="UPDATE `productlist` 
SET `statusProduct`='$statusToSend'  
WHERE id=$id" ;
 
 if ($conn->query($sql) === TRUE) {
    header("location:main.php");
}
else{
    echo "didnt  created ";

}

$conn->close();