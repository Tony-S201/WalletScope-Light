export enum WalletType {
  EOA = 'EOA',            // Externally Owned Account
  CONTRACT = 'CONTRACT',   // Smart Contract
  MULTISIG = 'MULTISIG'   // Multi-signature wallet
}

export enum NetworkType {
  ETHEREUM = 'ETHEREUM',
  BSC = 'BSC',
  POLYGON = 'POLYGON',
  ARBITRUM = 'ARBITRUM',
  OPTIMISM = 'OPTIMISM'
}

export enum TokenType {
  NATIVE = 'NATIVE',  // ETH, BNB, etc.
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',  // NFTs
  WRAPPED = 'WRAPPED' // WETH, WBNB, etc.
}

export interface Token {
  id: string;               // Identifiant unique du token
  contractAddress: string;          // Adresse du contrat du token
  name: string;            // Nom complet du token
  symbol: string;          // Symbole du token (ex: ETH, BTC)
  //decimals: number;        // Nombre de décimales du token
  network: NetworkType;    // Réseau sur lequel se trouve le token
  //type: TokenType;         // Type de token
  //logoUrl?: string;        // URL du logo du token
  //websiteUrl?: string;     // Site web officiel
  //isVerified: boolean;     // Token vérifié ou non
  
  // Informations de prix
  //currentPrice: number;     // Prix actuel en USD
  //priceChange24h: number;  // Variation de prix sur 24h en pourcentage
  //priceChangePercentage24h: number;
  //marketCap?: number;      // Capitalisation boursière
  //volume24h?: number;      // Volume sur 24h
  
  // Données supplémentaires optionnelles
  coingeckoId?: string;    // ID CoinGecko pour les API externes
  manualPrice?: number;
  amount?: number;
  //cmcId?: string;          // ID CoinMarketCap
}

export interface TokenPrice {
  tokenId: string;
  price: number;
  timestamp: Date;
}

export interface TokenBalance {
  token: Token;
  amount: string;          // Montant en format string pour éviter les erreurs de précision
  valueUSD: number;        // Valeur en USD
  lastUpdated: Date;       // Dernière mise à jour de la balance
}

export interface Wallet {
  id: string;             // Identifiant unique du wallet
  address: string;        // Adresse du wallet
  name: string;         // Nom personnalisé (optionnel)
  
  // Balances
  //balances: TokenBalance[];  // Liste des tokens détenus
  //totalValueUSD: number;     // Valeur totale en USD
  
  // Statistiques
  //lastActivity?: Date;       // Dernière activité détectée
  //transactionCount?: number; // Nombre total de transactions
  //createdAt: Date;          // Date de création du wallet dans notre système
  //updatedAt: Date;          // Dernière mise à jour des données
  
  // Flags
  //isWatched: boolean;       // Wallet surveillé par l'utilisateur
  //isFavorite: boolean;      // Wallet marqué comme favori
}

export interface Transaction {
  hash: string;           // Hash de la transaction
  from: string;          // Adresse expéditeur
  to: string;            // Adresse destinataire
  blockNumber: number;   // Numéro du bloc
  timestamp: Date;       // Date de la transaction
  network: NetworkType;  // Réseau de la transaction
  
  // Détails de la transaction
  type: 'TRANSFER' | 'SWAP' | 'APPROVAL' | 'CONTRACT_INTERACTION';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  value: string;         // Valeur de la transaction (en wei/gwei)
  gasUsed?: number;      // Gas utilisé
  gasPrice?: string;     // Prix du gas
  
  // Tokens impliqués
  tokenIn?: TokenTransfer;  // Token envoyé
  tokenOut?: TokenTransfer; // Token reçu
}

export interface TokenTransfer {
  token: Token;
  amount: string;
  valueUSD?: number;
}