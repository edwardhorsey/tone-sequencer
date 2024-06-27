export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-screen h-screen flex flex-col">
            <section className="flex-1 flex flex-col justify-center items-center">{children}</section>
        </main>
    );
}
