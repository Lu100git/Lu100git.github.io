const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

let x = 0
let y = 0

function animate() {
	window.requestAnimationFrame(animate)

	c.fillStyle = 'white'
	c.fillRect(0,0,canvas.width,canvas.height)


	c.fillStyle = 'red'
	c.fillRect(x,y,100,100)

}

animate()
