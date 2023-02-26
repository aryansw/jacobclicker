import { styled } from '@mui/material'
import Box from '@mui/material/Box'
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

const FACES = [Face1, Face2, Face3, Face4, Face5, Face6, Face7, Face8, Face9]

type Props = {
  clicks: number
  face: any
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
      transform: 'rotate(4deg)',
    },
    '50%': {
      transform: 'rotate(-4deg)',
    },
    '75%': {
      transform: 'rotate(4deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },

  '&.animate': {
    animation: `80ms 1 linear ${animation}`,
  },

  width: 300,
  height: 300,
  position: 'relative',
}))

const Clicker = ({ clicks, face }: Props) => {
  const [animation, setAnimation] = useState('wiggle')
  const [currentFace, setCurrentFace] = useState(0)
  const [faceDirection, setFaceDirection] = useState(-1)

  const faceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // if (!faceRef.current) return
    // faceRef.current.classList.remove('animate')
    // // eslint-disable-next-line no-void
    // void faceRef.current.offsetWidth
    // faceRef.current.classList.add('animate')

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
  }, [clicks, faceRef])

  return (
    <Box py={3}>
      <Typography variant="body1">{clicks} clicks</Typography>
      <Stack alignItems="center" py={3}>
        <AnimatedBox animation={animation} ref={faceRef}>
          <Image src={FACES[currentFace]} alt="jacob" fill sizes="100%" />
        </AnimatedBox>
      </Stack>
    </Box>
  )
}

export default Clicker
