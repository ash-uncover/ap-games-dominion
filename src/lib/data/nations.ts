export interface NationData {
  id: string
  name: string
  color: string
}

export const NATIONS: Record<string, NationData> = {
  N1: {
    id: 'N1',
    name: 'Nation 1',
    color: 'blue'
  },
  N2: {
    id: 'N2',
    name: 'Nation 2',
    color: 'green'
  }
}