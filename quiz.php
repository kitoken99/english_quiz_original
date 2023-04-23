<?php

$selectedKindValues = json_decode($_GET['selectedKindValues']);


$host = $_ENV['HOST'];
$user = $_ENV['USER'];
$password = $_ENV['PASSWORD'];
$database = "DATABASE";


$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (in_array("全範囲", $selectedKindValues)) {
    $result = mysqli_query($conn, "SELECT * FROM listenning");
}
else {
    $query = "SELECT * FROM listenning WHERE type IN ('" . implode("','", $selectedKindValues) . "')";
    $result = mysqli_query($conn, $query);
}
$data = array();

// Loop through the result set and add each row to the array
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Convert the array to JSON format
$json = json_encode($data);

// Set the content type header to JSON
header('Content-Type: application/json');

// Output the JSON data
echo $json;

// Close the connection
mysqli_close($conn);
?>