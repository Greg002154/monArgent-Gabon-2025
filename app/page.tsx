
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);

  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Données simulées pour calculer les conseils d'épargne
  const monthlyIncome = 85000; // Revenus mensuels
  const monthlyExpenses = 45000; // Dépenses mensuelles actuelles
  const budgetData = {
    food: { budget: 50000, spent: 28000 },
    transport: { budget: 20000, spent: 12000 },
    shopping: { budget: 15000, spent: 5000 }
  };

  // Calcul des conseils d'épargne intelligents
  const availableForSavings = monthlyIncome - monthlyExpenses; // 40 000 FCFA disponible
  const totalBudgetUnused = Object.values(budgetData).reduce((sum, item) => sum + (item.budget - item.spent), 0); // 32 000 FCFA non utilisé

  // Conseil 1: Épargne conservatrice (20% du disponible)
  const conservativeSaving = Math.round(availableForSavings * 0.2);

  // Conseil 2: Épargne optimisée (30% du disponible + 50% du budget non utilisé)
  const optimizedSaving = Math.round((availableForSavings * 0.3) + (totalBudgetUnused * 0.5));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <i className="ri-coins-line text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-green-800" style={{ fontFamily: "Pacifico, serif" }}>
              MonArgent Gabon
            </h1>
          </div>
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center !rounded-button">
            <i className="ri-notification-line text-gray-600"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-20 px-4">
        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-4 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-2 right-2 w-8 h-4 bg-white rounded-md p-0.5 flex items-center justify-center">
            <img
              src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
              alt="Bamboo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-vip-crown-line text-white"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">Découvrez Premium</h3>
              <p className="text-xs text-green-100">Épargne Bamboo + fonctionnalités avancées</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div>
              <p className="text-xs text-green-100">À partir de</p>
              <p className="text-lg font-bold">1 000 FCFA/mois</p>
            </div>
            <Link href="/premium" className="px-4 py-2 bg-white text-green-600 rounded-lg text-sm font-medium !rounded-button">
              Découvrir
            </Link>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bonjour, Kevine ! 👋</h2>
          <p className="text-gray-600">Gérez vos finances intelligemment</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Solde disponible</p>
              <h3 className="text-3xl font-bold">
                {showBalance ? '125 000 FCFA' : '••• •••'}
              </h3>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center !rounded-button"
            >
              <i className={`${showBalance ? 'ri-eye-line' : 'ri-eye-off-line'} text-white`}></i>
            </button>
          </div>
          <div className="flex justify-between text-sm text-green-100">
            <span>Revenus: +85 000 FCFA</span>
            <span>Dépenses: -45 000 FCFA</span>
          </div>
        </div>

        {/* Conseils d'épargne intelligents */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="ri-lightbulb-line text-blue-600 text-sm"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Conseils d'épargne personnalisés</h3>
          </div>

          <div className="space-y-4">
            {/* Conseil 1: Épargne conservatrice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800">Épargne Sécurisée</h4>
                    <p className="text-sm text-blue-600">Approche prudente recommandée</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-700">{formatNumber(conservativeSaving)}</p>
                  <p className="text-xs text-blue-600">FCFA/mois</p>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-3 mb-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-blue-700">Disponible:</span>
                    <span className="font-medium text-blue-800 ml-1">{formatNumber(availableForSavings)} FCFA</span>
                  </div>
                  <div>
                    <span className="text-blue-700">% Épargné:</span>
                    <span className="font-medium text-blue-800 ml-1">20%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ri-time-line text-blue-600 text-sm"></i>
                  <span className="text-sm text-blue-700">En 6 mois: {formatNumber(conservativeSaving * 6)} FCFA</span>
                </div>
                <Link href="/savings" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium !rounded-button hover:bg-blue-700 transition-colors">
                  Commencer
                </Link>
              </div>
            </div>

            {/* Conseil 2: Épargne optimisée */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-rocket-line text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800">Épargne Optimisée</h4>
                    <p className="text-sm text-green-600">Maximisez votre potentiel</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-700">{formatNumber(optimizedSaving)}</p>
                  <p className="text-xs text-green-600">FCFA/mois</p>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-3 mb-3">
                <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                  <div>
                    <span className="text-green-700">Surplus budget:</span>
                    <span className="font-medium text-green-800 ml-1">{formatNumber(totalBudgetUnused)} FCFA</span>
                  </div>
                  <div>
                    <span className="text-green-700">Économies possibles:</span>
                    <span className="font-medium text-green-800 ml-1">{formatNumber(Math.round(totalBudgetUnused * 0.5))} FCFA</span>
                  </div>
                </div>
                <div className="text-xs text-green-600">
                  Réduisez vos dépenses non essentielles pour épargner plus
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                    alt="Bamboo"
                    className="w-4 h-2 object-contain"
                  />
                  <span className="text-sm text-green-700">Avec Bamboo: +{formatNumber(Math.round(optimizedSaving * 0.032))} FCFA d'intérêts/an</span>
                </div>
                <Link href="/savings" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium !rounded-button hover:bg-green-700 transition-colors">
                  Optimiser
                </Link>
              </div>
            </div>
          </div>

          {/* Analyse financière */}
          <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-pie-chart-line text-gray-600"></i>
              <h4 className="font-semibold text-gray-800">Analyse de vos finances</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-arrow-up-circle-line text-green-600"></i>
                  <span className="text-green-700 font-medium">Points forts</span>
                </div>
                <p className="text-green-600 text-xs">
                  Vous avez {Math.round((availableForSavings / monthlyIncome) * 100)}% de marge d'épargne
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-lightbulb-line text-orange-600"></i>
                  <span className="text-orange-700 font-medium">Amélioration</span>
                </div>
                <p className="text-orange-600 text-xs">
                  {Math.round((totalBudgetUnused / Object.values(budgetData).reduce((sum, item) => sum + item.budget, 0)) * 100)}% de budget non utilisé
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/expenses" className="!rounded-button">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                <i className="ri-subtract-line text-red-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Ajouter Dépense</h4>
              <p className="text-xs text-gray-500">Enregistrer rapidement</p>
            </div>
          </Link>

          <Link href="/budget" className="!rounded-button">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <i className="ri-pie-chart-line text-blue-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Budget</h4>
              <p className="text-xs text-gray-500">Gérer vos budgets</p>
            </div>
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Catégories populaires</h3>
          <div className="grid grid-cols-3 gap-4">
            <Link href="/expenses" className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-2 overflow-hidden rounded-full">
                <img
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20food%2C%20vibrant%20african%20dishes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=food-category&orientation=squarish"
                  alt="Alimentation"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-gray-700">Alimentation</p>
            </Link>

            <Link href="/expenses" className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-2 overflow-hidden rounded-full">
                <img
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20transport%2C%20african%20taxi%20cab%20car%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=transport-category&orientation=squarish"
                  alt="Transport"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-gray-700">Transport</p>
            </Link>

            <Link href="/expenses" className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-2 overflow-hidden rounded-full">
                <img
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20shopping%2C%20colorful%20shopping%20bags%20and%20gifts%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=shopping-category&orientation=squarish"
                  alt="Shopping"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-gray-700">Shopping</p>
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Transactions récentes</h3>
            <Link href="/expenses" className="text-green-600 text-sm font-medium">
              Voir tout
            </Link>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <i className="ri-restaurant-line text-red-600"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Restaurant Le Palmier</p>
                    <p className="text-sm text-gray-500">Aujourd'hui • 12:30</p>
                  </div>
                </div>
                <p className="font-semibold text-red-600">-15 000 FCFA</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <i className="ri-bus-line text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Transport Taxi</p>
                    <p className="text-sm text-gray-500">Hier • 08:15</p>
                  </div>
                </div>
                <p className="font-semibold text-red-600">-2 500 FCFA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
        <div className="grid grid-cols-5 gap-0">
          <Link href="/" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-home-line text-green-600 text-lg"></i>
            </div>
            <span className="text-xs text-green-600 font-medium">Accueil</span>
          </Link>

          <Link href="/expenses" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-subtract-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Dépenses</span>
          </Link>

          <Link href="/budget" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-pie-chart-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Budget</span>
          </Link>

          <Link href="/savings" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-piggy-bank-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Épargne</span>
          </Link>

          <Link href="/education" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-book-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Formation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
