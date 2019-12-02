import React from "react";

class KeyTab extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>{this.props.hello.did}</h3>
        <pre>{JSON.stringify(this.props.hello.keyPair, null, 2)}</pre>
      </React.Fragment>
    );
  }
}

export default KeyTab;
