import { handleActions } from "redux-actions";
import {
  onAddPeerDialogOpened,
  onDidKeyRotated,
  onSpeedDialToggled,
  onActiveTabSelected,
  onPeerAdded
} from "./actions";

const initialState = {
  activeTabIndex: 2,
  peers: ["did:example:123"]
};

export default handleActions(
  {
    [onPeerAdded]: (state, { payload }) => ({
      ...state,
      peers: [...state.peers, payload.peerId]
    }),
    [onActiveTabSelected]: (state, { payload }) => ({ ...state, ...payload }),
    [onSpeedDialToggled]: (state, { payload }) => ({ ...state, ...payload }),
    [onAddPeerDialogOpened]: (state, { payload }) => ({ ...state, ...payload }),
    [onDidKeyRotated]: (state, { payload }) => ({ ...state, ...payload })
  },
  initialState
);
