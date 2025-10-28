import { useState } from 'react';
import { Box, Paper, TextField, Typography, Button, Tabs, Tab, Divider, Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useUser } from "./context/UserContext.jsx";

function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const ENDPOINT = `/api/v1/auth/${mode}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");
      login(data.user);

      navigate("/");
    } catch (err) {
      setError(err.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: { xs: 4, sm: 6 },
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Header + Tabs */}
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 600, mb: 1, letterSpacing: 0.3 }}
          >
            {mode === "login" ? "Welcome Back" : "Create An Account"}
          </Typography>

          <Tabs
            value={mode}
            onChange={(_, val) => setMode(val)}
            centered
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            <Tab label="Login" value="login" sx={{ flex: 1, fontSize: 16 }} />
            <Tab label="Sign Up" value="signup" sx={{ flex: 1, fontSize: 16 }} />
          </Tabs>
          <Divider sx={{ mt: 1 }} />
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mt: 2, display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            label="Email Address"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                sx: {
                  fontSize: 16,
                  bgcolor: "white",
                  color: "black",
                  py: 1,
                }
              },
              inputLabel: {
                sx: { color: "DimGray" },
              }
            }}
          />

          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                sx: {
                  fontSize: 16,
                  bgcolor: "white",
                  color: "black",
                  py: 1,
                }
              },
              inputLabel: {
                sx: { color: "DimGray" },
              }
            }}
          />

          {error && (
            <Alert severity="error" sx={{ fontSize: 14 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              mt: 1,
              py: 1.4,
              fontSize: "1rem",
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;