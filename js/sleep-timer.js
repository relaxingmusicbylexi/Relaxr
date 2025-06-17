class SleepTimer {
    constructor() {
        this.isRunning = false;
        this.timer = null;
        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.progressInterval = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.hoursInput = document.getElementById('hours');
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        
        this.timerText = document.getElementById('timer-text');
        this.progressBar = document.getElementById('progress');
        
        this.startBtn = document.getElementById('start-timer');
        this.stopBtn = document.getElementById('stop-timer');
        this.resetBtn = document.getElementById('reset-timer');
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
        
        this.timerText.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    startTimer() {
        if (this.isRunning) return;

        // Get values and validate
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;

        // Calculate total seconds
        this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
        this.remainingSeconds = this.totalSeconds;

        // Validate total time
        if (isNaN(this.totalSeconds) || this.totalSeconds <= 0) {
            alert('Please enter a valid time greater than 0');
            return;
        }

        // Set initial progress bar width
        this.progressBar.style.width = '100%';

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

        // Start progress bar update
        this.progressInterval = setInterval(() => {
            if (this.isRunning) {
                const progress = ((this.totalSeconds - this.remainingSeconds) / this.totalSeconds) * 100;
                this.progressBar.style.width = `${progress}%`;
            }
        }, 1000);
    }

    countdown() {
        if (this.remainingSeconds <= 0) {
            this.stopTimer();
            this.handleTimerEnd();
            return;
        }

        this.remainingSeconds--;
        
        const hours = Math.floor(this.remainingSeconds / 3600);
        const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
        const seconds = this.remainingSeconds % 60;

        this.timerText.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};`;
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
        // Fade out sounds
        this.fadeOutSounds();
        
        // Stop all sounds
        this.stopAllSounds();
        
        // Play alarm
        this.playAlarm();

        // Reset display
        this.timerText.textContent = '00:00:00';
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
        // Create three beeps with a short pause between each
        const context = new AudioContext();
        const beepDuration = 0.2; // 200ms for each beep
        const pauseDuration = 0.3; // 300ms pause between beeps
        const frequency = 880; // A5 note
        
        // First beep
        const oscillator1 = context.createOscillator();
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(frequency, context.currentTime);
        oscillator1.connect(context.destination);
        oscillator1.start();
        oscillator1.stop(context.currentTime + beepDuration);
        
        // Second beep
        const oscillator2 = context.createOscillator();
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(frequency, context.currentTime + beepDuration + pauseDuration);
        oscillator2.connect(context.destination);
        oscillator2.start(context.currentTime + beepDuration + pauseDuration);
        oscillator2.stop(context.currentTime + beepDuration * 2 + pauseDuration);
        
        // Third beep
        const oscillator3 = context.createOscillator();
        oscillator3.type = 'sine';
        oscillator3.frequency.setValueAtTime(frequency, context.currentTime + beepDuration * 2 + pauseDuration * 2);
        oscillator3.connect(context.destination);
        oscillator3.start(context.currentTime + beepDuration * 2 + pauseDuration * 2);
        oscillator3.stop(context.currentTime + beepDuration * 3 + pauseDuration * 2);
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SleepTimer();
});
