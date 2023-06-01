import { ethers } from 'hardhat';
import { expect } from 'chai';
import { faker } from '@faker-js/faker';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe('ERC721Token', function () {
    async function deployERC721TokenFixture() {
        const Token = await ethers.getContractFactory('ERC721Token');
        const name = faker.string.alphanumeric({ length: { min: 5, max: 25 } });
        const symbol = faker.string.alphanumeric({ length: { min: 3, max: 7 } });
        const token = await Token.deploy(name, symbol);
        const [deployer] = await ethers.getSigners();
        return { token, name, symbol, deployer };
    }
    it("Should be deployed with owner, name and symbol", async function () {
        const { token, name, symbol, deployer } = await loadFixture(deployERC721TokenFixture);
        const owner = await token.owner();
        const tokenName = await token.name();
        const tokenSymbol = await token.symbol();
        expect(owner).to.equal(deployer.address);
        expect(tokenName).to.equal(name);
        expect(tokenSymbol).to.equal(symbol);
    });
    it('should support ERC721 interface', async function () {
        const { token } = await loadFixture(deployERC721TokenFixture);
        const supportsInterface = await token.supportsInterface(
            '0x80ac58cd' // ERC721 interface ID
        );
        expect(supportsInterface).to.equal(true);
    });
    it("Should transfer ownership", async function () {
        const { token } = await loadFixture(deployERC721TokenFixture);
        const [owner, newOwner] = await ethers.getSigners();
        await token.transferOwnership(newOwner.address);
        const newContractOwner = await token.owner();
        expect(newContractOwner).to.equal(newOwner.address);
    });
    it("Should renounce ownership", async function () {
        const { token } = await loadFixture(deployERC721TokenFixture);
        await token.renounceOwnership();
        const newContractOwner = await token.owner();
        expect(newContractOwner).to.equal(ethers.constants.AddressZero);
    });
})