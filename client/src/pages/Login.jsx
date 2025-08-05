import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useContext } from 'react';
import { FirstNameContext,EmailContext,RoleContext } from '../context/Context';
function Login() {
  const { register, handleSubmit, watch } = useForm();
  const { firstname,setFirstname } = useContext(FirstNameContext);
const {  email,setEmail } = useContext(EmailContext);
const { role,setRole } = useContext(RoleContext);

  const navigate = useNavigate();




  const onSubmit = async (data) => {
  try {
    const res = await axios.post('http://localhost:2400/api/auth/login', data, {
      withCredentials: true,
    });
    if (res.status === 200 && res.data.firstname && res.data.role === data.role) {
      setFirstname(res.data.firstname); 
      setEmail(data.email);            
      setRole(data.role);  
      console.log(firstname, email, role);            
      window.location.href = 'http://localhost:5173/home';
    } else {
      alert('Invalid role selected.');
    }
  } catch (err) {
    console.error('Login failed', err);
    alert('Login failed. Please try again.');
  }
};


  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/form.jfif')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(8px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '90%',
          maxWidth: 900,
          zIndex: 1,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 5,
          backgroundColor: 'rgba(255,255,255,0.85)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url('/form.jfif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Box sx={{ flex: 1, p: 5 }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register('email')}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
            />
            <TextField
              label="Role"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              {...register('role')}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </TextField>
            {watch('role') === 'Admin' && (
              <TextField
                label="Secret Token"
                fullWidth
                margin="normal"
                {...register('secretToken')}
              />
            )}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: '#333' },
                borderRadius: 2,
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle />}
              sx={{
                mt: 2,
                borderColor: 'black',
                color: 'black',
                '&:hover': {
                  borderColor: '#333',
                  backgroundColor: '#f5f5f5',
                },
              }}
              onClick={() =>
                window.open(
                  'http://localhost:2400/api/auth/google/callback',
                  '_self'
                )
              }
            >
              Login with Google
            </Button>
            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
              New to STRIM?{' '}
              <Button
                variant="text"
                onClick={() => navigate('/register')}
                sx={{ color: 'black', textTransform: 'none' }}
              >
                Register
              </Button>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
