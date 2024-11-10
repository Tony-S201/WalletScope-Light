import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useApi } from '../../hooks/useApi';
import { useRouter } from "next/navigation";
import { type Token } from '../../types';
import { Table, TableRow, TableHead, TableCell, TableBody, TextField, Button, MenuItem } from '@mui/material';

interface TokenRow {
  name: string,
  contractAddress: string,
  network: string,
  amount: number | undefined | null,
  price: number | undefined | null,
  walletId: string
}

interface WalletName {
  name: string,
  _id: string
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
  // Custom Hooks
  const { data: tokens, loading, error, fetchData: fetchTokensData } = useApi<Token[]>();
  const { data: wallets, loading: walletsLoading, error: walletsError, fetchData: fetchWalletsData } = useApi<Token[]>();
  const { loading: postLoading, error: postError, postData } = useApi<Token[]>();

  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();

  // Form & Display
  const [rows, setRows] = useState<TokenRow[]>([]);
  const [walletsNames, setWalletsNames] = useState<WalletName[]>([]);
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
      fetchWalletsData(`/wallets/user/${connectedAddress}`)
      fetchTokensData('/tokens/all');
    }
  }, [fetchWalletsData, fetchTokensData, isConnected]);

  useEffect(() => {
    if (wallets) {
      const newRows = wallets.map(wallet => ({
        name: wallet.name,
        _id: wallet._id
      }));
      setWalletsNames(newRows);
    }
  }, [wallets]);

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

  /* Handle Functions */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToken = async () => {
    try {
      // Check fields
      if (!formData.name || !formData.symbol || !formData.contractAddress || !formData.network) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      // POST Request
      postData('/tokens/register', {
        walletId: walletAddress,
        name: formData.name,
        symbol: formData.symbol,
        contractAddress: formData.contractAddress,
        network: formData.network,
        coingeckoId: formData.coingeckoId ?? '',
        manualPrice: {
          usd: formData.manualPrice.usd ?? null
        },
        amount: formData.amount ?? 0
      });
     
      // Refresh wallet list
      fetchTokensData('/tokens/all');

      // Empty form
      setFormData({
        walletId: '',
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
    } catch (error) {
      console.error('Front - Error:', error);
      alert('Front - Error during token creation');
    }
  };

  return (
    <div className="space-y-6">

      {/* Token Registration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <div className="grid grid-cols-1 gap-6">
          <h3 className="text-lg font-medium dark:border-gray-700">
            Token Registration
          </h3>
          {postLoading ? (
            <div>Loading...</div>
          ) : postError ? (
            <div>Error {postError}, please refresh</div>
          ) : walletsNames ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                label="Name"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                label="Symbol"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                name="contractAddress"
                value={formData.contractAddress}
                onChange={handleInputChange}
                label="Contract Address"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                name="network"
                value={formData.network}
                onChange={handleInputChange}
                label="Network"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                name="coingeckoId"
                value={formData.coingeckoId || ''}
                onChange={handleInputChange}
                label="Coingecko ID"
                variant="outlined"
                fullWidth
              />
              <TextField
                name="manualPrice.usd"
                value={formData.manualPrice.usd || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  manualPrice: {
                    usd: e.target.value
                  }
                }))}
                label="Manual Price (USD)"
                variant="outlined"
                type="number"
                fullWidth
                inputMode="decimal"
              />
              <TextField
                name="amount"
                value={formData.amount || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  amount: parseFloat(e.target.value) || null
                }))}
                label="Amount"
                type="number"
                variant="outlined"
                fullWidth
              />
              <TextField
                name="wallet"
                select
                label="Select"
                helperText="Please select the wallet to link"
              >
                {walletsNames.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <div className="md:col-span-2 lg:col-span-3 flex justify-end">
                <Button 
                  onClick={handleAddToken}
                  variant="contained" 
                  color="primary"
                  className="mt-4"
                >
                  Add Token
                </Button>
              </div>
            </div>
          ) : (
            <div>Error - please refresh</div>
          )}
        </div>
      </div>

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