import { Box, Typography } from '@mui/material';

export function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography paragraph>
        Welcome to your project management dashboard. Here you'll find an overview of your projects and tasks.
      </Typography>
    </Box>
  );
}
