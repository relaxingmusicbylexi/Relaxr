describe('Search functionality', () => {
    let searchInput;
    let clearButton;
    let filterSelect;
    let mockSoundItems;

    beforeEach(() => {
        // Create mock DOM elements
        document.body.innerHTML = `
            <header>
                <input type="text" class="search-input" />
                <button class="search-clear-btn">×</button>
                <div class="search-filter-container">
                    <label>Filter by category:</label>
                    <select class="search-filter"></select>
                </div>
                <div class="sound-item" data-categories="nature">Forest Sounds</div>
                <div class="sound-item" data-categories="white-noise">White Noise</div>
                <div class="sound-item" data-categories="music">Ambient Music</div>
            </header>
        `;

        searchInput = document.querySelector('.search-input');
        clearButton = document.querySelector('.search-clear-btn');
        filterSelect = document.querySelector('.search-filter');
        mockSoundItems = document.querySelectorAll('.sound-item');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('Search input functionality', () => {
        it('should initialize search input', () => {
            expect(searchInput).toBeInTheDocument();
            expect(searchInput.type).toBe('text');
            expect(searchInput.className).toBe('search-input');
        });

        it('should handle search input and filter sounds', () => {
            // Mock search function
            const mockHandleSearchInput = jest.fn();
            search.handleSearchInput = mockHandleSearchInput;

            // Simulate typing
            searchInput.value = 'forest';
            searchInput.dispatchEvent(new Event('input'));

            expect(mockHandleSearchInput).toHaveBeenCalledWith('forest');
        });

        it('should clear search when clear button is clicked', () => {
            // Mock clear function
            const mockClearSearch = jest.fn();
            search.clearSearch = mockClearSearch;

            // Simulate click
            clearButton.click();

            expect(mockClearSearch).toHaveBeenCalled();
        });
    });

    describe('Category filter functionality', () => {
        it('should initialize category filter', () => {
            expect(filterSelect).toBeInTheDocument();
            expect(filterSelect.className).toBe('search-filter');
            expect(filterSelect.options.length).toBeGreaterThan(0);
        });

        it('should filter sounds by category', () => {
            // Mock filter function
            const mockHandleCategoryFilter = jest.fn();
            search.handleCategoryFilter = mockHandleCategoryFilter;

            // Simulate category selection
            filterSelect.value = 'nature';
            filterSelect.dispatchEvent(new Event('change'));

            expect(mockHandleCategoryFilter).toHaveBeenCalledWith('nature');
        });
    });

    describe('Keyboard navigation', () => {
        it('should focus search input with Ctrl+F', () => {
            // Mock keyboard event
            const mockEvent = new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 'f'
            });

            // Mock focus function
            const mockFocus = jest.fn();
            searchInput.focus = mockFocus;

            // Simulate Ctrl+F
            document.dispatchEvent(mockEvent);

            expect(mockFocus).toHaveBeenCalled();
        });

        it('should handle tab navigation between sound items', () => {
            // Mock tab navigation function
            const mockHandleTabNavigation = jest.fn();
            search.handleTabNavigation = mockHandleTabNavigation;

            // Simulate tab key
            const mockTabEvent = new KeyboardEvent('keydown', {
                key: 'Tab'
            });

            document.dispatchEvent(mockTabEvent);

            expect(mockHandleTabNavigation).toHaveBeenCalledWith(false);
        });
    });

    describe('Search results highlighting', () => {
        it('should highlight search matches', () => {
            // Mock highlight function
            const mockHighlightMatches = jest.fn();
            search.highlightMatches = mockHighlightMatches;

            // Simulate search
            searchInput.value = 'forest';
            searchInput.dispatchEvent(new Event('input'));

            expect(mockHighlightMatches).toHaveBeenCalledWith('forest');
        });
    });
});
