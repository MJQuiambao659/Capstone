import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Typography from '@mui/material/Typography';

const AnalyticsList = ({ open, onItemClick }) => {
  return (
    <ListItem
      button
      onClick={() => onItemClick('analytics')}
      sx={{
        display: 'flex',
        borderBottom: '1px solid #9E9E9E',
      }}
    >
      <ListItemIcon
        sx={{
          height: '100%',
          marginLeft: open ? -1 : 'auto', // Center the icon when closed
          [`& .MuiDrawer-paper`]: { marginLeft: open ? -1 : 'auto' }, // Center the icon when closed
          color: '#E0E0E0',
        }}
      >
        <AnalyticsIcon style={{ color: "#E6B905" }} />
      </ListItemIcon>
      {open && (
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            color: '#E0E0E0',
            marginLeft: -2,
            [`& .MuiDrawer-paper`]: { marginLeft: -2 },
          }}
        >
          Analytics
        </Typography>
      )}
    </ListItem>
  );
};

export default AnalyticsList;