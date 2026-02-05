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

export interface DailyUsage {
    date: string; // YYYY-MM-DD format
    count: number;
}

export interface SubscriptionStatus {
    isSubscribed: boolean;
    deviceId: string;
    expiresAt?: string;
}

const Storage = {
    KEYS: {
        PREFERENCES: 'trachtenberg_prefs',
        STATS: 'trachtenberg_stats',
        DAILY_USAGE: 'trachtenberg_daily',
        SUBSCRIPTION: 'trachtenberg_subscription',
        DEVICE_ID: 'trachtenberg_device_id',
    },

    isBrowser(): boolean {
        return typeof window !== 'undefined';
    },

    /**
     * Get today's date in YYYY-MM-DD format
     */
    getTodayDate(): string {
        return new Date().toISOString().split('T')[0];
    },

    /**
     * Get or create a unique device ID
     */
    getDeviceId(): string {
        if (!this.isBrowser()) return '';

        let deviceId = localStorage.getItem(this.KEYS.DEVICE_ID);
        if (!deviceId) {
            deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
            localStorage.setItem(this.KEYS.DEVICE_ID, deviceId);
        }
        return deviceId;
    },

    /**
     * Get daily usage (resets automatically for new day)
     */
    getDailyUsage(): DailyUsage {
        if (!this.isBrowser()) return { date: this.getTodayDate(), count: 0 };

        const data = localStorage.getItem(this.KEYS.DAILY_USAGE);
        if (!data) return { date: this.getTodayDate(), count: 0 };

        try {
            const usage: DailyUsage = JSON.parse(data);
            // Reset if it's a new day
            if (usage.date !== this.getTodayDate()) {
                return { date: this.getTodayDate(), count: 0 };
            }
            return usage;
        } catch {
            return { date: this.getTodayDate(), count: 0 };
        }
    },

    /**
     * Increment daily usage and return new count
     */
    incrementDailyUsage(): number {
        if (!this.isBrowser()) return 0;

        const usage = this.getDailyUsage();
        usage.count += 1;
        usage.date = this.getTodayDate(); // Ensure date is current
        localStorage.setItem(this.KEYS.DAILY_USAGE, JSON.stringify(usage));
        return usage.count;
    },

    /**
     * Get subscription status
     */
    getSubscription(): SubscriptionStatus {
        if (!this.isBrowser()) return { isSubscribed: false, deviceId: '' };

        const data = localStorage.getItem(this.KEYS.SUBSCRIPTION);
        if (!data) return { isSubscribed: false, deviceId: this.getDeviceId() };

        try {
            const sub: SubscriptionStatus = JSON.parse(data);
            // Check if subscription has expired
            if (sub.expiresAt && new Date(sub.expiresAt) < new Date()) {
                return { isSubscribed: false, deviceId: this.getDeviceId() };
            }
            return sub;
        } catch {
            return { isSubscribed: false, deviceId: this.getDeviceId() };
        }
    },

    /**
     * Update subscription status
     */
    setSubscription(status: Partial<SubscriptionStatus>): void {
        if (!this.isBrowser()) return;

        const current = this.getSubscription();
        const updated = { ...current, ...status, deviceId: this.getDeviceId() };
        localStorage.setItem(this.KEYS.SUBSCRIPTION, JSON.stringify(updated));
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
