import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const FaceButton = styled(Button)({
  border: 'none',
  background: '#FFFFFF',
})

type Props = {
  clicks: number
}

const Clicker = ({ clicks }: Props) => (
  <Box py={3}>
    <Typography variant="body1">{clicks} clicks</Typography>
    <FaceButton>click</FaceButton>
  </Box>
)

export default Clicker
