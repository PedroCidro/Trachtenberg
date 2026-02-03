import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MultiplierSection from '@/components/MultiplierSection';
import AdBanner from '@/components/AdBanner';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
    title: 'Como Aprender o Método Trachtenberg - Guia Completo',
    description: 'Aprenda multiplicação mental com o Método Trachtenberg. Guia passo a passo com a ordem ideal de aprendizado: ×11, ×5, ×9 e todos os outros multiplicadores.',
    path: '/blog/aprender',
    type: 'article',
});

export default function LearnPage() {
    return (
        <div className="container page-blog">
            <Header />

            <section className="blog-header">
                <h1 className="blog-header__title">Como Aprender o Método Trachtenberg</h1>
                <p className="blog-header__meta">Guia otimizado com a ordem ideal de aprendizado</p>
            </section>

            <nav className="blog-nav">
                <Link href="/blog/historia" className="blog-nav__link">📜 História</Link>
                <Link href="/blog/aprender" className="blog-nav__link blog-nav__link--active">📚 Como Aprender</Link>
            </nav>

            {/* Table of Contents */}
            <nav className="blog-nav" style={{ flexWrap: 'wrap' }}>
                <a href="#ordem" className="blog-nav__link">Ordem de Aprendizado</a>
                <a href="#x11" className="blog-nav__link">×11</a>
                <a href="#x5" className="blog-nav__link">×5</a>
                <a href="#x9" className="blog-nav__link">×9</a>
                <a href="#x6" className="blog-nav__link">×6</a>
                <a href="#x2" className="blog-nav__link">×2</a>
                <a href="#x12" className="blog-nav__link">×12</a>
                <a href="#x3" className="blog-nav__link">×3</a>
                <a href="#x7" className="blog-nav__link">×7</a>
                <a href="#x4" className="blog-nav__link">×4</a>
                <a href="#x8" className="blog-nav__link">×8</a>
            </nav>

            <main className="blog-content">

                <h2>Princípios Fundamentais</h2>

                <p>
                    Antes de aprender as regras específicas, você precisa entender alguns conceitos
                    fundamentais do Método Trachtenberg:
                </p>

                <h3>O Conceito de &quot;Vizinho&quot;</h3>
                <p>
                    O <strong>vizinho</strong> é sempre o dígito imediatamente à direita do dígito que
                    você está processando. Por exemplo, no número <code>483</code>:
                </p>
                <ul>
                    <li>O vizinho de 4 é 8</li>
                    <li>O vizinho de 8 é 3</li>
                    <li>O vizinho de 3 é 0 (imaginamos um zero à direita)</li>
                </ul>

                <h3>Zero à Esquerda</h3>
                <p>
                    Sempre imaginamos um zero à esquerda do número. Então <code>483</code> se torna
                    <code>0483</code>. Isso garante que produzamos todos os dígitos necessários no resultado.
                </p>

                <h3>Processamento da Direita para Esquerda</h3>
                <p>
                    Diferente do método tradicional, processamos os dígitos <strong>da direita para a
                        esquerda</strong>, escrevendo cada dígito do resultado conforme avançamos.
                </p>

                <h3>O Conceito &quot;É Ímpar?&quot;</h3>
                <p>
                    Várias regras usam a verificação: &quot;o dígito atual é ímpar?&quot;. Se sim, adicione 5.
                    Dígitos ímpares: 1, 3, 5, 7, 9.
                </p>

                <h3>💡 Técnica dos Dedos para o Carry</h3>
                <div className="example-box">
                    <div className="example-box__title">Dica de Memorização</div>
                    <div className="example-box__content">
                        Use seus dedos para lembrar o carry enquanto calcula:<br /><br />
                        • <strong>Polegar levantado</strong> = carry 1<br />
                        • <strong>Indicador levantado</strong> = carry 2<br /><br />
                        Assim você libera sua mente para focar no próximo cálculo sem esquecer o carry!
                    </div>
                </div>

                {/* Order of Learning */}
                <h2 id="ordem">Ordem Recomendada de Aprendizado</h2>

                <p>
                    <strong>Não aprenda na ordem numérica!</strong> Alguns multiplicadores são muito mais
                    fáceis que outros. Esta é a ordem otimizada:
                </p>

                <ol>
                    <li><strong>×11</strong> — Mais intuitivo, apenas soma com vizinho</li>
                    <li><strong>×5</strong> — Simples, metade do vizinho apenas</li>
                    <li><strong>×9</strong> — Complemento + vizinho, conceito importante</li>
                    <li><strong>×6</strong> — Variação do ×5, adiciona o próprio dígito</li>
                    <li><strong>×2</strong> — Básico, dobrar cada dígito</li>
                    <li><strong>×12</strong> — Variação do ×11, dobrar + vizinho</li>
                    <li><strong>×3</strong> — Combina dobrar + metade do vizinho</li>
                    <li><strong>×7</strong> — Similar ao ×3</li>
                    <li><strong>×4</strong> — Usa complemento + dobrar</li>
                    <li><strong>×8</strong> — Similar ao ×4</li>
                </ol>

                <AdBanner format="horizontal" />

                {/* Multiplier x11 */}
                <MultiplierSection id="x11" multiplier="11">
                    <h2>Multiplicar por 11</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Some cada dígito com seu vizinho (o dígito à direita).
                        </div>
                    </div>

                    <h3>Passos:</h3>
                    <ol>
                        <li>Copie o último dígito (vizinho é 0)</li>
                        <li>Para cada dígito, some-o ao seu vizinho</li>
                        <li>Se a soma for maior que 9, carregue 1</li>
                        <li>O primeiro dígito (o zero à esquerda) recebe apenas o carry</li>
                    </ol>

                    <h3>Exemplo: 35 × 11</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 035 (adicionamos zero à esquerda)<br /><br />
                            • 5 → 5 + 0 = <strong>5</strong><br />
                            • 3 → 3 + 5 = <strong>8</strong><br />
                            • 0 → 0 + 3 = <strong>3</strong><br /><br />
                            Resultado: <strong>385</strong> ✓
                        </div>
                    </div>

                    <h3>Exemplo com carry: 67 × 11</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 067<br /><br />
                            • 7 → 7 + 0 = <strong>7</strong><br />
                            • 6 → 6 + 7 = 13 → escreve <strong>3</strong>, carrega 1<br />
                            • 0 → 0 + 6 + 1(carry) = <strong>7</strong><br /><br />
                            Resultado: <strong>737</strong> ✓
                        </div>
                    </div>

                    <Link href="/treino?m=11&min=2&max=3" className="btn btn--primary">
                        Praticar ×11 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x5 */}
                <MultiplierSection id="x5" multiplier="5">
                    <h2>Multiplicar por 5</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Pegue a metade do vizinho. Se o dígito atual for ímpar, adicione 5.
                        </div>
                    </div>

                    <h3>Passos:</h3>
                    <ol>
                        <li>Olhe para o vizinho (dígito à direita)</li>
                        <li>Divida o vizinho por 2 (ignore frações)</li>
                        <li>Se o dígito atual for ímpar, adicione 5 ao resultado</li>
                    </ol>

                    <h3>Exemplo: 42 × 5</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 042<br /><br />
                            • 2 → vizinho 0÷2 = 0, 2 é par → <strong>0</strong><br />
                            • 4 → vizinho 2÷2 = 1, 4 é par → <strong>1</strong><br />
                            • 0 → vizinho 4÷2 = 2, 0 é par → <strong>2</strong><br /><br />
                            Resultado: <strong>210</strong> ✓
                        </div>
                    </div>

                    <h3>Exemplo com ímpar: 73 × 5</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 073<br /><br />
                            • 3 → vizinho 0÷2 = 0, 3 é ímpar → 0+5 = <strong>5</strong><br />
                            • 7 → vizinho 3÷2 = 1, 7 é ímpar → 1+5 = <strong>6</strong><br />
                            • 0 → vizinho 7÷2 = 3, 0 é par → <strong>3</strong><br /><br />
                            Resultado: <strong>365</strong> ✓
                        </div>
                    </div>

                    <Link href="/treino?m=5&min=2&max=3" className="btn btn--primary">
                        Praticar ×5 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x9 */}
                <MultiplierSection id="x9" multiplier="9">
                    <h2>Multiplicar por 9</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Subtraia o dígito de 10 (complemento) e some o vizinho. Para o primeiro dígito, subtraia de 10 e diminua 1.
                        </div>
                    </div>

                    <h3>Passos:</h3>
                    <ol>
                        <li>Para cada dígito: (10 - dígito) + vizinho</li>
                        <li>Para o último dígito à esquerda: (10 - dígito) - 1</li>
                        <li>Se o resultado for maior que 9, carregue 1</li>
                    </ol>

                    <h3>Exemplo: 23 × 9</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 023<br /><br />
                            • 3 → (10-3) + 0 = <strong>7</strong><br />
                            • 2 → (10-2) + 3 = 11 → escreve <strong>1</strong>, carry 1<br />
                            • 0 → (10-2) - 1 + carry = 7 + 1 = mas carry... → <strong>2</strong><br /><br />
                            Resultado: <strong>207</strong> ✓
                        </div>
                    </div>

                    <Link href="/treino?m=9&min=2&max=3" className="btn btn--primary">
                        Praticar ×9 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x6 */}
                <MultiplierSection id="x6" multiplier="6">
                    <h2>Multiplicar por 6</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Some o dígito com metade do vizinho. Se o dígito for ímpar, adicione 5.
                        </div>
                    </div>

                    <h3>Passos:</h3>
                    <ol>
                        <li>Pegue o próprio dígito</li>
                        <li>Adicione metade do vizinho (ignore frações)</li>
                        <li>Se o dígito atual for ímpar, adicione 5</li>
                    </ol>

                    <h3>Exemplo: 32 × 6</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 032<br /><br />
                            • 2 → 2 + (0÷2) = 2, par → <strong>2</strong><br />
                            • 3 → 3 + (2÷2) = 4, ímpar → 4+5 = <strong>9</strong><br />
                            • 0 → 0 + (3÷2) = 1, par → <strong>1</strong><br /><br />
                            Resultado: <strong>192</strong> ✓
                        </div>
                    </div>

                    <Link href="/treino?m=6&min=2&max=3" className="btn btn--primary">
                        Praticar ×6 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x2 */}
                <MultiplierSection id="x2" multiplier="2">
                    <h2>Multiplicar por 2</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Dobre cada dígito. Se for maior que 9, carregue 1.
                        </div>
                    </div>

                    <h3>Exemplo: 34 × 2</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 034<br /><br />
                            • 4 → 4×2 = <strong>8</strong><br />
                            • 3 → 3×2 = <strong>6</strong><br />
                            • 0 → 0×2 = <strong>0</strong><br /><br />
                            Resultado: <strong>68</strong> ✓
                        </div>
                    </div>

                    <Link href="/treino?m=2&min=2&max=3" className="btn btn--primary">
                        Praticar ×2 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x12 */}
                <MultiplierSection id="x12" multiplier="12">
                    <h2>Multiplicar por 12</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Dobre o dígito e some o vizinho.
                        </div>
                    </div>

                    <h3>Passos:</h3>
                    <ol>
                        <li>Dobre o dígito atual</li>
                        <li>Some o vizinho ao resultado</li>
                        <li>Carregue se maior que 9</li>
                    </ol>

                    <h3>Exemplo: 24 × 12</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 024<br /><br />
                            • 4 → 4×2 + 0 = <strong>8</strong><br />
                            • 2 → 2×2 + 4 = <strong>8</strong><br />
                            • 0 → 0×2 + 2 = <strong>2</strong><br /><br />
                            Resultado: <strong>288</strong> ✓
                        </div>
                    </div>

                    <Link href="/treino?m=12&min=2&max=3" className="btn btn--primary">
                        Praticar ×12 →
                    </Link>
                </MultiplierSection>

                <AdBanner format="horizontal" />

                {/* Multiplier x3 */}
                <MultiplierSection id="x3" multiplier="3">
                    <h2>Multiplicar por 3</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Dobre o dígito, adicione metade do vizinho. Se ímpar, adicione 5.
                        </div>
                    </div>

                    <h3>Exemplo: 21 × 3</h3>
                    <div className="example-box">
                        <div className="example-box__content">
                            Número: 021<br /><br />
                            • 1 → 1×2=2 + (0÷2)=0, ímpar → 2+5 = <strong>7</strong> (carry 0)<br />
                            • 2 → 2×2=4 + (1÷2)=0, par → <strong>4</strong> (carry 0)<br />
                            • 0 → 0×2=0 + (2÷2)=1, par → <strong>1</strong> (carry 0) → mas é 0, então descarte<br /><br />
                            Resultado: <strong>63</strong> ✓
                        </div>
                    </div>

                    <Link href="/treino?m=3&min=2&max=3" className="btn btn--primary">
                        Praticar ×3 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x7 */}
                <MultiplierSection id="x7" multiplier="7">
                    <h2>Multiplicar por 7</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Dobre o dígito, adicione metade do vizinho, adicione 5 se ímpar. Similar ao ×3.
                        </div>
                    </div>

                    <h3>Passos:</h3>
                    <ol>
                        <li>Dobre o dígito</li>
                        <li>Adicione metade do vizinho</li>
                        <li>Se o dígito atual for ímpar, adicione 5</li>
                        <li>Adicione o vizinho inteiro também (diferença do ×3)</li>
                    </ol>

                    <Link href="/treino?m=7&min=2&max=3" className="btn btn--primary">
                        Praticar ×7 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x4 */}
                <MultiplierSection id="x4" multiplier="4">
                    <h2>Multiplicar por 4</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Subtraia de 10 (complemento), dobre, e adicione o vizinho.
                        </div>
                    </div>

                    <h3>Passos:</h3>
                    <ol>
                        <li>Calcule o complemento: (10 - dígito)</li>
                        <li>Dobre o complemento</li>
                        <li>Adicione o vizinho</li>
                    </ol>

                    <Link href="/treino?m=4&min=2&max=3" className="btn btn--primary">
                        Praticar ×4 →
                    </Link>
                </MultiplierSection>

                {/* Multiplier x8 */}
                <MultiplierSection id="x8" multiplier="8">
                    <h2>Multiplicar por 8</h2>

                    <div className="example-box">
                        <div className="example-box__title">Regra</div>
                        <div className="example-box__content">
                            Subtraia de 9 e adicione o vizinho. Para o primeiro dígito, subtraia de 10.
                        </div>
                    </div>

                    <Link href="/treino?m=8&min=2&max=3" className="btn btn--primary">
                        Praticar ×8 →
                    </Link>
                </MultiplierSection>

                {/* Conclusion */}
                <h2>Dicas para o Sucesso</h2>

                <ul>
                    <li><strong>Pratique um multiplicador por vez.</strong> Domine completamente antes de avançar.</li>
                    <li><strong>Comece com números pequenos</strong> (2 dígitos) e aumente gradualmente.</li>
                    <li><strong>Pratique diariamente.</strong> 10-15 minutos por dia é melhor que horas esporádicas.</li>
                    <li><strong>Use o treinador interativo</strong> para acompanhar seu progresso.</li>
                    <li><strong>Não desanime com erros.</strong> Eles são parte do aprendizado.</li>
                </ul>

                <div className="card card--hover" style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--accent)' }}>Pronto para Praticar?</h3>
                    <p style={{ marginBottom: 'var(--space-4)' }}>
                        Use nosso treinador interativo para aplicar o que aprendeu!
                    </p>
                    <Link href="/" className="btn btn--primary btn--lg">Começar Treino →</Link>
                </div>

                {/* AdSense */}
                <AdBanner format="horizontal" />
            </main>

            <Footer />
        </div>
    );
}
