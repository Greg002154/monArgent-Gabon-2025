
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

export default function ExpensesPage() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Restaurant Le Palmier',
      amount: 15000,
      category: 'food',
      icon: 'ri-restaurant-line',
      color: 'red',
      date: 'Aujourd\'hui',
      time: '12:30',
      location: 'Centre-ville'
    },
    {
      id: 2,
      description: 'Transport Taxi',
      amount: 2500,
      category: 'transport',
      icon: 'ri-bus-line',
      color: 'blue',
      date: 'Hier',
      time: '08:15',
      location: 'Akanda'
    },
    {
      id: 3,
      description: 'Courses au marché',
      amount: 8500,
      category: 'food',
      icon: 'ri-shopping-cart-line',
      color: 'red',
      date: 'Hier',
      time: '16:45',
      location: 'Marché du Mont-Bouët'
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddExpense = (newExpense: any) => {
    const categoryMap: { [key: string]: { icon: string; color: string } } = {
      food: { icon: 'ri-restaurant-line', color: 'red' },
      transport: { icon: 'ri-bus-line', color: 'blue' },
      shopping: { icon: 'ri-shopping-bag-line', color: 'purple' },
      health: { icon: 'ri-heart-line', color: 'green' },
      education: { icon: 'ri-book-line', color: 'indigo' },
      entertainment: { icon: 'ri-gamepad-line', color: 'pink' }
    };

    const expenseWithDetails = {
      ...newExpense,
      ...categoryMap[newExpense.category],
      date: 'Aujourd\'hui'
    };

    setExpenses(prev => [expenseWithDetails, ...prev]);
  };

  const totalThisMonth = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const todayExpenses = expenses.filter(expense => expense.date === 'Aujourd\'hui');
  const totalToday = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryStats = [
    {
      category: 'Alimentation',
      icon: 'ri-restaurant-line',
      color: 'red',
      amount: expenses.filter(e => e.category === 'food').reduce((sum, e) => sum + e.amount, 0),
      percentage: 62
    },
    {
      category: 'Transport', 
      icon: 'ri-bus-line',
      color: 'blue',
      amount: expenses.filter(e => e.category === 'transport').reduce((sum, e) => sum + e.amount, 0),
      percentage: 27
    },
    {
      category: 'Shopping',
      icon: 'ri-shopping-bag-line', 
      color: 'purple',
      amount: expenses.filter(e => e.category === 'shopping').reduce((sum, e) => sum + e.amount, 0),
      percentage: 11
    }
  ];

  const filteredExpenses = selectedCategory === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-arrow-left-line text-gray-600"></i>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Suivi des Dépenses</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`w-8 h-8 rounded-full flex items-center justify-center !rounded-button ${
                showFilters ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <i className="ri-filter-line"></i>
            </button>
            <button 
              onClick={() => setShowForm(true)}
              className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center !rounded-button"
            >
              <i className="ri-add-line text-white"></i>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all !rounded-button ${
                  selectedPeriod === 'week' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                Semaine
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all !rounded-button ${
                  selectedPeriod === 'month' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                Mois
              </button>
              <button
                onClick={() => setSelectedPeriod('year')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all !rounded-button ${
                  selectedPeriod === 'year' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                Année
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all !rounded-button ${
                  selectedCategory === 'all' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setSelectedCategory('food')}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all !rounded-button ${
                  selectedCategory === 'food' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                Alimentation
              </button>
              <button
                onClick={() => setSelectedCategory('transport')}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all !rounded-button ${
                  selectedCategory === 'transport' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                Transport
              </button>
              <button
                onClick={() => setSelectedCategory('health')}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all !rounded-button ${
                  selectedCategory === 'health' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                Santé
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${showFilters ? 'pt-32' : 'pt-20'} pb-20 px-4`}>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                <i className="ri-subtract-line text-red-600"></i>
              </div>
              <p className="text-sm text-gray-600">Ce mois</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{totalThisMonth.toLocaleString()} FCFA</p>
            <p className="text-xs text-gray-500 mt-1">{expenses.length} transactions</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                <i className="ri-calendar-line text-orange-600"></i>
              </div>
              <p className="text-sm text-gray-600">Aujourd'hui</p>
            </div>
            <p className="text-2xl font-bold text-orange-600">{totalToday.toLocaleString()} FCFA</p>
            <p className="text-xs text-gray-500 mt-1">{todayExpenses.length} transactions</p>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Dépenses par catégorie</h3>
            <button className="text-sm text-red-600 font-medium">
              Voir détails
            </button>
          </div>
          <div className="space-y-3">
            {categoryStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 bg-${stat.color}-50 rounded-full flex items-center justify-center`}>
                    <i className={`${stat.icon} text-${stat.color}-600 text-sm`}></i>
                  </div>
                  <span className="text-gray-700">{stat.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{stat.amount.toLocaleString()} FCFA</p>
                  <p className="text-xs text-gray-500">{stat.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Alert */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-4 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-alert-line text-white"></i>
            </div>
            <h3 className="font-semibold">Alerte budget</h3>
          </div>
          <p className="text-sm text-orange-100 mb-3">
            Vous avez dépensé 78% de votre budget alimentation ce mois-ci.
          </p>
          <Link href="/budget" className="inline-flex items-center gap-2 text-sm font-medium">
            Gérer mon budget
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Expense List */}
        <ExpenseList expenses={filteredExpenses} />
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <ExpenseForm 
          onClose={() => setShowForm(false)} 
          onAddExpense={handleAddExpense}
        />
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
              <i className="ri-subtract-line text-red-600 text-lg"></i>
            </div>
            <span className="text-xs text-red-600 font-medium">Dépenses</span>
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