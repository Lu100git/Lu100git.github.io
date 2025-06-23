// plays when hover, needs to click first to activate the audio context
function playHoverSound() {
    var audio = document.getElementById("audio1");
    audio.currentTime = 0; // Rewind to the start
    audio.play();
}

// Leo AI helped me with this function
function handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const audio = document.getElementById('audio2');
    
    audio.currentTime = 0;
    audio.play();
    
    setTimeout( () => {
        window.location.href = href;
    }, 500); // Change this to match your audio duration   
}
