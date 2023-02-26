import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import { STATE } from '@/types/constants'

import Clicker from './Clicker'
import Timer from './Timer'
import MadFace from '../../../public/images/jacob_faces/jacob_mad.svg'
import ScaredFace from '../../../public/images/jacob_faces/jacob_scared.svg'
import SillyFace from '../../../public/images/jacob_faces/jacob_silly.svg'
import SmileFace from '../../../public/images/jacob_faces/jacob_smile.svg'
import SurprisedFace from '../../../public/images/jacob_faces/jacob_surprised.svg'
import WinkFace from '../../../public/images/jacob_faces/jacob_wink.svg'

const ClickerManager = () => {
  const [player1Clicks, setPlayer1Clicks] = useState(0)
  const [player2Clicks, setPlayer2Clicks] = useState(0)

  const [gameState, setGameState] = useState<STATE>(STATE.IDLE)

  const onPress = (e: KeyboardEvent) => {
    if (gameState !== STATE.PLAYING) return

    if (e.key === 'a') setPlayer1Clicks((p) => p + 1)
    else if (e.key === 'l') setPlayer2Clicks((p) => p + 1)
  }

  useEffect(() => {
    window.addEventListener('keyup', onPress)

    return () => {
      window.removeEventListener('keyup', onPress)
    }
  }, [gameState])

  const onStart = () => {
    setGameState(STATE.PLAYING)
  }

  return (
    <Box>
      <Stack my={3} textAlign="center">
        <Timer
          onExpire={() => setGameState(STATE.IDLE)}
          onStart={onStart}
          gameState={gameState}
        />
      </Stack>
      <Stack direction="row" py={3} textAlign="center">
        <Box sx={{ flex: '50%' }}>
          <Typography variant="h4">Jacob</Typography>
          <Clicker clicks={player1Clicks} face={MadFace} />
        </Box>
        <Box sx={{ flex: '50%' }}>
          <Typography variant="h4">Also Jacob</Typography>
          <Clicker clicks={player2Clicks} face={WinkFace} />
        </Box>
      </Stack>
    </Box>
  )
}

export default ClickerManager
