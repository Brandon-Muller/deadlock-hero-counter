'use strict';

console.log('Loading app.js...');

class DeadlockCounterApp {
    constructor() {
        console.log('App constructor called');
        this.selectedHeroes = {
            laner1: '', laner2: '', team1: '', team2: '', team3: '', team4: ''
        };
        this.init();
    }
    
    init() {
        console.log('Initializing app...');
        
        // Simple validation
        if (!this.validateDataIntegrity()) {
            throw new Error('Required data not loaded');
        }
        
        console.log('HEROES available:', HEROES.length);
        
        setTimeout(() => {
            this.setupCustomDropdowns();
            this.setupClearButton();
        }, 100);
    }
    
    validateDataIntegrity() {
        return typeof SecurityUtils !== 'undefined' && 
               Array.isArray(HEROES) && HEROES.length > 0 &&
               typeof COUNTER_DATA === 'object' && COUNTER_DATA !== null;
    }
    
    setupCustomDropdowns() {
        console.log('Setting up custom dropdowns...');
        document.querySelectorAll('.hero-dropdown').forEach(dropdown => {
            this.createCustomDropdown(dropdown);
        });
        console.log('Custom dropdowns setup complete');
    }
    
    createCustomDropdown(originalSelect) {
        const dropdownId = originalSelect.id;
        const container = originalSelect.parentNode;
        originalSelect.style.display = 'none';
        
        // Create dropdown structure
        const customDropdown = SecurityUtils.create('div', 'custom-dropdown');
        customDropdown.setAttribute('data-dropdown-id', dropdownId);
        
        const dropdownButton = SecurityUtils.create('div', 'dropdown-button');
        const searchInput = SecurityUtils.create('input');
        searchInput.type = 'text';
        searchInput.className = 'hero-search';
        searchInput.placeholder = 'Select Hero...';
        searchInput.readOnly = true;
        
        const arrow = SecurityUtils.create('span', 'dropdown-arrow', '▼');
        dropdownButton.appendChild(searchInput);
        dropdownButton.appendChild(arrow);
        
        // Create options
        const optionsList = SecurityUtils.create('div', 'dropdown-options');
        
        // Default option
        const defaultOption = SecurityUtils.create('div', 'dropdown-option');
        defaultOption.setAttribute('data-value', '');
        defaultOption.appendChild(SecurityUtils.create('span', 'hero-text', 'Select Hero...'));
        optionsList.appendChild(defaultOption);
        
        // Hero options
        HEROES.forEach(hero => {
            if (!SecurityUtils.validateHero(hero)) return;
            
            const option = SecurityUtils.create('div', 'dropdown-option');
            option.setAttribute('data-value', hero);
            option.setAttribute('data-search', hero.toLowerCase());
            
            option.appendChild(SecurityUtils.create('img', 'hero-icon', getHeroImageUrl(hero), true));
            option.appendChild(SecurityUtils.create('span', 'hero-text', hero));
            optionsList.appendChild(option);
        });
        
        customDropdown.appendChild(dropdownButton);
        customDropdown.appendChild(optionsList);
        container.appendChild(customDropdown);
        
        this.attachCustomDropdownListeners(customDropdown, originalSelect);
        console.log(`Custom dropdown created for ${dropdownId}`);
    }
    
    filterOptions(customDropdown, searchTerm) {
        const sanitizedTerm = SecurityUtils.sanitize(searchTerm).toLowerCase();
        customDropdown.querySelectorAll('.dropdown-option').forEach(option => {
            const searchData = option.getAttribute('data-search') || '';
            const heroText = option.querySelector('.hero-text')?.textContent || '';
            
            const isMatch = searchData === '' || searchData.includes(sanitizedTerm) || heroText.toLowerCase().includes(sanitizedTerm);
            option.style.display = isMatch ? 'flex' : 'none';
        });
    }
    
    updateDropdownAvailability() {
        const selectedHeroValues = Object.values(this.selectedHeroes).filter(hero => hero !== '');
        
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
            const dropdownId = dropdown.getAttribute('data-dropdown-id');
            const currentSelection = this.selectedHeroes[dropdownId];
            
            dropdown.querySelectorAll('.dropdown-option').forEach(option => {
                const heroValue = option.getAttribute('data-value');
                if (heroValue === '') return;
                
                const isSelectedElsewhere = selectedHeroValues.includes(heroValue) && heroValue !== currentSelection;
                
                if (isSelectedElsewhere) {
                    option.classList.add('disabled');
                    option.style.opacity = '0.5';
                    option.style.pointerEvents = 'none';
                } else {
                    option.classList.remove('disabled');
                    option.style.opacity = '1';
                    option.style.pointerEvents = 'auto';
                }
            });
        });
    }
    
    attachCustomDropdownListeners(customDropdown, originalSelect) {
        const button = customDropdown.querySelector('.dropdown-button');
        const searchInput = customDropdown.querySelector('.hero-search');
        const options = customDropdown.querySelectorAll('.dropdown-option');
        const dropdownId = customDropdown.getAttribute('data-dropdown-id');
        
        // Button click
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target === searchInput) {
                if (!customDropdown.classList.contains('open')) {
                    this.openDropdown(customDropdown, searchInput);
                }
                return;
            }
            
            if (customDropdown.classList.contains('open')) {
                this.closeDropdown(customDropdown, searchInput);
            } else {
                this.openDropdown(customDropdown, searchInput);
            }
        });
        
        // Input events
        searchInput.addEventListener('focus', (e) => {
            e.stopPropagation();
            if (!customDropdown.classList.contains('open')) {
                this.openDropdown(customDropdown, searchInput);
            }
        });
        
        searchInput.addEventListener('input', (e) => {
            e.stopPropagation();
            this.filterOptions(customDropdown, e.target.value);
        });
        
        searchInput.addEventListener('click', (e) => e.stopPropagation());
        
        // Keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            e.stopPropagation();
            const visibleOptions = Array.from(options).filter(option => 
                option.style.display !== 'none' && !option.classList.contains('disabled')
            );
            
            if (e.key === 'ArrowDown' && visibleOptions.length > 0) {
                e.preventDefault();
                visibleOptions[0].click();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.closeDropdown(customDropdown, searchInput);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const firstVisible = visibleOptions.find(option => option.getAttribute('data-value') !== '');
                if (firstVisible) firstVisible.click();
            }
        });
        
        // Option selection with essential validation
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                if (option.classList.contains('disabled')) return;
                
                const value = option.getAttribute('data-value') || '';
                const heroText = option.querySelector('.hero-text')?.textContent || '';
                
                // Essential validation only
                if (value !== '' && !SecurityUtils.validateHero(value)) {
                    console.warn('Invalid hero selection blocked:', value);
                    return;
                }
                
                // Update display
                if (value === '') {
                    searchInput.value = '';
                    searchInput.placeholder = 'Select Hero...';
                } else {
                    searchInput.value = SecurityUtils.sanitize(heroText);
                    searchInput.placeholder = '';
                }
                
                originalSelect.value = value;
                this.selectedHeroes[dropdownId] = value;
                
                this.closeDropdown(customDropdown, searchInput);
                this.filterOptions(customDropdown, '');
                this.updateDropdownAvailability();
                
                console.log('Hero selected:', dropdownId, '=', value);
                this.updateCounterDisplay();
            });
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!customDropdown.contains(e.target)) {
                this.closeDropdown(customDropdown, searchInput);
            }
        });
    }
    
    openDropdown(customDropdown, searchInput) {
        document.querySelectorAll('.custom-dropdown.open').forEach(dd => {
            if (dd !== customDropdown) {
                const otherInput = dd.querySelector('.hero-search');
                if (otherInput) this.closeDropdown(dd, otherInput);
            }
        });
        
        customDropdown.classList.add('open');
        searchInput.readOnly = false;
        setTimeout(() => {
            searchInput.focus();
            searchInput.select();
        }, 10);
        
        this.updateDropdownAvailability();
    }
    
    closeDropdown(customDropdown, searchInput) {
        customDropdown.classList.remove('open');
        searchInput.readOnly = true;
        searchInput.blur();
        this.filterOptions(customDropdown, '');
    }
    
    updateCounterDisplay() {
        const selectedCount = Object.values(this.selectedHeroes).filter(hero => hero !== '').length;
        console.log('Selected heroes count:', selectedCount);
        
        if (selectedCount === 0) {
            this.showEmptyState();
            return;
        }
        
        const analysis = this.analyzeCounters();
        this.displayResults(analysis);
    }
    
    analyzeCounters() {
        const allSelectedHeroes = Object.values(this.selectedHeroes).filter(hero => hero !== '');
        const lanerHeroes = [this.selectedHeroes.laner1, this.selectedHeroes.laner2].filter(hero => hero !== '');
        
        console.log('Analyzing counters for:', allSelectedHeroes);
        
        const counterTypes = Object.keys(COUNTER_DATA[HEROES[0]]).filter(key => 
            !['Key Ability', 'Misc Counters', 'Tech'].includes(key)
        );
        
        const laneCounters = this.calculateCounterEffectiveness(lanerHeroes, counterTypes);
        const teamCounters = this.calculateCounterEffectiveness(allSelectedHeroes, counterTypes);
        
        const techInfo = allSelectedHeroes.map(hero => ({
            name: hero,
            tech: COUNTER_DATA[hero]['Tech'] || 'No specific strategy',
            keyAbility: lanerHeroes.includes(hero) ? COUNTER_DATA[hero]['Key Ability'] : null,
            isLaner: lanerHeroes.includes(hero)
        }));
        
        return {
            laneCounters: laneCounters.slice(0, 2),
            teamCounters: teamCounters.slice(0, 3),
            techInfo,
            hasLaners: lanerHeroes.length > 0,
            hasTeam: allSelectedHeroes.length > 0
        };
    }
    
    calculateCounterEffectiveness(heroes, counterTypes) {
        const counterScores = {};
        
        counterTypes.forEach(counter => {
            let greatCount = 0, okayCount = 0, specificItems = [], effectiveAgainst = [];
            
            heroes.forEach(hero => {
                if (COUNTER_DATA[hero] && COUNTER_DATA[hero][counter]) {
                    const value = COUNTER_DATA[hero][counter];
                    
                    if (value && !['great', 'okay', 'bad'].includes(value.toLowerCase())) {
                        specificItems.push({hero, item: value});
                        effectiveAgainst.push(hero);
                    } else {
                        switch(value.toLowerCase()) {
                            case 'great':
                                greatCount++;
                                effectiveAgainst.push(hero);
                                break;
                            case 'okay':
                                okayCount++;
                                effectiveAgainst.push(hero);
                                break;
                        }
                    }
                }
            });
            
            const score = (greatCount * 3) + (okayCount * 1) + (specificItems.length * 2);
            const cost = typeof ITEM_COSTS !== 'undefined' ? (ITEM_COSTS[counter] || 9999) : 9999;
            
            if (score > 0) {
                counterScores[counter] = {
                    score, cost, greatCount, okayCount, specificItems, effectiveAgainst,
                    totalHeroes: heroes.length,
                    costEfficiency: score / (cost / 800)
                };
            }
        });
        
        return Object.entries(counterScores)
            .sort(([,a], [,b]) => {
                if (Math.abs(a.costEfficiency - b.costEfficiency) > 0.1) {
                    return b.costEfficiency - a.costEfficiency;
                }
                if (a.score !== b.score) return b.score - a.score;
                return a.cost - b.cost;
            })
            .map(([counter, data]) => ({ counter, ...data }));
    }
    
    displayResults(analysis) {
        const displayElement = document.getElementById('counter-display');
        SecurityUtils.clear(displayElement);
        
        if (analysis.hasLaners) {
            displayElement.appendChild(this.createCounterSection('Lane Phase Counters', analysis.laneCounters, 'lane-section'));
        }
        
        if (analysis.hasTeam && analysis.teamCounters.length > 0) {
            displayElement.appendChild(this.createCounterSection('Team Fight Counters', analysis.teamCounters, 'team-section'));
        }
        
        if (analysis.techInfo.length > 0) {
            displayElement.appendChild(this.createTechSection(analysis));
        }
    }
    
    // Consolidated counter section creation
    createCounterSection(title, counters, className) {
        const section = SecurityUtils.create('div', className);
        section.appendChild(SecurityUtils.create('h3', '', title));
        
        if (counters.length > 0) {
            const grid = SecurityUtils.create('div', 'counters-grid');
            counters.forEach(counter => grid.appendChild(this.renderCounterItem(counter)));
            section.appendChild(grid);
        }
        
        return section;
    }
    
    createTechSection(analysis) {
        const techSection = SecurityUtils.create('div', 'tech-section');
        
        const title = document.createElement('h3');
        title.textContent = 'Strategy & Tech';
        techSection.appendChild(title);
        
        analysis.techInfo.forEach(hero => {
            const techInfo = SecurityUtils.create('div', 'tech-info');
            
            const strongContainer = SecurityUtils.create('strong');
            strongContainer.appendChild(SecurityUtils.create('img', 'tech-hero-icon', getHeroImageUrl(hero.name), true));
            strongContainer.appendChild(SecurityUtils.create('span', '', `${hero.name}${hero.isLaner ? ' (Laner)' : ''}:`));
            techInfo.appendChild(strongContainer);
            
            // Add key ability for laners
            if (hero.isLaner && hero.keyAbility) {
                const keyAbilityDiv = SecurityUtils.create('div', 'key-ability-info');
                keyAbilityDiv.appendChild(SecurityUtils.create('span', '', 'Key Ability to Monitor: '));
                keyAbilityDiv.appendChild(SecurityUtils.create('span', 'key-ability', hero.keyAbility));
                techInfo.appendChild(keyAbilityDiv);
            }
            
            // Tech text without over-sanitization
            const techTextDiv = document.createElement('div');
            techTextDiv.className = 'tech-text';
            techTextDiv.textContent = hero.tech;
            techInfo.appendChild(techTextDiv);
            
            techSection.appendChild(techInfo);
        });
        
        return techSection;
    }
    
    renderCounterItem(counter) {
        const counterDiv = SecurityUtils.create('div', 'counter-item');
        
        // Header with cost
        const header = SecurityUtils.create('div', 'counter-header');
        const costDisplay = counter.cost && counter.cost !== 9999 ? ` - $${counter.cost}` : '';
        header.appendChild(SecurityUtils.create('div', 'counter-name', `${counter.counter}${costDisplay}`));
        
        if (typeof ABILITY_ICONS !== 'undefined' && ABILITY_ICONS[counter.counter]) {
            header.appendChild(this.createAbilityIcons(counter.counter));
        }
        
        counterDiv.appendChild(header);
        
        // Effectiveness
        const effectiveness = SecurityUtils.create('div', 'counter-effectiveness');
        
        if (counter.greatCount > 0) {
            effectiveness.appendChild(SecurityUtils.create('span', 
                'effectiveness-indicator effectiveness-great', 
                `Great vs ${counter.greatCount}/${counter.totalHeroes}`
            ));
        }
        
        if (counter.okayCount > 0) {
            effectiveness.appendChild(SecurityUtils.create('span', 
                'effectiveness-indicator effectiveness-okay', 
                `Okay vs ${counter.okayCount}/${counter.totalHeroes}`
            ));
        }
        
        counterDiv.appendChild(effectiveness);
        
        // Details
        const details = SecurityUtils.create('div', 'counter-details');
        
        if (counter.specificItems.length > 0) {
            const specificDiv = SecurityUtils.create('div', 'specific-items');
            specificDiv.appendChild(SecurityUtils.create('strong', '', 'Specific builds: '));
            
            const itemsText = counter.specificItems.map(item => 
                `${SecurityUtils.sanitize(item.hero)}: ${SecurityUtils.sanitize(item.item)}`
            ).join(', ');
            
            specificDiv.appendChild(SecurityUtils.create('span', '', itemsText));
            details.appendChild(specificDiv);
        }
        
        details.appendChild(SecurityUtils.create('div', 'affected-heroes', 
            `Effective against: ${counter.effectiveAgainst.map(hero => SecurityUtils.sanitize(hero)).join(', ')}`
        ));
        
        counterDiv.appendChild(details);
        return counterDiv;
    }
    
    createAbilityIcons(counterName) {
        const iconsDiv = SecurityUtils.create('div', 'ability-icons');
        const icons = ABILITY_ICONS[counterName];
        
        if (Array.isArray(icons)) {
            icons.forEach(fileName => {
                const abilityName = this.formatAbilityName(fileName.replace('.webp', ''));
                const img = SecurityUtils.create('img', 'ability-icon', `./src/assets/icons/abilities/${fileName}`, true);
                img.title = abilityName;
                iconsDiv.appendChild(img);
            });
        } else if (typeof icons === 'string') {
            const abilityName = this.formatAbilityName(icons.replace('.webp', ''));
            const img = SecurityUtils.create('img', 'ability-icon', `./src/assets/icons/abilities/${icons}`, true);
            img.title = abilityName;
            iconsDiv.appendChild(img);
        }
        
        return iconsDiv;
    }
    
    formatAbilityName(abilityName) {
        return SecurityUtils.sanitize(abilityName)
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    showEmptyState() {
        const displayElement = document.getElementById('counter-display');
        SecurityUtils.clear(displayElement);
        displayElement.appendChild(SecurityUtils.create('p', '', 'Select enemy heroes to see counter recommendations...'));
    }
    
    clearAllSelections() {
        console.log('Clearing all hero selections...');
        
        this.selectedHeroes = {
            laner1: '', laner2: '', team1: '', team2: '', team3: '', team4: ''
        };
        
        document.querySelectorAll('.hero-dropdown').forEach(select => {
            select.value = '';
        });
        
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
            const searchInput = dropdown.querySelector('.hero-search');
            if (searchInput) {
                searchInput.value = '';
                searchInput.placeholder = 'Select Hero...';
            }
        });
        
        this.updateDropdownAvailability();
        this.updateCounterDisplay();
        
        console.log('All selections cleared successfully');
    }
    
    setupClearButton() {
        const clearButton = document.getElementById('clear-all-btn');
        if (!clearButton) {
            console.warn('Clear button not found in DOM');
            return;
        }
        
        clearButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.clearAllSelections();
        });
        
        console.log('Clear button setup complete');
    }
}

// Simple initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting app...');
    try {
        if (typeof SecurityUtils === 'undefined' || typeof HEROES === 'undefined' || typeof COUNTER_DATA === 'undefined') {
            throw new Error('Required modules not loaded');
        }
        
        window.app = new DeadlockCounterApp();
        console.log('App started successfully');
    } catch (error) {
        console.error('Error starting app:', error);
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = '<p style="text-align: center; padding: 20px; color: #ff6b35;">Application failed to load. Please refresh.</p>';
        }
    }
});

console.log('app.js loaded');
