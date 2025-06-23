class Block{
    constructor(x,y,w,h,t){
        this.x = x;
        this.y = y;
        this.w  = w;
        this.h = h;
        this.tetromino = t;
    }

    draw(){
        for(let i = 0; i < 4; ++i){
            for(let j = 0; j < 4; ++j){
                if(this.tetromino[i][j] === 'x'){
                    ctx.fillStyle = "limegreen";
                    ctx.fillRect((j * this.w) + this.x, (i * this.h) + this.y, this.w, this.h);
                }
            }
        }
        this.update();
    }

    update(){
        this.x += this.w;
        if(this.x > canvas.width){
            this.x = randInt(300)  * -1;
            this.x *= this.w
        }
    }
}

class Rect{
    constructor(x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = c; 
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.update();
    }

    update(){
        if(this.y >= canvas.height){
            this.y = randInt(100);
            this.y *= -1;
            this.y *= this.h;
        }
        this.y += this.h;
    }
}