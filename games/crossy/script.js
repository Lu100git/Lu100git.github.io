// canvas creation/ window creation 
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 640 
canvas.height = 360 
 
class Game{
	constructor(level, lives){
		this.level = level
		this.lives = lives
	}

	levelUp(){
		this.level += 1
	}
	
	tookHit(){
		this.lives -= 1
	}
}

class Sprite{
	constructor(x,y,w,h,imageSrc){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.image = new Image()
		this.image.src = imageSrc
	}
	draw(){
		if (!this.image) return
		c.drawImage(this.image, this.x, this.y, this.w, this.h)
	}
}

class Player{
	constructor(x,y,w,h, imageSrc){
		this.velocity = {x:0, y:0}
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.image = new Image()
		this.image.src = imageSrc
	}

	update(){
		this.y += this.velocity.y
		this.draw()
	}

	draw(){
		if (!this.image) return
		c.drawImage(this.image, this.x, this.y, this.w, this.h)
	}

	collidesWith(other_sprite){
		if (this.x + this.w < other_sprite.x || this.x > other_sprite.x + other_sprite.w) return false
		else if (this.y + this.h < other_sprite.y || this.y > other_sprite.y + other_sprite.h) return false
		else return true
	}
}

class Enemy{
	constructor(x,y,w,h, imageSrc){
		this.speed = 8
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.image = new Image()
		this.image.src = imageSrc
	}

	update(){
		this.x += this.speed
		
		if (this.x >= canvas.width - this.w) this.speed *= -1
		else if (this.x < 0) this.speed *= -1
		
		this.draw()
	}

	draw(){
		if (!this.image) return
		c.drawImage(this.image, this.x, this.y, this.w, this.h)
	}


}
const hearts = []

for (let i = 0; i < 3; i++) {
	hearts[i] = new Sprite(10 + (i * 52), 10,50, 50, './sprites/heart.png')
}

const background = new Sprite(0,0, canvas.width, canvas.height, './sprites/background.png')
const chest = new Sprite(296,8,50,50, './sprites/treasure.png')
const player = new Player(302,320,36,36, './sprites/player.png')
const enemy = new Enemy(10,280,30,30, './sprites/enemy.png')
const enemy2 = new Enemy(canvas.width - 80,70,46,46, './sprites/enemy.png')
const enemy3 = new Enemy(canvas.width - 80, 178, 30,30,'./sprites/enemy.png')
const enemy4 = new Enemy(10,70,46,46, './sprites/enemy.png')
const ghost = new Enemy(10, 178, 30,30,'./sprites/ghost.png')

enemy3.speed += 4
enemy4.speed += 6
ghost.speed += 14

const keys = {
	up:{
		pressed: false
	},
	down:{
		pressed: false
	}
}
const game = new Game(1,3)

function animate() {
	window.requestAnimationFrame(animate)
	c.fillStyle = 'black'
	c.fillRect(0,0,canvas.width,canvas.height)	
	
	//player movement
	player.velocity.y = 0
	if(keys.up.pressed) player.velocity.y = -6
	else if(keys.down.pressed) player.velocity.y = 6

	if (player.y >= 320){
		player.y = 320
	}


	//render
	background.draw()
	chest.draw()
	player.update()
	enemy.update()
	enemy2.update()
	if (game.level > 1) enemy3.update()
	if (game.level > 2) {
		enemy4.update()
		ghost.update()
	}
	for (let i = 0; i < game.lives; i++) {
		hearts[i].draw()
	}

	//collition detection
	if (player.collidesWith(chest)){
		if(game.level > 2){
			alert("You Win!")
			window.location.href = "../../index.html"
		}
		alert("NICESU!")
		player.velocity.y = 0
		keys.up.pressed = false
		player.y = 320
		game.levelUp()
	}

	if (player.collidesWith(enemy) || player.collidesWith(enemy2) || player.collidesWith(enemy3)|| player.collidesWith(enemy4)){
		if (game.lives < 2) {
			alert("Game Over!")
			window.location.href = "../../projects/index.html"
		}
		alert("OOF!")
		player.velocity.y = 0
		keys.up.pressed = false
		player.y = 320
		game.tookHit()
	}
}
animate()

// events
window.addEventListener('keydown', (event) =>{
	console.log(event)
	switch(event.keyCode){
		case 38:
			keys.up.pressed = true
		break
		
		case 40:
			keys.down.pressed = true
		break
		
	}
})

window.addEventListener('keyup', (event) =>{
	switch(event.keyCode){
		case 38:
			keys.up.pressed = false
		break
		
		case 40:
			keys.down.pressed = false
		break
	}
})
