import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { DataGrid } from '@mui/x-data-grid';
import { useApi } from '../../hooks/useApi';
import { type Token } from '../../types';

interface TokenForm {
  name: string,
  symbol: string,
  contractAddress: string, 
  network: string,
  coingeckoId: string | null,
  manualPrice: number | null,
  amount: number,
}

interface Row {
  id: string,
  name: string,
  symbol: string,
  contractAddress: string,
  network: string,
  price: number,
  amount: number,
}

const TokenPage: React.FunctionComponent = (): JSX.Element => {
  const { data: tokens, loading, error, fetchData } = useApi<Token[]>();
  const { loading: postLoading, error: postError, postData } = useApi<Token[]>();
  const { address: connectedAddress, isConnected } = useAccount();
  const [rows, setRows] = useState<Row[]>([]);
  const [formData, setFormData] = useState<TokenForm>({
    name: '',
    symbol: '',
    contractAddress: '', 
    network: '',
    coingeckoId: '',
    manualPrice: 0,
    amount: 0
  });

  /* Use Effect Hooks */
  useEffect(() => {
    if (isConnected) {
      fetchData('/tokens/all');
    }
  }, [fetchData, isConnected]);

  useEffect(() => {
    if (tokens) {
      const newRows = tokens.map(token => ({
        id: token.id,
        name: token.name,
        contractAddress: token.contractAddress,
        symbol: token.symbol,
        price: token.manualPrice
      }));
      setRows(newRows);
    }
  }, [tokens]);

  return (
    <div className="space-y-6">
      {/* Search / Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un token..."
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          
          {/* Network Filter */}
          <select className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
            <option value="all">Tous les réseaux</option>
            <option value="ethereum">Ethereum</option>
            <option value="bsc">BSC</option>
          </select>
        </div>
      </div>

      {/* Tokens Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <DataGrid
          rows={[
            { id: 1, name: 'Bitcoin', symbol: 'BTC', price: '45000', change: '+2.5' },
          ]}
          columns={[
            { field: 'name', headerName: 'Nom', flex: 1 },
            { field: 'symbol', headerName: 'Symbol', width: 120 },
            { field: 'price', headerName: 'Prix', width: 150 },
            { field: 'change', headerName: 'Variation 24h', width: 150 },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 120,
              renderCell: (params) => (
                <button className="text-blue-500 hover:text-blue-700">
                  Détails
                </button>
              ),
            },
          ]}
          autoHeight
          className="dark:text-white"
        />
      </div>
    </div>
  )
}

export default TokenPage;