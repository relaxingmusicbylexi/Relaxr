class SleepTimer {
    constructor() {
        this.isRunning = false;
        this.timer = null;
        this.totalSeconds = 0;
        this.progressInterval = null;
        this.audioManager = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.hoursInput = document.getElementById('hours');
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        
        this.displayHours = document.getElementById('display-hours');
        this.displayMinutes = document.getElementById('display-minutes');
        this.displaySeconds = document.getElementById('display-seconds');
        
        this.progressBar = document.getElementById('progress');
        
        this.startBtn = document.getElementById('start-timer');
        this.stopBtn = document.getElementById('stop-timer');
        this.resetBtn = document.getElementById('reset-timer');
        
        this.fadeOutCheckbox = document.getElementById('fade-out');
        this.alarmCheckbox = document.getElementById('alarm');
        this.autoStopCheckbox = document.getElementById('auto-stop');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startTimer());
        this.stopBtn.addEventListener('click', () => this.stopTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        
        // Update display when inputs change
        this.hoursInput.addEventListener('input', () => this.updateDisplay());
        this.minutesInput.addEventListener('input', () => this.updateDisplay());
        this.secondsInput.addEventListener('input', () => this.updateDisplay());
    }

    updateDisplay() {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        
        this.displayHours.textContent = hours.toString().padStart(2, '0');
        this.displayMinutes.textContent = minutes.toString().padStart(2, '0');
        this.displaySeconds.textContent = seconds.toString().padStart(2, '0');
    }

    startTimer() {
        if (this.isRunning) return;

        // Get total seconds
        this.totalSeconds = 
            parseInt(this.hoursInput.value) * 3600 +
            parseInt(this.minutesInput.value) * 60 +
            parseInt(this.secondsInput.value);

        if (this.totalSeconds <= 0) return;

        this.isRunning = true;
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.resetBtn.disabled = false;

        // Disable input fields
        this.hoursInput.disabled = true;
        this.minutesInput.disabled = true;
        this.secondsInput.disabled = true;

        // Start countdown
        this.timer = setInterval(() => this.countdown(), 1000);

        // Start progress bar
        this.startProgress();
    }

    countdown() {
        if (this.totalSeconds <= 0) {
            this.stopTimer();
            this.handleTimerEnd();
            return;
        }

        this.totalSeconds--;
        
        const hours = Math.floor(this.totalSeconds / 3600);
        const minutes = Math.floor((this.totalSeconds % 3600) / 60);
        const seconds = this.totalSeconds % 60;

        this.displayHours.textContent = hours.toString().padStart(2, '0');
        this.displayMinutes.textContent = minutes.toString().padStart(2, '0');
        this.displaySeconds.textContent = seconds.toString().padStart(2, 0);
    }

    stopTimer() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.timer);
        clearInterval(this.progressInterval);

        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.resetBtn.disabled = false;

        // Enable input fields
        this.hoursInput.disabled = false;
        this.minutesInput.disabled = false;
        this.secondsInput.disabled = false;
    }

    resetTimer() {
        this.stopTimer();
        
        this.hoursInput.value = '0';
        this.minutesInput.value = '30';
        this.secondsInput.value = '0';
        
        this.updateDisplay();
        this.progressBar.style.width = '0%';
    }

    startProgress() {
        this.progressInterval = setInterval(() => {
            const progress = ((this.totalSeconds - (this.totalSeconds - (parseInt(this.hoursInput.value) * 3600 +
                parseInt(this.minutesInput.value) * 60 +
                parseInt(this.secondsInput.value)))) / (parseInt(this.hoursInput.value) * 3600 +
                parseInt(this.minutesInput.value) * 60 +
                parseInt(this.secondsInput.value))) * 100;
            this.progressBar.style.width = `${progress}%`;
        }, 1000);
    }

    handleTimerEnd() {
        // Handle fade out if enabled
        if (this.fadeOutCheckbox.checked) {
            this.fadeOutSounds();
        }

        // Handle auto-stop if enabled
        if (this.autoStopCheckbox.checked) {
            this.stopAllSounds();
        }

        // Play alarm if enabled
        if (this.alarmCheckbox.checked) {
            this.playAlarm();
        }

        // Reset display
        this.displayHours.textContent = '00';
        this.displayMinutes.textContent = '00';
        this.displaySeconds.textContent = '00';
        this.progressBar.style.width = '0%';
    }

    fadeOutSounds() {
        const sounds = document.querySelectorAll('.audio-track audio');
        sounds.forEach(sound => {
            const fadeInterval = setInterval(() => {
                sound.volume = Math.max(0, sound.volume - 0.1);
                if (sound.volume <= 0) {
                    clearInterval(fadeInterval);
                }
            }, 100);
        });
    }

    stopAllSounds() {
        const sounds = document.querySelectorAll('.audio-track audio');
        sounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    playAlarm() {
        const alarm = new Audio('alarm.mp3'); // You'll need to add an alarm sound file
        alarm.play();
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SleepTimer();
});
