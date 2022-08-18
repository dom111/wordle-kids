export enum Mode {
  FREE_PLAY,
  THEMED,
  // DAILY,
  // CUSTOM,
}

export const modes: Mode[] = [
  Mode.FREE_PLAY,
  Mode.THEMED,
  // Mode.DAILY,
  // Mode.CUSTOM,
];

export const labels = {
  [Mode.FREE_PLAY]: 'Free Play',
  [Mode.THEMED]: 'Themed',
  // [Mode.DAILY]: 'Daily',
  // [Mode.CUSTOM]: 'Custom',
};

export const label = (mode: Mode | string | number): string =>
  labels[mode] ?? 'Invalid';

export const toMode = (value: any): Mode => {
  const intValue = parseInt(value);

  if (!modes.includes(intValue)) {
    throw new TypeError(`Invalid Mode: ${value}`);
  }

  return intValue;
};
export default Mode;
