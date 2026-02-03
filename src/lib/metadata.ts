import { Metadata } from 'next';

export const siteConfig = {
    name: 'Trachtenberg',
    url: 'https://trachtenberg.com.br',
    ogImage: 'https://trachtenberg.com.br/og-image.png',
    description: 'Treine o Método Trachtenberg de matemática rápida. Aprenda multiplicação mental com estatísticas detalhadas e técnicas comprovadas.',
    keywords: [
        'trachtenberg',
        'método trachtenberg',
        'cálculo mental',
        'matemática rápida',
        'multiplicação mental',
        'treino matemática',
        'aprender multiplicar',
        'matemática sem calculadora',
    ] as string[],
    author: 'Trachtenberg',
    locale: 'pt_BR',
};

/**
 * Generate metadata for a page
 */
export function generatePageMetadata(options: {
    title: string;
    description: string;
    path?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
}): Metadata {
    const { title, description, path = '', type = 'website', publishedTime } = options;
    const url = `${siteConfig.url}${path}`;

    return {
        title,
        description,
        keywords: siteConfig.keywords,
        authors: [{ name: siteConfig.author }],
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: 'Trachtenberg - Treino de Multiplicação Mental',
                },
            ],
            locale: siteConfig.locale,
            type,
            ...(type === 'article' && publishedTime ? { publishedTime } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [siteConfig.ogImage],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
    };
}
