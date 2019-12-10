let col1 = 0;
let col2 = 0;
let x1 = 0;
let streamTime = false;
let timestr = '';
let hour = '';
let min = '';
let sec = '';
let day = '';


function nextDayAndTime(dayOfWeek, hour, minute) {
    var now = new Date()
    var result = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (7 + dayOfWeek - now.getDay()) % 7,
        hour,
        minute)

    if (result < now)
        result.setDate(result.getDate() + 7)

    return result.getTime()
}

function nextStream() {
    let monday = nextDayAndTime(1, 18, 30);
    let tuesday = nextDayAndTime(2, 18, 30);
    let friday = nextDayAndTime(5, 22, 30);
    let sat = nextDayAndTime(6, 22, 30);
    //let test = nextDayAndTime(3, 01, 15);

    return Math.min(monday, tuesday, friday, sat);
}

function countdown() {
    // Set the date we're counting down to
    let countDownDate = nextStream();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        timestr = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        day = days + 'd';
        hour = hours + 'h';
        min = minutes + 'm';
        sec = seconds + 's';

        //document.getElementById("demo").innerHTML = timestr;

        // If the count down is finished, write some text
        if (distance < 0) {
            streamTime = true
        }
    }, 1000);
}

function p5Init() {
    col1 = color(236, 212, 68); //purple
    col2 = color(110, 37, 148); //yellow

    createCanvas(windowWidth, windowHeight);
}

function drawBar() {

    push();
    translate(width / 2, height / 2);
    rectMode(CENTER);
    rotate(PI / 4.0);

    let nStr = nextStream();
    let diffz = nStr - new Date().getTime();
    let maxX = Math.max(windowWidth, windowHeight)
    x1 = floor(map(diffz, 0, 10000000, 0, maxX));

    fill(col2);
    noStroke();
    rect(0, 0, x1, x1);

    pop();
}

function drawText() {
    textSize(75);
    fill(255);
    stroke(0);
    strokeWeight(8);
    textAlign(CENTER, CENTER);
    let buff = 80; //Distance between items
    let offset = 50; // up/down offset
    text("Sup3rQu33n", windowWidth / 2, windowHeight / 2 - offset - (buff * 3))
    text("will b3 liv3 in:", windowWidth / 2, windowHeight / 2 - offset - (buff * 2))

    if (!streamTime) {

        text(day, windowWidth / 2, windowHeight / 2 - offset);
        text(hour, windowWidth / 2, windowHeight / 2 - offset + buff);
        text(min, windowWidth / 2, windowHeight / 2 - offset + (buff * 2));
        text(sec, windowWidth / 2, windowHeight / 2 - offset + (buff * 3));
    } else
        text("Sup3rQu33n is streaming!", windowWidth / 2, windowHeight / 2);
}

function setup() {
    p5Init();
    countdown();
}

function draw() {
    background(col1);

    drawBar();
    drawText();
}
