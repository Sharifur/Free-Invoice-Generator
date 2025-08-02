// Local storage utilities with error handling

const STORAGE_PREFIX = 'sig_';

export const storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(STORAGE_PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(STORAGE_PREFIX + key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },
    
    clear: () => {
        try {
            // Only clear items with our prefix
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(STORAGE_PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }
};

// Session storage for temporary data
export const sessionStorage = {
    get: (key, defaultValue = null) => {
        try {
            const item = window.sessionStorage.getItem(STORAGE_PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Session storage get error:', error);
            return defaultValue;
        }
    },
    
    set: (key, value) => {
        try {
            window.sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Session storage set error:', error);
            return false;
        }
    },
    
    remove: (key) => {
        try {
            window.sessionStorage.removeItem(STORAGE_PREFIX + key);
            return true;
        } catch (error) {
            console.error('Session storage remove error:', error);
            return false;
        }
    }
};