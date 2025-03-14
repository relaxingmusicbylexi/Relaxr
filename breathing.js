document.addEventListener('DOMContentLoaded', function () {
    const breathingText = document.getElementById('breathing-text');
    const startStopButton = document.getElementById('start-stop');
    const breathingPatternSelect = document.getElementById('breathing-pattern');
    let breathingInterval;
    let isBreathing = true;
    let currentPattern = '4-6-8';

    function updateText(phase, seconds) {
        breathingText.textContent = `${phase} (${seconds}s)`;
        breathingText.className = phase.toLowerCase().replace(' ', '-');
    }

    function getPatternTimes(pattern) {
        switch (pattern) {
            case '4-4-4-4':
                return { in: 4, hold: 4, out: 4, holdOut: 4 };
            case '4-7-8':
                return { in: 4, hold: 7, out: 8, holdOut: 0 };
            case '4-6-8':
            default:
                return { in: 4, hold: 6, out: 8, holdOut: 0 };
        }
    }

    function breatheIn() {
        const times = getPatternTimes(currentPattern);
        let seconds = times.in;
        updateText('Breathe In', seconds);
        breathingInterval = setInterval(() => {
            seconds--;
            updateText('Breathe In', seconds);
            if (seconds === 0) {
                clearInterval(breathingInterval);
                hold();
            }
        }, 1000);
    }

    function hold() {
        const times = getPatternTimes(currentPattern);
        let seconds = times.hold;
        updateText('Hold', seconds);
        breathingInterval = setInterval(() => {
            seconds--;
            updateText('Hold', seconds);
            if (seconds === 0) {
                clearInterval(breathingInterval);
                breatheOut();
            }
        }, 1000);
    }

    function breatheOut() {
        const times = getPatternTimes(currentPattern);
        let seconds = times.out;
        updateText('Breathe Out', seconds);
        breathingInterval = setInterval(() => {
            seconds--;
            updateText('Breathe Out', seconds);
            if (seconds === 0) {
                clearInterval(breathingInterval);
                if (times.holdOut > 0) {
                    holdOut();
                } else {
                    breatheIn();
                }
            }
        }, 1000);
    }

    function holdOut() {
        const times = getPatternTimes(currentPattern);
        let seconds = times.holdOut;
        updateText('Hold', seconds);
        breathingInterval = setInterval(() => {
            seconds--;
            updateText('Hold', seconds);
            if (seconds === 0) {
                clearInterval(breathingInterval);
                breatheIn();
            }
        }, 1000);
    }

    function startBreathing() {
        isBreathing = true;
        startStopButton.textContent = 'Stop';
        breatheIn();
    }

    function stopBreathing() {
        isBreathing = false;
        startStopButton.textContent = 'Start';
        clearInterval(breathingInterval);
        breathingText.textContent = 'Paused';
        breathingText.className = '';
    }

    if (startStopButton) {
        startStopButton.addEventListener('click', () => {
            if (isBreathing) {
                stopBreathing();
            } else {
                startBreathing();
            }
        });
    }

    if (breathingPatternSelect) {
        breathingPatternSelect.addEventListener('change', (event) => {
            currentPattern = event.target.value;
            if (isBreathing) {
                stopBreathing();
                startBreathing();
            }
        });
    }

    startBreathing();
});