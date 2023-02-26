import { Box, Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Banner from '../../public/banner.png'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        background:
          'repeating-conic-gradient(#8A351C 0deg 30deg, #B9522E 30deg 60deg);',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack alignItems="center" sx={{ zIndex: 1 }}>
          <Typography
            style={{
              fontSize: '8rem',
              WebkitTextStrokeWidth: '4px',
              WebkitTextStrokeColor: '#FFE7CA',
              color: '#F29E30',
            }}
          >
            WELCOME TO
          </Typography>
          <Typography
            sx={{
              fontSize: '5rem',
              WebkitTextStrokeWidth: '4px',
              WebkitTextStrokeColor: '#7E631B',
              color: '#ffffff',
              mt: -4,
            }}
          >
            Jacob Clicker
          </Typography>
          <Button
            sx={{
              backgroundColor: '#06031F',
              borderRadius: 5,
              padding: '0px 72px',

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
                fontSize: '3rem',
                WebkitTextStrokeWidth: '3px',
                WebkitTextStrokeColor: '#C69824',
                color: '#FFE7CA',
              }}
            >
              PLAY
            </Typography>
          </Button>
        </Stack>
        <Box
          sx={{
            position: 'absolute',
            width: '90vw',
            maxWidth: '1000px',
            height: '100vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Image src={Banner} alt="banner" fill />
        </Box>
      </Box>
    </Box>
  )
}

export default Home
