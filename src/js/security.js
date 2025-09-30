console.log('Loading security utilities...');

// Security utility functions
const SecurityUtils = {
    // Enhanced sanitization with validation
    sanitize(text, forFilename = false) {
        if (typeof text !== 'string') return '';
        
        // Length validation
        if (text.length > 1000) {
            this.logSecurityEvent('Input too long', text.length);
            return '';
        }
        
        if (forFilename) {
            // Additional validation for hero names when used as filenames
            if (typeof HEROES !== 'undefined' && text.trim() && !HEROES.includes(text.trim())) {
                this.logSecurityEvent('Invalid hero name for filename', text);
                return 'default';
            }
            
            return text.replace(/[^a-zA-Z0-9\-_\s]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
        }
        
        return text.replace(/[<>&"']/g, match => ({
            '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'
        })[match]);
    },

    // Simplified element creation with optional image handling
    create(tag, className = '', content = '', isImage = false) {
        // Whitelist allowed tags
        const allowedTags = ['div', 'span', 'img', 'h1', 'h2', 'h3', 'h4', 'p', 'strong', 'input'];
        if (!allowedTags.includes(tag)) {
            this.logSecurityEvent('Unauthorized tag attempted', tag);
            tag = 'div';
        }
        
        const element = document.createElement(tag);
        if (className) element.className = this.sanitize(className);
        
        if (isImage) {
            element.alt = this.sanitize(content);
            element.src = content;
            element.onerror = () => element.src = './src/assets/icons/heroes/default.webp';
        } else if (content) {
            element.textContent = this.sanitize(content);
        }
        
        return element;
    },

    // Validate hero against known list
    validateHero(heroName) {
        if (typeof HEROES === 'undefined') return false;
        if (typeof heroName !== 'string') return false;
        return HEROES.includes(heroName.trim());
    },

    // Validate counter data exists
    validateCounterData(heroName) {
        if (!this.validateHero(heroName)) return false;
        if (typeof COUNTER_DATA === 'undefined') return false;
        return COUNTER_DATA.hasOwnProperty(heroName);
    },

    // Enhanced clearing with validation
    clear(element) {
        if (!element || !element.nodeType) {
            this.logSecurityEvent('Invalid element for clearing', typeof element);
            return;
        }
        element.textContent = '';
    },

    // Security event logging
    logSecurityEvent(event, details) {
        console.warn(`[SECURITY] ${event}:`, details);
    }
};

// Enhanced hero image URL generation with validation
function getHeroImageUrl(heroName) {
    // Validate hero exists first
    if (typeof HEROES !== 'undefined' && !SecurityUtils.validateHero(heroName)) {
        SecurityUtils.logSecurityEvent('Invalid hero requested', heroName);
        return './src/assets/icons/heroes/default.webp';
    }
    
    const sanitized = SecurityUtils.sanitize(heroName, true);
    if (!sanitized || sanitized === 'default') {
        return './src/assets/icons/heroes/default.webp';
    }
    
    const path = `./src/assets/icons/heroes/${sanitized}.webp`;
    
    // Additional path validation
    if (path.includes('..') || path.includes('//')) {
        SecurityUtils.logSecurityEvent('Path traversal attempt', path);
        return './src/assets/icons/heroes/default.webp';
    }
    
    return path;
}

function getHeroFallbackIcon(heroName) {
    // Return a safe fallback icon
    return './src/assets/icons/heroes/default.webp';
}

console.log('Security utilities loaded');
