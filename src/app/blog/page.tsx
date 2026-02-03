import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
    title: 'Aprenda o Método Trachtenberg',
    description: 'Guia completo para aprender o Método Trachtenberg de cálculo mental rápido. Técnicas, história e tutoriais passo a passo para dominar a multiplicação mental.',
    path: '/blog',
});

export default function BlogIndex() {
    return (
        <div className="container page-blog">
            <Header />

            <section className="blog-header">
                <h1 className="blog-header__title">Aprenda o Método Trachtenberg</h1>
                <p className="blog-header__meta">Técnicas de cálculo mental rápido desenvolvidas por um gênio matemático</p>
            </section>

            <nav className="blog-nav">
                <Link href="/blog/historia" className="blog-nav__link">📜 História</Link>
                <Link href="/blog/aprender" className="blog-nav__link">📚 Como Aprender</Link>
            </nav>

            <main className="blog-content">
                <h2>O que é o Método Trachtenberg?</h2>

                <p>
                    O Método Trachtenberg é um sistema revolucionário de cálculo mental que permite realizar
                    multiplicações complexas de forma rápida e precisa, usando técnicas simples e padrões
                    memorizáveis.
                </p>

                <p>
                    Diferente do método tradicional de multiplicação que aprendemos na escola, o sistema
                    Trachtenberg divide cálculos grandes em passos menores e mais gerenciáveis, permitindo
                    que você resolva problemas mentalmente, sem precisar de papel.
                </p>

                <h2>Por que aprender?</h2>

                <ul>
                    <li><strong>Velocidade:</strong> Resolva multiplicações muito mais rápido que o método tradicional</li>
                    <li><strong>Agilidade Mental:</strong> Treine seu cérebro e melhore sua concentração</li>
                    <li><strong>Independência:</strong> Calcule sem calculadora em qualquer situação</li>
                    <li><strong>Confiança:</strong> Ganhe segurança com números no dia a dia</li>
                    <li><strong>Diversão:</strong> Impressione amigos e colegas com suas habilidades</li>
                </ul>

                <h2>Comece sua jornada</h2>

                <div className="card card--hover" style={{ margin: 'var(--space-6) 0' }}>
                    <h3 style={{ color: 'var(--accent)' }}>📜 Conheça a História</h3>
                    <p style={{ marginBottom: 'var(--space-4)' }}>
                        Descubra a incrível história de Jakow Trachtenberg, que desenvolveu este sistema
                        enquanto prisioneiro em um campo de concentração nazista.
                    </p>
                    <Link href="/blog/historia" className="btn btn--secondary">Ler História</Link>
                </div>

                <div className="card card--hover" style={{ margin: 'var(--space-6) 0' }}>
                    <h3 style={{ color: 'var(--accent)' }}>📚 Aprenda o Método</h3>
                    <p style={{ marginBottom: 'var(--space-4)' }}>
                        Guia completo com a ordem ideal de aprendizado e tutoriais detalhados
                        para cada multiplicador.
                    </p>
                    <Link href="/blog/aprender" className="btn btn--secondary">Começar a Aprender</Link>
                </div>

                <div className="card card--hover" style={{ margin: 'var(--space-6) 0' }}>
                    <h3 style={{ color: 'var(--accent)' }}>🎯 Pratique Agora</h3>
                    <p style={{ marginBottom: 'var(--space-4)' }}>
                        Aplique o que aprendeu com nosso treinador interativo. Acompanhe seu
                        progresso com estatísticas detalhadas.
                    </p>
                    <Link href="/" className="btn btn--primary">Ir para Treino</Link>
                </div>

                {/* AdSense */}
                <AdBanner format="horizontal" />
            </main>

            <Footer />
        </div>
    );
}
