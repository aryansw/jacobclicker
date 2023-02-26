import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Face1 from '../../../public/images/1.png'
import Face2 from '../../../public/images/2.png'
import Face3 from '../../../public/images/3.png'
import Face4 from '../../../public/images/4.png'
import Face5 from '../../../public/images/5.png'
import Face6 from '../../../public/images/6.png'
import Face7 from '../../../public/images/7.png'
import Face8 from '../../../public/images/8.png'
import Face9 from '../../../public/images/9.png'
import MadFace from '../../../public/images/jacob_faces/jacob_mad.svg'
import ScaredFace from '../../../public/images/jacob_faces/jacob_scared.svg'
import SillyFace from '../../../public/images/jacob_faces/jacob_silly.svg'
import SmileFace from '../../../public/images/jacob_faces/jacob_smile.svg'
import SurprisedFace from '../../../public/images/jacob_faces/jacob_surprised.svg'
import WinkFace from '../../../public/images/jacob_faces/jacob_wink.svg'
import NameBg from '../../../public/images/name-background.png'

const ICONS = [
  { file: MadFace, name: 'Mad' },
  { file: ScaredFace, name: 'Scared' },
  { file: SillyFace, name: 'Silly' },
  { file: SmileFace, name: 'Smiling' },
  { file: SurprisedFace, name: 'Surprised' },
  { file: WinkFace, name: 'Winking' },
]

const FACES = [Face1, Face2, Face3, Face4, Face5, Face6, Face7, Face8, Face9]

type Props = {
  clicks: number
  isSecond?: boolean
}

const AnimatedBox = styled(Box)(({ animation }: { animation: string }) => ({
  '@keyframes jump': {
    '0%': {
      transform: 'translate(0)',
    },
    '50%': {
      transform: 'translateY(-5px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },

  '@keyframes wiggle': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '25%': {
      transform: 'rotate(8deg)',
    },
    '50%': {
      transform: 'rotate(-8deg)',
    },
    '75%': {
      transform: 'rotate(8deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },

  '&.animate': {
    animation: `100ms 1 linear ${animation}`,
  },
  position: 'relative',
}))

const Clicker = ({ clicks, isSecond = false }: Props) => {
  const [currentFace, setCurrentFace] = useState(4)
  const [faceDirection, setFaceDirection] = useState(-1)

  const [selectedIcon, setSelectedIcon] = useState(0)

  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (clicks === 0) {
      setCurrentFace(4)
      setFaceDirection(-1)
      return
    }

    iconRef.current?.classList.remove('animate')
    // eslint-disable-next-line no-void
    void iconRef.current?.offsetWidth
    iconRef.current?.classList.add('animate')

    setCurrentFace((p) => {
      if (p + 1 >= FACES.length) {
        setFaceDirection(-1)
        return p - 1
      }
      if (p <= 0) {
        setFaceDirection(1)
        return p + 1
      }

      return p + faceDirection
    })
  }, [clicks, iconRef])

  useEffect(() => {
    setSelectedIcon(
      parseInt(
        window.localStorage.getItem(
          `jacobclicker-player${isSecond ? '2' : '1'}-icon`
        ) || String(0),
        10
      )
    )
  }, [])

  return (
    <Box
      sx={{
        pl: isSecond ? 0 : 6,
        pr: isSecond ? 6 : 0,
        py: 1,
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ width: 380, height: 80, position: 'relative' }}>
          <Image
            src={NameBg}
            alt="name-bg"
            fill
            style={{ userSelect: 'none' }}
          />
          <Stack
            sx={{
              position: 'absolute',
              top: '50%',
              left: '24px',
              transform: 'translateY(-50%)',
              color: '#000000de',
              width: '100%',
              pr: 5,
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <AnimatedBox
                animation="wiggle"
                ref={iconRef}
                mt="5px"
                sx={{
                  width: 50,
                  height: 50,
                }}
              >
                <Image src={ICONS[selectedIcon].file} alt="icon" fill />
              </AnimatedBox>
              <Typography variant="h4">
                {isSecond ? 'Also ' : ''}Jacob
              </Typography>
            </Stack>
            <Typography variant="body1">{clicks} clicks</Typography>
          </Stack>
        </Box>
      </Stack>

      <Stack alignItems="center" py={3}>
        <Paper
          elevation={7}
          sx={{
            backgroundColor: '#ebaa43',
            pt: 5,
            pb: 2,
            px: 5,
            borderRadius: '4px',
          }}
        >
          <Box
            sx={{
              width: 300,
              height: 300,
              position: 'relative',
              mb: 4,
            }}
          >
            <Image src={FACES[currentFace]} alt="jacob" fill sizes="100%" />
          </Box>

          <Typography variant="body1">
            Press {isSecond ? '[L]' : '[A]'}
          </Typography>
        </Paper>
      </Stack>
    </Box>
  )
}

export default Clicker
