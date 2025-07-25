import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactionsByUserName } from "../Service/transactionService";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { motion } from "framer-motion";

function UsernamePage() {
  const [username, setUsername] = useState("");
  const [found, setFound] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const checkUsername = async () => {
    try {
      const res = await getTransactionsByUserName(username.trim());
      setFound(res.data.length > 0);
      setChecked(true);
    } catch (err) {
      console.error(err);
      setFound(false);
      setChecked(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={4} sx={{ p: 4 }}>
          <Box textAlign="center" mb={2}>
            <PersonOutlineIcon fontSize="large" color="primary" />
            <Typography variant="h5" fontWeight="bold">
              Welcome to Expense Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start by entering your username
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={checkUsername}
            disabled={!username.trim()}
          >
            Continue
          </Button>

          {checked && (
            <Box mt={3} textAlign="center">
              {found ? (
                <>
                  <Typography>Your tracker is ready.</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/dashboard/${username.trim()}`)}
                    sx={{ mt: 1 }}
                  >
                    Go to Tracker
                  </Button>
                </>
              ) : (
                <>
                  <Typography>No tracker found. Create one now:</Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/dashboard/${username.trim()}`)}
                    sx={{ mt: 1 }}
                  >
                    Create Tracker
                  </Button>
                </>
              )}
            </Box>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
}

export default UsernamePage;
