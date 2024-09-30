import axios from 'axios';

export const getBalance = async (address: string) => {
  const apiKey = import.meta.env.VITE_BLOCKCYPHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance?token=${apiKey}`
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle response errors from the API
      throw new Error(
        `Failed to fetch balance for address ${address}. Status: ${error.response.status}, Message: ${error.response.data}`
      );
    } else {
      // Handle any other errors (e.g., network issues)
      throw new Error(`An error occurred while fetching balance for address ${address}: ${error.message}`);
    }
  }
};

