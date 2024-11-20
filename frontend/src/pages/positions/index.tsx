import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useAuthApi } from '../../hooks/useAuthApi';
import { type Position, type Token, type Wallet, type PositionTokenWithPrice, NetworkType } from '../../types';
import { 
  Table, TableRow, TableHead, TableCell, TableBody, TextField, 
  Button, MenuItem, Switch, FormControlLabel, IconButton,
  Tooltip, Alert, Snackbar, CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface PositionRow {
  _id: string;
  token: PositionTokenWithPrice;
  wallet: Wallet;
  amount: number;
  value: number;
  isStaking: boolean;
  stakingPlatform?: {
    name: string;
    apy: number;
    lockupPeriod: number;
  };
  notes?: string;
  lastUpdate: Date;
}

interface PositionForm {
  token: PositionTokenWithPrice;
  wallet: string;
  amount: string;
  isStaking: boolean;
  stakingPlatform: {
    name: string;
    apy: string;
    lockupPeriod: string;
  };
  notes: string;
}

const initialFormData: PositionForm = {
  token: {
    _id: '',
    contractAddress: '',
    name: '',
    symbol: '',
    network: NetworkType.ETHEREUM,
    lastKnownPrice: undefined,
    manualPrice: undefined
    // Ajoutez ici toutes les autres propriétés requises de PositionTokenWithPrice
  },
  wallet: '',
  amount: '',
  isStaking: false,
  stakingPlatform: {
    name: '',
    apy: '',
    lockupPeriod: ''
  },
  notes: ''
};

const PositionPage: React.FunctionComponent = (): JSX.Element => {
  // State
  const [rows, setRows] = useState<PositionRow[]>([]);
  const [formData, setFormData] = useState<PositionForm>(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [walletFilter, setWalletFilter] = useState('all');
  const [stakingFilter, setStakingFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Custom Hooks
  const { data: positions, loading: isLoading, error, fetchData: fetchPositionsData } = useAuthApi<Position[]>();
  const { data: tokens, fetchData: fetchTokensData } = useAuthApi<Token[]>();
  const { data: wallets, fetchData: fetchWalletsData } = useAuthApi<Wallet[]>();
  const { loading: postLoading, error: postError, postData, deleteData } = useAuthApi<Position[]>();

  const { address: connectedAddress, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      fetchTokensData('/tokens/all');
      fetchWalletsData('/wallets/all');
      fetchPositionsData('/positions');
    }
  }, [fetchPositionsData, isConnected]);

  useEffect(() => {
    if (positions) {
      const newRows: PositionRow[] = positions.map(position => ({
        _id: position._id,
        token: position.token,
        wallet: position.wallet as Wallet,
        amount: position.amount,
        value: position.amount * (position.token.lastKnownPrice?.usd ?? position.token.manualPrice?.usd ?? 0),
        isStaking: position.isStaking,
        stakingPlatform: position.stakingPlatform,
        notes: position.notes,
        lastUpdate: new Date(position.lastUpdate)
      }));
      setRows(newRows);
    }
  }, [positions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('stakingPlatform.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        stakingPlatform: {
          ...prev.stakingPlatform,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleStakingToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isStaking: e.target.checked,
      stakingPlatform: e.target.checked ? prev.stakingPlatform : initialFormData.stakingPlatform
    }));
  };

  const handleAddPosition = async () => {
    try {
      if (!formData.token || !formData.wallet || !formData.amount) {
        setSnackbar({
          open: true,
          message: 'Please fill all required fields',
          severity: 'error'
        });
        return;
      }

      const positionData = {
        token: formData.token._id,
        wallet: formData.wallet,
        amount: Number(formData.amount),
        isStaking: formData.isStaking,
        stakingPlatform: formData.isStaking ? {
          name: formData.stakingPlatform.name,
          apy: Number(formData.stakingPlatform.apy),
          lockupPeriod: Number(formData.stakingPlatform.lockupPeriod)
        } : undefined,
        notes: formData.notes || undefined
      };

      await postData('/positions', positionData);
      await fetchPositionsData('/positions');
      
      setFormData(initialFormData);
      setSnackbar({
        open: true,
        message: 'Position added successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Error during position creation',
        severity: 'error'
      });
    }
  };

  const handleDeletePosition = async (id: string) => {
    try {
      await deleteData(`/positions/${id}`);
      await fetchPositionsData('/positions');
      setSnackbar({
        open: true,
        message: 'Position deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error deleting position',
        severity: 'error'
      });
    }
  };

  const filteredRows = rows
    .filter(row => {
      const matchesSearch = 
        row.token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.wallet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesWallet = walletFilter === 'all' || row.wallet._id === walletFilter;
      const matchesStaking = stakingFilter === 'all' || 
        (stakingFilter === 'staking' && row.isStaking) ||
        (stakingFilter === 'non-staking' && !row.isStaking);
      
      return matchesSearch && matchesWallet && matchesStaking;
    });

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Token Selection */}
          <TextField
            select
            fullWidth
            label="Token"
            name="token"
            value={formData.token._id || ''}  // Ajout d'une valeur par défaut
            onChange={(e) => {
              const selectedToken = tokens?.find(t => t._id === e.target.value);
              setFormData(prev => ({
                ...prev,
                token: selectedToken || initialFormData.token
              }));
            }}
            required
          >
            {tokens?.map((token) => (
              <MenuItem key={token._id} value={token._id}>
                {token.name} ({token.symbol})
              </MenuItem>
            )) || <MenuItem value="">Select a token</MenuItem>}
          </TextField>

          {/* Wallet Selection */}
          <TextField
            select
            fullWidth
            label="Wallet"
            name="wallet"
            value={formData.wallet || ''}  // Ajout d'une valeur par défaut
            onChange={handleInputChange}
            required
          >
            {wallets?.map((wallet) => (
              <MenuItem key={wallet._id} value={wallet._id}>
                {wallet.name}
              </MenuItem>
            )) || <MenuItem value="">Select a wallet</MenuItem>}
          </TextField>

          {/* Amount Input */}
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleInputChange}
            required
            InputProps={{
              inputProps: { min: 0, step: "any" }
            }}
          />

          {/* Staking Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={formData.isStaking}
                onChange={handleStakingToggle}
                name="isStaking"
              />
            }
            label="Staking Position"
          />

          {/* Staking Platform Fields - Only shown if isStaking is true */}
          {formData.isStaking && (
            <>
              <TextField
                fullWidth
                label="Platform Name"
                name="stakingPlatform.name"
                value={formData.stakingPlatform.name}
                onChange={handleInputChange}
                required={formData.isStaking}
              />

              <TextField
                fullWidth
                label="APY (%)"
                name="stakingPlatform.apy"
                type="number"
                value={formData.stakingPlatform.apy}
                onChange={handleInputChange}
                required={formData.isStaking}
                InputProps={{
                  inputProps: { min: 0, step: "0.01" }
                }}
              />

              <TextField
                fullWidth
                label="Lockup Period (days)"
                name="stakingPlatform.lockupPeriod"
                type="number"
                value={formData.stakingPlatform.lockupPeriod}
                onChange={handleInputChange}
                required={formData.isStaking}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </>
          )}

          {/* Notes Field */}
          <TextField
            fullWidth
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            multiline
            rows={3}
            className="col-span-full"
          />

          {/* Submit Button */}
          <div className="col-span-full">
            <Button
              variant="contained"
              onClick={handleAddPosition}
              disabled={postLoading}
              startIcon={postLoading ? <CircularProgress size={20} /> : null}
            >
              {postLoading ? 'Adding Position...' : 'Add Position'}
            </Button>
          </div>

          {/* Error Display */}
          {postError && (
            <div className="col-span-full">
              <Alert severity="error">{postError}</Alert>
            </div>
          )}
        </div>
      </div>

      {/* Search / Filter Section - Amélioré */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          
          <TextField
            select
            value={walletFilter}
            onChange={(e) => setWalletFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All Wallets</MenuItem>
            {wallets?.map((wallet) => (
              <MenuItem key={wallet._id} value={wallet._id}>
                {wallet.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            value={stakingFilter}
            onChange={(e) => setStakingFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All Positions</MenuItem>
            <MenuItem value="staking">Staking Only</MenuItem>
            <MenuItem value="non-staking">Non-Staking Only</MenuItem>
          </TextField>
        </div>
      </div>

      {/* Table Section - Amélioré */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Wallet</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Value (USD)</TableCell>
              <TableCell>Staking</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell align="right">APY</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Alert severity="error">{error}</Alert>
                </TableCell>
              </TableRow>
            ) : filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No positions found
                </TableCell>
              </TableRow>
            ) : (
              filteredRows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.token.name}</TableCell>
                  <TableCell>{row.wallet.name}</TableCell>
                  <TableCell align="right">{row.amount.toFixed(6)}</TableCell>
                  <TableCell align="right">${row.value.toFixed(2)}</TableCell>
                  <TableCell>{row.isStaking ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{row.stakingPlatform?.name || '-'}</TableCell>
                  <TableCell align="right">
                    {row.stakingPlatform ? `${row.stakingPlatform.apy}%` : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeletePosition(row._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PositionPage;