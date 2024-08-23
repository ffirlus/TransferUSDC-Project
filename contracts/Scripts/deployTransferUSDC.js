async function main() {
    const TransferUSDC = await ethers.getContractFactory("TransferUSDC");
    const transferUSDC = await TransferUSDC.deploy();

    await transferUSDC.deployed();
    console.log("TransferUSDC deployed to:", transferUSDC.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
