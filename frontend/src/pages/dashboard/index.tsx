import { PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useAuthApi } from '../../hooks/useAuthApi';
import { type Position } from '../../types';
import { useAccount } from 'wagmi';

const DashboardPage: React.FunctionComponent = (): JSX.Element => {
  const { data: positions, loading: isLoading, error, fetchData: fecthPositionsData } = useAuthApi<Position[]>();
  const [totalValue, setTotalValue] = useState<number>(0);
  const [tokenDistribution, setTokenDistribution] = useState<Array<{ id: number, value: number, label: string }>>([]);
  const [stakingDistribution, setStakingDistribution] = useState<Array<{ id: number, value: number, label: string }>>([]);
  const [walletDistribution, setWalletDistribution] = useState<Array<{ wallet: string, value: number }>>([]);
  const { isConnected } = useAccount();

  useEffect(() => {
    fecthPositionsData('/positions');
  }, [isConnected, fecthPositionsData]);

  useEffect(() => {
    if (positions) {
      // Calculate total value
      const total = positions.reduce((sum, pos) => sum + pos.amount, 0);
      setTotalValue(total);

      // Calculate token distribution
      const tokenGroups = positions.reduce((acc, pos) => {
        const tokenName = pos.token.symbol;
        acc[tokenName] = (acc[tokenName] || 0) + pos.amount;
        return acc;
      }, {} as Record<string, number>);

      const tokenData = Object.entries(tokenGroups).map(([label, value], id) => ({
        id,
        label,
        value: (value / total) * 100
      }));
      setTokenDistribution(tokenData);

      // Calculate staking distribution
      const stakingAmount = positions
        .filter(pos => pos.isStaking)
        .reduce((sum, pos) => sum + pos.amount, 0);
      
      setStakingDistribution([
        { id: 0, value: ((total - stakingAmount) / total) * 100, label: 'Non-staking' },
        { id: 1, value: (stakingAmount / total) * 100, label: 'Staking' }
      ]);

      // Calculate wallet distribution
      const walletGroups = positions.reduce((acc, pos) => {
        const walletName = pos.wallet.name;
        acc[walletName] = (acc[walletName] || 0) + pos.amount;
        return acc;
      }, {} as Record<string, number>);

      setWalletDistribution(
        Object.entries(walletGroups).map(([wallet, value]) => ({
          wallet,
          value
        }))
      );
    }
  }, [positions]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="space-y-6">
      {/* Total value */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">Portfolio Total</h2>
        <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token repartition */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Token repartition
          </h3>
          {tokenDistribution.length > 0 && (
            <PieChart
              series={[{ data: tokenDistribution }]}
              width={400}
              height={200}
            />
          )}
        </div>

        {/* Evolution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Evolution
          </h3>
          <p className="text-gray-500">Historical data not yet implemented</p>
        </div>
      </div>

      {/* Wallet and staking repartition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Wallet Repartition
          </h3>
          <div className="space-y-4">
            {walletDistribution.map((wallet, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{wallet.wallet}</span>
                <span className="font-medium">
                  ${wallet.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Staking positions
          </h3>
          {stakingDistribution.length > 0 && (
            <PieChart
              series={[{ data: stakingDistribution }]}
              width={400}
              height={200}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;