export interface GameSettingsModel {
  brightness: number
  contrast: number
}

export function getDefaultGameSettings(): GameSettingsModel {
  return {
    brightness: 100,
    contrast: 100
  }
}