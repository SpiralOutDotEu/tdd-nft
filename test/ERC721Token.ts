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
        return { token };
    }
    it("Should be deployed", async function () {
        const { } = await loadFixture(deployERC721TokenFixture);
        expect(true);
    })
    it('should support ERC721 interface', async function () {
        const { token } = await loadFixture(deployERC721TokenFixture);
        const supportsInterface = await token.supportsInterface(
            '0x80ac58cd' // ERC721 interface ID
        );
        expect(supportsInterface).to.equal(true);
    });
})