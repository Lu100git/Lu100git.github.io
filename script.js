// matrix source code: https://medium.com/@javascriptacademy.dev/matrix-raining-code-effect-using-javascript-3da1e4cdf3da
// I modified the original source code in order to achieve a different effect and colors 

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = 800;


const nums = '01010101010101010101';

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];
for(let x = 0; x < columns; x++ ) {
    rainDrops[x] = canvas.width - fontSize;
}

function draw(){
	c.fillStyle = 'rgba(0, 0, 0, 0.05)';
	c.fillRect(0, 0, canvas.width, canvas.height);
	
	c.fillStyle = '#a81ef7';
	c.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++){
		const text = nums.charAt(Math.floor(Math.random() * nums.length))
		c.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;

		rainDrops[i]++;
	}	
}

setInterval(draw, 60);


