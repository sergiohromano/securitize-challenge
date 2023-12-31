import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useGetBalance } from "../hooks/useGetBalance";
import { useGetCurrencies } from "../hooks/useGetPrices";
import { useGetWallets } from "../hooks/useGetWallets";

const BASE_URL = 'http://localhost:5002';

const Balance = ({ walletId }) => {
  const { data } = useGetBalance(walletId);
  const { data: prices } = useGetCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  function formatToEth(weiBalance: string | ethers.BigNumber): Number {
    if(!weiBalance) return 0
    try {
      const parsedBalance = ethers.utils.formatEther(weiBalance.toString())
      return Number(parsedBalance) || 0
    } catch (error) {
      console.error(error)
      return 0
    }
  }

  const selectedPrice = () => prices?.find(price => price.id == (selectedCurrency || prices[0].id));
  const balance = () => {
    if(!data) return 0;
    return Number(formatToEth(data) || 0)/selectedPrice()?.price;
  }

  useEffect(() => {
    if (data && prices) {
      setSelectedCurrency(prices[0].id);
    }
  }, [data, prices])

  return (
    <div
      className="flex flex-row justify-between items-start"
    >
      <div
        className="flex flex-col justify-center items-center p-2"
      >
        <h4 
          className="text-center text-md font-bold"
        >Balance</h4>
        <p>{selectedPrice()?.symbol} {balance()}</p>
      </div>
      <div
        className="flex flex-col justify-center items-center p-2"
      >
        <h4
          className="text-center text-md font-bold"
        >Currency</h4>
        <select onChange={e => setSelectedCurrency(e.target.value)}>
          {prices?.map((price) => (
            <option key={price.id} value={price.id}>{price.name}</option>
          ))}
        </select>
        <p>{selectedPrice()?.price}</p>
      </div>
    </div>
  )
}


export const Dashboard = () => {
  const { data, refetch } = useGetWallets();
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
      <h1 
        className="text-center text-2xl font-bold"
      >Dashboard</h1>
      <form 
        className="flex flex-row justify-center items-center gap-2"
        onSubmit={handleAddWallet}>
        <div
          className="bg-gray-100 rounded-lg p-2"
        >
          <label
            htmlFor="name" 
            className="text-center text-md font-bold"
          >Name</label>
          <input
            type="text"
            id="name" 
            className="text-center text-md font-bold"
          />
        </div>
        <div
          className="bg-gray-100 rounded-lg p-2"
        >
          <label
            htmlFor="address"
            className="text-center text-md font-bold"
          >Wallet address</label>
          <input
            type="text"
            id="address"
            className="text-center text-md font-bold"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add wallet
        </button>
      </form>
      <h2
        className="text-center text-xl font-bold"
      >Wallets</h2>
      {!data && <p className="text-center">You don't have any wallets</p>}
      {!!data &&
      <ul
        className="w-full"
        >
        {data.map((wallet: any) => (
          <li
            className="bg-gray-100 rounded-lg p-2 flex justify-between items-center gap-2 w-full"
            key={wallet.id}>
            <div
              className="flex flex-row full-width justify-between items-start gap-6 border-2 border-gray-300 rounded-lg p-2 bg-white w-full"
            >
              <div
                className="flex flex-col justify-center items-center gap-2 p-2"
              >
                <div
                  className="flex flex-row justify-center items-center gap-2"
                >
                  <h3
                    className="text-center text-md font-bold"
                  >{wallet.name}</h3>
                  {wallet.isOld && <div className="bg-red-300 rounded-lg p-2">Wallet is old!</div>}
                </div>
                <p
                  className="text-center text-md"
                >{wallet.address}</p>
              </div>
              <Balance walletId={wallet.id} />
            </div>
          </li>
        ))}
      </ul>
      }
    </div>
  )
}
