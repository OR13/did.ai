import { createAction } from "redux-actions";

export const onDidKeyRotated = createAction(
  "hello/ON_DID_KEY_ROTATED",
  payload => payload
);

export const onAddPeerDialogOpened = createAction(
  "hello/ON_ADD_PEER_DIALOG_OPENED",
  payload => payload
);

export const onSpeedDialToggled = createAction(
  "hello/ON_SPEED_DIAL_TOGGLED",
  payload => payload
);

export const onActiveTabSelected = createAction(
  "hello/ON_ACTIVE_TAB_SELECTED",
  payload => payload
);

export const onPeerAdded = createAction(
  "hello/ON_PEER_ADDED",
  payload => payload
);
