import { Chip, Avatar, Box } from '@mui/material'
import type { NextPage } from 'next'
import Image from "@mui/material"

const Home: NextPage = () => <>
    <Box sx={{
        'display': 'flex',
        'background': 'repeating-conic-gradient(#8A351C 0deg 30deg, #B9522E 30deg 60deg);',
        'width': '100%',
        'minHeight': '100vh',
        'alignItems': 'center',
        'justifyContent': 'center',
    }}>
        <img src="/banner.svg" width='60%' />
    </Box>
</>

export default Home