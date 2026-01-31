export interface Preferences {
    minDigits: number;
    maxDigits: number;
}

export interface SessionResult {
    multiplier: any;
    correct: number;
    incorrect: number;
    time: number;
    date: string;
}

const Storage = {
    KEYS: {
        PREFERENCES: 'trachtenberg_prefs',
        STATS: 'trachtenberg_stats',
    },

    isBrowser(): boolean {
        return typeof window !== 'undefined';
    },

    /**
     * Save user preferences
     */
    updatePreferences(prefs: Preferences): void {
        if (!this.isBrowser()) return;
        localStorage.setItem(this.KEYS.PREFERENCES, JSON.stringify(prefs));
    },

    /**
     * Get user preferences
     */
    getPreferences(): Preferences | null {
        if (!this.isBrowser()) return null;
        const data = localStorage.getItem(this.KEYS.PREFERENCES);
        return data ? JSON.parse(data) : null;
    },

    /**
     * Save session statistics
     */
    saveSession(result: SessionResult): void {
        if (!this.isBrowser()) return;

        const currentStats = this.getStats();
        currentStats.push(result);

        // Limit history if needed (e.g. keep last 1000)
        if (currentStats.length > 1000) {
            currentStats.shift();
        }

        localStorage.setItem(this.KEYS.STATS, JSON.stringify(currentStats));
    },

    /**
     * Get all statistics
     */
    getStats(): SessionResult[] {
        if (!this.isBrowser()) return [];

        const data = localStorage.getItem(this.KEYS.STATS);
        // Handle potential malformed data or empty
        try {
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    /**
     * Clear all data
     */
    clearAll(): void {
        if (!this.isBrowser()) return;
        localStorage.removeItem(this.KEYS.STATS);
        localStorage.removeItem(this.KEYS.PREFERENCES);
    }
};

export default Storage;
