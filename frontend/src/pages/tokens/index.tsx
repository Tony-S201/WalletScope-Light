import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useApi } from '../../hooks/useApi';
import { useRouter } from "next/navigation";
import { type Token } from '../../types';
import { Table, TableRow, TableHead, TableCell, TableBody, TextField, Button } from '@mui/material';

interface Row {
  name: string,
  contractAddress: string,
  network: string,
  amount: number | undefined | null,
  price: number | undefined | null,
  walletId: string
}

interface TokenForm {
  walletId: string | string[] | undefined,
  name: string,
  symbol: string,
  contractAddress: string,
  network: string,
  coingeckoId: string | undefined | null | "",
  manualPrice: {
    usd: string | number | undefined | null
  },
  amount: number | undefined | null
}

const TokenPage: React.FunctionComponent = (): JSX.Element => {
  const { data: tokens, loading, error, fetchData } = useApi<Token[]>();
  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [formData, setFormData] = useState<TokenForm>({
    walletId: 'to do from select dropdown of wallet addresses',
    name: '',
    symbol: '',
    contractAddress: '',
    network: '',
    coingeckoId: null,
    manualPrice: {
      usd: null
    },
    amount: null
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
        name: token.name,
        contractAddress: token.contractAddress,
        network: token.network,
        amount: token.amount,
        price: token.lastKnownPrice?.usd ?? token.manualPrice?.usd,
        walletId: token.walletId
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

      {/* Wallet Tokens */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <div className="grid grid-cols-1 gap-6">
          <h3 className="text-lg font-medium dark:border-gray-700">
            Tokens
          </h3>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="tokens table">
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Contract Address</TableCell>
              <TableCell>Network</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price (USD)</TableCell>
              <TableCell align="right">Total Value (USD)</TableCell>
              <TableCell align="right">Wallet Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Chargement...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Erreur: {error}</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Aucun token trouvé</TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => {
                const totalValue = (row.amount || 0) * (row.price || 0);
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell>
                      <div className="overflow-hidden text-ellipsis">
                        {row.contractAddress}
                      </div>
                    </TableCell>
                    <TableCell>{row.network}</TableCell>
                    <TableCell align="right">
                      {row.amount || '0'}
                    </TableCell>
                    <TableCell align="right">
                      ${row.price || '0'}
                    </TableCell>
                    <TableCell align="right">
                      ${totalValue}
                    </TableCell>
                    <TableCell align="right">
                    <Button onClick={() => router.push(`/wallet/${row.walletId}`)}>Open Wallet</Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TokenPage;