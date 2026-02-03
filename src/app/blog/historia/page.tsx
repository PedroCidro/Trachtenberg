import Link from 'next/link';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
    title: 'A História de Jakow Trachtenberg',
    description: 'Conheça a incrível história de Jakow Trachtenberg, o gênio que desenvolveu o sistema de cálculo mental rápido enquanto prisioneiro em um campo de concentração nazista.',
    path: '/blog/historia',
    type: 'article',
});

export default function HistoryPage() {
    return (
        <div className="container page-blog">
            <Header />

            <section className="blog-header">
                <h1 className="blog-header__title">A História de Jakow Trachtenberg</h1>
                <p className="blog-header__meta">O gênio que transformou horror em genialidade matemática</p>
            </section>

            <nav className="blog-nav">
                <Link href="/blog/historia" className="blog-nav__link blog-nav__link--active">📜 História</Link>
                <Link href="/blog/aprender" className="blog-nav__link">📚 Como Aprender</Link>
            </nav>

            <main className="blog-content">
                <h2>Quem foi Jakow Trachtenberg?</h2>

                <p>
                    <strong>Jakow Trachtenberg</strong> nasceu em 17 de junho de 1888, em Odessa, no Império Russo
                    (atual Ucrânia). Desde jovem, demonstrou extraordinária aptidão para matemática e engenharia,
                    formando-se com as maiores honras no Instituto de Engenharia de Minas de São Petersburgo.
                </p>

                <p>
                    Aos 20 anos de idade, já ocupava o cargo de <strong>Engenheiro-Chefe</strong> na fábrica de
                    armamentos Obukhov, supervisionando mais de 11.000 homens. O governo czarista também o
                    encarregou de supervisionar o desenvolvimento da marinha russa — uma responsabilidade
                    extraordinária para alguém tão jovem.
                </p>

                <h2>O Pacifista na Guerra</h2>

                <p>
                    Apesar de sua posição de destaque na produção de armamentos, Trachtenberg era um
                    <strong>pacifista dedicado</strong>. No início da Primeira Guerra Mundial, em 1914, ele
                    organizou a &quot;Sociedade dos Bons Samaritanos&quot;, uma iniciativa para treinar estudantes
                    russos a cuidar dos feridos de guerra.
                </p>

                <p>
                    Este trabalho humanitário recebeu reconhecimento especial do próprio Czar Nicolau II,
                    uma honra rara para a época.
                </p>

                <h2>Fuga e Prisão</h2>

                <p>
                    Após as Revoluções Russas de 1917, Trachtenberg fugiu para a República de Weimar (Alemanha).
                    Lá, ele foi crítico vocal das políticas nazistas, o que eventualmente levou à sua prisão.
                </p>

                <p>
                    Durante a Segunda Guerra Mundial, <strong>Trachtenberg foi aprisionado em um campo de
                        concentração nazista</strong>. Foi neste ambiente de terror absoluto, cercado por morte e
                    sofrimento, que ele encontrou refúgio na matemática.
                </p>

                <h2>O Nascimento do Método</h2>

                <p>
                    Sem acesso a papel, caneta ou qualquer material, Trachtenberg começou a desenvolver seu
                    sistema de cálculo mental como uma forma de <strong>manter sua sanidade e esperança</strong>.
                </p>

                <div className="example-box">
                    <div className="example-box__title">Fato Extraordinário</div>
                    <div className="example-box__content">
                        A maior parte do sistema Trachtenberg foi desenvolvida inteiramente na mente, sem
                        qualquer anotação escrita. Isso explica por que o método é tão adequado para
                        cálculos mentais.
                    </div>
                </div>

                <p>
                    Enquanto outros prisioneiros perdiam a esperança, Trachtenberg passava horas refinando
                    suas técnicas, descobrindo padrões e atalhos que transformavam cálculos complexos em
                    operações simples e memoráveis.
                </p>

                <h2>Liberdade e Legado</h2>

                <p>
                    Trachtenberg conseguiu escapar do campo de concentração e eventualmente refugiou-se na
                    <strong>Suíça</strong>, onde fundou o <strong>Instituto Matemático de Zurique</strong>.
                </p>

                <p>
                    Lá, ele passou seus últimos anos ensinando seu método a estudantes de todas as idades,
                    provando que qualquer pessoa poderia dominar matemática rápida, independentemente de
                    talento natural.
                </p>

                <p>
                    Jakow Trachtenberg faleceu em 26 de outubro de 1951. Seu livro, <strong>&quot;O Sistema
                        Trachtenberg de Matemática Básica&quot;</strong>, foi publicado postumamente em 1960 e
                    continua sendo estudado e ensinado até hoje.
                </p>

                <h2>O Legado Hoje</h2>

                <p>
                    O Método Trachtenberg revolucionou a forma como pensamos sobre matemática. Em vez de
                    depender de memorização pura, o sistema enfatiza:
                </p>

                <ul>
                    <li><strong>Reconhecimento de padrões</strong> em vez de decoreba</li>
                    <li><strong>Passos simples e gerenciáveis</strong> em vez de cálculos complexos</li>
                    <li><strong>Técnicas mentais</strong> que funcionam sem papel</li>
                    <li><strong>Confiança numérica</strong> acessível a todos</li>
                </ul>

                <p>
                    A história de Trachtenberg nos lembra que mesmo nas circunstâncias mais sombrias,
                    a mente humana pode criar algo extraordinário. Seu sistema não é apenas uma ferramenta
                    matemática — é um testemunho da resiliência do espírito humano.
                </p>

                {/* Ad Placeholder */}
                <div className="ad-placeholder ad-placeholder--banner">
                    Espaço reservado para AdSense
                </div>

                {/* Navigation to next section */}
                <div className="card card--hover" style={{ margin: 'var(--space-8) 0' }}>
                    <h3 style={{ color: 'var(--accent)' }}>Próximo passo: Aprenda o Método</h3>
                    <p style={{ marginBottom: 'var(--space-4)' }}>
                        Agora que você conhece a história, está pronto para aprender as técnicas que
                        Trachtenberg desenvolveu.
                    </p>
                    <Link href="/blog/aprender" className="btn btn--primary">Começar a Aprender →</Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
