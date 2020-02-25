var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
// ctx.fillReact(x,y,w,h)
var snakeW = 10;
var snakeH = 10;
var dir = "right"
let flag = 0;

function drawSnake(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
}

//create snake

var len = 4;
var snake = [];

for (var i = len - 1; i >= 0; i--) {
    snake.push({
        x: i,
        y: 0
    })
}


//control dir

document.addEventListener("keydown", dirControl)

function dirControl(e) {
    if (e.keyCode == 37 && dir != "right") {
        dir = "left";
    } else if (e.keyCode == 38 && dir != "down") {
        dir = "up";
    } else if (e.keyCode == 39 && dir != "left") {
        dir = "right";
    } else if (e.keyCode == 40 && dir != "up ") {
        dir = "down";
    }
}

//create food
var food = {
    x: Math.round(Math.random() * (cvs.width / snakeW) + 1),
    y: Math.round(Math.random() * (cvs.height / snakeH) + 1)
}

function drawfood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
}

//draw function
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (var i = 0; i < snake.length; i++) {
        var X = snake[i].x;
        var Y = snake[i].y;
        drawSnake(X, Y);
    }

    //foodcall
    drawfood(food.x, food.y);

    //snake head
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (snakeX < 0 || snakeY < 0 || snakeX >= cvs.width / snakeW || snakeY >= cvs.height / snakeH) {
        alert("game stop")
        console.log("game over")
    }


    if (dir == "right") {
        flag++;
        snakeX++;
    } else if (dir == "left") {
        snakeX--;
    } else if (dir == "up") {
        snakeY--;
    } else if (dir == "down") {
        snakeY++;
    }




    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.round(Math.random() * (cvs.width / snakeW - 1) + 1),
            y: Math.round(Math.random() * (cvs.height / snakeH - 1) + 1)
        }
        var newHead = {
            x: snakeX,
            y: snakeY
        }
    } else {
        snake.pop();
        var newHead = {
            x: snakeX,
            y: snakeY
        }
    }



    //new head
    // var newHead = {
    //     x: snakeX,
    //     y: snakeY
    // }

    //check
    for (var i = 0; i < snake.length; i++) {
        if (snakeX == snake[i].x && snakeY == snake[i].y) {
            snake.unshift(newHead);
            alert("game over")
        } else {
            console.log(snakeX + "," + snake[i].x);
            console.log(snakeY + "," + snake[i].y);
        }
    }

    snake.unshift(newHead);


}

setInterval(draw, 100);