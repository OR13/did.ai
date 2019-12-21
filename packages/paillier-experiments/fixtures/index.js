const paillier = require("paillier-js");
const bigInt = require("big-integer");
// const { publicKey, privateKey } = paillier.generateRandomKeys(128);
// console.log(JSON.stringify({ publicKey, privateKey }, null, 2));
// const publicKey = new paillier.PublicKey(n, g);
// const privateKey = new paillier.PrivateKey(lambda, mu, p, q, publicKey);
const keys = {
  publicKey: {
    n: "262495107236104869133106142637748761213",
    _n2:
      "68903681322894194828376897536467424386326986232116010941406822920716093231369",
    g:
      "16216399637028952843039402409804902376621236046579095098447012677633486723253"
  },
  privateKey: {
    lambda: "21874592269675405758377524290086472840",
    mu: "118822252757093268844973088741784994360",
    _p: "17961667616407972741",
    _q: "14614183540303114393",
    publicKey: {
      n: "262495107236104869133106142637748761213",
      _n2:
        "68903681322894194828376897536467424386326986232116010941406822920716093231369",
      g:
        "16216399637028952843039402409804902376621236046579095098447012677633486723253"
    }
  }
};

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

module.exports = {
  keys,
  publicKey,
  privateKey
};
