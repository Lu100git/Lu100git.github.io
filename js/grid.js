const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
const TILE_SIZE = 32;

// creating the falling tiles
var tiles = [];
const rows = Math.ceil(canvas.height / TILE_SIZE);
const columns = Math.ceil(canvas.width / TILE_SIZE);
for(let i = 0; i < columns; ++i){
    const tile = new Rect(i * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, "limegreen");
    tiles.push(tile);
}

// random tetromino shapes 
const block = new Block((randInt(200) * -1) * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, S);
const block2 = new Block((randInt(200) * -1) * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, C);
const block3 = new Block((randInt(200) * -1) * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, T);
const block4 = new Block((randInt(200) * -1) * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, Z);

function randInt(max){
    return Math.floor(Math.random() * max);
}

function animate() {
    //creating the grid 
	ctx.fillStyle = 'limegreen'
	ctx.fillRect(0,0,canvas.width,canvas.height)
    for(let i = 0; i < rows; ++i){
        for(let j = 0; j < columns; ++j){
            ctx.fillStyle = 'black';
            ctx.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE - 1, TILE_SIZE - 1);   
        }
    }

    // drawing the tiles and the blocks
    tiles.forEach(tile =>{
        tile.draw();
    })

    block.draw();
    block2.draw();
    block3.draw();
    block4.draw();
}

setInterval(animate, 60);


