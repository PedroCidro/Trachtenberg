import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <Link href="https://github.com/pedrocp/Trachtenberg" target="_blank" className="footer__text">
                Trachtenberg — Treino de cálculo mental rápido
            </Link>
        </footer>
    );
}
