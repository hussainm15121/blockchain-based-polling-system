//https://eth-goerli.g.alchemy.com/v2/fUmL0uvjhoTh7uGdk243eZX0xhPEWtmd

require('@nomiclabs/hardhat-waffle')

module.exports ={
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/fUmL0uvjhoTh7uGdk243eZX0xhPEWtmd',
      accounts: [ '024a6705977829da8a439643ba57be587a33b44cbae9cc6b95e9e38511336176' ]
      
    }
  }
}