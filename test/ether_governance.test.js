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

  describe('Functionalities', () => {
    it('should be able to deposit ether to get voting power', async () => {
      // deposit 3 ether into the contract
      await instance.sendTransaction({ from: voter1, value: web3.utils.toWei('3', 'Ether') })

      const votingPower = await instance.getVotingPower.call()

      console.log(votingPower)
      assert.equal(
        votingPower.valueOf(),
        web3.utils.toWei('3', 'ether'),
        'the voting power does not match the deposited amount'
      )
    })

    it('should be able to withdraw ether as long as it is less than the voting power', async () => {
      // deposit 3 ether into the contract
      await instance.sendTransaction({ from: voter1, value: web3.utils.toWei('3', 'Ether') })
      await instance.redeemEther(web3.utils.toWei('3', 'Ether'))
    })

    it('should be able to create a proposal and to close it', async () => {
      // get voting power
      await instance.sendTransaction({ from: voter1, value: web3.utils.toWei('1', 'Ether') })
      await instance.createProposal()
      await instance.closeProposal(0)
    })

    it('should be able to vote for a proposal', async () => {
      // get voting power
      await instance.sendTransaction({ from: voter1, value: web3.utils.toWei('1', 'Ether') })
      await instance.sendTransaction({ from: voter2, value: web3.utils.toWei('1', 'Ether') })
      await instance.createProposal({ from: voter1 })
      await instance.voteProposal(0, web3.utils.toWei('1', 'Ether'), true, { from: voter2 })
    })
  })
})
