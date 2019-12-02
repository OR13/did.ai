const { Ed25519KeyPair } = require("crypto-ld");

const { keyToDidDoc } = require("did-method-key").driver();

export const generateNewDidKey = async () => {
  window.localStorage.removeItem("did.ai.key");
  let keyPair = await Ed25519KeyPair.generate();
  window.localStorage.setItem("did.ai.key", JSON.stringify(keyPair));
  const didDoc = keyToDidDoc(keyPair);
  window.localStorage.setItem("did.ai.did", didDoc.id);
  return {
    keyPair,
    did: didDoc.id
  };
};
