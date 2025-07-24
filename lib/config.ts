// Configuration centralisée pour l'application MonArgent Gabon
export const APP_CONFIG = {
  name: 'MonArgent Gabon',
  version: '1.0.0',
  description: 'Application de gestion financière personnelle pour le Gabon',
  
  // URLs configurées pour déploiement
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || (
    process.env.NODE_ENV === 'production' 
      ? 'https://monargent-gabon.vercel.app' 
      : 'http://localhost:3000'
  ),
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || (
      process.env.NODE_ENV === 'production' 
        ? 'https://monargent-gabon.vercel.app/api' 
        : 'http://localhost:3000/api'
    ),
  },
  
  // Configuration des services externes
  services: {
    bamboo: {
      apiUrl: 'https://api.bamboo-bank.ga/v1',
      enabled: true
    },
    mobileMoney: {
      moov: {
        apiUrl: 'https://api.moov.ga/v1',
        enabled: true
      },
      airtel: {
        apiUrl: 'https://api.airtel.ga/v1', 
        enabled: true
      }
    },
    maps: {
      enabled: true,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    }
  },
  
  // Configuration pour différents environnements
  environments: {
    development: {
      debug: true,
      analytics: false
    },
    production: {
      debug: false,
      analytics: true
    }
  },
  
  // Configuration de déploiement
  deployment: {
    platform: process.env.VERCEL ? 'vercel' : 'other',
    region: process.env.VERCEL_REGION || 'iad1',
    buildTime: new Date().toISOString()
  }
};

// Utilitaire pour les URLs
export const getUrl = (path: string = ''): string => {
  const baseUrl = APP_CONFIG.baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// Vérification de l'environnement
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isVercel = !!process.env.VERCEL;