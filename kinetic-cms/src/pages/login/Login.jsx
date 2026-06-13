import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

import styles from './Login.module.scss'

const Login = () => {
  return (
    <>
      <h2 className={styles.text}>Login</h2>
      <Button variant="contained" color="primary" startIcon={<ThumbUpIcon />}>
        Login
      </Button>
    </>
  )
}

export default Login
