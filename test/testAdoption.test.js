const _deploy_contracts = require("../migrations/2_deploy_contracts");

const Adoption = artifacts.require("Adoption");

_deploy_contracts("Adoption", (accounts) => {
    let adoption;
    let expectedAdopter;

    before(async () => {
        adoption = await Adoption.deployed();
    });

    describe("adoption a pet and retrieving account addresses", async () => {
        before("adopt a pet using accounts[0]", async () => {
            await adoption.adopt(8, { from: accounts[0] });
            expectedAdopter = accounts[0];
        });
    });

    it("can fetch the address of an owner by pet id", async () => {
        const adopter = await adoption.adopters(8);
        assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account.");
    });

    it("can fetch the collection of all pets owners` addresses", async() => {
        const adopters = await adoption.getAdopters();
        assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in the collection");
    });
});
