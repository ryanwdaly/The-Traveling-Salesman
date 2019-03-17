var cities = [];
var totalCities = 3;
var recordDistance;
var bestRoute;

function setup() {
    createCanvas(800, 600);
    // frameRate(15)
    for (var i = 0; i < totalCities; i++) {
        var v = createVector(random(width), random(height))
        cities[i] = v;
    }
    var d = calcDistance(cities);
    recordDistance = d;
    bestRoute = cities.slice();
}

function draw() {
    background(0);
    fill(255)
    for (var i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8)
    }

    // Draw path being evaluated
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i ++) {
        vertex(cities[i].x, cities[i].y)
    }
    endShape();

    // Draw most efficient path to date
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
        vertex(bestRoute[i].x, bestRoute[i].y)
    }
    endShape();

    var i = floor(random(cities.length));
    var j = floor(random(cities.length));
    swap(cities, i, j)

    var d = calcDistance(cities);
    if (d < recordDistance) {
        recordDistance = d;
        bestRoute = cities.slice();
        console.log(recordDistance)
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function calcDistance(points) {
    var sum = 0;
    for (var i = 0; i < points.length-1; i++) {
                // Calculates distance between two points (p5)
        var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y)
        sum += d
    }
    return sum;
}