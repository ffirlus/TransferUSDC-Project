const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TransferUSDC Contract", function () {
  let TransferUSDC, transferUsdc, usdcToken, linkToken, owner, receiver;

  const destinationChainSelector = 16015286601757825753; // Sepolia Chain Selector
  const gasLimit = 605000; // Gas limit you've set

  before(async function () {
    // Get signers
    [owner, receiver] = await ethers.getSigners();

    // Deploy mock LINK and USDC tokens
    const Token = await ethers.getContractFactory("ERC20Mock");
    usdcToken = await Token.deploy("Mock USDC", "mUSDC", 6);
    linkToken = await Token.deploy("Mock LINK", "mLINK", 18);

    // Deploy TransferUSDC contract
    TransferUSDC = await ethers.getContractFactory("TransferUSDC");
    transferUsdc = await TransferUSDC.deploy(
      "0x1c1c2da29d4a0e35f4a3e0ff0d1ab5d21e23ee85",  // Avalanche Fuji CCIP Router Address
      linkToken.address,
      usdcToken.address
    );
    await transferUsdc.deployed();

    // Mint some tokens to the owner
    await usdcToken.mint(owner.address, ethers.utils.parseUnits("1000", 6));
    await linkToken.mint(owner.address, ethers.utils.parseUnits("1000", 18));
  });

  it("Should transfer USDC successfully", async function () {
    // Approve tokens
    await usdcToken.approve(transferUsdc.address, ethers.utils.parseUnits("1", 6));
    await linkToken.approve(transferUsdc.address, ethers.utils.parseUnits("1", 18));

    // Capture receiver's balance before the transfer
    const receiverInitialBalance = await usdcToken.balanceOf(receiver.address);

    // Attempt the transfer
    const tx = await transferUsdc.transferUsdc(
      destinationChainSelector,
      receiver.address,
      ethers.utils.parseUnits("1", 6), // Amount of USDC to transfer
      gasLimit
    );
    await tx.wait();

    // Capture receiver's balance after the transfer
    const receiverFinalBalance = await usdcToken.balanceOf(receiver.address);

    // Assertions
    expect(receiverFinalBalance).to.equal(receiverInitialBalance.add(ethers.utils.parseUnits("1", 6)));
  });
});
