document.addEventListener('DOMContentLoaded', function () {
    const playPauseButtons = document.querySelectorAll('.play-pause');
    const volumeControls = document.querySelectorAll('.volume');

    playPauseButtons.forEach(button => {
        const audioId = button.getAttribute('data-audio');
        const audioElement = document.getElementById(audioId);

        if (audioElement) {
            button.addEventListener('click', function () {
                if (audioElement.paused) {
                    audioElement.play();
                    this.textContent = 'Pause';
                } else {
                    audioElement.pause();
                    this.textContent = 'Play';
                }
            });
        }
    });

    volumeControls.forEach(control => {
        const audioId = control.getAttribute('data-audio');
        const audioElement = document.getElementById(audioId);

        if (audioElement) {
            control.addEventListener('input', function () {
                audioElement.volume = this.value;
            });
        }
    });
});