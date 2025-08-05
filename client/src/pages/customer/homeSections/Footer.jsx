import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#232f3e', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#37475A',
              '&:hover': { backgroundColor: '#485769' },
              color: 'white',
              mb: 4,
              width: '100%',
            }}
          >
            Back to top
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Get to Know Us
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">About Us</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">Careers</Link>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Connect with Us
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">Facebook</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">Twitter</Link>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Make Money with Us
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">Sell on Strim</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">Advertise Your Products</Link>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Let Us Help You
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">Your Account</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">Returns Centre</Link>
            </Typography>
          </Grid>
        </Grid>

        <Box mt={4} pt={2} borderTop="1px solid #444">
          <Typography variant="body2" textAlign="center">
            &copy; 2025, Amazon.in Clone
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
