import { pitchesByOctaves } from '@lib/trackHelpers';

export function PitchOptions() {
    return (
        <>
            <option value={undefined}>--</option>
            {pitchesByOctaves.map((pitch) => (
                <option value={pitch} key={pitch}>
                    {pitch}
                </option>
            ))}
        </>
    );
}
