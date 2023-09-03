const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1280
canvas.height = 720



WIDTH = canvas.width
HEIGHT = canvas.height
TILE_SIZE = 30

function window_fill(color) {
	ctx.fillStyle = color
	ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

function randomX(){
	var result = Math.floor(Math.random() * (WIDTH / TILE_SIZE)) * TILE_SIZE
	return result
}
function randomY(){
	var result = Math.floor(Math.random() * (HEIGHT / TILE_SIZE)) * TILE_SIZE
	return result
}

class Rect{
	constructor(x, y, w, h, color){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color
	}

	draw(){
		ctx.fillStyle = this.color
		ctx.fillRect(this.x , this.y, this.w, this.h)
	}

}

class Snake{
	constructor(x, y, w, h, color){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color
		this.score = 0
		this.speed = 8
		this.delay = 0

		this.body = [
			[this.x - TILE_SIZE * 3, this.y], 
			[this.x - TILE_SIZE * 2, this.y],
			[this.x - TILE_SIZE, this.y]
		]
		
		this.direction = {
			up: false,
			down: false,
			left: false,
			right: true
		}
	}

	draw(){
		for (let i =0; i < this.body.length; ++i) {
			ctx.fillStyle = this.color
			ctx.fillRect(this.body[i][0], this.body[i][1], this.w, this.h)
		}
	}

	update(){
		this.head = [this.x, this.y]
		
		if (this.direction.right === true) {
			this.delay += this.speed
			if (this.delay > TILE_SIZE) {
				this.x += TILE_SIZE
				this.body.push(this.head)
				this.body.shift()
				this.delay = 0
			}
		}

		else if (this.direction.left === true) {
			this.delay += this.speed
			if (this.delay > TILE_SIZE) {
				this.x -= TILE_SIZE
				this.body.push(this.head)
				this.body.shift()
				this.delay = 0
			}
		}

		else if (this.direction.up === true) {
			this.delay += this.speed
			if (this.delay > TILE_SIZE) {
				this.y -= TILE_SIZE
				this.body.push(this.head)
				this.body.shift()
				this.delay = 0
			}
		}
		
		else if (this.direction.down === true) {
			this.delay += this.speed
			if (this.delay > TILE_SIZE) {
				this.y += TILE_SIZE
				this.body.push(this.head)
				this.body.shift()
				this.delay = 0
			}
		}
	}
}

// creating the snake player and the food
const player = new Snake(TILE_SIZE * 5, TILE_SIZE * 10, 25, 25, "lime")
const food = new Rect(randomX(), randomY(), TILE_SIZE, TILE_SIZE, "red")


// creating the tiles, ceil works better than floor
// we don't need to create these tiles,
// but by drawing them on the screen, it will help you understand, how the snake moves
let rows = Math.ceil(WIDTH / TILE_SIZE)
let columns = Math.ceil(HEIGHT / TILE_SIZE)
let tiles = []
for (var i = 0; i < columns; ++i){
	for (var j = 0; j < rows; ++j) {
		tile = new Rect(TILE_SIZE * j, TILE_SIZE * i, TILE_SIZE-1, TILE_SIZE-1, "black")
		tiles.push(tile)
	}
}

gameOver = false
function animate(){
	if(!gameOver){
		window.requestAnimationFrame(animate)
		window_fill("DarkBlue")

		// prevent the food from going out of bounds
		if (food.x > WIDTH) food.x = WIDTH - TILE_SIZE * 2
		else if (food.x < 0) food.x = 0
		if(food.y > HEIGHT) food.y = HEIGHT - TILE_SIZE * 2
		else if(food.y < 0) food.y = 0

		//		 collition detection
		// if player collects the food, spawn new food, and increment the score
		if(food.x == player.x && food.y == player.y){
			food.x = randomX()
			food.y = randomY()
			player.score += 1
			player.body.push(player.x, player.y)
		}

		// if snake collides with itself, game over
		for (let i = 0; i < player.body.length; ++i){
			if (player.x == player.body[i][0] && player.y == player.body[i][1]) {
				gameOver = true
			}
		}

		// if snake goes out of bounds, game over
		// there is a weird glitch on the bottom screen, - tile size fixed it
		if (player.x > WIDTH || player.x < 0) gameOver = true
		if(player.y > HEIGHT - TILE_SIZE || player.y < 0) gameOver = true

		//                 render                            ///
        //uncomment the line bellow to see the tiles
		//tiles.forEach((tile) => {tile.draw()}) 
		player.draw()
		player.update()
		food.draw()
		
		// Display score
		ctx.fillStyle = "white"
		ctx.font = "30px Arial"
		ctx.fillText("Score " + player.score, 0,TILE_SIZE,150,100)
	}

	else{
		//alert("OOF!, Game Over, your score was: " + player.score)
		window.location.href = "index.html"
	}
}
animate()

// events:
addEventListener('keydown', changeDirection, false)
function changeDirection(key){
	//console.log(key)
	if(key.code == "ArrowUp" && player.direction.down === false){
		player.direction.up = true
		player.direction.down = false
		player.direction.left = false
		player.direction.right = false
	}

	else if(key.code == "ArrowDown" && player.direction.up === false){
		player.direction.up = false
		player.direction.down = true
		player.direction.left = false
		player.direction.right = false
	}

	else if(key.code == "ArrowLeft" && player.direction.right === false){
		player.direction.up = false
		player.direction.down = false
		player.direction.left = true
		player.direction.right = false
	}

	else if(key.code == "ArrowRight" && player.direction.left === false){
		player.direction.up = false
		player.direction.down = false
		player.direction.left = false
		player.direction.right = true
	}
}
