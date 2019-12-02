const crypto = require("isomorphic-webcrypto");
const base64url = require("base64url-universal");
const multibase = require("multibase");

const p256PublicKeyMulticodec = "0xec256";

describe("poc", () => {
  it("works?", async () => {
    // const key = await crypto.subtle.generateKey(
    //   {
    //     name: "ECDSA",
    //     namedCurve: "P-256"
    //   },
    //   false,
    //   ["sign", "verify"]
    // );
    // const publicKeyJwk = await crypto.subtle.exportKey("jwk", key.publicKey);
    const publicKeyJwk = {
      kty: "EC",
      crv: "P-256",
      key_ops: ["verify"],
      ext: true,
      x: "Gus_quZdsjXyFzkNnitn0XFUpfkwsPrbvt1TaHEbJIk",
      y: "VpyT-BucUcmq9WIAmludwDr87HxR1g3eiRJCHBUrEeg"
    };

    const key = await crypto.subtle.importKey(
      "jwk",
      publicKeyJwk,
      {
        name: "ECDSA",
        namedCurve: "P-256"
      },
      true,
      ["verify"]
    );

    expect(
      Buffer.concat([
        Buffer.from(
          "3059301306072a8648ce3d020106082a8648ce3d03010703420004",
          "hex"
        ),
        base64url.decode(publicKeyJwk.x),
        base64url.decode(publicKeyJwk.y)
      ]).toString("hex")
    ).toBe(key.data.toString("hex"));

    const mbKey = Buffer.concat([
      Buffer.from(p256PublicKeyMulticodec, "hex"),
      key.data
    ]);

    const mbKeyB58 = multibase.encode("base58btc", mbKey).toString();

    expect(mbKeyB58).toBe(
      "zaSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTFQ8uCsHF8zq46mQ8oaRAVHqTP5k9tA4MmyisJAwpMBurn7jEZNXSuZzFG6gncDk6mVWufKRrzxpq3y6tj6i91hbu"
    );

    // console.log(publicKeyJwk);
  });
});
