export type GameStatus =
  | 'PENDING'
  | 'STARTED'
  | 'FINISHED'
export const GameStatuses: {
  PENDING: GameStatus
  STARTED: GameStatus
  FINISHED: GameStatus
} = {
  PENDING: 'PENDING',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
}