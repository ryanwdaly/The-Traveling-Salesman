'use strict'

class DNA {
    constructor(target_length) {
        this.genes  = [];
        this.fitness = 0;
        for (let i = 0; i < target_length; i++) {
            // this.genes.push(getRandomChar(63, 123));
            this.genes.push(getRandomChar(32, 136));
        }
    }

   calcGeneFitness(target) {
       let score = 0;
       for (let i = 0; i < this.genes.length; i++) {
           if (this.genes[i] === target.charAt(i)) score++;
       }
       this.fitness = score / target.length;
   }

    crossover(length, partner) {
        let child = new DNA(length);
        let midpoint = getRandomInt(0, this.genes.length);

        for (let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;

    }

    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() <= mutationRate) {
                this.genes[i] = getRandomChar(63, 123);
            }
        }
    }

    getPhrase() {
        return this.genes.join("");
    }

}

//HELPER METHODS
function getRandomChar(min, max) {
    let c = getRandomInt(min, max);
    if (c === 63) c = 32; // (sp)
    if (c === 64) c = 46; // (.)
    return String.fromCharCode(c); // Returns stringified ASCII Char
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = DNA;