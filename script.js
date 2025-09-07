document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas de fondo
    createParticles();
    
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('message');
    
    // Validar entrada de teléfono (solo números)
    document.getElementById('telefono').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        
        // Validaciones
        if (!nombre) {
            showMessage('Por favor, ingrese su nombre completo.', 'error');
            return;
        }
        
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
            showMessage('El nombre solo puede contener letras, espacios y caracteres especiales como tildes y ñ.', 'error');
            return;
        }
        
        if (!telefono) {
            showMessage('Por favor, ingrese su teléfono.', 'error');
            return;
        }
        
        if (!/^[0-9]{10}$/.test(telefono)) {
            showMessage('El teléfono debe tener exactamente 10 dígitos.', 'error');
            return;
        }
        
        // Enviar datos al servidor
        enviarDatos(nombre, telefono);
    });
    
    function enviarDatos(nombre, telefono) {
        // Aquí normalmente harías una petición AJAX a un servidor PHP
        // Para este ejemplo, simularemos el envío
        
        showMessage('Enviando datos...', 'success');
        
        // Simular envío a servidor (reemplazar con código real)
        setTimeout(() => {
            // En un caso real, aquí se conectaría con PHP que guarda en MySQL
            console.log('Datos a guardar:', { nombre, telefono });
            
            // Simular éxito
            showMessage('¡Datos guardados correctamente en la base de datos!', 'success');
            form.reset();
        }, 1500);
    }
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'neon-message ' + type;
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.className = 'neon-message';
        }, 5000);
    }
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Tamaño y posición aleatorios
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.top = `${posY}vh`;
            particle.style.animationDelay = `${delay}s`;
            
            // Color aleatorio (neon)
            const colors = ['#0ff', '#f0f', '#ff0', '#0f0'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = randomColor;
            
            particlesContainer.appendChild(particle);
        }
    }
});
