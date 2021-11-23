// const egAddress = '0x84062EA6FafAE18A1fbD693cf339d83bDf79AE23' // truffle localhost
const egAddress = '0x692560b307E40813EcB8e0C146c911280F60ab10' // rinkeby
const abiPath = "./contracts/etherGovernance.json"
let web3
let etherGovernance
/*
const artifactsPath = `browser/contracts/artifacts/${contractName}.json` // Change this for different path

const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
const accounts = await web3.eth.getAccounts()

let contract = new web3.eth.Contract(metadata.abi)

contract = contract.deploy({
    data: metadata.data.bytecode.object,
    arguments: constructorArgs
})
 */

// load ABI
fetch(abiPath)
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        console.log(jsonData)
        const egABI = jsonData.abi

        // load Web3
        web3 = new Web3(window.ethereum)
        etherGovernance = new web3.eth.Contract(egABI, egAddress)
        etherGovernance.setProvider(window.ethereum)
    }).then( () => {

        // fetch proposal active
        etherGovernance.methods.isProposalActive(0).call((err, res) => {
            if(err) {
                console.log("An error occured", err)
                return
            }
            console.log("The status is:", res)
        })

        // fetch current voting power
        etherGovernance.methods.getVotingPower().call((err, res) => {
            if(err) {
                console.log("error fetching voting power", err)
                return
            }
            console.log("Voting Power: ", res)
        })
    })


// on page load
window.addEventListener('load', () => {

    // check if MetaMask is installed
    let mmDetected = document.getElementById('mm-detected')
    if (typeof window.ethereum != "undefined") {
        mmDetected.innerHTML = "MetaMask has been Detected!"
    } else {
        alert("You need to install MetaMask to access this dApp!")
        mmDetected.innerHTML = "Please install MetaMask."
        console.log('MetaMask Not Available')
    }

});

// Connect metamask
const mmEnable = document.getElementById('mm-connect')
mmEnable.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts'})
    const mmCurrentAccount = document.getElementById('mm-current-account')
    mmCurrentAccount.innerHTML = "account: " + ethereum.selectedAddress
}

// deposit some eth
const vpDeposit = document.getElementById('get-voting-power')
vpDeposit.onclick = async () => {
    let send = web3.eth.sendTransaction({from: ethereum.selectedAddress, to:egAddress, value:web3.utils.toWei("0.05", "ether")});
    etherGovernance.methods.getVotingPower(ethereum.selectedAddress).call((err, res) => {
        if(err) {
            console.log("error fetching voting power", err)
            return
        }
        console.log("Voting Power: ", res)
    })
}
