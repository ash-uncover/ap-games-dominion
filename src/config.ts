import { Logger } from '@sol.ac/js-utils-logger'
const LOGGER = new Logger('CONFIG')

// Default hard-coded values
export const CONFIG: {
  AP_GAMES_DOMINION_PLUGIN: string
  AP_GAMES_DOMINION_PUBLIC: string
  AP_GAMES_DOMINION_ENVIRONMENT: string
} = {
  AP_GAMES_DOMINION_PLUGIN: 'http://localhost:8089/plugin.json',
  AP_GAMES_DOMINION_PUBLIC: '',
  AP_GAMES_DOMINION_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.AP_GAMES_DOMINION_PLUGIN) {
    CONFIG.AP_GAMES_DOMINION_PLUGIN = process.env.AP_GAMES_DOMINION_PLUGIN
  }
  if (process.env.AP_GAMES_DOMINION_PUBLIC) {
    CONFIG.AP_GAMES_DOMINION_PUBLIC = process.env.AP_GAMES_DOMINION_PUBLIC
  }
  if (process.env.AP_GAMES_DOMINION_ENVIRONMENT) {
    CONFIG.AP_GAMES_DOMINION_ENVIRONMENT = process.env.AP_GAMES_DOMINION_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')
Object.keys(CONFIG).forEach((confKey) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})
