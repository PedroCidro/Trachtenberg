interface MultiplierSectionProps {
    id: string;
    multiplier: string;
    children: React.ReactNode;
}

export default function MultiplierSection({ id, multiplier, children }: MultiplierSectionProps) {
    return (
        <section id={id} className="multiplier-section">
            <div className="multiplier-section__badge">
                ×{multiplier}
            </div>
            <div className="multiplier-section__content">
                {children}
            </div>
        </section>
    );
}
