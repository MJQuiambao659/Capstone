import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

const ScholarshipsList = ({ open, onItemClick }) => {
  return (
    <>
      <ListItem
        button
        onClick={() => onItemClick("scholarships")}
        sx={{
          display: "flex",
        }}
      >
        <ListItemIcon
          sx={{
            height: "100%",
            marginLeft: open ? 1 : "auto", // Center the icon when closed
            [`& .MuiDrawer-paper`]: { marginLeft: open ? 1 : "auto" }, // Center the icon when closed
            color: "#E0E0E0",
          }}
        >
          <div>
            {open ? (
              <AccountBalanceIcon style={{ color: "#E6B905" }} />
            ) : (
              <Tooltip
                title={<Typography fontSize={18}>Scholarships</Typography>}
                placement="right"
              >
                <AccountBalanceIcon style={{ color: "#E6B905" }} />
              </Tooltip>
            )}
          </div>
        </ListItemIcon>
        {open && (
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              color: "#E0E0E0",
              marginLeft: -2,
              [`& .MuiDrawer-paper`]: { marginLeft: -2 },
            }}
          >
            Scholarships
          </Typography>
        )}
      </ListItem>
    </>
  );
};

export default ScholarshipsList;
