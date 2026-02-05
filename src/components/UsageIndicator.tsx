'use client';

import { formatRemaining } from '@/lib/usageLimit';

interface UsageIndicatorProps {
    dailyUsage: number;
    isSubscribed: boolean;
}

export default function UsageIndicator({ dailyUsage, isSubscribed }: UsageIndicatorProps) {
    const displayText = formatRemaining(dailyUsage, isSubscribed);

    return (
        <div className={`usage-indicator ${isSubscribed ? 'usage-indicator--premium' : ''}`}>
            {isSubscribed ? (
                <>
                    <span className="usage-indicator__icon">⭐</span>
                    <span className="usage-indicator__text">Ilimitado</span>
                </>
            ) : (
                <>
                    <span className="usage-indicator__icon">📊</span>
                    <span className="usage-indicator__text">{displayText}</span>
                </>
            )}
        </div>
    );
}
