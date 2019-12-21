import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function SpeedDialTooltipOpen({
  doToggleSpeedDial,
  isSpeedDialogOpen,
  fabProps,
  actions
}) {
  const classes = useStyles();

  const handleOpen = () => {
    doToggleSpeedDial(true);
  };

  const handleClose = () => {
    doToggleSpeedDial(false);
  };

  return (
    <div className={classes.root}>
      <Backdrop open={isSpeedDialogOpen} />
      <SpeedDial
        FabProps={fabProps}
        ariaLabel="SpeedDial"
        className={classes.speedDial}
        hidden={false}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={isSpeedDialogOpen}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.handleAction}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
