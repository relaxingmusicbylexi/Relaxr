class DarkModeToggle {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.applySavedTheme();
    }

    initializeElements() {
        // Create container for theme toggle
        const themeContainer = document.createElement('div');
        themeContainer.className = 'theme-container';
        
        // Create theme toggle button
        this.themeToggle = document.createElement('div');
        this.themeToggle.className = 'theme-toggle';
        
        // Add sun/moon icon
        const icon = document.createElement('svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.innerHTML = `
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 9 15.5 9 14 9.67 14 10.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 9 8.5 9 7 9.67 7 10.5 7.67 12 8.5 12zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        `;
        this.themeToggle.appendChild(icon);

        // Add text
        const themeText = document.createElement('span');
        themeText.className = 'theme-text';
        themeText.textContent = 'Dark Mode';
        
        // Add both elements to container
        themeContainer.appendChild(this.themeToggle);
        themeContainer.appendChild(themeText);
        
        // Add container to DOM
        document.body.appendChild(themeContainer);
    }

    setupEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = this.themeToggle.querySelector('svg path');
        icon.setAttribute('d', newTheme === 'dark' ?
            'M21.64 13.14l.02-.02-6.8-4.53a.996.996 0 0 0-.8-.4c-1.12 0-2.03.91-2.03 2.03 0 .8.48 1.51 1.2 1.89l5.58 3.72a1 1 0 0 0 1.41 0l5.58-3.72c.72-.5.12-1.39-1.1-1.39z' :
            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 9 15.5 9 14 9.67 14 10.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 9 8.5 9 7 9.67 7 10.5 7.67 12 8.5 12zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'
        );
    }

    applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Initialize icon based on saved theme
        const icon = this.themeToggle.querySelector('svg path');
        icon.setAttribute('d', savedTheme === 'dark' ?
            'M21.64 13.14l.02-.02-6.8-4.53a.996.996 0 0 0-.8-.4c-1.12 0-2.03.91-2.03 2.03 0 .8.48 1.51 1.2 1.89l5.58 3.72a1 1 0 0 0 1.41 0l5.58-3.72c.72-.5.12-1.39-1.1-1.39z' :
            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 9 15.5 9 14 9.67 14 10.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 9 8.5 9 7 9.67 7 10.5 7.67 12 8.5 12zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'
        );
    }
}

// Initialize dark mode toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});
