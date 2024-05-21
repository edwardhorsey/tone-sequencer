// import Sequencer from '@components/Sequencer';
import Layout from '@components/ui/Layout';
import dynamic from 'next/dynamic';

const Sequencer = dynamic(() => import('@components/Sequencer'), {
    ssr: false,
});

export default function Home() {
    return (
        <Layout>
            <Sequencer />
        </Layout>
    );
}
