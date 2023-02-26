import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Bubble from '../../../public/images/bubble.png'
import MadFace from '../../../public/images/jacob_faces/jacob_mad.svg'
import ScaredFace from '../../../public/images/jacob_faces/jacob_scared.svg'
import SillyFace from '../../../public/images/jacob_faces/jacob_silly.svg'
import SmileFace from '../../../public/images/jacob_faces/jacob_smile.svg'
import SurprisedFace from '../../../public/images/jacob_faces/jacob_surprised.svg'
import WinkFace from '../../../public/images/jacob_faces/jacob_wink.svg'
import NameBg from '../../../public/images/name-background.png'

const FACES = [
  { file: MadFace, name: 'Mad' },
  { file: ScaredFace, name: 'Scared' },
  { file: SillyFace, name: 'Silly' },
  { file: SmileFace, name: 'Smiling' },
  { file: SurprisedFace, name: 'Shocked' },
  { file: WinkFace, name: 'Smug' },
]

type Props = {
  isSecond?: boolean
}

const Clicker = ({ isSecond = false }: Props) => {
  const [chosenIcon, setChosenIcon] = useState(0)

  useEffect(() => {
    window.localStorage.setItem(
      `jacobclicker-player${isSecond ? '2' : '1'}-icon`,
      String(chosenIcon)
    )
  }, [chosenIcon])

  return (
    <Box
      sx={{
        py: 2,
        pl: isSecond ? 0 : 10,
        pr: isSecond ? 10 : 0,
      }}
    >
      <Box px={10}>
        <Stack alignItems="center">
          <Box sx={{ width: 300, height: 60, position: 'relative' }}>
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
                transform: 'translateY(-50%)',
                color: '#000000de',
                width: '100%',
              }}
              alignItems="center"
            >
              <Typography variant="h4" textAlign="center">
                {isSecond ? 'Also ' : ''}Jacob
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Stack alignItems="center" pb={1.5}>
          <Paper
            elevation={7}
            sx={{
              backgroundColor: '#ebaa43',
              py: 2,
              my: 2,
              borderRadius: '4px',
            }}
          >
            <Typography sx={{ mb: 1 }}>Choose your icon!</Typography>

            <Grid container>
              {FACES.map(({ file, name }, i) => (
                <Grid
                  item
                  key={name}
                  xs={4}
                  py={3}
                  sx={{}}
                  onClick={() => setChosenIcon(i)}
                >
                  <Stack alignItems="center">
                    <Stack
                      sx={{
                        width: 117,
                        height: 117,
                        borderRadius: '50%',
                        background: '#C8710C',
                        filter: chosenIcon === i ? 'none' : 'grayscale(70%)',
                        opacity: chosenIcon === i ? 1 : 0.6,

                        transition: 'boxShadow 250ms ease',
                        boxShadow:
                          chosenIcon === i
                            ? '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
                            : 'none',

                        '&:hover': {
                          cursor: 'pointer',
                          filter: 'none',
                          opacity: chosenIcon === i ? 1 : 0.7,
                        },
                      }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={file}
                        alt="face"
                        width={100}
                        height={100}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      />
                    </Stack>

                    <Box
                      sx={{
                        position: 'relative',
                        ml: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                        }}
                      >
                        <Image
                          src={Bubble}
                          alt="bubble"
                          width={90}
                          height={50}
                        />
                      </Box>
                      <Box
                        sx={{
                          position: 'relative',
                          zIndex: 1,
                          transform: 'rotate(-20deg) translate(17px, 20px)',
                        }}
                      >
                        <Typography>{name}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Stack>
      </Box>
    </Box>
  )
}

export default Clicker
