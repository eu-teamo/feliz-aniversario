// Função para criar corações voando
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw'; // Posição horizontal aleatória
        heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // Duração aleatória
        heart.style.fontSize = Math.random() * 20 + 10 + 'px'; // Tamanho aleatório
        heartsContainer.appendChild(heart);

        // Remove o coração após a animação terminar
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Cria um novo coração a cada 300ms
    setInterval(createHeart, 300);
}

// Inicia a criação dos corações quando a página carregar
document.addEventListener('DOMContentLoaded', createHearts);

function contarData(){
    const data = new Date('2024-06-21T18:06:30');

    function atualizarData(){
        const dataAtual = new Date();
        const diferenca = dataAtual - data;

        //calcular a diferença de tempo em milissegundos
        const segundos = Math.floor(diferenca / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const anos = Math.floor(dias / 365.25); // Aproximando ano como 365.25 dias
        const meses = Math.floor((dias % 365.25) / 30); // Aproximando mês como 30 dias

        //exibir
        alert(`Eu te amo há ${anos} anos, ${meses} meses, ${dias % 30} dias, ${horas % 24} horas, ${minutos % 60} minutos e ${segundos % 60} segundos.`);
    }

    atualizarData();
}


function abrirCarta() {
    document.querySelector('.envelope').classList.toggle('aberto');
}

// ---------------- CARROSSEL INFINITO ---------------- //

document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideWidth = window.innerWidth; // Agora pega a largura da tela corretamente

    // Define a largura exata do carrossel e dos slides
    function ajustarLargura() {
        slideWidth = window.innerWidth; // Atualiza com a largura correta da tela
        carrossel.style.width = `${totalSlides * slideWidth}px`;
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        carrossel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }

    ajustarLargura();
    window.addEventListener('resize', ajustarLargura);

    function moveSlide(n) {
        slideIndex += n;

        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 1;
        }

        carrossel.style.transition = 'transform 0.5s ease-in-out';
        carrossel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }

    // Iniciar autoplay
    let autoSlide = setInterval(() => moveSlide(1), 3000);

    // ---------------- TOQUE / MOUSE PARA MOVER ---------------- //

    let startX = 0;
    let isTouching = false;

    function startTouch(e) {
        clearInterval(autoSlide);
        isTouching = true;
        startX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    }

    function moveTouch(e) {
        if (!isTouching) return;
        let endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

        if (startX - endX > 50) {
            moveSlide(1);
            isTouching = false;
        } else if (endX - startX > 50) {
            moveSlide(-1);
            isTouching = false;
        }
    }

    function endTouch() {
        isTouching = false;
        autoSlide = setInterval(() => moveSlide(1), 3000);
    }

    // Eventos para toque/mouse
    const carrosselContainer = document.querySelector('.fotos');
    carrosselContainer.addEventListener('touchstart', startTouch);
    carrosselContainer.addEventListener('touchmove', moveTouch);
    carrosselContainer.addEventListener('touchend', endTouch);
    carrosselContainer.addEventListener('mousedown', startTouch);
    carrosselContainer.addEventListener('mousemove', moveTouch);
    carrosselContainer.addEventListener('mouseup', endTouch);
});
