import { DataGrid } from '@mui/x-data-grid';

const TokenPage: React.FunctionComponent = (): JSX.Element => {
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