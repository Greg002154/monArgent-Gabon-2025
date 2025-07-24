'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('free');

  const monthlyPrice = 1000;
  const annualPrice = Math.round(monthlyPrice * 12 * 0.85); // 15% réduction
  const savings = (monthlyPrice * 12) - annualPrice;

  const [paymentData, setPaymentData] = useState({
    mobileProvider: '',
    phoneNumber: '',
    amount: selectedPlan === 'monthly' ? monthlyPrice : annualPrice,
    pin: ''
  });

  const features = {
    free: [
      'Suivi des dépenses basique',
      'Budget simple',
      'Rapports mensuels',
      'Notifications standard'
    ],
    premium: [
      'Suivi avancé des dépenses',
      'Budgets illimités avec catégories personnalisées',
      'Rapports détaillés et analyses',
      'Notifications intelligentes',
      '🏦 Épargne Bamboo avec intérêts',
      '💰 Comptes bloqués sécurisés',
      '📊 Projections financières',
      '🎯 Objectifs d\'épargne avancés',
      '🔄 Transferts automatiques',
      '📱 Support client prioritaire'
    ]
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      paymentData.mobileProvider && 
      paymentData.phoneNumber && 
      paymentData.amount && 
      paymentData.pin
    ) {
      setCurrentPlan('premium');
      setShowPaymentModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const openPaymentModal = (plan: string) => {
    setSelectedPlan(plan);
    setPaymentData({
      ...paymentData,
      amount: plan === 'monthly' ? monthlyPrice : annualPrice
    });
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-arrow-left-line text-gray-600"></i>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">MonArgent Premium</h1>
          </div>
          {currentPlan === 'premium' && (
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <i className="ri-vip-crown-line text-green-600 text-sm"></i>
              <span className="text-xs font-medium text-green-800">Premium</span>
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 left-4 right-4 bg-green-600 text-white p-4 rounded-xl z-40 flex items-center gap-3">
          <i className="ri-check-line text-xl"></i>
          <span className="font-medium">Bienvenue dans MonArgent Premium !</span>
        </div>
      )}

      {/* Content */}
      <div className="pt-20 pb-20 px-4">
        {/* Current Plan Status */}
        {currentPlan === 'premium' ? (
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-vip-crown-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">Plan Premium Actif</h3>
                <p className="text-green-100 text-sm">Toutes les fonctionnalités débloquées</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-green-100 text-sm">Prochain renouvellement</p>
                  <p className="text-lg font-bold">15 Mars 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-green-100 text-sm">Montant</p>
                  <p className="text-lg font-bold">1 000 FCFA</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-gray-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Plan Gratuit</h3>
                <p className="text-gray-600 text-sm">Fonctionnalités limitées</p>
              </div>
            </div>
          </div>
        )}

        {/* Bamboo Bank Integration Highlight */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
          {/* Logo Bamboo */}
          <div className="absolute top-4 right-4 w-16 h-8 bg-white rounded-lg p-1 flex items-center justify-center">
            <img
              src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
              alt="Bamboo Bank"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-bank-line text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold">Partenariat Bamboo Bank</h3>
              <p className="text-green-100 text-sm">Exclusif Premium - Établissement de Microfinance</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
            <h4 className="font-semibold mb-2">Avantages épargne Bamboo :</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-percent-line text-green-200"></i>
                <span>Jusqu'à 4.1% d'intérêts</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-lock-line text-green-200"></i>
                <span>Comptes sécurisés</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-phone-line text-green-200"></i>
                <span>Transferts Mobile Money</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-green-200"></i>
                <span>Fonds garantis</span>
              </div>
            </div>
          </div>

          {currentPlan !== 'premium' && (
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-sm font-medium">⚠️ Fonctionnalité Premium Requise</p>
              <p className="text-xs text-green-100 mt-1">
                Passez au Premium pour accéder à l'épargne Bamboo
              </p>
            </div>
          )}
        </div>

        {/* Pricing Plans */}
        {currentPlan !== 'premium' && (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Choisissez votre plan</h3>

            {/* Monthly Plan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Plan Mensuel</h4>
                  <p className="text-gray-600 text-sm">Facturation mensuelle</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">1 000 FCFA</p>
                  <p className="text-sm text-gray-500">par mois</p>
                </div>
              </div>
              <button
                onClick={() => openPaymentModal('monthly')}
                className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors !rounded-button"
              >
                Choisir le plan mensuel
              </button>
            </div>

            {/* Annual Plan */}
            <div className="bg-white rounded-2xl p-6 border-2 border-green-500 shadow-sm relative">
              <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Économisez 15%
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Plan Annuel</h4>
                  <p className="text-gray-600 text-sm">Facturation annuelle</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Économie: {savings.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{annualPrice.toLocaleString()} FCFA</p>
                  <p className="text-sm text-gray-500">par an</p>
                  <p className="text-xs text-green-600">≈ {Math.round(annualPrice/12).toLocaleString()} FCFA/mois</p>
                </div>
              </div>
              <button
                onClick={() => openPaymentModal('annual')}
                className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors !rounded-button"
              >
                Choisir le plan annuel
              </button>
            </div>
          </div>
        )}

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparaison des fonctionnalités</h3>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Free Plan */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-gray-600 text-sm"></i>
                </div>
                <h4 className="font-semibold text-gray-800">Plan Gratuit</h4>
              </div>
              <div className="space-y-2">
                {features.free.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i className="ri-check-line text-gray-400 text-sm"></i>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Plan */}
            <div className="space-y-3 bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-vip-crown-line text-green-600 text-sm"></i>
                </div>
                <h4 className="font-semibold text-green-800">Plan Premium</h4>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                  Recommandé
                </span>
              </div>
              <div className="space-y-2">
                {features.premium.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bamboo Bank Benefits */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mt-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-6 bg-white rounded-lg p-1 flex items-center justify-center border border-green-200">
              <img
                src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                alt="Bamboo Bank"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-bold text-green-800">Pourquoi choisir Bamboo ?</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <i className="ri-percent-line text-green-600"></i>
                <h4 className="font-semibold text-green-800">Taux d'intérêt attractifs</h4>
              </div>
              <p className="text-sm text-green-700">
                De 1.8% à 4.1% selon la période de blocage, bien supérieurs aux banques traditionnelles
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <i className="ri-shield-check-line text-green-600"></i>
                <h4 className="font-semibold text-green-800">Sécurité garantie</h4>
              </div>
              <p className="text-sm text-green-700">
                Établissement de microfinance agréé, vos fonds sont protégés et sécurisés
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <i className="ri-phone-line text-green-600"></i>
                <h4 className="font-semibold text-green-800">Transferts faciles</h4>
              </div>
              <p className="text-sm text-green-700">
                Alimentez vos comptes directement depuis Moov Money ou Airtel Money
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions fréquentes</h3>
          
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Puis-je annuler mon abonnement Premium ?
              </h4>
              <p className="text-sm text-gray-600">
                Oui, vous pouvez annuler à tout moment. Vos comptes Bamboo existants restent actifs jusqu'à leur échéance.
              </p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Que se passe-t-il si je retourne au plan gratuit ?
              </h4>
              <p className="text-sm text-gray-600">
                Vous perdez l'accès aux nouvelles fonctionnalités Premium, mais vos comptes Bamboo existants continuent de fonctionner normalement.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Les comptes Bamboo sont-ils vraiment sécurisés ?
              </h4>
              <p className="text-sm text-gray-600">
                Bamboo Bank est un établissement de microfinance agréé au Gabon. Vos dépôts sont garantis selon la réglementation en vigueur.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Paiement {selectedPlan === 'monthly' ? 'Mensuel' : 'Annuel'}
              </h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-800">
                    Plan {selectedPlan === 'monthly' ? 'Mensuel' : 'Annuel'}
                  </p>
                  <p className="text-sm text-green-700">
                    Accès complet aux fonctionnalités Premium + Bamboo
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-800">
                    {(selectedPlan === 'monthly' ? monthlyPrice : annualPrice).toLocaleString()} FCFA
                  </p>
                  {selectedPlan === 'annual' && (
                    <p className="text-xs text-green-600">
                      Économie: {savings.toLocaleString()} FCFA
                    </p>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opérateur mobile
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, mobileProvider: 'moov' })}
                    className={`p-4 rounded-xl border-2 transition-all !rounded-button ${
                      paymentData.mobileProvider === 'moov' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-phone-line text-blue-600"></i>
                    </div>
                    <p className="text-sm font-medium">Moov Money</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentData({ ...paymentData, mobileProvider: 'airtel' })}
                    className={`p-4 rounded-xl border-2 transition-all !rounded-button ${
                      paymentData.mobileProvider === 'airtel' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-phone-line text-red-600"></i>
                    </div>
                    <p className="text-sm font-medium">Airtel Money</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={paymentData.phoneNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, phoneNumber: e.target.value })}
                  placeholder="07 XX XX XX XX"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à payer (FCFA)
                </label>
                <input
                  type="number"
                  value={paymentData.amount}
                  readOnly
                  className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-center text-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code PIN Mobile Money
                </label>
                <input
                  type="password"
                  value={paymentData.pin}
                  onChange={(e) => setPaymentData({ ...paymentData, pin: e.target.value })}
                  placeholder="••••"
                  maxLength="4"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-xl font-semibold"
                  required
                />
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-information-line text-green-600"></i>
                  <span className="text-sm font-medium text-green-800">Informations importantes</span>
                </div>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Activation immédiate après paiement</li>
                  <li>• Accès instantané aux fonctionnalités Premium</li>
                  <li>• Possibilité de créer des comptes Bamboo</li>
                  <li>• Renouvellement automatique</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={!paymentData.mobileProvider || !paymentData.phoneNumber || !paymentData.pin}
                className={`w-full py-4 font-semibold rounded-xl !rounded-button transition-all ${
                  paymentData.mobileProvider && paymentData.phoneNumber && paymentData.pin
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirmer le paiement {(selectedPlan === 'monthly' ? monthlyPrice : annualPrice).toLocaleString()} FCFA
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
        <div className="grid grid-cols-5 gap-0">
          <Link href="/" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-home-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Accueil</span>
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