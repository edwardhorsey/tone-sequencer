import dynamic from 'next/dynamic';
import useTrackStore from 'src/stores/useTrackStore';
import shallow from 'zustand/shallow';

const Tracks = dynamic(() => import('@components/Tracks'), {
    ssr: false,
});

function Sequencer(): JSX.Element {
    const { start, stop } = useTrackStore(
        (state) => ({
            start: state.start,
            stop: state.stop,
        }),
        shallow,
    );

    const store = useTrackStore();
    console.log(store);

    return (
        <div>
            <div>
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
