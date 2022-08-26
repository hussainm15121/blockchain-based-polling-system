const main = async () => {

  const Polling = await hre.ethers.getContractFactory("PollContract");
  const polls = await Polling.deploy();

  await polls.deployed();

  console.log("Polls deployed to: ", polls.address);
}

const runMain = async () => {
  try{
      await main();
      process.exit(0);
  } catch (error){
      console.error(error);
      process.exit(1);
  }
}

runMain();
