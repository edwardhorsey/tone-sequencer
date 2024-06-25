import Tracks from '@components/Tracks';
import useTrackStore from '@stores/useTrackStore';
import shallow from 'zustand/shallow';

function Sequencer(): JSX.Element {
    const [isPlaying, start, stop] = useTrackStore((state) => [state.isPlaying, state.start, state.stop], shallow);

    return (
        <div>
            <div className="w-full flex mb-2 pt-6 pl-4">
                <button
                    type="button"
                    className="w-28 text-center py-2 px-4 border bg-white border-black rounded-md"
                    onClick={isPlaying ? stop : start}
                >
                    {isPlaying ? 'Stop' : 'Start'}
                </button>
            </div>

            <Tracks />
        </div>
    );
}

export default Sequencer;
