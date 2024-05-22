import Tracks from '@components/Tracks';
import useTrackStore from '@stores/useTrackStore';
import shallow from 'zustand/shallow';

function Sequencer(): JSX.Element {
    const [isPlaying, start, stop] = useTrackStore((state) => [state.isPlaying, state.start, state.stop], shallow);

    return (
        <div>
            <div className="w-full flex mb-2">
                <button type="button" className="p-4 pl-0" onClick={isPlaying ? stop : start}>
                    {isPlaying ? 'Stop' : 'Start'}
                </button>
            </div>

            <Tracks />
        </div>
    );
}

export default Sequencer;
