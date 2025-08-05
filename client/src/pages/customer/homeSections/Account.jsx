import React from "react";
import { FirstNameContext,EmailContext,RoleContext } from "../../../context/Context";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { useContext } from "react";

export default function Account() {

const {firstname,setFirstname}=useContext(FirstNameContext);
const {email,setEmail}=useContext(EmailContext);
const {setRole}=useContext(RoleContext);
  const handleLogout = () => {
    setFirstname(null);
    setEmail(null);
    setRole(null);
    document.cookie="access_token=;"
    window.location.href='/login';
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>Your Account</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Profile</Typography>
        <TextField fullWidth margin="normal" label="First Name" defaultValue={firstname} />
        <TextField fullWidth margin="normal" label="Email" defaultValue={email} disabled />
        <Button variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Security</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <div>
            <Typography>Password</Typography>
            <Typography variant="body2">Last changed 3 months ago</Typography>
          </div>
          <Button variant="outlined">Change Password</Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between">
          <div>
            <Typography>Two-Factor Auth</Typography>
            <Typography variant="body2">Add extra protection</Typography>
          </div>
          <Button variant="outlined">Enable</Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, borderColor: "error.main", border: 1 }}>
        <Typography color="error" variant="h6">Danger Zone</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <div>
            <Typography>Delete Account</Typography>
            <Typography variant="body2">Permanently remove everything</Typography>
          </div>
          <Button color="error" variant="outlined">Delete</Button>
        </Box>
        <Button onClick={handleLogout} color="error" variant="contained" sx={{ mt: 2 }}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
}