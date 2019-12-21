const bigInt = require("big-integer");
const paillier = require("paillier-js");

function nearestPowerOf2(n) {
  return 1 << (31 - Math.clz32(n));
}

describe("voting", () => {
  const sim = (candidates_count, voters_count) => {
    const plain_candidates_votes = new Array(candidates_count).fill(0);
    // console.log("candidates_count: ", candidates_count);
    // console.log("voters_count: ", voters_count);
    // console.log("plain_candidates_votes: ", plain_candidates_votes);

    // Happens at EM
    const bits_per_candidate = parseInt(
      bigInt(voters_count.toString()).bitLength()
    );
    // console.log("bits_per_candidate: ", bits_per_candidate);
    const key_size =
      candidates_count * bits_per_candidate < 16
        ? 16
        : nearestPowerOf2(candidates_count * bits_per_candidate);

    let publicKey, privateKey;
    while (!publicKey) {
      try {
        ({ publicKey, privateKey } = paillier.generateRandomKeys(key_size)),
          true;
      } catch (e) {
        //   sometimes keygen fails
      }
    }

    // Happens at BB
    let initial_count = 0;
    let c = publicKey.encrypt(initial_count);
    let d = privateKey.decrypt(c);

    // console.log({ c: c.toString(), d: d.toString() });

    // # 3. Voting is done
    for (let i = 0; i < voters_count; i++) {
      const r = Math.floor(Math.random() * candidates_count);
      //   console.log(`${i}: Voting for candidate: ${r}`);
      plain_candidates_votes[r] += 1;
      // # Generate encryption of the vote
      let vote = 1 << (r * bits_per_candidate);
      //   console.log("vote: ", vote);
      let encrypted_vote = publicKey.encrypt(vote);
      //   console.log(encrypted_vote);
      c = publicKey.addition(c, encrypted_vote);
    }

    // # 4. Final results sent to EM (EM can decrypt since it has both pk and sk)
    d = privateKey.decrypt(c);
    // console.log(d.toString());
    let candidates_votes = new Array(candidates_count).fill(0);
    let mask = Math.pow(2, bits_per_candidate) - 1;
    // console.log(mask);
    // console.log(d);
    for (let i = 0; i < candidates_count; i++) {
      let votes_count =
        parseInt(d.divide(2 ** (i * bits_per_candidate)).toString()) & mask;
      candidates_votes[i] = votes_count;
    }

    // console.log("plain_candidates_votes: ", plain_candidates_votes);
    // console.log("candidates_votes: ", candidates_votes);
    expect(plain_candidates_votes).toEqual(candidates_votes);
  };
  it("sim", () => {
    const candidates_count = 2;
    const voters_count = 50;
    const testCount = 1;

    for (let i = 0; i < testCount; i++) {
      sim(candidates_count, voters_count);
    }
  });
});
