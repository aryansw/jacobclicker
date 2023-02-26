import HomeIcon from '@mui/icons-material/Home'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { STATE } from '@/types/constants'

import Clicker from './Clicker'
import Menu from './Menu'
import Timer from './Timer'

const ClickerManager = () => {
  const router = useRouter()

  const [player1Clicks, setPlayer1Clicks] = useState(0)
  const [player2Clicks, setPlayer2Clicks] = useState(0)

  const [openMenu, setOpenMenu] = useState(false)

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

  const onRestart = () => {
    setPlayer1Clicks(0)
    setPlayer2Clicks(0)
  }

  const onMenuClose = () => {
    setOpenMenu(false)
  }

  const onExpire = () => {
    setGameState(STATE.IDLE)
    setOpenMenu(true)
  }

  return (
    <Box>
      <Box sx={{ position: 'absolute', top: 15, left: 15 }}>
        <Fab
          title="Home"
          size="small"
          onClick={() => router.push('/select')}
          disableRipple
          sx={{
            background: '#fef0ca',
            transition: '0.25s ease 0s',
            '&:hover': {
              background: '#fef0ca',
              boxShadow:
                '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
              transform: 'scale(1.02)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          <HomeIcon />
        </Fab>
      </Box>
      <Menu
        open={openMenu}
        onClose={onMenuClose}
        player1={player1Clicks}
        player2={player2Clicks}
      />

      <Stack mb={3} textAlign="center">
        <Timer
          onExpire={onExpire}
          onStart={onStart}
          gameState={gameState}
          setGameState={setGameState}
          onRestart={onRestart}
        />
      </Stack>
      <Stack direction="row" pb={3} textAlign="center">
        <Box sx={{ flex: '50%' }}>
          <Clicker clicks={player1Clicks} />
        </Box>
        <Box sx={{ flex: '50%' }}>
          <Clicker clicks={player2Clicks} isSecond />
        </Box>
      </Stack>
    </Box>
  )
}

export default ClickerManager
