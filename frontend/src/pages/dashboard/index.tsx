import { PieChart, LineChart } from '@mui/x-charts';

const DashboardPage: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="space-y-6">
      {/* Total value */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">Portfolio Total</h2>
        <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">$25,420.65</p>
        <span className="text-green-500 text-sm">+2.5% (24h)</span>
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token repartition */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Répartition par Token
          </h3>
          <PieChart
            series={[{
              data: [
                { id: 0, value: 45, label: 'BTC' },
                { id: 1, value: 35, label: 'ETH' },
                { id: 2, value: 20, label: 'Other' },
              ],
            }]}
            width={400}
            height={200}
          />
        </div>

        {/* Evolution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Évolution de la Valeur
          </h3>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>

      {/* Wallet and staking repartition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Répartition par Wallet
          </h3>
          <div className="space-y-4">
            {/* Wallet list */}
            {/* Can add bar chart */}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Positions Staking
          </h3>
          <PieChart
            series={[{
              data: [
                { id: 0, value: 70, label: 'Non-staking' },
                { id: 1, value: 30, label: 'Staking' },
              ],
            }]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;