const cnvs = document.getElementById('canvas');
const ctx = cnvs.getContext("2d");
const size = 30;
const total_div = document.getElementById("total");


let snake = [];
snake[0] = {
    x: Math.floor(cnvs.width/2),
    y: Math.floor(cnvs.height/2)
};
let apple = {
    x: Math.floor(Math.random() * (cnvs.width / size)) * size,
    y: Math.floor(Math.random() * (cnvs.width / size)) * size
};
let total = 0;

let direction;
document.addEventListener("keydown", e => {
    let key = event.key;
    if((key === 'ArrowLeft' || key === 'a') && direction !== "RIGHT"){
        direction = "LEFT";
    }else if((key === 'ArrowUp' || key === 'w') && direction !== "DOWN"){
        direction = "UP";
    }else if((key === 'ArrowRight' || key === 'd') && direction !== "LEFT"){
        direction = "RIGHT";
    }else if((key === 'ArrowDown' || key === 's') && direction !== "UP"){
        direction = "DOWN";
    }
});
function draw() {
    background();
    for(let i = 0; i < snake.length; i ++){
        i === 0 ? ctx.fillStyle = '#0d831b' : ctx.fillStyle = '#39a357';

        ctx.fillRect(snake[i].x, snake[i].y, size, size);
        ctx.strokeStyle='#ffffff';
        ctx.strokeRect(snake[i].x, snake[i].y, size, size);
    }
    drawApple();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch (direction) {
        case "UP":
            snakeY -= size;
            break;
        case "DOWN":
            snakeY += size;
            break;
        case "RIGHT":
            snakeX += size;
            break;
        case "LEFT":
            snakeX -= size;
            break;
    }
    if(snake[0].x === apple.x && snake[0].y === apple.y){
        total++;
        apple = {
            x: Math.floor(Math.random() * (cnvs.width / size)) * size,
            y: Math.floor(Math.random() * (cnvs.width / size)) * size
        };
        let spawn = false;
        while (!spawn) {
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === apple.x && snake[i].y === apple.y) {
                    apple = {
                        x: Math.floor(Math.random() * (cnvs.width / size)) * size,
                        y: Math.floor(Math.random() * (cnvs.width / size)) * size
                    };
                } else {
                    spawn = true
                }
            }
        }
        total_div.innerText = `Total: ${total}`;
    }else{
        snake.pop();
    }
    let update = {
      x: snakeX,
      y: snakeY
    };
    snake.unshift(update);

    if(snakeX < 0 || snakeY < 0 || snakeX > cnvs.width - size || snakeY > cnvs.height - size){
        clearInterval(interval);
    }
}
function background(){
    ctx.fillStyle='#506780';
    ctx.strokeStyle='#ffffff';
    ctx.fillRect(0, 0, cnvs.width, cnvs.height);
    ctx.strokeRect(0, 0, cnvs.width, cnvs.height);
}
function drawApple(){
    ctx.fillStyle='#ffffff';
    ctx.fillRect(apple.x, apple.y, size, size);
}

let interval = setInterval(draw,85);