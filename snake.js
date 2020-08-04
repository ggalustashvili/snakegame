window.onload=function(){
    let cvs = document.getElementById('canvas');
    let ctx = cvs.getContext("2d");

    let cvswidth=cvs.width;
    let cvsheight=cvs.height;

    let snakewidth=10;
    let snakeheight=10;

    let snake=[{x:0,y:0}];
    let length=1;

    let direction="right";

    function drawsnake(x,y){
        ctx.fillStyle="#FFF";
        ctx.fillRect(x*snakewidth,y*snakeheight,snakewidth,snakeheight);

        ctx.fillStyle="#000";
        ctx.strokeRect(x*snakewidth,y*snakeheight,snakewidth,snakeheight);
    }

    //creating food initial and after picking

    let food={
        x : Math.round(Math.random() * (cvswidth/snakewidth-1)+1),
        y : Math.round(Math.random() * (cvsheight/snakeheight-1)+1)
    }

    //style food

    function createfood(x,y){
        ctx.fillStyle="red";
        ctx.fillRect(x*snakewidth,y*snakeheight,snakewidth,snakeheight);

        ctx.fillStyle="#000";
        ctx.strokeRect(x*snakewidth,y*snakeheight,snakewidth,snakeheight);
    }

    //if snake hits own tail restart the game

    function tailbite(x,y,arr){
        for(let i=length-1; i>0;i--){
            if(x==arr[i].x && y==arr[i].y){
                return true;
            }
            }
            return false;
        }
    
    

    function draw(){
        ctx.clearRect(0,0,cvswidth,cvsheight);
        for(let i=0;i<length;i++){
            let x = snake[i].x;
            let y = snake[i].y;
            drawsnake(x,y);
        }

        //snake head

        let snakeX=snake[0].x;
        let snakeY=snake[0].y;

        //drawfood

        createfood(food.x,food.y);

        //if snake hits any wall then restart the game

        if(snakeX<0 || snakeY<0 || snakeX >= cvswidth/snakewidth || snakeY >=cvsheight/snakeheight||tailbite(snakeX,snakeY,snake)){
            location.reload();
        }

        //creating new head base on previous head and direction

        document.addEventListener("keydown",movement)
        function movement(e){
            switch(e.keyCode){
                case 37:
                    if(direction != "right"){
                    direction="left";
                    }
                    break;
                case 38:
                    if(direction != "down"){
                    direction="up";
                    }
                    break;
                case 39:
                    if(direction != "left"){
                    direction="right";
                    }
                    break;
                case 40:
                    if(direction != "up"){
                    direction="down";
                    }
                    break;
            }
        }

        //snake direcations movement

        if(direction=="left"){
            snakeX--;
        }
        else if(direction=="right"){
            snakeX++;
        }
        else if(direction=="up"){
            snakeY--;
        }
        else if(direction=="down"){
            snakeY++;
        }

        //snake eating food then adding head and updating tail or only updating tail
        if(snakeX==food.x && snakeY==food.y){
             food={
                x : Math.round(Math.random() * (cvswidth/snakewidth-1)+1),
                y : Math.round(Math.random() * (cvsheight/snakeheight-1)+1)
            }
            newhead={
                x : snakeX,
                y : snakeY
            };
            length++;
        }else{
            snake.pop();
             newhead={
                x : snakeX,
                y : snakeY
            };
        }
        snake.unshift(newhead);
    }
    setInterval(draw,100);
}   