import Image, {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@mui/material'

import type { NextPage } from 'next'

const Home: NextPage = () => (
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
        backgroundImage: 'url(/banner.svg)',
        backgroundSize: '65%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack>
        <Typography variant="h1" color="white">
          Welcome to <br /> Jacob Clicker
        </Typography>
        <Button className="secondary">Play</Button>
      </Stack>
    </Box>
  </Box>
)

export default Home
