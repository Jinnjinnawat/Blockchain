// services/sepoliaService.js
import Web3 from 'web3';

const provider = new Web3('https://sepolia.infura.io/v3/d0e2c9f6b5d44b72b468c8e234bb83d0');
const CONTRACT_ADDRESS = '0x723f729959c04338741a13c56936d0324D84d6b5';

const ABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "getProfile",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
  // 🔁 คุณสามารถเพิ่ม ABI อื่นตามต้องการ
];

const contract = new provider.eth.Contract(ABI, CONTRACT_ADDRESS);

// ✅ เพิ่มฟังก์ชัน getProfile
async function getProfile(address) {
  try {
    const [name, email, location] = await contract.methods.getProfile(address).call();
    return { name, email, location };
  } catch (error) {
    console.error('getProfile() error:', error);
    return null;
  }
}

const sepolia = {
  provider,
  CONTRACT_ADDRESS,
  ABI,
  contract,
  getProfile, // 👈 export ฟังก์ชันด้วย
};

export default sepolia;
