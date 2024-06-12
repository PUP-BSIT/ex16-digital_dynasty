<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demon_slayer_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        fetchCharacters();
        break;
    case 'POST':
        insertCharacter();
        break;
    case 'DELETE':
        deleteCharacter();
        break;
    case 'PATCH':
        updateCharacter();
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

function fetchCharacters() {
    global $conn;
    $sql = "SELECT * FROM characters";
    $result = $conn->query($sql);
    
    $characters = [];
    while ($row = $result->fetch_assoc()) {
        $characters[] = $row;
    }
    
    echo json_encode($characters);
}

function insertCharacter() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['character_name']) || empty($data['role']) || empty($data['breathing_style']) || empty($data['rank']) || empty($data['age'])) {
        echo json_encode(["error" => "All fields are required"]);
        return;
    }
    
    $character_name = $conn->real_escape_string($data['character_name']);
    $role = $conn->real_escape_string($data['role']);
    $breathing_style = $conn->real_escape_string($data['breathing_style']);
    $rank = $conn->real_escape_string($data['rank']);
    $age = $conn->real_escape_string($data['age']);
    
    $sql = "INSERT INTO characters (character_name, role, breathing_style, rank, age) VALUES ('$character_name', '$role', '$breathing_style', '$rank', '$age')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Character added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
}

function deleteCharacter() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    
    if (empty($id)) {
        echo json_encode(["error" => "ID is required"]);
        return;
    }
    
    $sql = "DELETE FROM characters WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Character deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
}

function updateCharacter() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['id']) || empty($data['character_name']) || empty($data['role']) || empty($data['breathing_style']) || empty($data['rank']) || empty($data['age'])) {
        echo json_encode(["error" => "All fields are required"]);
        return;
    }
    
    $id = $conn->real_escape_string($data['id']);
    $character_name = $conn->real_escape_string($data['character_name']);
    $role = $conn->real_escape_string($data['role']);
    $breathing_style = $conn->real_escape_string($data['breathing_style']);
    $rank = $conn->real_escape_string($data['rank']);
    $age = $conn->real_escape_string($data['age']);
    
    $sql = "UPDATE characters SET character_name='$character_name', role='$role', breathing_style='$breathing_style', rank='$rank', age='$age' WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Character updated successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
}

$conn->close();