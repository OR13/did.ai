const BlindSignature = require("blind-signatures");

const voteMessage = "Trump 2020";

describe("blind", () => {
  it("vote", () => {
    const registrarKey = BlindSignature.keyGeneration({ b: 512 });

    // ElectionVoter wants ElectionRegistrar to sign a message without revealing it's contents.
    // ElectionRegistrar can later verify he did sign the message

    console.log("Message:", voteMessage);

    // ElectionVoter gets N and E variables from ElectionRegistrar's key
    const N = registrarKey.keyPair.n.toString();
    const E = registrarKey.keyPair.e.toString();

    const { blinded, r } = BlindSignature.blind({
      message: voteMessage,
      N,
      E
    });

    const voterR = r;
    const voterBallet = blinded;

    // console.log(voterBallet.toString());

    const voterBalletReceipt = BlindSignature.sign({
      blinded: voterBallet,
      key: registrarKey
    });

    const voterBalletReceiptUnblinded = BlindSignature.unblind({
      signed: voterBalletReceipt,
      N,
      r: voterR
    });

    // ElectionVoter verifies
    const result = BlindSignature.verify({
      unblinded: voterBalletReceiptUnblinded,
      N,
      E,
      message: voteMessage
    });
    if (result) {
      console.log("ElectionVoter: Signatures verify!");
    } else {
      console.log("ElectionVoter: Invalid signature");
    }

    // ElectionRegistrar verifies
    const result2 = BlindSignature.verify2({
      unblinded: voterBalletReceiptUnblinded,
      key: registrarKey,
      message: voteMessage
    });

    if (result2) {
      console.log("ElectionRegistrar: Signatures verify!");
    } else {
      console.log("ElectionRegistrar: Invalid signature");
    }
  });
});
