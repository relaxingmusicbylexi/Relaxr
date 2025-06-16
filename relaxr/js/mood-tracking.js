class MoodTracker {
    constructor() {
        this.selectedMood = null;
        this.notes = '';
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadHistory();
    }

    initializeElements() {
        this.moodItems = document.querySelectorAll('.mood-item');
        this.notesInput = document.getElementById('mood-notes');
        this.saveButton = document.getElementById('save-mood');
        this.historyList = document.getElementById('history-list');
        this.historyChart = document.getElementById('history-chart');
    }

    setupEventListeners() {
        this.moodItems.forEach(item => {
            item.addEventListener('click', () => this.selectMood(item));
        });

        this.saveButton.addEventListener('click', () => this.saveMood());

        // Listen for notes input
        this.notesInput.addEventListener('input', () => {
            this.notes = this.notesInput.value;
        });
    }

    selectMood(item) {
        // Remove selection from all items
        this.moodItems.forEach(i => i.classList.remove('selected'));
        
        // Select the clicked item
        item.classList.add('selected');
        this.selectedMood = parseInt(item.getAttribute('data-mood'));
    }

    saveMood() {
        if (!this.selectedMood) {
            alert('Please select a mood before saving');
            return;
        }

        const moodData = {
            mood: this.selectedMood,
            notes: this.notes,
            date: new Date().toISOString()
        };

        // Save to local storage
        let history = JSON.parse(localStorage.getItem('moodHistory')) || [];
        history.push(moodData);
        localStorage.setItem('moodHistory', JSON.stringify(history));

        // Update UI
        this.updateHistoryDisplay();
        this.updateChart();

        // Reset form
        this.moodItems.forEach(item => item.classList.remove('selected'));
        this.selectedMood = null;
        this.notesInput.value = '';
        this.notes = '';
    }

    loadHistory() {
        const history = JSON.parse(localStorage.getItem('moodHistory')) || [];
        this.updateHistoryDisplay(history);
        this.updateChart(history);
    }

    updateHistoryDisplay(history = []) {
        const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        this.historyList.innerHTML = sortedHistory.map(entry => `
            <div class="history-item">
                <span class="mood-icon">${this.getMoodIcon(entry.mood)}</span>
                <div class="notes">${entry.notes}</div>
                <div class="date">${new Date(entry.date).toLocaleDateString()}</div>
            </div>
        `).join('');
    }

    updateChart(history = []) {
        // Create a simple bar chart using HTML/CSS
        const chart = document.createElement('div');
        chart.className = 'mood-chart';
        
        const moodCounts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };

        history.forEach(entry => {
            moodCounts[entry.mood]++;
        });

        Object.entries(moodCounts).forEach(([mood, count]) => {
            const bar = document.createElement('div');
            bar.className = 'mood-bar';
            bar.style.height = `${(count / history.length) * 100}%`;
            bar.title = `Mood ${mood}: ${count} times`;
            chart.appendChild(bar);
        });

        this.historyChart.innerHTML = '';
        this.historyChart.appendChild(chart);
    }

    getMoodIcon(mood) {
        const icons = {
            1: '😢',
            2: '😔',
            3: '😐',
            4: '😊',
            5: '😍'
        };
        return icons[mood];
    }
}

// Initialize mood tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MoodTracker();
});
