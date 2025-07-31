import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
// Utils
import { nameToId, resolveNextName } from '../../../lib/utils/names'
import { GameStatus } from '../../../lib/model/constants/GameStatus'
import { PlayerType } from '../../../lib/model/constants/PlayerType'
import { PlayerLevel } from '../../../lib/model/constants/PlayerLevel'
import { GameService } from '../../../service/GameService'
import { postGame, getGames } from '../../../service/GameServiceHelper'
import GamesSelectors from '../../../store/games/games.selectors'
import { GameSetupPlayer } from './GameSetupPlayer'
import { PayloadGameInfoPut, PayloadGameInfoPutPlayer } from '../../../lib/model/payload/PayloadGameInfoPut'
// CSS
import './GameSetup.css'
import { Button, Input } from '@sol.ac/react-commons'

interface GameSetupProperties {
  service: GameService
  onCreateGame: () => void
}
export const GameSetup = ({
  service,
  onCreateGame,
}: GameSetupProperties) => {

  // #region > Hooks
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [password, setPassword] = useState('')
  const [width, setWidth] = useState(10)
  const [widthError, setWidthError] = useState('')
  const [height, setHeight] = useState(10)
  const [heightError, setHeightError] = useState('')
  const [players, setPlayers] = useState<PayloadGameInfoPutPlayer[]>([
    { name: 'Player (1)', nation: 'N1', type: PlayerType.HUMAN, level: PlayerLevel.NORMAL },
    { name: 'Player (2)', nation: 'N2', type: PlayerType.HUMAN, level: PlayerLevel.NORMAL }
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

  // #region > Events
  function handleNameChange(event: { value: string }) {
    setName(event.value)
  }
  function handlePasswordChange(event: { value: string }) {
    setPassword(event.value)
  }
  function handleWidthChange(event: { value: string }) {
    setWidth(Number(event.value))
  }
  function handleHeightChange(event: { value: string }) {
    setHeight(Number(event.value))
  }
  function handlePlayerChange(playerName: string, playerChange: PayloadGameInfoPutPlayer) {
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
        nation: null,
        type: PlayerType.AI,
        level: PlayerLevel.NORMAL
      })
    })
  }
  function handleCancelClick() {
    navigate('/games')
  }
  function handleStartClick() {
    const game: PayloadGameInfoPut = {
      id: nameToId(name),
      name,
      password,
      status: GameStatus.STARTED,
      setup: {
        map: {
          width,
          height
        }
      },
      players
    }
    postGame(service, dispatch, game)
      .then(() => getGames(service, dispatch))
      .then(() => navigate(`/games/${game.id}`))
  }
  // #endregion

  // #region > Render
  return (
    <div className='ap-dom-game-setup'>
      <h2>New Game</h2>
      <div>
        <label>Game Name</label>
        <Input 
          value={name} 
          onChange={handleNameChange} 
        />
      </div>
      {nameError ?
        <div className='error'>{nameError}</div>
        : null}
      <div>
        <label>Password</label>
        <Input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <h3>Map</h3>
      <div>
        <label>Width</label>
        <Input 
          type='number' 
          value={`${width}`} 
          onChange={handleWidthChange} 
        />
      </div>
      <div>
        <label>Height</label>
        <Input 
          type='number' 
          value={`${height}`} 
          onChange={handleHeightChange} 
        />
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
          type={player.type}
          level={player.level}
          onChange={(playerChange) => handlePlayerChange(player.name, playerChange)}
          onDelete={() => handlePlayerDelete(player.name)}
        />
      )}
      {playersError ?
        <div className='error'>{playersError}</div>
        : null}
      <div>
        <Button
          onClick={handleAddPlayerClick}
        >
          add
        </Button>
      </div>
      <div>
        <Button
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={handleStartClick}
        >
          Start
        </Button>
      </div>
    </div>
  )
  // #endregion
}
