const egAddress = '0x84062EA6FafAE18A1fbD693cf339d83bDf79AE23' // truffle localhost

const egABI = '{\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalCreationRequirement",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "constructor"\n' +
    '    },\n' +
    '    {\n' +
    '      "anonymous": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "address",\n' +
    '          "name": "_closer",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "CloseProposal",\n' +
    '      "type": "event"\n' +
    '    },\n' +
    '    {\n' +
    '      "anonymous": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "address",\n' +
    '          "name": "_creator",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "CreateProposal",\n' +
    '      "type": "event"\n' +
    '    },\n' +
    '    {\n' +
    '      "anonymous": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "address",\n' +
    '          "name": "_from",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": false,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_value",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "Deposit",\n' +
    '      "type": "event"\n' +
    '    },\n' +
    '    {\n' +
    '      "anonymous": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "address",\n' +
    '          "name": "_voter",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": false,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_votes",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "Unvote",\n' +
    '      "type": "event"\n' +
    '    },\n' +
    '    {\n' +
    '      "anonymous": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "address",\n' +
    '          "name": "_voter",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": false,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_value",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": false,\n' +
    '          "internalType": "bool",\n' +
    '          "name": "_forAgainst",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "Vote",\n' +
    '      "type": "event"\n' +
    '    },\n' +
    '    {\n' +
    '      "anonymous": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "internalType": "address",\n' +
    '          "name": "_to",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": false,\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_value",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "Withdraw",\n' +
    '      "type": "event"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "owner",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "proposalCount",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "proposalCreationRequirement",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "proposals",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "creator",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "votesFor",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "votesAgainst",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "internalType": "bool",\n' +
    '          "name": "isActive",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "votingPower",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "stateMutability": "payable",\n' +
    '      "type": "receive",\n' +
    '      "payable": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_amount",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "redeemEther",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "createProposal",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_votes",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "internalType": "bool",\n' +
    '          "name": "_voteForAgainst",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "voteProposal",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "unvoteFromProposal",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "closeProposal",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalCreationRequirement",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "updateProposalCreationRequirement",\n' +
    '      "outputs": [],\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "getOwner",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [],\n' +
    '      "name": "getVotingPower",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "address",\n' +
    '          "name": "_addr",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "getVotingPower",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "getProposalVotes",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "internalType": "uint256",\n' +
    '          "name": "_proposalId",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "isProposalActive",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "internalType": "bool",\n' +
    '          "name": "",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function",\n' +
    '      "constant": true\n' +
    '    }'

// on page load
window.addEventListener('load', () => {
    let mmDetected = document.getElementById('mm-detected')

    // check if MetaMask is installed
    if (typeof window.ethereum != "undefined") {
        mmDetected.innerHTML = "MetaMask has been Detected!"
    } else {
        alert("You need to install MetaMask to access this dApp!")
        mmDetected.innerHTML = "Please install MetaMask."
        console.log('MetaMask Not Available')
    }
});

const mmEnable = document.getElementById('mm-connect')

mmEnable.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts'})

    const mmCurrentAccount = document.getElementById('mm-current-account')
    mmCurrentAccount.innerHTML = "account: " + ethereum.selectedAddress

}

var web3 = new Web3(window.ethereum)
const etherGovernance = new web3.eth.Contract(egABI, egAddress)
etherGovernance.setProvider(window.ethereum)

console.log(etherGovernance.methods.getOwner())