import RefreshIcon from '@mui/icons-material/Refresh'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import { useTimer } from 'use-timer'

import { STATE } from '@/types/constants'

import SignBg from '../../../public/images/sign.png'

import type { Dispatch, SetStateAction } from 'react'

const TIME_ALLOT = 60

type Props = {
  onExpire: () => void
  onStart: () => void
  gameState: STATE
  setGameState: Dispatch<SetStateAction<STATE>>
  onRestart: () => void
}

const Timer = ({
  onExpire,
  onStart,
  gameState,
  setGameState,
  onRestart,
}: Props) => {
  const { time, start, reset, pause } = useTimer({
    initialTime: TIME_ALLOT,
    timerType: 'DECREMENTAL',
    endTime: 0,
    onTimeOver: onExpire,
  })

  const onPress = (e: KeyboardEvent) => {
    if (e.key !== ' ') return
    if (gameState === STATE.IDLE) {
      if (time <= 0) reset()

      start()
      onStart()
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', onPress)

    return () => {
      window.removeEventListener('keyup', onPress)
    }
  }, [gameState])

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
  }, [time])

  return (
    <Box>
      <Box sx={{ position: 'absolute', top: 15, right: 15 }}>
        <Fab
          title="Restart"
          size="small"
          onClick={() => {
            reset()
            setGameState(STATE.IDLE)
            onRestart()
          }}
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
          <RefreshIcon />
        </Fab>
      </Box>
      <Stack alignItems="center">
        <Stack sx={{ width: 215, height: 105, position: 'relative' }}>
          <Image src={SignBg} alt="sign" fill style={{ userSelect: 'none' }} />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#000000de',
            }}
          >
            <Typography variant="h3">{formattedTime}</Typography>
            <Typography variant="body2">
              {(() => {
                if (gameState === STATE.IDLE) return '[SPACE] to start'
                if (gameState === STATE.PLAYING) return ''
                return ''
              })()}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Timer
