let field = document.createElement('div')
document.body.appendChild(field);
field.classList.add('field');

for (let i=1; i<=400; i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x =1,
    y = 20;

for (let i =0; i<excel.length; i++){
    if (x>20){
        x=1;
        y--;
    }
    excel[i].setAttribute('posX', x)
    excel[i].setAttribute('posY', y)
    x++;
}

function generateSnake(){
    let posX = Math.round(Math.random()*(20-3)+3);
    let posY = Math.round(Math.random()*(20-1)+1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i<snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let apple;

function createApple(){
    function generateApple() {
        let posX = Math.round(Math.random() * (20 - 3) + 3);
        let posY = Math.round(Math.random() * (20 - 1) + 1);
        return [posX, posY];
    }
    let appleCordinates = generateApple();
    apple = document.querySelector('[posX = "' + appleCordinates[0] + '"][posY = "' + appleCordinates[1] + '"]');

    while(apple.classList.contains('snakeBody')){
        let appleCordinates = generateApple();
        apple = document.querySelector('[posX = "' + appleCordinates[0] + '"][posY = "' + appleCordinates[1] + '"]');
    }

    apple.classList.add('apple');
}

createApple();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin:auto; 
margin-top:40px; 
font-size:30px;
display: block;
`;

let score = 0;
input.value = `Ваши очки: ${score}`;

function move(){
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction == 'right'){
        if (snakeCoordinates[0]<20){
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else  if (direction == 'left'){
        if (snakeCoordinates[0]>1){
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "20"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else  if (direction == 'up'){
        if (snakeCoordinates[1]<20){
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else  if (direction == 'down'){
        if (snakeCoordinates[1]>1){
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "20"]'));
        }
    }

    if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') &&
        snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')){
        apple.classList.remove('apple');
        let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createApple();
        score++;
        input.value = `Ваши очки: ${score}`;
    }

    if(snakeBody[0].classList.contains('snakeBody')){
        setTimeout(() =>{
            alert(`Игра окончена! Ваши очки: ${score}`);
        },300);
        clearInterval(interval);
        snakeBody[0].style.background = 'url(scale_1200.jpg) center no-repeat';
        snakeBody[0].style.backgroundSize = "cover";
    }

    snakeBody[0].classList.add('head');
    for (let i = 0; i<snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}

let interval = setInterval(move, 200)

window.addEventListener('keydown', function (e){
    if(steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps == false;
        } else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps == false;
        } else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps == false;
        } else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps == false;
        }
    }
});