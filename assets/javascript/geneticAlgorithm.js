

function calculateFitness() {
    for (let i = 0; i < popSize; i++) {
        population[i].distance = calcDistance(cities, population[i].order)
        if (population[i].distance < recordDistance) {
            recordDistance = population[i].distance; 
            bestOrder = population[i].order;
        }
        population[i].fitness = 1/population[i].distance;
    }
}

// Make sure that all fitnesses add up to 1
function normalizeFitness() {
    var sum = 0;
    for (let i = 0; i < popSize; i++) {
        sum += population[i].fitness
    }
    
    for (let i = 0; i < popSize; i++) {
        population[i].fitness = population[i].fitness / sum;
    }

}

function nextGeneration() {
    var newPopulation = [];
    for (let i = 0; i < popSize; i++) {
        // newPopulation[i] = pickOne(population)
        newPopulation[i] = pickOne(population)

    }
    console.log("newpop", newPopulation)
    population = newPopulation
    // console.log(population)
}

function pickOne(obj) {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        // console.log("obj",obj[index].fitness)
        // console.log("pop",population[index].fitness)
        r = r - obj[index].fitness;
        index++;
    }
    index--;
    return obj[index];
}
function calcDistance(points, order) {
    let sum = 0;
    for (let i = 0; i < order.length-1; i++) {
        let cityA = points[order[i]];
        let cityB = points[order[i + 1]]
        // Distance calculates distance between two points (p5)
        let d = dist(cityA.x, cityA.y, cityB.x, cityB.y)
        sum += d
    }
    return sum;
}