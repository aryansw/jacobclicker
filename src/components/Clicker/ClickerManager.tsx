import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import { STATE } from '@/types/constants'

import Clicker from './Clicker'
import Timer from './Timer'

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
          <Clicker clicks={player1Clicks} />
        </Box>
        <Box sx={{ flex: '50%' }}>
          <Typography variant="h4">Also Jacob</Typography>
          <Clicker clicks={player2Clicks} />
        </Box>
      </Stack>
    </Box>
  )
}

export default ClickerManager
