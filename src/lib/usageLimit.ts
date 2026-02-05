/**
 * Usage limit constants and logic for freemium model
 */

export const FREE_DAILY_LIMIT = 15;

/**
 * Check if user can do another exercise
 */
export function canUseExercise(usageCount: number, isSubscribed: boolean): boolean {
    if (isSubscribed) return true;
    return usageCount < FREE_DAILY_LIMIT;
}

/**
 * Get remaining exercises for the day
 */
export function getRemainingExercises(usageCount: number, isSubscribed: boolean): number | 'unlimited' {
    if (isSubscribed) return 'unlimited';
    return Math.max(0, FREE_DAILY_LIMIT - usageCount);
}

/**
 * Get time until daily limit resets (midnight local time)
 */
export function getTimeUntilReset(): { hours: number; minutes: number } {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const diffMs = midnight.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
}

/**
 * Format remaining exercises for display
 */
export function formatRemaining(usageCount: number, isSubscribed: boolean): string {
    const remaining = getRemainingExercises(usageCount, isSubscribed);
    if (remaining === 'unlimited') return 'Ilimitado';
    return `${usageCount}/${FREE_DAILY_LIMIT}`;
}
