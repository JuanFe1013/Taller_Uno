class Memorama {

    constructor() {
        this.cardsContainer = document.querySelector('.board-game');
        this.canPlay = false;
        this.card1 = null;
        this.card2 = null;
        this.availableImages = [
            "https://i.pinimg.com/236x/7a/67/99/7a6799536a92d83b2d68ddd26b16d1a9.jpg",
            "https://i.pinimg.com/236x/e3/26/3c/e3263c6336ebadbe7a8f6ef099c7a2bd.jpg",
            "https://i.pinimg.com/236x/bf/1e/e3/bf1ee3c4723f2fd6a30e09735f158b89.jpg",
            "https://i.pinimg.com/236x/ea/45/16/ea45168b53059d8059fb93c33caae5b4.jpg",
            "https://i.pinimg.com/236x/4e/b1/fd/4eb1fd6f04bb3296ea9ec2cd3004ad78.jpg",
            "https://i.pinimg.com/236x/cc/f0/81/ccf08186d0eb8a618966be97d87c3fad.jpg",
            "https://i.pinimg.com/236x/35/f0/41/35f041c0df772a649657e94653a9861d.jpg",
            "https://i.pinimg.com/236x/83/f9/a5/83f9a536a2fed3295b1dbfa71fb2ee0a.jpg"
        ];
        this.startGame();
    }

    setupGame(pairCount) {
        this.cardsContainer.innerHTML = ''; // Clear the board
        const pairs = this.availableImages.slice(0, pairCount);
        this.orderForThisRound = pairs.concat(pairs).sort(() => Math.random() - 0.5);

        this.orderForThisRound.forEach(imageSrc => {
            const card = document.createElement('figure');
            card.innerHTML = `
                <img class="back" src="assets/card-back.png" alt="Back">
                <div class="searched-image">
                    <img src="${imageSrc}" alt="Image">
                </div>
            `;
            this.cardsContainer.appendChild(card);
        });

        this.cards = Array.from(document.querySelectorAll(".board-game figure"));
        this.closeCards();
    }

    startGame() {
        this.cardsContainer.addEventListener('click', event => {
            this.flipCard(event.target.closest('figure'));
        });
    }

    setNewOrder() {

        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );

    }

    setImagesInCards() {
        this.cards.forEach((card, index) => {
            const imgLabel = card.querySelector('.searched-image img');
            imgLabel.src = this.orderForThisRound[index];
            card.dataset.image = this.orderForThisRound[index];
        });
    }
    

    openCards() {

        this.cards.forEach(card => card.classList.add("opened"));

        setTimeout(() => {
            this.closeCards();
        }, 1500); 

    }

    closeCards() {

        this.cards.forEach(card => card.classList.remove("opened"));
        this.addClickEvents();
        this.canPlay = true;

    }

    addClickEvents() {

        this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));

    }

    removeClickEvents() {

        this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));

    }

    flipCard(e) {
        const clickedCard = e.target.closest("figure");
        if (!clickedCard || clickedCard.classList.contains("opened")) return;
    
        clickedCard.classList.add("opened");
        this.checkPair(clickedCard.dataset.image);
    }

    checkPair(image) {

        if (!this.card1) this.card1 = image;
        else this.card2 = image;

        if (this.card1 && this.card2) {
            
            if (this.card1 == this.card2) {

                this.canPlay = false;
                setTimeout(this.checkIfWon.bind(this), 300)
                
            }
            else {

                this.canPlay = false;
                setTimeout(this.resetOpenedCards.bind(this), 800)
}

        }

    }

    resetOpenedCards() {
        
        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");

        this.card1 = null;
        this.card2 = null;

        this.canPlay = true;

    }

    checkIfWon() {

        this.foundPairs++;

        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;

        if (this.maxPairNumber == this.foundPairs) {

            alert("Has Ganado 😎👾😎");
            this.setNewGame();
            
        }

    }

    setNewGame() {

        this.removeClickEvents();
        this.cards.forEach(card => card.classList.remove("opened"));

        setTimeout(this.startGame.bind(this), 1000);

    }

}

function startNewGame() {
    const pairCount = document.getElementById('pairInput').value;
    if (pairCount < 2 || pairCount > 8) {
        alert("Por favor, ingrese un número entre 2 y 8.");
        return;
    }
    const game = new Memorama();
    game.setupGame(pairCount);
}

document.addEventListener("DOMContentLoaded", () => {

    new Memorama();

});