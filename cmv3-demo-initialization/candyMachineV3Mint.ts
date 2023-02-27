import { Metaplex, PublicKey, keypairIdentity, toBigNumber } from "@metaplex-foundation/js";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import * as bs58 from "bs58";

async function mint() {

    //Phantom Private key
    const secretKey = "3TrcLbca7XunKi6MARmkBTv8JCTHbhsbjpu9Kfy3MrvFtLX2omNfvYh4QkVdhamDdxFYmAvYrZnuEXMa5fjpL66k";
    const authority = Keypair.fromSecretKey(bs58.decode(secretKey));
    console.log(authority);      

    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(authority))
  
    // Find Candy Machine.
    const candyMachine = await metaplex.candyMachines().findByAddress({
      address: new PublicKey("2PAAweJEwCCnvn81x1Hj9i2UYhGz1pwpPpZe4MQvWs3p")
    })

    //Get new Signer wallet  Devw4W2EtG8r3JDWuBDkwtZHfL7a1bZGqFDzd3jQk182.json
    const mint = Keypair.fromSecretKey(
        Uint8Array.from(  [
            49,248,94,122,135,110,9,208,254,35,60,223,47,129,85,4,
            217,60,111,58,92,235,240,118,112,87,147,229,146,126,250,175,
            188,3,182,216,171,218,172,148,41,95,185,243,106,171,49,126,
            223,87,101,110,13,0,23,223,80,238,131,134,75,12,30,127
            ])
        );

      

    const resp = await metaplex.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: authority.publicKey,
        mintAuthority: metaplex.identity(),
    },
    { commitment: "finalized" });

    console.log(resp.response.signature);
    console.log(resp.nft.name);
}

mint();