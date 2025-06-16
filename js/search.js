// Search functionality implementation
const search = {
    init() {
        this.setupSearchInput();
        this.setupKeyboardNavigation();
    },

    setupSearchInput() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = 'Search sounds...';
        searchInput.setAttribute('aria-label', 'Search sounds');
        
        // Add to DOM
        const table = document.querySelector('table');
        if (table) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.style.marginBottom = '20px';
            
            // Add clear button
            const clearBtn = document.createElement('button');
            clearBtn.className = 'search-clear-btn';
            clearBtn.textContent = '×';
            clearBtn.setAttribute('aria-label', 'Clear search');
            
            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(clearBtn);
            table.parentNode.insertBefore(searchContainer, table);

            // Event listeners
            searchInput.addEventListener('input', () => this.handleSearchInput(searchInput.value));
            clearBtn.addEventListener('click', () => this.clearSearch(searchInput));
        }
    },

    setupKeyboardNavigation() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        // Keyboard shortcut: Ctrl+F
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Tab navigation
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Prevent tabbing out of search results
                e.preventDefault();
                this.handleTabNavigation(e.shiftKey);
            }
        });
    },

    handleSearchInput(query) {
        const rows = document.querySelectorAll('tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matches = text.includes(query.toLowerCase());
            if (!matches) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
                // Highlight matches in text cells only
                const textCells = row.querySelectorAll('td:not(:first-child):not(:last-child)');
                textCells.forEach(cell => {
                    const h1 = cell.querySelector('h1');
                    if (h1) {
                        const originalText = h1.textContent;
                        const cellText = originalText.toLowerCase();
                        if (cellText.includes(query.toLowerCase())) {
                            const regex = new RegExp(`(${query})`, 'gi');
                            const highlighted = originalText.replace(regex, (match) => {
                                return `<mark>${match}</mark>`;
                            });
                            h1.innerHTML = highlighted;
                        }
                    }
                });
            }
        });
    },

    clearSearch(input) {
        input.value = '';
        this.handleSearchInput('');
        input.focus();
    },

    handleTabNavigation(shift) {
        const rows = document.querySelectorAll('tr');
        const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
        
        if (visibleRows.length === 0) return;

        const currentIndex = Array.from(rows).indexOf(document.activeElement.closest('tr'));
        const nextIndex = shift ? currentIndex - 1 : currentIndex + 1;
        
        if (nextIndex >= 0 && nextIndex < visibleRows.length) {
            const nextRow = visibleRows[nextIndex];
            const playButton = nextRow.querySelector('.play-pause');
            if (playButton) playButton.focus();
        }
    }
};

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    search.init();
});
