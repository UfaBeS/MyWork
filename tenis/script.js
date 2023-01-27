var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/3;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 75;
var paddleWidth = 10;
var paddleY = (canvas.height-paddleWidth)/2;
var paddleHeight2 = 750;
var paddleWidth2 = 10;
var paddleY2 = (canvas.height-paddleWidth)/2;
var UpPressed = false;
var DownPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        rightPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        rightPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(canvas.width-10, paddleY2-20, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); 
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawPaddle2();
    
    if(y + dy < ballRadius) {
        dy = -dy;
        paddleY2 = (480 - x);
        if (paddleY2 > 320){
            paddleY2 = 300;
        }
    	drawPaddle2();
    }
    	//alert(x);
    if(y + dy > canvas.height-ballRadius ) {
        dy = -dy;

        paddleY2 = (480 - x);
        if (paddleY2 > 320){
            paddleY2 = 300;
        }
        if (x > 240){
            paddleY2 = (320 - paddleY2);
        }
        drawPaddle2();
        //alert(x);    

    }





    /*if (y + dy > canvas.height-ballRadius || y + dy < ballRadius ) {

        }*/
    if(y + dy < ballRadius){
        dy = -dy;
    }
        else if(x + dx > canvas.width-ballRadius) {
            if(y > paddleY2-10 && y < paddleY2 + paddleHeight){
                dx = -dx;
    }
         else {
            alert("You win!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    if(y + dy > canvas.width-ballRadius){
        dy = -dy;

    }

    else if(x + dx < ballRadius) {
        if(y > paddleY && y < paddleY + paddleHeight) {
            dx = -dx;
        }
        else {
            alert("GAME OVER!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    
    if(rightPressed && paddleY < canvas.height-paddleHeight) {
        paddleY += 5;
    }
    else if(leftPressed && paddleY > 0) {
        paddleY -= 5;
    }


    
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);