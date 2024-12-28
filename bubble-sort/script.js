const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

class Line{
	constructor(color,x,y,w,h){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color
	}

	draw(){
		c.fillStyle = this.color
		c.fillRect(this.x, this.y, this.w, this.h)
	}

	show(){
		console.log("X: ", this.x, "Y: ", this.y)
	}
}

const amount = 200

const lines = []
for (let i = 0; i < amount; i++) {
	lines[i] = new Line("white", 3 * i, 100, 2, Math.floor(Math.random() * 300))
}

let counter = 0;

async function animate(delay = 0.000001) {
	window.requestAnimationFrame(animate)

	c.fillStyle = 'black'
	c.fillRect(0,0,canvas.width,canvas.height)

	for (let i = 0; i < amount; i++) {
		lines[i].draw()
	}
	
	for (let j = 0; j < amount; j++) {
		for (let i = 0; i < amount - 1; i++){
			if (lines[i].h > lines[i + 1].h) {
				const aux = lines[i].h
				lines[i].h = lines[i + 1].h
				lines[i + 1].h = aux;
			}
		    await new Promise((resolve) => setTimeout(() => { resolve();}, delay));
		    counter+=0.01
			console.log(counter)
			if (counter >= 500) {
				
			}
		}
	}


}

animate()
