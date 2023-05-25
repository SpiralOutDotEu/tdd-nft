import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('ERC721Token', function () {
    it("Should be deployed", async function () {
        const Token = await ethers.getContractFactory('ERC721Token');
        await Token.deploy();
        expect(true);
    })
})