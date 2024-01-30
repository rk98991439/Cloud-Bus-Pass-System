<?php
$servername = "localhost";
$username = "phpmyadmin";
$password = "password";
$database = "login";

// Create a database connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check for connection success
if (!$conn) {
  die("connection to this database failed due to" . mysqli_connect());
}

// Check if form submitted for sign up
if(isset($_POST['signup-submit'])) {
    // Collect post variables
    $username = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email already exists
    $check_query = "SELECT email FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $check_query);
    if (mysqli_num_rows($result) > 0) {
        echo "ERROR: User already exists with email $email";
    } else {
        // Insert new user
        $sql = "INSERT INTO users (name, password, email) VALUES ('$username', '$password','$email')";
        if ($conn->query($sql) === true) {
            // Flag for successful insertion
            $insert = true;
            echo "Successfully inserted";
        } else {
            echo "ERROR: $sql <br> $conn->error";
        }
    }
}

// Close database connection
mysqli_close($conn);
?>

