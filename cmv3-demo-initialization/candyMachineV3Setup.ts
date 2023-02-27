import { walletPrivateKey } from "./config";
import { Metaplex, PublicKey, keypairIdentity, toBigNumber } from "@metaplex-foundation/js";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import * as bs58 from "bs58";
import * as dotenv from 'dotenv'

dotenv.config()

async function test(){
  //TODO recreate candymachineV3 with guards at least one use this videos:   
  //https://www.youtube.com/watch?v=tJqS5iyspuY (back sdk)
  https://www.youtube.com/watch?v=0KHv1dMV8zU&t=1367s (front)
  //TODO: 2.check config file inialize class.

//console.log(process.env.WALLET_PRIVATE_KEY);
  const secretKey = process.env.WALLET_PRIVATE_KEY;
  console.log("secretKey",secretKey);
}

async function newCollection() {
    try{
      //Load Keypair from Phamton wallet
      const secretKey = walletPrivateKey || "";
      console.log("secretKey",secretKey);
      const authority = Keypair.fromSecretKey(bs58.decode(secretKey));
      console.log(authority);
      
      const connection = new Connection(clusterApiUrl("devnet"));
      const metaplex = new Metaplex(connection);
      metaplex.use(keypairIdentity(authority))
      
      // Create the Collection NFT.
      const { nft: collectionNft } = await metaplex.nfts().create({
        name: "MQ Collection",
        uri: "https://gateway.pinata.cloud/ipfs/QmPWvb3toEuKSSJVTngktVkJQCeVXw5NLc8WYVAXBfYEgr",
        sellerFeeBasisPoints: 50,
        isCollection: true,
        updateAuthority: authority,
      },
      { commitment: "finalized" }
      );
      
      console.log(collectionNft.address.toBase58());
  } catch (e: any){
    console.log(e);
  }
}

async function newCandyMachine() {

  const secretKey = "3TrcLbca7XunKi6MARmkBTv8JCTHbhsbjpu9Kfy3MrvFtLX2omNfvYh4QkVdhamDdxFYmAvYrZnuEXMa5fjpL66k";
  const authority = Keypair.fromSecretKey(bs58.decode(secretKey));
  console.log(authority);     

  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(authority))

  const collectionNft = new PublicKey("EmjH92NDMtu84akzWubmmCgb33sgg9EfvBBCmTgxkCFA");

// Create the Candy Machine.
  const { candyMachine } = await metaplex.candyMachines().create({
    withoutCandyGuard: true,
    itemsAvailable: toBigNumber(10),
    sellerFeeBasisPoints: 50, // 0.5%
    collection: {
      address: collectionNft,
      updateAuthority: metaplex.identity(),
    },
    isMutable: true,
    symbol: 'MQ',
    maxEditionSupply: toBigNumber(0),
    creators: [{ address: authority.publicKey, share: 100 }],
    itemSettings: {
      type: 'configLines',
      prefixName: 'MQ Collection #$ID+1$',
      nameLength: 0,
      prefixUri: 'https://gateway.pinata.cloud/ipfs/QmPM3ry4u2DrBGD8wYeUoTfsiPo6eXCU1pbm172bH7xjbL/MQ$ID+1$.json',
      uriLength: 43,
      isSequential: false,
    },

  },
  { commitment: "finalized" });

  console.log(candyMachine.address.toBase58());
}

async function updateCandyMachine() {

  //Phantom Private key
  const secretKey = "3TrcLbca7XunKi6MARmkBTv8JCTHbhsbjpu9Kfy3MrvFtLX2omNfvYh4QkVdhamDdxFYmAvYrZnuEXMa5fjpL66k";
  const authority = Keypair.fromSecretKey(bs58.decode(secretKey));
  console.log(authority);   

  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(authority))

 //Find Candy Machine.
  const candyMachine = await metaplex.candyMachines().findByAddress({
    address: new PublicKey("2PAAweJEwCCnvn81x1Hj9i2UYhGz1pwpPpZe4MQvWs3p")
  })

  console.log(candyMachine.address.toBase58());
  console.log(candyMachine.itemsLoaded);

  const resp = await metaplex.candyMachines().update({
    candyMachine,
    itemSettings: {
      type: 'configLines',
      prefixName: 'MQ Collection#$ID+1$',
      nameLength: 0,
      prefixUri: 'https://gateway.pinata.cloud/ipfs/QmPM3ry4u2DrBGD8wYeUoTfsiPo6eXCU1pbm172bH7xjbL/MQ$ID+1$.json',
      uriLength: 0,
      isSequential: true,
    },

  })
  console.log(resp.response.signature);

}

async function findByAddressCandyMachine() {
  
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

  console.log(candyMachine.address.toBase58());
  console.log(candyMachine.itemsLoaded);
}

async function insertItemsCandyMachine() {

  //Phantom Private key
  const secretKey = "3TrcLbca7XunKi6MARmkBTv8JCTHbhsbjpu9Kfy3MrvFtLX2omNfvYh4QkVdhamDdxFYmAvYrZnuEXMa5fjpL66k";
  const authority = Keypair.fromSecretKey(bs58.decode(secretKey));
  console.log(authority); 

  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(authority));

  const candyMachine = await metaplex.candyMachines().findByAddress({
    address: new PublicKey("2PAAweJEwCCnvn81x1Hj9i2UYhGz1pwpPpZe4MQvWs3p")
  });

  const items : any [] = []
  for (let i=0; i<10; i++){
    const item = {
      name: "", uri: ""
    }
    items.push(item);
  }

  const out = await metaplex.candyMachines().insertItems({
    candyMachine,
    index:0,
    items:items,
  });

  console.log(out.response.signature);

}

test();
//newCollection();
//newCandyMachine();
//updateCandyMachine();
//insertItemsCandyMachine();
//findByAddressCandyMachine();
//yarn tsc .\src\candyMachineV3Setup.ts