<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "webBDD";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Recibir y validar datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = trim($_POST['nombre']);
    $telefono = trim($_POST['telefono']);
    
    // Validar nombre (permite letras, espacios, tildes y ñ)
    if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/", $nombre)) {
        echo json_encode(["success" => false, "message" => "Nombre inválido"]);
        exit;
    }
    
    // Validar teléfono (10 dígitos)
    if (!preg_match("/^[0-9]{10}$/", $telefono)) {
        echo json_encode(["success" => false, "message" => "Teléfono inválido"]);
        exit;
    }
    
    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare("INSERT INTO contactos (nombre_completo, telefono) VALUES (?, ?)");
    $stmt->bind_param("ss", $nombre, $telefono);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Datos guardados correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al guardar: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}

$conn->close();
?>
