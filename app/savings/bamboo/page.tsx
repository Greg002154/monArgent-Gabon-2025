
'use client';

import { useState } from 'react';
import Link from 'next/link';
import BambooNotifications from '../BambooNotifications';

export default function BambooPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const bambooAccounts = [
    {
      id: 1,
      goalName: 'Nouveau téléphone',
      balance: 75000,
      target: 150000,
      lockPeriod: '6 mois',
      interestRate: 2.5,
      createdDate: '2024-01-15',
      maturityDate: '2024-07-15',
      status: 'active',
      monthlyInterest: 1562,
      totalInterest: 4687
    },
    {
      id: 2,
      goalName: 'Voyage à Paris',
      balance: 120000,
      target: 500000,
      lockPeriod: '12 mois',
      interestRate: 3.2,
      createdDate: '2024-01-01',
      maturityDate: '2024-12-31',
      status: 'active',
      monthlyInterest: 3200,
      totalInterest: 3200
    },
    {
      id: 3,
      goalName: 'Voiture',
      balance: 250000,
      target: 250000,
      lockPeriod: '3 mois',
      interestRate: 1.8,
      createdDate: '2023-10-01',
      maturityDate: '2024-01-01',
      status: 'matured',
      monthlyInterest: 0,
      totalInterest: 11250
    }
  ];

  const totalBalance = bambooAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalInterest = bambooAccounts.reduce((sum, account) => sum + account.totalInterest, 0);
  const activeAccounts = bambooAccounts.filter(account => account.status === 'active');
  const maturedAccounts = bambooAccounts.filter(account => account.status === 'matured');

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 25000,
      date: '2024-01-15',
      time: '14:30',
      source: 'Moov Money',
      account: 'Nouveau téléphone',
      status: 'completed'
    },
    {
      id: 2,
      type: 'interest',
      amount: 1562,
      date: '2024-01-01',
      time: '09:00',
      source: 'Intérêts mensuels',
      account: 'Nouveau téléphone',
      status: 'completed'
    },
    {
      id: 3,
      type: 'deposit',
      amount: 50000,
      date: '2024-01-10',
      time: '16:20',
      source: 'Airtel Money',
      account: 'Voyage à Paris',
      status: 'completed'
    },
    {
      id: 4,
      type: 'withdrawal',
      amount: 250000,
      date: '2024-01-02',
      time: '10:15',
      source: 'Échéance',
      account: 'Voiture',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'matured': return 'blue';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'matured': return 'Échu';
      case 'pending': return 'En attente';
      default: return 'Inconnu';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return { icon: 'ri-arrow-down-line', color: 'green' };
      case 'withdrawal': return { icon: 'ri-arrow-up-line', color: 'red' };
      case 'interest': return { icon: 'ri-coins-line', color: 'yellow' };
      default: return { icon: 'ri-exchange-line', color: 'gray' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/savings" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-arrow-left-line text-gray-600"></i>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-white border border-gray-200 rounded-lg p-1 flex items-center justify-center">
                <img 
                  src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
                  alt="Bamboo Bank" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Banque Bamboo</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center relative">
              <i className="ri-notification-line text-gray-600"></i>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </div>
            </button>
            <button 
              onClick={() => setShowTransferModal(true)}
              className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center !rounded-button"
            >
              <i className="ri-add-line text-white"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-20 px-4">
        {/* Balance Overview */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
          {/* Logo Bamboo */}
          <div className="absolute top-4 right-4 w-16 h-8 bg-white rounded-lg p-1 flex items-center justify-center">
            <img 
              src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
              alt="Bamboo Bank" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Solde total Bamboo</p>
              <h3 className="text-3xl font-bold" suppressHydrationWarning={true}>{totalBalance.toLocaleString()} FCFA</h3>
              <p className="text-xs text-green-100 mt-1">Établissement de Microfinance</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-bank-line text-white"></i>
            </div>
          </div>
          <div className="flex justify-between text-sm text-green-100">
            <span>Intérêts gagnés: +{totalInterest.toLocaleString()} FCFA</span>
            <span>{activeAccounts.length} comptes actifs</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-600 text-sm"></i>
              </div>
              <p className="text-xs text-gray-600">Actifs</p>
            </div>
            <p className="text-xl font-bold text-green-600">{activeAccounts.length}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-blue-600 text-sm"></i>
              </div>
              <p className="text-xs text-gray-600">Échus</p>
            </div>
            <p className="text-xl font-bold text-blue-600">{maturedAccounts.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                <img 
                  src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
                  alt="Bamboo" 
                  className="w-4 h-2 object-contain"
                />
              </div>
              <p className="text-xs text-gray-600">Mensuel</p>
            </div>
            <p className="text-xl font-bold text-green-600">
              +{activeAccounts.reduce((sum, acc) => sum + acc.monthlyInterest, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-2 mb-6 shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all !rounded-button ${
              activeTab === 'overview' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all !rounded-button ${
              activeTab === 'transactions' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all !rounded-button ${
              activeTab === 'notifications' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Notifications
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Mes comptes Bamboo</h3>
            {bambooAccounts.map((account) => (
              <div key={account.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-green-50 border border-green-100 rounded-lg p-1 flex items-center justify-center">
                      <img 
                        src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
                        alt="Bamboo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{account.goalName}</h4>
                      <p className="text-sm text-gray-500">{account.lockPeriod} • {account.interestRate}% / an</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">{account.balance.toLocaleString()} FCFA</p>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${getStatusColor(account.status)}-100 text-${getStatusColor(account.status)}-700`}>
                      {getStatusText(account.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Échéance</p>
                    <p className="text-sm font-medium text-gray-800">{account.maturityDate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Intérêts gagnés</p>
                    <p className="text-sm font-medium text-green-600">+{account.totalInterest.toLocaleString()} FCFA</p>
                  </div>
                </div>

                {account.status === 'active' && (
                  <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-lock-line text-green-600 text-sm"></i>
                      <span className="text-sm font-medium text-green-800">Fonds bloqués</span>
                    </div>
                    <p className="text-xs text-green-700">
                      Prochains intérêts: +{account.monthlyInterest.toLocaleString()} FCFA le 1er du mois
                    </p>
                  </div>
                )}

                {account.status === 'matured' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowWithdrawModal(true)}
                      className="flex-1 py-2 bg-green-600 text-white rounded-xl font-medium !rounded-button"
                    >
                      Retirer
                    </button>
                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium !rounded-button">
                      Renouveler
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Historique des transactions</h3>
            <div className="space-y-3">
              {transactions.map((transaction) => {
                const { icon, color } = getTransactionIcon(transaction.type);
                return (
                  <div key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${color}-50 rounded-full flex items-center justify-center`}>
                          <i className={`${icon} text-${color}-600`}></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{transaction.source}</p>
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
                              alt="Bamboo" 
                              className="w-3 h-1.5 object-contain"
                            />
                            <p className="text-sm text-gray-500">{transaction.account}</p>
                          </div>
                          <p className="text-xs text-gray-400">{transaction.date} • {transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'deposit' || transaction.type === 'interest' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'deposit' || transaction.type === 'interest' ? '+' : '-'}
                          {transaction.amount.toLocaleString()} FCFA
                        </p>
                        <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
                alt="Bamboo" 
                className="w-6 h-3 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-800">Notifications Bamboo</h3>
            </div>
            <BambooNotifications />
          </div>
        )}
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
                  alt="Bamboo" 
                  className="w-6 h-3 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-800">Nouveau transfert</h3>
              </div>
              <button
                onClick={() => setShowTransferModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-green-600 text-2xl"></i>
              </div>
              <p className="text-gray-600 mb-4">Sélectionnez un objectif d'épargne pour effectuer un transfert</p>
              <Link href="/savings" className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium !rounded-button">
                Aller aux objectifs
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif" 
                  alt="Bamboo" 
                  className="w-6 h-3 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-800">Retrait de fonds</h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bank-line text-green-600 text-2xl"></i>
              </div>
              <p className="text-gray-600 mb-4">Vos fonds seront transférés vers votre compte principal</p>
              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-medium !rounded-button">
                  Retirer vers compte principal
                </button>
                <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium !rounded-button">
                  Annuler
                </button>
              </div>
            </div>
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
              <i className="ri-piggy-bank-line text-green-600 text-lg"></i>
            </div>
            <span className="text-xs text-green-600 font-medium">Épargne</span>
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
