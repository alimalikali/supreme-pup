
type MartLayoutProps = { children: React.ReactNode };

export default async function MartLayout({ children }: MartLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}
