'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="header">
            <Link href="/" className="header__logo">
                <span>T</span>rachtenberg
            </Link>
            <nav className="header__nav">
                <Link
                    href="/"
                    className={`header__link ${pathname === '/' || pathname === '/treino' ? 'header__link--active' : ''}`}
                >
                    Treinar
                </Link>
                <Link
                    href="/estatisticas"
                    className={`header__link ${pathname.startsWith('/estatisticas') ? 'header__link--active' : ''}`}
                >
                    Estatísticas
                </Link>
                <Link
                    href="/blog"
                    className={`header__link ${pathname.startsWith('/blog') ? 'header__link--active' : ''}`}
                >
                    Aprender
                </Link>
            </nav>
        </header>
    );
}
