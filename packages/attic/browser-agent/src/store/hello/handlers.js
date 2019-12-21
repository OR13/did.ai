import { withHandlers } from "recompose";

import * as api from "./api";
export default withHandlers({
  doSelectActiveTab: ({ onActiveTabSelected }) => index =>
    onActiveTabSelected({ activeTabIndex: index }),

  doToggleSpeedDial: ({ onSpeedDialToggled }) => value =>
    onSpeedDialToggled({ isSpeedDialogOpen: value }),

  doOpenAddPeerDialog: ({ onAddPeerDialogOpened }) => value =>
    onAddPeerDialogOpened({ isOpenAddPeerDialog: value }),

  doDidKeyRotate: ({ onDidKeyRotated }) => async () => {
    const { did, keyPair } = await api.generateNewDidKey();
    onDidKeyRotated({
      did,
      keyPair
    });
  },

  doAddPeer: ({ onPeerAdded }) => peerId => onPeerAdded({ peerId })
});
