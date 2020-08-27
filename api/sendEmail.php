<?php
date_default_timezone_set('Etc/UTC');

// Edit this path if PHPMailer is in a different location.
require '../main/db.php';
require '../phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->isSMTP();

/*
* Server Configuration
*/
$mail->SMTPDebug = 3;
$mail->Host = 'smtp.gmail.com'; // Which SMTP server to use.
$mail->Port = 587; // Which port to use, 587 is the default port for TLS security.
$mail->SMTPSecure = 'tls'; // Which security method to use. TLS is most secure.
$mail->SMTPAuth = true; // Whether you need to login. This is almost always required.
$mail->Username = "petekShahar2020@gmail.com"; // Your Gmail address.
$mail->Password = "A13245768"; // Your Gmail login password or App Specific Password.

/*
* Message Configuration
*/
$mail->setFrom('petekShahar2020@gmail.com', 'Petek: Register'); // Set the sender of the message.
if (isset($_POST['userEmail'])) {
  if ($_POST['email'] !== $_POST['userEmail']) {
    $mail->addAddress($_POST['email']);
  }
} else {
  $mail->addAddress($_POST['email']); // Set the recipient of the message.
}

$mail->Subject = 'Welcome to Petek'; // The subject of the message.
/*
* Message Content - Choose simple text or HTML email
*/
$email = $_POST['email'];
// Choose to send either a simple text email...
if (isset($_POST['password'])) {
  $mail->Subject = 'repassword'; // The subject of the message.
  $password = rand(10000, 1000000000000);
  $mail->Body = "Your new password is: $password  to user  $email";
  $passwordEncryped = password_hash($password, PASSWORD_DEFAULT);

  $sql = "UPDATE `users` 
  SET `password`='$passwordEncryped'  
  WHERE email='$email'";
  if ($conn->query($sql) === TRUE && $mail->send()) {
    echo "Your message was sent successfully!";
  } else {
    echo json_encode($conn->error);
  }
} else if (isset($_POST['familyEmail']) && isset($_POST['listId'])) {
  $mail->addAddress($_POST['familyEmail']); // Set the recipient of the message.
  $name = $_POST['name'];
  $mail->Subject = "Invitation from $name"; // The subject of the message.
  $email = $_POST['email'];
  $listId = $_POST['listId'];
  $listName = $_POST['listName'];
  $mail->Body = "Your friend $name send you invitation to his list market you need to login and then click the link  http://localhost/HW34_308074186/main/index.php?idCreator=$email&listId=$listId&listName=$listName";
  if ($mail->send()) {
    echo "Your message was sent successfully!";
  } else {
    echo "Mailer Error: " . $mail->ErrorInfo;
  }
} else {
  $nickname = $_POST['nickname'];
  $phone = $_POST['phone'];
  $mail->Body = "To complete your registration you need to set your password http://localhost/HW34_308074186/main/index.php?status=password&email=$email&nickname=$nickname&phone=$phone";
  if ($mail->send()) {
    echo "Your message was sent successfully!";
  } else {
    echo "Mailer Error: " . $mail->ErrorInfo;
  }
}
// ... or send an email with HTML.
//$mail->msgHTML(file_get_contents('contents.html'));
// Optional when using HTML: Set an alternative plain text message for email clients who prefer that.
//$mail->AltBody = 'This is a plain-text message body';

// Optional: attach a file
// $mail->addAttachment('images/phpmailer_mini.png');

// if ($mail->send()) {
//   echo "Your message was sent successfully!";
// } else {
//   echo "Mailer Error: " . $mail->ErrorInfo;
// }
