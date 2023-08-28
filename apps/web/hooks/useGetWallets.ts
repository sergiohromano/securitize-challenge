import { useQuery } from "react-query"

const BASE_URL = 'http://localhost:5002';
export const useGetWallets = () => {
  const accessToken = localStorage.getItem('accessToken');

  const fetchWallet = async () => {
    try {
      const res = await fetch(`${BASE_URL}/wallets`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if(res.ok) {
        return res.json()
      }
      return []
    } catch (error) {
      return []
    }
  }

  return useQuery(['wallets'], () => fetchWallet())
}
