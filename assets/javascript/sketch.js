const totalCities = 6;

let cities = [];
let order = [];
let recordDistance;
let bestRoute;
let totalPermutations = factorialize(totalCities)
let percentCalc = 0.0;
let count = 0;


function setup() {
    createCanvas(800, 600);
    // frameRate(5)
    for (var i = 0; i < totalCities; i++) {
        var v = createVector(random(width), random(height-75))
        cities[i] = v;
        order[i] = i;
    }
    var d = calcDistance(cities, order);
    recordDistance = d;
    bestRoute = order.slice();
}

function draw() {
    background(0);
  
    // Draw most efficient path to found so far
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
        var n = bestRoute[i]
        vertex(cities[n].x, cities[n].y)
    }
    endShape();

    // Draw path being evaluated
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < order.length; i ++) {
        var n = order[i];
        vertex(cities[n].x, cities[n].y)
    }
    endShape();

    // Draw a circle for every city
    fill(255)
    for (var i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8)
    }

    // Check if current path is shorter than current bestRoute
    var d = calcDistance(cities, order);
    if (d < recordDistance) {
        recordDistance = d;
        bestRoute = order.slice();
        console.log("Best distance so far.",recordDistance)
    }

    // Draw order string to canvas
    textSize(50)
    percentCalc = 100 * (count / totalPermutations)
    noStroke();
    fill(255);
    text(nf(percentCalc, 0, 1) + "% calculated.", 20, height - 20);

    nextOrder();

    // Break loop if calculations finished
    if (count >= totalPermutations) {

        noLoop();
    }
}

/////////HELPER METHODS//////////////////
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function calcDistance(points, order) {
    var sum = 0;
    for (var i = 0; i < order.length-1; i++) {
        var cityA = points[order[i]];
        var cityB = points[order[i + 1]]
        // Distance calculates distance between two points (p5)
        var d = dist(cityA.x, cityA.y, cityB.x, cityB.y)
        sum += d
    }
    return sum;
}

// Next arrangement of cities based on lexicographic order
function nextOrder() {
    // Find the largest x such that P[x] < P[x+1] (if there is no such x, P is 
    //      the last permutation)
    let largestI = -1
    for (var i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i + 1]) {
            largestI = i
        }
    }
 
    // Find the largest y such that P[x] < P[y]
    let largestJ = 0;
    for (var j = 0; j < order.length; j++) {
        if (order[j] > order[largestI]) {
            largestJ = j;
        }
    }

    // Swap P[x] and P[y]
    swap(order, largestI, largestJ)

    // Reverse P[x+1..n]
    let endArray = order.splice(largestI + 1)
    endArray.reverse();
    order = order.concat(endArray);
    count++;
}

function factorialize(num) {
    if (num < 0) {
        return -1;
    } else if (num === 0) {
        return 1;
    } else {
        return (num * factorialize(num -1));
    }
}



