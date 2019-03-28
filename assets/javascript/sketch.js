const totalCities = 7;
const popSize = 10;

var population = [];
var cities = [];
var order = [];
var bestOrder = [];;
var recordDistance = Infinity;

var count = 0;
// let percentCalc = 0.0;

function setup() {
    createCanvas(700, 450);

    // Create cities randomly
    for (let i = 0; i < totalCities; i++) {
        let v = createVector(random(width), random(height-75))
        cities[i] = v;
        order[i] = i;
    }

    // Create Population with order
    for (let i = 0; i < popSize; i++) {
        // shuffle() is a p5 function that utilizes Fisher-Yates Shuffle
        let route = {order: shuffle(order), fitness: null};
        population[i] = route;
    }
    // console.log("here",population)
}

function draw() {
   
    background(0);
    // Draw most efficient path to found so far
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let i = 0; i < bestOrder.length; i++) {
        let n = bestOrder[i]
        vertex(cities[n].x, cities[n].y)
    }
    endShape();
    console.log("initial pop", population)
    // Genetic Algorithm
    calculateFitness();
    normalizeFitness();
    nextGeneration();
    // console.log("next pop",population)
        
    
    // // Draw path being evaluated
    // stroke(255);
    // strokeWeight(1);
    // noFill();
    // beginShape();
    // for (var i = 0; i < bestOrder.length; i ++) {
    //     var n = bestOrder[i];
    //     vertex(cities[n].x, cities[n].y)
    // }
    // endShape();

    // Draw a circle for every city
    fill(255)
    stroke(255)
    for (var i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8)
    }
 
    // // Check if current path is shorter than current bestRoute
    // var d = calcDistance(cities, order);
    // if (d < recordDistance) {
    //     recordDistance = d;
    //     bestRoute = order.slice();
    //     console.log("Best distance so far:",recordDistance)
    // }

    // Draw order string to canvas
    // textSize(50)
    // percentCalc = 100 * (count / totalPermutations)
    // noStroke();
    // fill(255);
    // text(nf(percentCalc, 0, 1) + "% calculated.", 20, height - 20);
    count++;
    if (count >= 10) {
        noLoop();
    }

    
}

/////////HELPER METHODS//////////////////




