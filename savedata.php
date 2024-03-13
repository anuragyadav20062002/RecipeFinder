<?php
header('Content-Type: application/json');

// Get the data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Validate and sanitize data (you should do more robust validation in a real application)
$name = isset($data['name']) ? htmlspecialchars($data['name']) : '';
$email = isset($data['email']) ? htmlspecialchars($data['email']) : '';
$favoriteRecipe = isset($data['favoriteRecipe']) ? htmlspecialchars($data['favoriteRecipe']) : '';

// Prepare data for JSON
$newData = [
    'name' => $name,
    'email' => $email,
    'favoriteRecipe' => $favoriteRecipe
];

// Load existing data from file if it exists
$existingData = [];
if (file_exists('data.json')) {
    $existingData = json_decode(file_get_contents('data.json'), true);
}

// Add new data to existing data
$existingData[] = $newData;

// Save the updated data back to the file
file_put_contents('data.json', json_encode($existingData, JSON_PRETTY_PRINT));

// Send a response
echo json_encode(["message" => "Data saved successfully"]);
?>
