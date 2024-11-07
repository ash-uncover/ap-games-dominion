import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import { resolveNextName } from '../../../lib/utils/names'
import GamesSelectors from '../../../store/games/games.selectors'
import { GameService, createGame } from '../../../service/games/GameService'
import { GameInfoStates } from '../../../store/games/games.state'
import { GameSetupPlayer } from './GameSetupPlayer'
// CSS
import './GameSetup.css'

interface GameSetupProperties {
  service: GameService
}
export interface PlayerSetupDefinition {
  name: string
  nation: string | null
}
export const GameSetup = ({
  service
}: GameSetupProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [password, setPassword] = useState('')
  const [width, setWidth] = useState(10)
  const [widthError, setWidthError] = useState('')
  const [height, setHeight] = useState(10)
  const [heightError, setHeightError] = useState('')
  const [players, setPlayers] = useState<PlayerSetupDefinition[]>([
    { name: 'Player (1)', nation: '' },
    { name: 'Player (2)', nation: '' }
  ]);
  const [playersError, setPlayersError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()
  const games = useSelector(GamesSelectors.games)
  useEffect(() => {
    let newDisabled = false
    if (!name || Object.values(games).some(game => game.name === name)) {
      newDisabled = true
      if (name) {
        setNameError('Name already in used')
      } else {
        setNameError('Specify a name')
      }
    } else {
      setNameError('')
    }
    if (players.length < 2) {
      newDisabled = true
      setPlayersError('Game must have 2 players or more')
    } else {
      setPlayersError('')
    }
    if (width < 0) {
      newDisabled = true
      setWidthError('Width must be greater than \'1\'')
    } else {
      setWidthError('')
    }
    if (height < 1) {
      newDisabled = true
      setHeightError('Height must be greater than \'1\'')
    } else {
      setHeightError('')
    }
    setDisabled(newDisabled)
  }, [name, width, height, players])
  // #endregion

  // #region Events
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }
  function handleWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWidth(Number(event.target.value))
  }
  function handleHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHeight(Number(event.target.value))
  }
  function handlePlayerChange(playerName: string, playerChange: PlayerSetupDefinition) {
    setPlayers(players => players.map(player => {
      if (player.name !== playerName) {
        return player
      }
      return playerChange
    }))
  }
  function handlePlayerDelete(playerName: string) {
    setPlayers(players => players.filter(player => player.name !== playerName))
  }
  function handleAddPlayerClick() {
    setPlayers(players => {
      return players.concat({
        name: resolveNextName(players.map(p => p.name), 'Player'),
        nation: null
      })
    })
  }
  function handleCancelClick() {
    navigate('/games')
  }
  function handleStartClick() {
    const game = {
      id: name.toLowerCase().split(' ').join('_'),
      name,
      password,
      state: GameInfoStates.STARTED,
      setup: {
        map: {
          width,
          height
        }
      },
      players: players.reduce((acc, player) => {
        acc[player.name] = player
        return acc
      }, {})
    }
    createGame(service, dispatch, game)
      .then(() => navigate('/games'))
  }
  // #endregion

  // #region Rendering
  return (
    <div className='ap-dom-game-setup'>
      <h2>New Game</h2>
      <div>
        <label>Game Name</label>
        <input value={name} onChange={handleNameChange} />
      </div>
      {nameError ?
        <div className='error'>{nameError}</div>
      : null}
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={handlePasswordChange} />
      </div>
      <h3>Map</h3>
      <div>
        <label>Width</label>
        <input type='number' value={width} onChange={handleWidthChange} />
      </div>
      <div>
        <label>Height</label>
        <input type='number' value={height} onChange={handleHeightChange} />
      </div>
      {widthError ?
        <div className='error'>{widthError}</div>
      : null}
      {heightError ?
        <div className='error'>{heightError}</div>
      : null}
      <h3>Players ({players.length})</h3>
      {players.map((player, index) => 
        <GameSetupPlayer
          key={`player-${index}`}
          name={player.name}
          nation={player.nation}
          onChange={(playerChange) => handlePlayerChange(player.name, playerChange)}
          onDelete={() => handlePlayerDelete(player.name)}
        />
      )}
      {playersError ?
        <div className='error'>{playersError}</div>
      : null}
      <div>
        <button 
          onClick={handleAddPlayerClick}
        >
          add
        </button>
      </div>
      <div>
        <button 
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button 
          disabled={disabled}
          onClick={handleStartClick}
        >
          Start
        </button>
      </div>
    </div>
  )
  // #endregion
}
