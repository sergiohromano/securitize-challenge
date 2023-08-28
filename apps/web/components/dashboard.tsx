import { ethers } from "ethers";
import { useQuery } from 'react-query'

const BASE_URL = 'http://localhost:5002';

const fetchWallet = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const res = await fetch(`${BASE_URL}/wallets`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.json()
}

const Balance = ({ walletId }) => {
  const { data } = useQuery(['balance', walletId], () => fetchBalance(walletId))
  async function fetchBalance(walletId: number) {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`${BASE_URL}/wallets/${walletId}/balance`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return res.json()
    } catch (error) {
      return 0
    }
  }

  function formatToEth(weiBalance: number) {
    if(!weiBalance) return '0'
    try {
      return ethers.utils.formatEther(weiBalance)
    } catch (error) {
      try {
        return ethers.BigNumber.from(weiBalance).toString()
      } catch (error) {
        try {
          return ethers.utils.parseEther(weiBalance.toString())
        } catch (error) {
          return '0'
        }
      }
    }
  }

  return (
    <div>
      <h4>Balance</h4>
      <p>{formatToEth(data)}</p>
    </div>
  )
}

export const Dashboard = () => {
  const { data, refetch } = useQuery(['wallets'], () => fetchWallet())
  async function handleAddWallet(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    await fetch(`${BASE_URL}/wallets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: e.target.name.value,
        address: e.target.address.value,
      }),
    })
    refetch();
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleAddWallet}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="address">Wallet address</label>
        <input type="text" id="address" />
        <button
          type="submit"
        >
          Add wallet
        </button>
      </form>
      <h2>Wallets</h2>
      <ul>
        {data?.map((wallet) => (
          <li key={wallet.id}>
            <h3>{wallet.name}</h3>
            <p>{wallet.address}</p>
            <Balance walletId={wallet.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
