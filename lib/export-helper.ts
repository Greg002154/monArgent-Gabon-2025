import { APP_CONFIG } from './config';

export interface ExportOptions {
  platform: 'web' | 'mobile' | 'desktop';
  format: 'json' | 'zip' | 'tar';
  includeAssets: boolean;
  minify: boolean;
}

export class ProjectExporter {
  static generateManifest() {
    return {
      name: APP_CONFIG.name,
      version: APP_CONFIG.version,
      description: APP_CONFIG.description,
      author: 'MonArgent Gabon Team',
      license: 'MIT',
      
      // Structure du projet
      structure: {
        type: 'Next.js',
        framework: 'React 19',
        styling: 'Tailwind CSS',
        icons: 'Remix Icons',
        charts: 'Recharts'
      },
      
      // Pages principales
      pages: [
        { route: '/', component: 'app/page.tsx', title: 'Accueil' },
        { route: '/expenses', component: 'app/expenses/page.tsx', title: 'Dépenses' },
        { route: '/budget', component: 'app/budget/page.tsx', title: 'Budget' },
        { route: '/savings', component: 'app/savings/page.tsx', title: 'Épargne' },
        { route: '/education', component: 'app/education/page.tsx', title: 'Formation' },
        { route: '/premium', component: 'app/premium/page.tsx', title: 'Premium' }
      ],
      
      // Dépendances principales
      dependencies: {
        production: [
          'next@15.3.2',
          'react@19.0.0',
          'react-dom@19.0.0',
          'recharts@3.0.2',
          '@react-google-maps/api@2.19.3'
        ],
        development: [
          'typescript@5',
          'tailwindcss@3.4.17',
          '@types/react@19',
          '@types/node@20'
        ]
      },
      
      // Configuration de déploiement
      deployment: {
        vercel: {
          platform: 'Vercel',
          buildCommand: 'npm run build',
          outputDirectory: '.next',
          nodeVersion: '18+',
          framework: 'nextjs'
        },
        netlify: {
          platform: 'Netlify',
          buildCommand: 'npm run build',
          outputDirectory: '.next',
          nodeVersion: '18+'
        },
        railway: {
          platform: 'Railway', 
          buildCommand: 'npm run build',
          startCommand: 'npm start',
          nodeVersion: '18+'
        }
      },
      
      generatedAt: new Date().toISOString(),
      exportUrl: `${APP_CONFIG.baseUrl}/export`
    };
  }
  
  static generateDeploymentGuide() {
    return {
      platforms: {
        vercel: {
          name: 'Vercel (Recommandé)',
          difficulty: 'Facile',
          steps: [
            '1. Connectez votre repository GitHub à Vercel',
            '2. Vercel détecte automatiquement Next.js',
            '3. Configurez les variables d\'environnement si nécessaire',
            '4. Déployez automatiquement'
          ],
          envVars: [
            'NEXT_PUBLIC_APP_URL=https://votre-domaine.vercel.app',
            'NODE_ENV=production'
          ],
          url: 'https://vercel.com'
        },
        
        netlify: {
          name: 'Netlify',
          difficulty: 'Moyen',
          steps: [
            '1. Connectez votre repository GitHub à Netlify',
            '2. Build command: npm run build',
            '3. Publish directory: .next',
            '4. Ajoutez les variables d\'environnement'
          ],
          envVars: [
            'NEXT_PUBLIC_APP_URL=https://votre-domaine.netlify.app',
            'NODE_ENV=production'
          ],
          url: 'https://netlify.com'
        },
        
        railway: {
          name: 'Railway',
          difficulty: 'Facile',
          steps: [
            '1. Connectez votre repository GitHub à Railway',
            '2. Railway détecte automatiquement Next.js',
            '3. Configurez les variables d\'environnement',
            '4. Déployez automatiquement'
          ],
          envVars: [
            'NEXT_PUBLIC_APP_URL=https://votre-domaine.railway.app',
            'NODE_ENV=production'
          ],
          url: 'https://railway.app'
        },
        
        render: {
          name: 'Render',
          difficulty: 'Moyen',
          steps: [
            '1. Connectez votre repository GitHub à Render',
            '2. Choisissez "Web Service"',
            '3. Build Command: npm run build',
            '4. Start Command: npm start',
            '5. Configurez les variables d\'environnement'
          ],
          envVars: [
            'NEXT_PUBLIC_APP_URL=https://votre-domaine.onrender.com',
            'NODE_ENV=production'
          ],
          url: 'https://render.com'
        }
      },
      
      troubleshooting: {
        commonIssues: [
          {
            problem: 'Build failed - Module not found',
            solution: 'Vérifiez les imports TypeScript (sensible à la casse)'
          },
          {
            problem: 'Hydration mismatch errors',
            solution: 'Utilisez suppressHydrationWarning pour les éléments dynamiques'
          },
          {
            problem: 'Images not loading',
            solution: 'Configurez les domaines d\'images dans next.config.js'
          },
          {
            problem: 'API routes not working',
            solution: 'Vérifiez la structure des fichiers API dans app/api/'
          }
        ]
      }
    };
  }
  
  // Génère un fichier de configuration pour Capacitor
  static generateCapacitorConfig() {
    return {
      "appId": "com.monargent.gabon",
      "appName": "MonArgent Gabon",
      "webDir": "out",
      "server": {
        "androidScheme": "https"
      },
      "plugins": {
        "PushNotifications": {
          "presentationOptions": ["badge", "sound", "alert"]
        },
        "LocalNotifications": {
          "smallIcon": "ic_stat_icon_config_sample",
          "iconColor": "#10B981"
        }
      }
    };
  }
  
  // Génère les métadonnées pour le Play Store
  static generatePlayStoreMetadata() {
    return {
      title: "MonArgent Gabon - Gestion Financière",
      shortDescription: "Application de gestion financière personnelle adaptée au Gabon",
      fullDescription: `MonArgent Gabon vous aide à mieux gérer vos finances personnelles avec des outils spécialement adaptés au contexte gabonais.

✨ Fonctionnalités principales :
• Suivi intelligent des dépenses en temps réel
• Gestion de budget personnalisée
• Conseils d'épargne adaptés à votre situation
• Intégration Mobile Money (Moov Money, Airtel Money)
• Épargne sécurisée avec Bamboo Bank
• Formation financière intégrée et éthique
• Interface en français adaptée au Gabon

🎯 Parfait pour :
• Gérer son budget mensuel efficacement
• Épargner pour ses projets futurs
• Comprendre les finances personnelles
• Optimiser ses dépenses quotidiennes
• Atteindre ses objectifs financiers

🔒 Sécurisé et confidentiel :
• Données stockées localement
• Aucune transmission de données personnelles
• Respect total de votre vie privée

Développé par et pour les Gabonais, MonArgent Gabon est l'application indispensable pour une gestion financière moderne et éthique.`,
      
      keywords: [
        "gabon", "finance", "épargne", "budget", "mobile money", 
        "moov money", "airtel money", "bamboo bank", "gestion financière",
        "francophone", "afrique", "cfa", "franc cfa"
      ],
      
      category: "Finance",
      contentRating: "Everyone",
      
      screenshots: [
        "Accueil avec conseils d'épargne personnalisés",
        "Suivi détaillé des dépenses par catégorie", 
        "Gestion de budget visuelle et intuitive",
        "Interface d'épargne Bamboo Bank intégrée",
        "Formation financière éthique et pratique"
      ],
      
      icon: "Logo MonArgent Gabon avec symbole FCFA",
      featureGraphic: "Interface moderne de gestion financière"
    };
  }
}

// Utilitaires d'URL
export const urlHelper = {
  // Génère une URL absolue
  absolute: (path: string): string => {
    return `${APP_CONFIG.baseUrl}${path.startsWith('/') ? path : '/' + path}`;
  },
  
  // Génère une URL d'API
  api: (endpoint: string): string => {
    return `${APP_CONFIG.api.baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  },
  
  // Vérifie si une URL est externe
  isExternal: (url: string): boolean => {
    return url.startsWith('http') && !url.startsWith(APP_CONFIG.baseUrl);
  },
  
  // Génère une URL de partage WhatsApp
  shareWhatsApp: (page: string, title?: string): string => {
    const url = urlHelper.absolute(page);
    const text = title || `${APP_CONFIG.name} - Application de gestion financière`;
    return `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`;
  },
  
  // Génère une URL de partage générique
  share: (page: string, title?: string): string => {
    const url = urlHelper.absolute(page);
    const text = title || APP_CONFIG.name;
    return `${text}: ${url}`;
  }
};