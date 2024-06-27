import useTrackStore from '@stores/trackStore';
import shallow from 'zustand/shallow';

export default function StarStopButton() {
    const [isPlaying, start, stop] = useTrackStore((state) => [state.isPlaying, state.start, state.stop], shallow);

    return (
        <button
            type="button"
            className="w-28 text-center py-2 px-4 border bg-white border-black rounded-md"
            onClick={isPlaying ? stop : start}
        >
            {isPlaying ? 'Stop' : 'Start'}
        </button>
    );
}
