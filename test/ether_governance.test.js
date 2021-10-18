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
  })
})

/*
contract('EtherGovernance', (accounts) => {
  const [_owner, voter1, voter2] = accounts
  const emptyAddress = '0x0000000000000000000000000000000000000000'

  let instance

  beforeEach(async () => {
    instance = await EtherGovernance.new()
  })

  describe('Variables', () => {
    it('should have a proposalCreationRequirement', async () => {
      assert.equals(
        typeof instance.proposalCreationRequirement,
        'function',
        'the contract has no proposalCreationRequirement'
      )
    })

    it('should have a proposalCount', async () => {
      asset.equals(typeof instance.proposalCount, 'function', 'the contract has no proposalCount')
    })
  })
})
*/
