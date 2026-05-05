/**
 * Ecosistema de Aprendizaje de Excel con IA
 * Script Principal
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Loader Inicial
    // ==========================================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Trigger initial animations after loader disappears
        setTimeout(initScrollAnimations, 100);
    }, 1500);

    // ==========================================
    // 2. Navbar & Menú Móvil
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-xmark');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // ==========================================
    // 3. Theme Toggle (Modo Oscuro/Claro)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const icon = themeToggle.querySelector('i');
        
        if (currentTheme === 'light') {
            htmlEl.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            htmlEl.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // ==========================================
    // 4. Typing Effect (Hero Section)
    // ==========================================
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ["Excel con IA", "Análisis de Datos", "Competencias Digitales"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    // Create cursor
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('typed-cursor');
    cursorSpan.textContent = '|';
    typedTextSpan.parentNode.insertBefore(cursorSpan, typedTextSpan.nextSibling);

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing effect after loader
    setTimeout(() => {
        typedTextSpan.textContent = '';
        type();
    }, 1600);

    // ==========================================
    // 5. Scroll Animations (Intersection Observer)
    // ==========================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    
                    // Si es un contador, inicializarlo
                    if (entry.target.classList.contains('stat-card') || entry.target.classList.contains('metrics-row')) {
                        const counters = entry.target.querySelectorAll('.counter');
                        counters.forEach(counter => animateCounter(counter));
                    }
                    
                    observer.unobserve(entry.target); // Solo animar una vez
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    }

    // ==========================================
    // 6. Contadores Animados
    // ==========================================
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    }

    // ==========================================
    // 7. Simulación del Tutor IA (Chatbot)
    // ==========================================
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Knowledge Base (Respuestas simuladas)
    const qaDatabase = {
        'buscarv': "La función **BUSCARV** te permite encontrar un valor en la primera columna de una tabla y devolver un valor en la misma fila de otra columna. \n\nSintaxis: `=BUSCARV(valor_buscado; matriz_tabla; indicador_columnas; [rango])`. ¿Te gustaría un ejemplo práctico?",
        'suma': "La función **SUMA** es una de las más básicas e importantes. Suma todos los números en un rango de celdas. \n\nEjemplo: `=SUMA(A1:A10)` sumará todos los valores desde la celda A1 hasta la A10. ¡Inténtalo en tu hoja!",
        'valor': "El error **#¡VALOR!** aparece cuando una fórmula espera un número pero encuentra texto o un formato incorrecto. Por ejemplo, si intentas sumar `=A1+B1` y A1 contiene la palabra 'Hola'. Revisa el formato de tus celdas.",
        'absolutas': "Las **referencias absolutas** sirven para fijar una celda en una fórmula para que no cambie al arrastrarla. Se usan los signos de dólar ($). \n\nEjemplo: `$A$1` siempre apuntará a A1, sin importar a dónde copies la fórmula.",
        'default': "Esa es una excelente pregunta. En nuestro entorno de aprendizaje, analizaríamos el archivo de Excel en el que estás trabajando para darte una respuesta contextualizada. ¿Hay alguna otra función de la que quieras aprender hoy?"
    };

    // Add user message to chat
    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        msgDiv.innerHTML = `
            <div class="msg-avatar"><i class="fa-solid fa-user"></i></div>
            <div class="msg-content"><p>${text}</p></div>
        `;
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    }

    // Add bot message to chat
    function addBotMessage(text, isTyping = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        
        if (isTyping) {
            msgDiv.id = 'typing-indicator';
            msgDiv.innerHTML = `
                <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="msg-content"><p>Escribiendo<span class="typed-cursor">...</span></p></div>
            `;
        } else {
            // Eliminar indicador si existe
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();
            
            // Format bold text
            const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            msgDiv.innerHTML = `
                <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="msg-content"><p>${formattedText.replace(/\n/g, '<br>')}</p></div>
            `;
        }
        
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Handle user input
    function handleChatInput(text) {
        if (!text.trim()) return;
        
        // Clear input
        chatInput.value = '';
        
        // Show user message
        addUserMessage(text);
        
        // Show typing indicator
        setTimeout(() => {
            addBotMessage('', true);
            
            // Determine response based on keywords
            let responseKey = 'default';
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('buscarv') || lowerText.includes('buscar')) responseKey = 'buscarv';
            else if (lowerText.includes('suma') || lowerText.includes('sumar')) responseKey = 'suma';
            else if (lowerText.includes('valor') || lowerText.includes('error')) responseKey = 'valor';
            else if (lowerText.includes('absoluta') || lowerText.includes('$')) responseKey = 'absolutas';
            
            // Simulate network delay
            setTimeout(() => {
                addBotMessage(qaDatabase[responseKey]);
            }, 1500);
            
        }, 500);
    }

    // Event Listeners for Chat
    sendBtn.addEventListener('click', () => handleChatInput(chatInput.value));
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatInput(chatInput.value);
    });

    // Event Listeners for Suggestion Chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            handleChatInput(chip.innerText);
        });
    });
});
