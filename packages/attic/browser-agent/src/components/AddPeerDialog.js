import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

class AddPeerDialog extends Component {
  state = {
    peerId: ""
  };
  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.props.onClose();
  };
  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog
        scroll={"body"}
        open={open}
        onClose={() => onClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          style={{
            padding: "1em"
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              textAlign: "center"
            }}
          >
            Add Peer
          </DialogTitle>
          <DialogContent style={{ minHeight: "100px" }}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Enter a did:key"
                  value={this.state.peerId}
                  onChange={event => {
                    this.setState({
                      peerId: event.target.value
                    });
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

AddPeerDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AddPeerDialog;
export { AddPeerDialog };
