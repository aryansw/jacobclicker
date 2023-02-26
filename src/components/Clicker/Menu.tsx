import ClearIcon from '@mui/icons-material/Clear'
import { Button, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Body from '../../../public/images/body.png'
import MadFace from '../../../public/images/jacob_faces/jacob_mad.svg'
import ScaredFace from '../../../public/images/jacob_faces/jacob_scared.svg'
import SillyFace from '../../../public/images/jacob_faces/jacob_silly.svg'
import SmileFace from '../../../public/images/jacob_faces/jacob_smile.svg'
import SurprisedFace from '../../../public/images/jacob_faces/jacob_surprised.svg'
import WinkFace from '../../../public/images/jacob_faces/jacob_wink.svg'

const ICONS = [
  { file: MadFace, name: 'Mad' },
  { file: ScaredFace, name: 'Scared' },
  { file: SillyFace, name: 'Silly' },
  { file: SmileFace, name: 'Smiling' },
  { file: SurprisedFace, name: 'Surprised' },
  { file: WinkFace, name: 'Winking' },
]

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

  '@keyframes side': {
    '0%': {
      transform: 'translate(0)',
    },
    '30%': {
      transform: 'translate(3px)',
    },
    '65%': {
      transform: 'translate(-3px)',
    },
    '100%': {
      transform: 'translateX(0px)',
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

  animation: `250ms infinite linear ${animation}`,
  position: 'relative',
}))

type Props = {
  open: boolean
  onClose: () => void
  player1: number
  player2: number
}

type PlayerIcons = {
  player1: number
  player2: number
}

const Menu = ({ open, onClose, player1, player2 }: Props) => {
  const router = useRouter()

  const [playerIcons, setPlayerIcons] = useState<PlayerIcons>({
    player1: 0,
    player2: 0,
  })

  useEffect(() => {
    const p1Icon = parseInt(
      window.localStorage.getItem(`jacobclicker-player1-icon`) || String(0),
      10
    )

    const p2Icon = parseInt(
      window.localStorage.getItem(`jacobclicker-player2-icon`) || String(0),
      10
    )

    setPlayerIcons({ player1: p1Icon, player2: p2Icon })
  }, [])

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return
        }

        onClose()
      }}
      disableEscapeKeyDown
    >
      <Box>
        <Slide direction="down" in={open}>
          <Box sx={{ height: '100vh' }}>
            <Box
              sx={{
                maxWidth: '550px',
                width: '80vw',
                height: '90vh',
                maxHeight: '600px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fef0ca',
                borderRadius: '7px',
              }}
            >
              <Stack alignItems="center" textAlign="center" mt={3}>
                <Typography variant="h3">
                  {(() => {
                    if (player1 > player2) return 'Jacob wins!'
                    if (player1 < player2) return 'Also Jacob wins!'
                    return 'Jacobs win!'
                  })()}
                </Typography>
              </Stack>
              <Stack direction="row" textAlign="center" mt={5}>
                <Stack sx={{ flex: '50%' }} alignItems="center">
                  <Typography variant="h4">{player1} clicks</Typography>

                  <Box mt="10px" sx={{ position: 'relative', height: 125 }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(calc(-50% + 2px), 5px)',
                      }}
                    >
                      <Image src={Body} alt="body" width={32} height={113} />
                    </Box>
                    <AnimatedBox
                      animation="jump"
                      sx={{
                        width: 50,
                        height: 50,
                        mb: 1,
                      }}
                    >
                      <Image
                        src={ICONS[playerIcons.player1].file}
                        alt="icon"
                        fill
                      />
                    </AnimatedBox>
                  </Box>

                  <Box>
                    <Typography>Jacob</Typography>
                  </Box>
                </Stack>
                <Stack sx={{ flex: '50%' }} alignItems="center">
                  <Typography variant="h4">{player2} clicks</Typography>

                  <Box mt="10px" sx={{ position: 'relative', height: 125 }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(calc(-50% + 2px), 5px)',
                      }}
                    >
                      <Image src={Body} alt="body" width={32} height={113} />
                    </Box>
                    <AnimatedBox
                      animation="side"
                      sx={{
                        width: 50,
                        height: 50,
                        mb: 1,
                      }}
                    >
                      <Image
                        src={ICONS[playerIcons.player2].file}
                        alt="icon"
                        fill
                      />
                    </AnimatedBox>
                  </Box>

                  <Box>
                    <Typography>Also Jacob</Typography>
                  </Box>
                </Stack>
              </Stack>

              <Stack
                px={3}
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Button
                  sx={{
                    backgroundColor: '#06031F',
                    borderRadius: 4,
                    padding: '0px 60px',

                    transition: '0.25s ease 0s',
                    '&:hover': {
                      backgroundColor: '#06031F',
                      transform: 'scale(1.04)',
                    },
                    '&:active': {
                      transform: 'scale(0.96)',
                    },
                  }}
                  disableRipple
                  onClick={() => {
                    router.push('/select')
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      WebkitTextStrokeWidth: '2px',
                      WebkitTextStrokeColor: '#C69824',
                      color: '#FFE7CA',
                    }}
                  >
                    HOME
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Modal>
  )
}

export default Menu
