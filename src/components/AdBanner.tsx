'use client';

import { useEffect } from 'react';

interface AdBannerProps {
    slot?: string;
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    responsive?: boolean;
    className?: string;
}

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function AdBanner({
    slot,
    format = 'auto',
    responsive = true,
    className = ''
}: AdBannerProps) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`ad-banner ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1477933164693868"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
            />
        </div>
    );
}
