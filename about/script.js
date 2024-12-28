const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1200
canvas.height = 400

font_size = 16

values = ["100%", "90%", "80%", "70%","60%","50%","40%","30%","20%","10%","0%"]

languages = [" ","[C]", "[C++]", "[Java]", "Java-Spring ", "[python]", "[HTML/CSS]", "[JS]", "[NodeJS]", "[Bash]", "[SQL]"]
colors = ["black", "grey", "blue", "orange", "lime", "cyan", "gold", "yellow", "lime", "red", "indigo"]

knowledge = [0, 340, 290, 290, 250, 400, 160, 300, 100, 300, 400]



function animate() {
	window.requestAnimationFrame(animate)

	c.fillStyle = 'black'
	c.fillRect(0,0,canvas.width,canvas.height)


	for (var i = 0; i < values.length; i++) {
		c.fillStyle = 'greenyellow';
		c.font = font_size + 'px monospace';
		c.fillText(values[i], 0, i * (canvas.height / values.length) + font_size);
	}



	for (var i = 0; i < languages.length; i++) {
		c.fillStyle = 'greenyellow';
		c.font = font_size + 'px monospace';
		c.fillText(languages[i], i  * (canvas.width / languages.length) - font_size + font_size, canvas.height - font_size);
		
		c.fillStyle = colors[i]
		c.fillRect(i  * (canvas.width / languages.length) + font_size, canvas.height - font_size * 2, font_size, -knowledge[i])


	}



}

animate()
