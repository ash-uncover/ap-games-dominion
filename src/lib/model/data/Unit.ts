export interface StatsLayer {
  physical?: {
    strenght?: number
    endurance?: number
    agility?: number
    swiftness?: number
  }
  mental?: {
    will?: number
    intelligence?: number
    perception?: number
    clarity?: number
  }
  stats: {
    health?: number
    fatigue?: number
  }
  combat?: {
    attack?: number
    defense?: number
    evasion?: number
  }
  elements?: {
    earth?: number
    air?: number
    fire?: number
    water?: number
  }
  psychic?: {
    metal?: number
    life?: number
    death?: number
    astral?: number
  }
  resistances?: {
    earth?: number
    air?: number
    fire?: number
    water?: number
    
    metal?: number
    life?: number
    death?: number
    astral?: number

    blunt?: number
    pierce?: number
    cut?: number

    poison?: number
  }
  skills?: Record<string, number>
}

export interface UnitDataModel extends StatsLayer {
  id: string
  info: {
    name: string
    description: string
  }
}