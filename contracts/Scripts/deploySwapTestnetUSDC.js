async function main() {
    const SwapTestnetUSDC = await ethers.getContractFactory("SwapTestnetUSDC");
    const swapTestnetUsdc = await SwapTestnetUSDC.deploy(
        "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // usdcToken
        "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // compoundUsdcToken
        "0x68793eA49297eB75DFB4610B68e076D2A5c7646C"  // fauceteer
    );

    await swapTestnetUsdc.deployed();
    console.log("SwapTestnetUSDC deployed to:", swapTestnetUsdc.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
