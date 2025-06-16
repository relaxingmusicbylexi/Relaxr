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
function bookmarkPage() {
    const title = document.title;
    const url = window.location.href;

    if (window.sidebar && window.sidebar.addPanel) {
        // Firefox <=22
        window.sidebar.addPanel(title, url, "");
    } else if (window.external && ('AddFavorite' in window.external)) {
        // IE
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) {
        // Opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click();
    } else {
        alert('Press Ctrl+D (Cmd+D for Mac) to bookmark this page.');
    }
}