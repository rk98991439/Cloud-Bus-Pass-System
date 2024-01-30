<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // TODO: Add validation and error handling here

    // Authenticate the user and log them in
    // For this example, we will just print the data
    echo "Email: $email<br>Password: $password";
}
?>
