//Evento - DOMContentLoaded é acionado quando todo o HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const menuResponsivo = document.getElementById('menuResponsivo');
    const navMenu = document.getElementById('nav-menu');

    // 1. Alterna o menu mobile ao clicar no botão hambúrguer
    menuResponsivo.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 2. Fecha o menu mobile ao clicar em qualquer item da navegação
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Lógica do Carrossel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Eventos dos botões
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Eventos das bolinhas
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Inicia a transição automática
    startAutoSlide();

    //Formulario
    const form = document.getElementById('contato-form');
    const nomeInput = document.getElementById('nomeInput');
    const emailInput = document.getElementById('emailInput');
    const mensagemInput = document.getElementById('mensagemInput');

    form.addEventListener('submit', (event) => {
        // Impede o envio padrão do formulário (recarregar página)
        event.preventDefault();

        // Limpa erros anteriores
        clearErrors();

        let isValid = true;

        // 1. Validação do Nome (mínimo 3 caracteres)
        if (nomeInput.value.trim().length < 3) {
            showError(nomeInput, 'O nome deve ter pelo menos 3 caracteres.');
            isValid = false;
        }

        // 2. Validação do E-mail (expressão regular)
        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Insira um e-mail válido.');
            isValid = false;
        }

        // 3. Validação da Mensagem (mínimo 10 caracteres)
        if (mensagemInput.value.trim().length < 10) {
            showError(mensagemInput, 'A mensagem deve conter pelo menos 10 caracteres.');
            isValid = false;
        }
     

        // Se tudo estiver correto
        if (isValid) {
            // Limpa erros anteriores
            clearErrors();
            alert('Mensagem enviada com sucesso!');
            form.reset(); // Limpa os campos
        }
    });

    // Função para validar formato do e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

   // Remove a mensagem e a borda vermelha assim que o usuário interage com o campo
    [nomeInput, emailInput, mensagemInput].forEach(input => {
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });

// Função para exibir mensagem de erro (evita duplicar mensagens)
function showError(inputElement, message) {
    const formGroup = inputElement.parentElement;
    
    // Limpa erro existente apenas deste campo antes de adicionar o novo
    clearFieldError(inputElement);

    inputElement.classList.add('input-error');

    const errorMessage = document.createElement('small');
    errorMessage.className = 'error-text';
    errorMessage.innerText = message;
    formGroup.appendChild(errorMessage);
}

// Função para limpar o erro de UM campo específico
function clearFieldError(inputElement) {
    const formGroup = inputElement.parentElement;
    inputElement.classList.remove('input-error');
    
    const existingError = formGroup.querySelector('.error-text');
    if (existingError) {
        existingError.remove();
    }
}

// Função para limpar TODOS os erros do formulário
function clearErrors() {
    document.querySelectorAll('.error-text').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}
});

