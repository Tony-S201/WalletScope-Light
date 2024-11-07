import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { type Wallet } from "../../types";
import { Table, TableRow, TableHead, TableCell, TableBody, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Row {
  id: string,
  name: string,
  address: string,
  tokens: number,
  amount: number
}

interface WalletForm {
  author: string | undefined,
  name: string,
  address: string
}

const WalletPage: React.FunctionComponent = (): JSX.Element => {
  const { data: wallets, loading, error, fetchData } = useApi<Wallet[]>();
  const { loading: postLoading, error: postError, postData } = useApi<Wallet[]>();
  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();

  const [rows, setRows] = useState<Row[]>([]);
  const [formData, setFormData] = useState<WalletForm>({
    author: connectedAddress,
    name: '',
    address: ''
  });

  /* Use Effect Hooks */
  useEffect(() => {
    if (isConnected) {
      fetchData('/wallets/all');
    }
  }, [fetchData, isConnected]);

  useEffect(() => {
    if (wallets) {
      const newRows = wallets.map(wallet => ({
        id: wallet.id,
        name: wallet.name,
        address: wallet.address,
        tokens: 0,
        amount: 0
      }));
      setRows(newRows);
    }
  }, [wallets]);

  /* Handle Functions */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddWallet = async () => {
    try {
      // Check fields
      if (!formData.name || !formData.address) {
        alert('Veuillez remplir tous les champs');
        return;
      }

      // POST Request
      postData('/wallets/register', {
        author: connectedAddress,
        address: formData.address,
        name: formData.name
      });
     
      // Refresh wallet list
      fetchData('/wallets/all');

      // Empty form
      setFormData({
        author: connectedAddress,
        name: '',
        address: ''
      });
    } catch (error) {
      console.error('Front - Error:', error);
      alert('Front - Error during wallet creation');
    }
  };

  /* Render */
  return (
    <div className="space-y-6">

      {/* Wallets */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h3 className="text-lg font-medium p-4  dark:border-gray-700">
            Wallet Registration
          </h3>
          {postLoading ? (
            <div>Chargement...</div>
          ) : postError ? (
            <div>Error {postError}, please refresh</div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <TextField
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                label="Name"
                variant="outlined"
                className="w-2/5"
              />
              <TextField
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                label="Address"
                variant="outlined"
                className="w-2/5"
              />
              <Button 
                onClick={handleAddWallet}
                variant="contained" 
                className="w-1/5"
              >
                Add
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Wallets */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h3 className="text-lg font-medium p-4  dark:border-gray-700">
            Your Wallets
          </h3>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Number of tokens</TableCell>
              <TableCell align="right">Estimated Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Chargement...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Erreur: {error}</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Aucun wallet trouvé</TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Button onClick={() => router.push('/wallet/0xblabla')}>Open Wallet</Button>
                  </TableCell>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.tokens}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default WalletPage;