import axios from 'axios';

export const getTransactions = async (address: string) => {
  const apiKey = import.meta.env.VITE_BLOCKCYPHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?token=${apiKey}`
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      
      throw new Error(
        `Failed to fetch transaction history for address ${address}. Status: ${error.response.status}, Message: ${error.response.data}`
      );
    } else {
      
      throw new Error(`An error occurred while fetching transaction history for address ${address}: ${error.message}`);
    }
  }
};
