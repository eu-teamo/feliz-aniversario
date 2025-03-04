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


let slideIndex = 0;
let isTouching = false;
let startX = 0;
let endX = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Função para mover os slides
function moveSlide(n) {
    slideIndex += n;

    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;  // Volta para o último slide
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;  // Volta para o primeiro slide
    }

    // Atualiza a posição do carrossel
    const carrossel = document.querySelector('.carrossel');
    carrossel.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Iniciar o carrossel automaticamente a cada 2 segundos
setInterval(() => moveSlide(1), 2000);

// Funções de toque
function startTouch(e) {
    isTouching = true;
    startX = e.changedTouches[0].screenX;
}

function moveTouch(e) {
    if (!isTouching) return;
    endX = e.changedTouches[0].screenX;
    if (startX - endX > 50) {
        moveSlide(1);  // Deslizar para a esquerda (próximo slide)
        isTouching = false;
    } else if (endX - startX > 50) {
        moveSlide(-1); // Deslizar para a direita (slide anterior)
        isTouching = false;
    }
}

function endTouch() {
    isTouching = false;
}

// Adiciona os eventos de toque
const carrosselContainer = document.querySelector('.fotos');
carrosselContainer.addEventListener('touchstart', startTouch);
carrosselContainer.addEventListener('touchmove', moveTouch);
carrosselContainer.addEventListener('touchend', endTouch);

// Adiciona os eventos de mouse para desktop
carrosselContainer.addEventListener('mousedown', startTouch);
carrosselContainer.addEventListener('mousemove', moveTouch);
carrosselContainer.addEventListener('mouseup', endTouch);
