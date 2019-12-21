const paillier = require("paillier-js");

describe("basic", () => {
  it("sanity", () => {
    // create random keys
    const { publicKey, privateKey } = paillier.generateRandomKeys(128);
    // optionally, you can create your public/private keys from known parameters
    // const publicKey = new paillier.PublicKey(n, g);
    // const privateKey = new paillier.PrivateKey(lambda, mu, p, q, publicKey);
    let m = "13";
    let m1 = "1";
    let m2 = "1";
    // encrypt m
    let c = publicKey.encrypt(m);
    // decrypt c
    let d = privateKey.decrypt(c);
    expect(d.toString()).toBe("13");
    // homomorphic addition of two chipertexts (encrypted numbers)
    let c1 = publicKey.encrypt(m1);
    let c2 = publicKey.encrypt(m2);
    let encryptedSum = publicKey.addition(c1, c2);
    let sum = privateKey.decrypt(encryptedSum); // m1 + m2
    expect(sum.toString()).toBe("2");
    let k = 3;
    // multiplication by k
    c1 = publicKey.encrypt(m1);
    let encryptedMul = publicKey.multiply(c1, k);
    let mul = privateKey.decrypt(encryptedMul); // k · m1
    expect(mul.toString()).toBe("3");
  });
});
