import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { AddPeerDialog } from "./AddPeerDialog";
import { DataTable } from "./DataTable";
// const didKey1 = {
//   passphrase: null,
//   controller: "did:key:z6MkmBio6RoFrQUnTuUiZceLBv9AarSV8i8MDEwmAPPL5fb1",
//   type: "Ed25519VerificationKey2018",
//   privateKeyBase58:
//     "3fiye1JAxGLyNaSQGX8dXvBnsyXiMFEuB6k1ZbGAqNgaHxzBhq2bWfpCS77D3farKqjKVg8UpwbAn5gWMLeiJ3hm",
//   publicKeyBase58: "7jTkWBYpWrzKMQe1t3gVLpbAmHAdipszXE2qL7RKASod"
// };

// var peer1 = new window.Peer(
//   // didKey1.controller,
//   didKey1.controller.split(":").pop(),
//   { key: "lwjd5qra8257b9" }
// );

// const didKey2 = {
//   passphrase: null,
//   controller: "did:key:z6MksaQxiRzWteX66AehJYZ6oawqZzStki8BKuyNR3bN64NG",
//   type: "Ed25519VerificationKey2018",
//   privateKeyBase58:
//     "2rjUgvsSRheTGYB9ujgbETBbTpk8jBSFZSBGzirSR8iMuEqETfnj1smhT18wfiLz99HfvQFVvEVTUVzbz57pQGKW",
//   publicKeyBase58: "E89v8Bk5Z72cyfozcybFxVPqkRB3Lpspdu4SamdMAqat"
// };

// var peer2 = new window.Peer(
//   // didKey2.controller,
//   didKey2.controller.split(":").pop(),
//   {
//     key: "lwjd5qra8257b9"
//   }
// );

// peer1.on("open", function(id) {
//   console.log("peer1: " + id);
// });

// peer2.on("open", function(id) {
//   console.log("peer2: " + id);
// });

// var conn = peer1.connect(peer2.id);
// conn.on("open", function() {
//   // Receive messages
//   conn.on("data", function(data) {
//     console.log("Received", data);
//   });

//   // Send messages
//   conn.send("Hello!");
// });

// peer1.on("connection", function(conn) {
//   console.log("on peer1 connection", conn);
// });

// peer2.on("connection", function(conn) {
//   console.log("on peer2 connection", conn);
//   setTimeout(() => {
//     conn.send("Hello!");
//     console.log("sent");
//   }, 1 * 1000);

//   conn.on("open", function() {
//     // Receive messages
//     conn.on("data", function(data) {
//       console.log("Received", data);
//     });

//     // Send messages
//     conn.send("Hello!");
//   });
// });

function PeersTab({ hello, doOpenAddPeerDialog, onPeerAdd }) {
  console.log(hello);
  return (
    <React.Fragment>
      <AddPeerDialog
        open={hello.isOpenAddPeerDialog}
        onClose={() => {
          doOpenAddPeerDialog(false);
        }}
        onSubmit={payload => {
          onPeerAdd(payload);
        }}
      />

      <DataTable
        title={"Peers"}
        data={
          hello.peers
            ? hello.peers.map(peerId => {
                return {
                  peerId
                };
              })
            : []
        }
        columns={[
          {
            title: "Peer",
            field: "peerId"
          }
        ]}
        detailPanel={rowData => {
          return (
            <iframe
              onClick={() => {
                // action("onPanelClicked")(rowData);
              }}
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/C0DPdy98e4c"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          );
        }}
      />
    </React.Fragment>
  );
}

export default PeersTab;
