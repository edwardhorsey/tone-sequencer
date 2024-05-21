import dynamic from 'next/dynamic';
import useTrackStore, { TrackStore } from 'src/stores/useTrackStore';
import shallow from 'zustand/shallow';

const Tracks = dynamic(() => import('@components/Tracks'), {
    ssr: false,
});

const selector = (state: TrackStore) => ({ start: state.start, stop: state.stop });

function Sequencer(): JSX.Element {
    const { start, stop } = useTrackStore(selector, shallow);

    console.log('Sequencer rendered');

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
