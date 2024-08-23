async function main() {
    const CrossChainReceiver = await ethers.getContractFactory("CrossChainReceiver");
    const crossChainReceiver = await CrossChainReceiver.deploy(
        "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59", // ccipRouterAddress
        "0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e", // cometAddress
        "address_of_your_deployed_SwapTestnetUSDC"  // swapTestnetUsdcAddress
    );

    await crossChainReceiver.deployed();
    console.log("CrossChainReceiver deployed to:", crossChainReceiver.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
