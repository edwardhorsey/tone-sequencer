import dynamic from 'next/dynamic';
import useTrackStore from 'src/stores/useTrackStore';
import shallow from 'zustand/shallow';

const Tracks = dynamic(() => import('@components/Tracks'), {
    ssr: false,
});

function Sequencer(): JSX.Element {
    const { start, stop, randomiseLoops } = useTrackStore(
        (state) => ({
            start: state.start,
            stop: state.stop,
            randomiseLoops: state.randomiseLoops,
        }),
        shallow,
    );

    return (
        <div>
            <div>
                <h1 className="text-center">Sequencer</h1>
                <button type="button" className="p-2" onClick={start}>
                    start
                </button>
                <button type="button" className="p-2" onClick={stop}>
                    stop
                </button>
            </div>

            <Tracks />
        </div>
    );
}

export default Sequencer;
