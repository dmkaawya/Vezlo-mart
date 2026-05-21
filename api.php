<?php
// ==========================================
// VEZLO MART - SECURE PHP API BACKEND
// ==========================================

header("Access-Control-Allow-Origin: *"); // Change * to your Vercel URL in production
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

// YOUR SECRET SUPABASE CREDENTIALS (HIDDEN FROM FRONTEND)
 $SUPABASE_URL = "YOUR_SUPABASE_URL";
 $SUPABASE_SECRET_KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY"; // Use Service Role key for full access, or Anon key with RLS

// Helper to make cURL requests to Supabase
function supabaseRequest($endpoint, $method = 'GET', $data = null, $token = null) {
    global $SUPABASE_URL, $SUPABASE_SECRET_KEY;
    
    $url = $SUPABASE_URL . "/rest/v1/" . $endpoint;
    $headers = [
        "apikey: " . $SUPABASE_SECRET_KEY,
        "Content-Type: application/json",
        "Prefer: return=representation"
    ];

    if ($token) {
        $headers[] = "Authorization: Bearer " . $token;
    } else {
        // If no user token, use service role for admin tasks
        $headers[] = "Authorization: Bearer " . $SUPABASE_SECRET_KEY;
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// ROUTING
 $action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'getProducts':
        $result = supabaseRequest('products?select=*');
        echo json_encode($result);
        break;

    case 'login':
        // Supabase Auth API for login
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $authUrl = $SUPABASE_URL . "/auth/v1/token?grant_type=password";
        $ch = curl_init($authUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "apikey: " . $SUPABASE_SECRET_KEY,
            "Content-Type: application/json"
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["email" => $email, "password" => $password]));
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        echo $response; // Returns access_token and user info
        break;

    default:
        echo json_encode(["error" => "Invalid API Action"]);
}
?>
