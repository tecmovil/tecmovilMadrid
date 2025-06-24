// Esperamos a que cargue todo el DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todas las funcionalidades
    initCardAnimations();
    initButtonTracking();
    initScrollAnimations();
    
});

// Animaciones mejoradas para las tarjetas de locales
function initCardAnimations() {
    const cards = document.querySelectorAll('.local-card');
    
    cards.forEach(card => {
        // Efecto hover con transformación suave
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto de pulso sutil en el foco (accesibilidad)
        card.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(102, 126, 234, 0.5)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Tracking de interacciones para análisis y optimización
function initButtonTracking() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonType = this.classList.contains('btn-whatsapp') ? 'WhatsApp' : 'Teléfono';
            const buttonText = this.textContent.trim();
            
            // Log para debugging (puedes integrarlo con Google Analytics)
            console.log('Interacción registrada:', {
                tipo: buttonType,
                texto: buttonText,
                timestamp: new Date().toISOString(),
                url: this.href
            });
            
            // Aquí puedes agregar código de tracking real
            // Ejemplo: gtag('event', 'click', { event_category: 'contact', event_label: buttonType });
            
            // Efecto visual de confirmación
            showClickFeedback(this);
        });
        
        // Mejora la accesibilidad con navegación por teclado
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Feedback visual cuando se hace clic en un botón
function showClickFeedback(button) {
    const originalText = button.innerHTML;
    const isWhatsApp = button.classList.contains('btn-whatsapp');
    
    // Cambiar temporalmente el contenido
    if (isWhatsApp) {
        button.innerHTML = `
            <svg class="whatsapp-icon animate-spin" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Abriendo WhatsApp...
        `;
    } else {
        button.innerHTML = `
            <svg class="phone-icon animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            Iniciando llamada...
        `;
    }
    
    // Restaurar el contenido original después de 1.5 segundos
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 1500);
}

// Animaciones basadas en scroll para mejor experiencia
function initScrollAnimations() {
    // Observer para elementos que entran en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    const animatableElements = document.querySelectorAll('.local-card, .contact-section');
    animatableElements.forEach(el => observer.observe(el));
}

// Función utilitaria para validar números de teléfono (opcional)
function validatePhoneNumber(phone) {
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Función para generar enlaces de WhatsApp dinámicos (opcional)
function generateWhatsAppLink(phone, message = '') {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
}

// Manejo de errores global para mejor debugging
window.addEventListener('error', function(e) {
    console.error('Error en landing page:', {
        message: e.message,
        source: e.filename,
        line: e.lineno,
        column: e.colno,
        timestamp: new Date().toISOString()
    });
});

// Optimización de rendimiento: lazy loading de imágenes (si las agregas)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Función para optimizar para Google Ads (métricas de carga)
function trackPagePerformance() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log('Página cargada en:', Math.round(loadTime), 'ms');
        
        // Puedes enviar esta métrica a Google Analytics
        // gtag('event', 'timing_complete', {
        //     name: 'load',
        //     value: Math.round(loadTime)
        // });
    });
}