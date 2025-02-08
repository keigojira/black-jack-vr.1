const deck = [];
const suits = ["♠", "♣", "♦", "♥"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

function createDeck() {
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
    if (card.value === "A") {
        return 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
        return 10;
    } else {
        return parseInt(card.value);
    }
}

function updateHandDisplay() {
    document.getElementById("player-cards").innerHTML = playerHand.map(card => card.value + card.suit).join(" ");
    document.getElementById("dealer-cards").innerHTML = dealerHand.map(card => card.value + card.suit).join(" ");
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("dealer-score").textContent = dealerScore;
}

function updateButtons() {
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
}

function dealCards() {
    createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    playerScore = getCardValue(playerHand[0]) + getCardValue(playerHand[1]);
    dealerScore = getCardValue(dealerHand[0]) + getCardValue(dealerHand[1]);

    updateHandDisplay();
    updateButtons();
    document.getElementById("result-message").textContent = "";
}

function hit() {
    const card = deck.pop();
    playerHand.push(card);
    playerScore += getCardValue(card);
    updateHandDisplay();
    if (playerScore > 21) {
        document.getElementById("result-message").textContent = "バースト！ディーラーの勝ち";
        endGame();
    }
}

function stand() {
    while (dealerScore < 17) {
        const card = deck.pop();
        dealerHand.push(card);
        dealerScore += getCardValue(card);
        updateHandDisplay();
    }

    if (dealerScore > 21) {
        document.getElementById("result-message").textContent = "ディーラーがバースト！プレイヤーの勝ち";
    } else if (playerScore > dealerScore) {
        document.getElementById("result-message").textContent = "プレイヤーの勝ち";
    } else if (playerScore < dealerScore) {
        document.getElementById("result-message").textContent = "ディーラーの勝ち";
    } else {
        document.getElementById("result-message").textContent = "引き分け";
    }
    endGame();
}

function endGame() {
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
}

document.getElementById("deal-button").addEventListener("click", dealCards);
document.getElementById("hit-button").addEventListener("click", hit);
document.getElementById("stand-button").addEventListener("click", stand);
