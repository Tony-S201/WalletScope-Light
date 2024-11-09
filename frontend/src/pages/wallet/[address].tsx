import QRCode from 'react-qr-code';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { useApi } from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import { type Token } from '../../types';
import { Table, TableRow, TableHead, TableCell, TableBody, TextField, Button } from '@mui/material';

interface Row {
  name: string,
  contractAddress: string,
  network: string,
  amount: number | undefined | null,
  price: number
}

interface TokenForm {
  walletId: string | string[] | undefined,
  name: string,
  symbol: string,
  contractAddress: string,
  network: string,
  coingeckoId: string | undefined | null | "",
  manualPrice: {
    usd: number | undefined | null
  },
  amount: number | undefined | null
}

const WalletDetail: React.FunctionComponent = (): JSX.Element => {
  const { data: wallet, loading: walletLoading, error: walletError, fetchData: fetchWalletData } = useApi<Token[]>();
  const { data: tokens, loading, error, fetchData } = useApi<Token[]>();
  const { loading: postLoading, error: postError, postData } = useApi<Token[]>();
  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();
  const { address: walletAddress } = router.query; // Wallet Address from URL path

  const [rows, setRows] = useState<Row[]>([]);
  const [formData, setFormData] = useState<TokenForm>({
    walletId: walletAddress,
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
    if (isConnected && walletAddress) {
      fetchData('/tokens/all');
    }
  }, [fetchData, isConnected, walletAddress]);

  useEffect(() => {
    if (tokens) {
      const newRows = tokens.map(token => ({
        name: token.name,
        contractAddress: token.contractAddress,
        network: token.network,
        amount: token.amount,
        price: token.lastKnownPrice ?? token.manualPrice ?? 0
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
      fetchData('/tokens/all');

      // Empty form
      setFormData({
        walletId: walletAddress,
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
    {/* Wallet Info */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* QR Code */}
        <div className="flex justify-center items-center bg-white p-4 rounded-lg">
          {typeof walletAddress === 'string' && (
            <div className="p-4 bg-white rounded-lg">
              <QRCode value={walletAddress} size={128} />
            </div>
          )}
        </div>

        {/* Wallet Details */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Wallet Details
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              Adress: {walletAddress}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              $12,345.67
            </p>
            <p className="text-green-500">+1.2% (24h)</p>
          </div>
        </div>
      </div>
    </div>

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
        ) : (
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
                  usd: parseFloat(e.target.value) || null
                }
              }))}
              label="Manual Price (USD)"
              type="number"
              variant="outlined"
              fullWidth
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
        )}
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
                    {row.amount?.toLocaleString() || '0'}
                  </TableCell>
                  <TableCell align="right">
                    ${row.price?.toLocaleString() || '0'}
                  </TableCell>
                  <TableCell align="right">
                    ${totalValue.toLocaleString()}
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

export default WalletDetail;