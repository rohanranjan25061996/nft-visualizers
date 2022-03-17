const {ethers} = require("hardhat")

// Contract Address : 0x337710DBb9a2fe1499f7d36f03018B19a3EA8C13

const main = async () => {
    const AnimeCollection = await ethers.getContractFactory("AnimeCollection");
    const animeCollection = await AnimeCollection.deploy( "AnimeCollection", "ANIME", 
    "https://gateway.pinata.cloud/ipfs/QmbWyKmJiUNyLh98p1ctDqPJHCP48x3dYLPKHkg25tGwCV/" );

    await animeCollection.deployed();
    console.log("animeCollection contract deployed successfully !", animeCollection.address);

    // now we have to call mint function, right now we have 7 file to mint.
    // and we pass tokenId, means how many copy of them

    await animeCollection.mint(10);
    await animeCollection.mint(10);
    await animeCollection.mint(10);
    await animeCollection.mint(20);
    await animeCollection.mint(20);
    await animeCollection.mint(30);
    await animeCollection.mint(30);

    console.log("NFT is Minted");
}

main().
then(() => process.exit(0))
.catch((error) => {
    console.log("Error in Main Function", error)
    process.exit(1);
})