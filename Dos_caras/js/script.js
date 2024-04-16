const totalCards = 12;
const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png'];
let cards = [];
let selectedCards = [];
let matchesFound = 0;
let currentAttempts = 0;

function initializeGame() {
   let gameArea = document.querySelector('#game');
   gameArea.innerHTML = ''; // Limpiar el área de juego previa
   let deck = [];

   // Duplicar cada imagen para crear pares
   images.forEach(img => {
       deck.push(img, img);
   });

   // Barajar el mazo
   deck.sort(() => Math.random() - 0.5);

   deck.forEach((imgSrc, index) => {
       let card = document.createElement('div');
       card.classList.add('card');
       card.innerHTML = `
           <div class="back"></div>
           <div class="face" style="background-image: url('../assets/${imgSrc}');"></div>
       `;
       card.addEventListener('click', () => activate(card));
       cards.push(card);
       gameArea.appendChild(card);
   });
}

function activate(card) {
    if (!card.classList.contains('active') && selectedCards.length < 2) {
        card.classList.add('active');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            currentAttempts++;
            document.getElementById('stats').textContent = `${currentAttempts} intentos`;
            if (selectedCards[0].querySelector('.face').style.backgroundImage === selectedCards[1].querySelector('.face').style.backgroundImage) {
                matchesFound++;
                selectedCards = [];
                if (matchesFound === images.length) {
                    alert('Juego completado!');
                }
            } else {
                setTimeout(() => {
                    selectedCards.forEach(card => card.classList.remove('active'));
                    selectedCards = [];
                }, 1000);
            }
        }
    }
}

initializeGame();
