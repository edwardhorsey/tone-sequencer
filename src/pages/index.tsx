import Sequencer from '../components/Sequencer';

export default function Home() {
    return (
        <main className="w-screen h-screen">
            <section className="w-full h-full flex flex-col justify-center items-center">
                <Sequencer />
            </section>
        </main>
    );
}
