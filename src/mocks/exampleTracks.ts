import { Pattern } from '../types/sequencer';

export const mockInitialPatterns: Pattern[] = [
  // eslint-disable-next-line max-len
  [{ pitch: 'C6' }, false, false, false, { pitch: 'A5' }, false, false, { pitch: 'C6' }, false, false, { pitch: 'C6' }, false, { pitch: 'D6' }, false, false, false],
  // eslint-disable-next-line max-len
  [false, { pitch: 'E5' }, { pitch: 'F5' }, false, false, { pitch: 'G5' }, false],
  [{ pitch: 'F3' }, false, false],
];

export const mockUpdatedPatterns: Pattern[] = [
  // eslint-disable-next-line max-len
  [{ pitch: 'B5' }, false, false, false, false, { pitch: 'A5' }, false, false, { pitch: 'B5' }, false, false, { pitch: 'B5' }, false, { pitch: 'C6' }, false, false, false],
  // eslint-disable-next-line max-len
  [false, { pitch: 'C5' }, { pitch: 'D5' }, false, false, { pitch: 'E5' }, false],
  [{ pitch: 'A3' }, false, false],
];
