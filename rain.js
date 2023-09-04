const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width =  3840
canvas.height = 2160

//c.clearRect(0, 0, canvas.width, canvas.height)

function randomX(){
	var result = Math.floor(Math.random() * canvas.width)
	return result
}
function randomY(){
	var result = Math.floor(Math.random() * canvas.height)
	return result
}

function randomChoice() {
	var result = Math.floor(Math.random() * 32)
	return result
}

let characters = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']

class RectC{
	constructor(x, y, w, h, color, char){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color
		this.char = char
	}

	draw(){
		c.fillStyle = this.color
		c.font = "20px Arial"
		c.fillText(this.char, this.x , this.y, this.w, this.h)
	}

	update(){
		this.y += 4
		if (this.y > canvas.height) {
			this.y = -this.h
			this.x = randomX();
			
		}
	}

}

let rects = []


for (var i = 0; i < 200; ++i) {
	char = new RectC(i * 40, randomY(), 40, 40, 'greenyellow', characters[randomChoice()])
	rects.push(char)
}



function animate() {
	window.requestAnimationFrame(animate)

	// c.fillStyle = 'white'
	// c.fillRect(0,0,canvas.width,canvas.height)
	c.clearRect(0, 0, canvas.width, canvas.height)
	

	rects.forEach((c) => {
		c.draw()
		c.update()
	})



}

animate()
