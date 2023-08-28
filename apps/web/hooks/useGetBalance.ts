import { useQuery } from "react-query";

const BASE_URL = 'http://localhost:5002';

export const useGetBalance = ({
  walletId,
} : {
  walletId: number
}) => {
  const accessToken = localStorage.getItem('accessToken');

  async function fetchBalance(walletId: number) {
    try {
      const res = await fetch(`${BASE_URL}/wallets/${walletId}/balance`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if(!res.ok) {
        return 0
      }
      return res.json()
    } catch (error) {
      return 0
    }
  }
  return useQuery(['balance', walletId], () => fetchBalance(walletId), {
    enabled: !!walletId,
  })
}
