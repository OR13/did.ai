const paillier = require("paillier-js");
const bigInt = require("big-integer");

const { keys } = require("../fixtures");
describe("imported", () => {
  it("sanity", () => {
    const publicKey = new paillier.PublicKey(
      new bigInt(keys.publicKey.n),
      new bigInt(keys.publicKey.g)
    );
    const privateKey = new paillier.PrivateKey(
      new bigInt(keys.privateKey.lambda),
      new bigInt(keys.privateKey.mu),
      new bigInt(keys.privateKey.p),
      new bigInt(keys.privateKey.q),
      publicKey
    );
    let m = "13";
    let c = publicKey.encrypt(m);
    let d = privateKey.decrypt(c);
    expect(d.toString()).toBe("13");
  });
});
