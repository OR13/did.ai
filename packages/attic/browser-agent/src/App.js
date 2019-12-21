import React from "react";

import Zoom from "@material-ui/core/Zoom";

import { useTheme } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";

import RefreshIcon from "@material-ui/icons/Refresh";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import Theme from "./components/Theme";
import MyNav from "./components/MyNav";
import MyTabs from "./components/MyTabs";
import MyFab from "./components/MyFab";
import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";
import PeersTab from "./components/PeersTab";
import KeyTab from "./components/KeyTab";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FavoriteIcon />, name: "Like" }
];

function App(props) {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const screens = {
    "Tab 1": { tab: <Tab1 />, fab: { color: "primary", actions } },
    "Tab 2": {
      tab: <Tab2 hello={props.hello} />,
      fab: { color: "primary", actions }
    },
    ["Peers"]: {
      tab: (
        <PeersTab
          hello={props.hello}
          doOpenAddPeerDialog={props.doOpenAddPeerDialog}
          onPeerAdd={({ peerId }) => {
            props.doToggleSpeedDial(false);
            props.doAddPeer(peerId);
          }}
        />
      ),
      fab: {
        color: "primary",
        actions: [
          {
            icon: <GroupAddIcon />,
            name: "Add Peer",
            handleAction: () => {
              props.doOpenAddPeerDialog(true);
            }
          }
        ]
      }
    },
    ["Key"]: {
      tab: <KeyTab hello={props.hello} />,
      fab: {
        color: "secondary",
        actions: [
          {
            icon: <RefreshIcon />,
            name: "Rotate key",
            handleAction: () => {
              props.doDidKeyRotate();
            }
          }
        ]
      }
    }
  };

  return (
    <Theme>
      <MyNav
        title={"did.ai"}
        screens={screens}
        myTabs={
          <MyTabs
            screens={screens}
            doSelectActiveTab={props.doSelectActiveTab}
            activeTabIndex={props.hello.activeTabIndex}
            mySpeedDial={Object.values(screens).map((v, index) => (
              <Zoom
                key={index}
                in={props.hello.activeTabIndex === index}
                timeout={transitionDuration}
                style={{
                  transitionDelay: `${
                    props.hello.activeTabIndex === index
                      ? transitionDuration.exit
                      : 0
                  }ms`
                }}
                unmountOnExit
              >
                <div
                  style={{
                    position: "fixed",
                    bottom: theme.spacing(2),
                    right: theme.spacing(2)
                  }}
                >
                  <MyFab
                    doToggleSpeedDial={props.doToggleSpeedDial}
                    isSpeedDialogOpen={props.hello.isSpeedDialogOpen}
                    actions={v.fab.actions}
                    fabProps={{
                      color: v.fab.color
                      // className: fab.className
                    }}
                  />
                </div>
              </Zoom>
            ))}
          />
        }
      />
    </Theme>
  );
}

export default App;
