import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { green } from "@material-ui/core/colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  fab: {},
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600]
    }
  }
}));

export default function FullWidthTabs({
  screens,
  mySpeedDial,
  activeTabIndex,
  doSelectActiveTab
}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    doSelectActiveTab(newValue);
  };

  const handleChangeIndex = index => {
    doSelectActiveTab(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ top: "64px", boxShadow: "none" }}>
        <Tabs
          value={activeTabIndex}
          onChange={handleChange}
          // indicatorColor="primary"
          // textColor="primary"
          // variant="fullWidth"
          aria-label="full width tabs example"
        >
          {Object.keys(screens).map((k, i) => {
            return <Tab label={k} key={k} {...a11yProps(i)} />;
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeTabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {Object.values(screens).map((v, i) => {
          return (
            <TabPanel
              value={activeTabIndex}
              key={i}
              index={i}
              dir={theme.direction}
              // style={{ paddingTop: "46px" }}
            >
              {v.tab}
            </TabPanel>
          );
        })}
      </SwipeableViews>
      {mySpeedDial}
    </div>
  );
}
