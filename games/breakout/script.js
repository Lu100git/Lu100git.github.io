WINDOW_WIDTH = 1024
WINDOW_HEIGHT = 576

// setting up the canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = WINDOW_WIDTH
canvas.height = WINDOW_HEIGHT

function windowFill(color){
	c.fillStyle = color
	c.fillRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT)
}
// functions to display text on the canvas
function showInfo(){
	c.fillStyle = 'lime'
    c.font = "bold 24px sans-serif"
    c.fillText("lives left: "+ball.lives, 0, WINDOW_HEIGHT - 24)
}

class Rect{
	constructor(x,y,w,h, color){
		this.initialX = x
		this.initialY = y
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color
		this.velocity = {x: 4, y: 6}
		this.speed = 12
		this.alive = true
		this.lives = 5
	}
	draw(){
		c.fillStyle = this.color
		c.fillRect(this.x, this.y, this.w, this.h)
	}
}

class Paddle extends Rect{
	update(left, right){
		// paddle movement
		if (left) this.x -= this.speed
		else if (right) this.x += this.speed

		if (this.x + this.w > WINDOW_WIDTH){
			this.x = WINDOW_WIDTH - this.w
		}
		else if(this.x < 0){
			this.x = 0
		}
	}
}

class Ball extends Rect{
	update(){
		// ball movement
		this.x += this.velocity.x
		this.y -= this.velocity.y

		// preventing out of bounds 
		if (this.x > (WINDOW_WIDTH - this.w) ) {
			this.change_x_velocity()
		}
		else if (this.x < 0){
			this.change_x_velocity()
		}

		if (this.y < 0){
			this.change_y_velocity()
		}

		// if the ball goes to the bottom of the screen then repositions itself
		else if (this.y > (WINDOW_HEIGHT + 300) ){
			this.x = this.initialX
			this.y = this.initialY
			this.change_y_velocity()
			this.lives--
		}
	}

	collidesWith(other_body){
		if (this.x + this.w < other_body.x || this.x > other_body.x + other_body.w) return false
		else if (this.y + this.h < other_body.y || this.y > other_body.y + other_body.h) return false
		else return true
	}

	change_x_velocity(){ this.velocity.x *= -1 }
	change_y_velocity(){ this.velocity.y *= -1 }
}

// creating the objects
const ball = new Ball(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 10, 10, 'white')
const paddle = new Paddle(WINDOW_WIDTH / 2, 500, 120, 10, 'white')

//colors for the tiles
let colorIndex = 5
const colors = ['red','orange','yellow','lime','cyan','purple']

const columns = 10
const rows = 6
const tiles = []
let tileCounter = 0

for (let i = 0; i < rows; i++){
	for(let j = 0; j < columns; j++){
		const rect = new Rect(102 * j, 20 * i, 100,10, colors[colorIndex])
		tiles.push(rect)
	}
	colorIndex--
}

// used to calculate the frames
let msPrev = window.performance.now()
const fps = 60
const msPerFrame = 1000 / fps
let frames = 0

function animate() {
	window.requestAnimationFrame(animate)

	// if the display is avove 60hz slow down the code to 60 fps
	const msNow = window.performance.now()
	const msPassed = msNow - msPrev
	if (msPassed < msPerFrame) return
	const excessTime = msPassed % msPerFrame
	msPrev = msNow - excessTime
	//frames++

	if (ball.lives < 1) window.location.href ="../../projects.html"
	if (tileCounter >= rows * columns) window.location.href="../../projects.html"

	// collision between paddle and ball, by moving also changes the x of the ball witch makes it more fun!!!
	if (ball.collidesWith(paddle) && ball.y < paddle.y) {
		if (left && ball.velocity.x > 0) ball.change_x_velocity()
		else if(right && ball.velocity.x < 0) ball.change_x_velocity()
		ball.change_y_velocity()
	}

	// collition between the the ball and the tile, this is similar to a for i in range loop in python
	tiles.forEach(function(tile){
		if(ball.collidesWith(tile) && tile.alive){
			if (ball.y < tile.y || ball.y > tile.y){
			ball.change_y_velocity()
			tile.alive = false
			tileCounter++
			console.log(tileCounter)
			}
		}
	}) 
	
	//render
	windowFill('black')
	tiles.forEach(function(tile){ if(tile.alive) tile.draw() })
	ball.draw()
	paddle.draw()
	ball.update()
	paddle.update(left, right)
	showInfo()


} animate()

//double checking the frames
//setInterval(() => {console.log(frames)}, 1000)

// EVENTS and variables for controls
var left = false
var right = false

var touch = false


function KEYDOWN(){
	if (event.key == "ArrowLeft") left = true
	else if (event.key == "ArrowRight") right = true
	
}
function KEYUP(){
	if (event.key == "ArrowLeft") left = false
	else if (event.key == "ArrowRight") right = false
}



window.addEventListener('keyup', KEYUP)
window.addEventListener('keydown', KEYDOWN, false)



// TOCUH SCREEN IMPLEMENTATION
let touchHandler = function(event) {
  let x = 0, y = 0;

  if (event.touches && event.touches[0]) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
  } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
      x = event.originalEvent.changedTouches[0].clientX;
      y = event.originalEvent.changedTouches[0].clientY;
  } else if (event.clientX && event.clientY) {
      x = event.clientX;
      y = event.clientY;
  }

  document.getElementById('x').innerHTML = x;
  document.getElementById('y').innerHTML = y;

  paddle.x = x * 4

}

window.addEventListener('touchstart', touchHandler, false);
window.addEventListener('touchmove', touchHandler, false);
window.addEventListener('touchend', touchHandler, false);

