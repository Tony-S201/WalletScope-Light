import QRCode from 'react-qr-code';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';

const WalletDetail: React.FunctionComponent = (): JSX.Element => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div className="space-y-6">
    {/* Wallet Info */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* QR Code */}
        <div className="flex justify-center items-center bg-white p-4 rounded-lg">
          {typeof address === 'string' && (
            <div className="p-4 bg-white rounded-lg">
              <QRCode value={address} size={128} />
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
              Adress: {address}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              $12,345.67
            </p>
            <p className="text-green-500">+1.2% (24h)</p>
          </div>
        </div>
      </div>
    </div>

    {/* Wallet Tokens */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium p-4 border-b dark:border-gray-700">
        Tokens
      </h3>
      <DataGrid
        rows={[
          { id: 1, token: 'Bitcoin', amount: '0.5', value: '22500' },
        ]}
        columns={[
          { field: 'token', headerName: 'Token', flex: 1 },
          { field: 'amount', headerName: 'Quantité', width: 150 },
          { field: 'value', headerName: 'Valeur USD', width: 150 },
        ]}
        autoHeight
      />
    </div>

    {/* Tx History */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium p-4 border-b dark:border-gray-700">
        Last Tx
      </h3>
      <DataGrid
        rows={[
          { id: 1, type: 'Transfer', amount: '0.1 ETH', date: '2024-01-01' },
        ]}
        columns={[
          { field: 'type', headerName: 'Type', width: 150 },
          { field: 'amount', headerName: 'Montant', flex: 1 },
          { field: 'date', headerName: 'Date', width: 200 },
        ]}
        autoHeight
      />
    </div>
  </div>
  )
}

export default WalletDetail;