import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo } from 'react'
import { useTimer } from 'use-timer'

import { STATE } from '@/types/constants'

const TIME_ALLOT = 2

type Props = {
  onExpire: () => void
  onStart: () => void
  gameState: STATE
}

const Timer = ({ onExpire, onStart, gameState }: Props) => {
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
    const minutes = time / 60
    const seconds = time % 60
    // TODO add padding 0's
    return `${minutes}:${seconds}`
  }, [time])

  return (
    <Box>
      <Typography variant="h3">{formattedTime}</Typography>
      <Typography variant="body2">
        {(() => {
          if (gameState === STATE.IDLE) return '[SPACE] to start'
          if (gameState === STATE.PLAYING) return ''
          return ''
        })()}
      </Typography>
    </Box>
  )
}

export default Timer
