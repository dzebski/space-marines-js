// Generate Random Dices Array
function randomDice(count) {
    return new Array(count).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
}

// Generate Blank Placeholders
function placeholderDice(count) {
    return new Array(count).fill(0).map(() => `<div class="placeholder-dice">X</div>`).join('')
}

export {randomDice, placeholderDice}
