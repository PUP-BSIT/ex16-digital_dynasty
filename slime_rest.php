<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$database = "slime_table";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM slime_table";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $output = array();
        while ($row = $result->fetch_assoc()) {
            $output[] = $row;
        }
        echo json_encode($output);
    } else {
        echo json_encode(array("error" => "No characters found"));
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $character = $data['character'];
    $species = $data['species'];
    $from_where = $data['from_where'];
    $rank = $data['rank'];
    $title = $data['title'];

    $sql = "INSERT INTO slime_table (character, species, from_where, rank, title) VALUES ('$character', '$species', '$from_where', '$rank', '$title')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Character added successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $conn->error));
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];

    $sql = "DELETE FROM slime_table WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Character deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $conn->error));
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "PATCH") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $character = $data['character'];
    $species = $data['species'];
    $from_where = $data['from_where'];
    $rank = $data['rank'];
    $title = $data['title'];

    $sql = "UPDATE slime_table SET character='$character', species='$species', from_where='$from_where', rank='$rank', title='$title' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Character updated successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $conn->error));
    }
}

$conn->close();
?>
 