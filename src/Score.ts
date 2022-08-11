export enum Score {
  UNKNOWN = -1,
  WRONG,
  WRONG_PLACE,
  RIGHT,
}

export type ScoreType =
  | Score.UNKNOWN
  | Score.WRONG
  | Score.WRONG_PLACE
  | Score.RIGHT;

export type ScoreList = ScoreType[];
