DNA = require("./DNA");

class Population {
    constructor(target, mutationRate, popMax) {
        this.target = target;
        this.mutationRate = mutationRate;
        this.popMax = popMax;
        
        this.population; // Array to hold current population 
        this.matingPool; // ArrayList for the mating pool
        this.totalGenerations = 0; // Number of generations
        this.finished = false; // has the target been reached?
        this.perfectScore = 1; 
        
        this.best = "";

        this.population = [];
        for (let i = 0; i < this.popMax; i++) {
            this.population.push(new DNA(this.target.length));
        }
    }

    isTargetMatch() {
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].getPhrase() === this.target) {
                return true;
            }
        }
    }

    naturalSelection() {
        this.matingPool = [];

        var maxFitness = 0;
        let maxFitnessIndex = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
                maxFitnessIndex = i;
            }
        }
        console.log(this.population[maxFitnessIndex].getPhrase())

        for (let i = 0; i < this.population.length; i++) {
            //map(value, start1, stop1, start2, stop2) for more standarization
            var fitness = this.population[i].fitness / maxFitness;
            if (Math.random() <= fitness) this.matingPool.push(this.population[i])
            // var n = Math.floor(fitness * 100);
            // for (let j = 0; j < n; j++) {
            //     this.matingPool.push(this.population[i]);
            // }

       
            
        }
    }

    generate() {
        this.totalGenerations += 1;
        for (let i = 0; i < this.population.length; i++) {
            let a = getRandomInt(0, this.matingPool.length);
            let b = getRandomInt(0, this.matingPool.length);

            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            let child = partnerA.crossover(this.target.length, partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
    }
    
   

   
    calcFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcGeneFitness(this.target);
        }
    }


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


Population.prototype



module.exports = Population;