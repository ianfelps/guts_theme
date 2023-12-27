var audio = new Audio('audio/song.mp3');
var isPlaying = false;
var rainAudio = new Audio('audio/rain.mp3');
var isRainPlaying = false;

Promise.all([
    audio.load(),
    rainAudio.load()
]).then(function () {
    audio.addEventListener('ended', function () {
        audio.currentTime = 0;
        audio.play();
        if (document.getElementById("rainCheckbox").checked) {
            rainAudio.currentTime = 0;
            rainAudio.play();
            updateRainVolume();
        }
    });

    rainAudio.addEventListener('ended', function () {
        rainAudio.currentTime = 0;
        rainAudio.play();
    });
});

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        if (isRainPlaying) {
            rainAudio.pause();
        }
    } else {
        audio.play();
        if (document.getElementById("rainCheckbox").checked) {
            rainAudio.play();
            updateRainVolume();
        }
    }
    isPlaying = !isPlaying;
}

function toggleRainSound() {
    if (document.getElementById("rainCheckbox").checked && isPlaying) {
        rainAudio.play();
        updateRainVolume();
        isRainPlaying = true;
    } else {
        rainAudio.pause();
        isRainPlaying = false;
    }
}

function updateVolume() {
    var volumeSlider = document.getElementById("volumeSlider");
    audio.volume = volumeSlider.value;
    if (isRainPlaying) {
        updateRainVolume();
    }
}

function updateRainVolume() {
    var volumeSlider = document.getElementById("volumeSlider");
    var rainVolume = volumeSlider.value * 0.4;
    rainAudio.volume = rainVolume;
}