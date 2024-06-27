import Tracks from '@components/Tracks';
import StarStopButton from '@components/StartStopButton';

function Sequencer(): JSX.Element {
    return (
        <section>
            <div className="w-full flex mb-2 pt-6 pl-4">
                <StarStopButton />
            </div>

            <Tracks />
        </section>
    );
}

export default Sequencer;
