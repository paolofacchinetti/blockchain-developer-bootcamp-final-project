let EtherGovernance = artifacts.require('EtherGovernance')
let BN = web3.utils.BN

contract('EtherGovernance', (accounts) => {
    let proposalCreationRequirement = '1000000000000000000' // 1 ether (1e18 wei)
    const [voter1, voter2, voter3] = accounts
    let instance

    beforeEach(async () => {
        instance = await EtherGovernance.new(proposalCreationRequirement)
    })

    it('Should have a proposalCreationRequirement', async () => {
        assert.equal(
            await instance.proposalCreationRequirement(),
            proposalCreationRequirement,
            'No proposalCreationRequirement is defined'
        )
    })

    it('Should have an owner that can update the proposal creation requirement', async () => {
        const newPropCreationRequirement = web3.utils.toWei("2", "ether")
        await instance.updateProposalCreationRequirement(newPropCreationRequirement, {
            from: voter1
        })
        let propCreationRequirement = await instance.proposalCreationRequirement.call()
        assert.equal(
            propCreationRequirement,
            newPropCreationRequirement
        )
    })

    it('Should not be able for non-owners to use owner functions', async () => {
        const newPropCreationRequirement = web3.utils.toWei("2", "ether")
        await instance.updateProposalCreationRequirement(newPropCreationRequirement, {
            from: voter2
        })
            .then(assert.fail)
            .catch( error => {
                assert.include(
                    error.message,
                    'Ownable: caller is not the owner'
                )
            })
    })

    describe('Functionalities', () => {
        it('should be able to deposit ether to get voting power', async () => {
            // deposit 3 ether into the contract
            const depositVotingPower = web3.utils.toWei('3', 'Ether')

            await instance.sendTransaction({from: voter1, value: depositVotingPower})

            const votingPower = await instance.getVotingPower.call()

            assert.equal(
                votingPower.valueOf(),
                depositVotingPower,
                'the voting power does not match the deposited amount'
            )
        })

        it('should be able to withdraw ether as long as it is less than the voting power', async () => {
            // deposit 3 ether into the contract
            await instance.sendTransaction({from: voter1, value: web3.utils.toWei('3', 'Ether')})
            await instance.redeemEther(web3.utils.toWei('3', 'Ether'))
        })

        it('should be able to create a proposal and to close it', async () => {
            // get voting power
            await instance.sendTransaction({from: voter1, value: web3.utils.toWei('1', 'Ether')})
            await instance.createProposal("E0A49530BEB9996C241B0B09F3322025A04B7BE228BA11792D22F95FE4040962")
            await instance.closeProposal(0)
        })

        it('should be able to vote for a proposal', async () => {
            // get voting power
            await instance.sendTransaction({from: voter1, value: web3.utils.toWei('1', 'Ether')})
            await instance.sendTransaction({from: voter2, value: web3.utils.toWei('1', 'Ether')})
            await instance.createProposal({from: voter1})
            await instance.voteProposal(0, web3.utils.toWei('1', 'Ether'), true, {from: voter2})
        })
    })
})
