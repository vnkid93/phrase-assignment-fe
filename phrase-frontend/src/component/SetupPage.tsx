import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export const SetupPage = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const theme = createTheme();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("http://localhost:8080/setup",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    username: username,
                    password: password,
                })
        })
        .then(res => res.text())
        .then(
        (result) => {
            navigate("/projects?token=" + result);
        },
        (error) => {
            setError(error);
        }
        )
    }


    return <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Setup page
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="User"
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
}