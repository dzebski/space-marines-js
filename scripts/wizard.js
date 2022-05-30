// Import Char Data from Data
import characterData from '/scripts/data.js'
import {Character} from '/scripts/character.js'
//import {endGame} from '/scripts/utils.js'


// Characters Array
let loyalistArray = ['hero2', 'hero1']
let chaositsArray = ['hero3', 'hero4']

// Get Marines
function getLoyalMarine() {
    const nextLoyalMarine = characterData[loyalistArray.shift()]
    return nextLoyalMarine ? new Character(nextLoyalMarine) : {}
}

function getChaosMarine() {
   const nextChaosMarine = characterData[chaositsArray.shift()]
   return nextChaosMarine ? new Character(nextChaosMarine) : {}
}

// MAIN TURN :: Button Stuff
document.getElementById('btn--action').addEventListener('click', turnButton)
function turnButton() {
    if (!isWaiting) { renderChars() }

    loyalMarine.takeDamage(chaosMarine.currentDiceScore)
    chaosMarine.takeDamage(loyalMarine.currentDiceScore)

    if (!loyalMarine.alive) {
        if (loyalistArray.length > 0) {
            
                loyalMarine = getLoyalMarine()
            
        } else { endGame() }
    }
    if (!chaosMarine.alive) {
        if (chaositsArray.length > 0) {
            
                chaosMarine = getChaosMarine()
            
        } else { endGame() }
    }
}

let isWaiting = false
const endGame = () => {
    isWaiting = true
    setTimeout(() => {
        const msg = !loyalMarine.health && !chaosMarine.health ? 'All <span class="red-text">Marines</span> Die in Battle'
        : !loyalMarine.health ? `All <span class="red-text">Loyalists</span> are Dead in the Battle`
        : `All <span class="red-text">Chaosits</span> are Dead in the Battle`

        document.getElementById('message-endgame').innerHTML = msg
        document.getElementById('endMsg').style.display = 'block'
    }, 2000)
}

// Render Characters
// const renderChars = char => document.getElementById(char.ID).innerHTML = char.getCharHtml()

let loyalMarine = getLoyalMarine()
let chaosMarine = getChaosMarine()

function renderChars() {
    document.getElementById('loyalMarine').innerHTML = loyalMarine.getCharHtml()
    document.getElementById('chaosMarine').innerHTML = chaosMarine.getCharHtml()
}

renderChars()