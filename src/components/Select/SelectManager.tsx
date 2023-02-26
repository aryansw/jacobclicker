import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Selector from './Selector'
import SignBg from '../../../public/images/sign.png'

const SelectManager = () => {
  const router = useRouter()

  return (
    <Box>
      <Stack alignItems="center" mb={3}>
        <Stack sx={{ width: 650, height: 90, position: 'relative' }}>
          <Image src={SignBg} alt="sign" fill style={{ userSelect: 'none' }} />
          <Box
            sx={{
              position: 'absolute',
              top: '53%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#000000de',
            }}
          >
            <Typography variant="h4">CHOOSE YOUR JACOB</Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack direction="row" textAlign="center">
        <Box sx={{ flex: '50%' }}>
          <Selector />
        </Box>
        <Box sx={{ flex: '50%' }}>
          <Selector isSecond />
        </Box>
      </Stack>

      <Stack direction="row" justifyContent="end" px={3}>
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
            router.push('/click')
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
            START
          </Typography>
        </Button>
      </Stack>
    </Box>
  )
}

export default SelectManager
