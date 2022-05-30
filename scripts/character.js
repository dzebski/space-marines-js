import {randomDice, placeholderDice} from '/scripts/utils.js'


class Character {

    constructor(data) {

        Object.assign(this, data)
        this.diceArray = placeholderDice(this.diceCount)
    }

    
    getDiceHtml(diceCount) {
        this.currentDiceScore = randomDice(this.diceCount)
        this.diceArray = this.currentDiceScore.map(num => `<div class="dice">${num}</div>`).join('')
    }


    healthBar() {
        const displayHealth = Math.round( this.health / this.maxHealth * 100 )
        console.log(displayHealth)
        return `
        <div class="health-wrapper">
            <div class="health
            ${displayHealth > 50 ? 'normal' : 'red'}
            " id="health" style="width: ${displayHealth<10&&displayHealth>0?7
                :!displayHealth?0:displayHealth}%"></div>
        </div>`
    }


    getCharHtml() {
        const {ID, name, ava, health, diceCount} = this

        const healthHtml = this.healthBar()
        const diceHTML = this.getDiceHtml(diceCount)
        return `
            <div class="${ID}" id="${ID}">
                <h1 class="${ID}-name">${name}</h1>
                <img class="${ID}-img" src="${ava}">
                <p class="hero-health">Health:<b>${health}</b></p>
                ${healthHtml}
                <div class="dice-wrapper">
                    <p><strong>Attack</strong><br><span class="small">Sum of<br>Dices: </span></p>
                    ${this.diceArray}
                </div>
            </div>`
    }


    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, attack) => total + attack)
        if (this.health > 0) { 
            if (this.health <= totalAttackScore) { this.health = 0 }
                else { this.health -= totalAttackScore }
        }   else { this.health = 0 }

        if (this.health === 0) { this.alive = false }
    }
}

export {Character}