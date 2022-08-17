export enum Mode {
  FREE_PLAY,
  // DAILY,
  THEMED,
  // CUSTOM,
}

export const modes: Mode[] = [
  Mode.FREE_PLAY,
  // Mode.DAILY,
  Mode.THEMED,
  // Mode.CUSTOM,
];

export const labels = {
  [Mode.FREE_PLAY]: 'Free Play',
  // [Mode.DAILY]: 'Daily',
  [Mode.THEMED]: 'Themed',
  // [Mode.CUSTOM]: 'Custom',
};

export const label = (mode: Mode | string | number) =>
  labels[mode] ?? 'Invalid';

export default Mode;
