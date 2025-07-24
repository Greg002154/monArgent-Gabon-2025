
'use client';
import { useState } from 'react';
import { Budget } from '@/lib/types';
import Link from 'next/link';
import BudgetChart from './BudgetChart';

export default function BudgetPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showNewBudget, setShowNewBudget] = useState(false);
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  

  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

const [budgets, setBudgets] = useState<Budget[]>([
  {
    id: 1,
    category: 'Alimentation',
    icon: 'ri-restaurant-line',
    color: 'red',
    budget: 50000,
    spent: 28000,
    remaining: 22000,
  },
  {
    id: 2,
    category: 'Transport',
    icon: 'ri-bus-line',
    color: 'blue',
    budget: 20000,
    spent: 12000,
    remaining: 8000,
  },
]);
    {
      const item: Budget = {
        id: 3,
        category: "Shopping",
        icon: "ri-shopping-bag-line",
        color: "purple",
        budget: 15000,
        spent: 5000,
        remaining: 10000
      };
  };
    {
      const item: Budget = {
        id: 4,
        category: 'Loisirs',
        icon: 'ri-gamepad-line',
        color: 'pink',
        budget: 10000,
        spent: 2500,
        remaining: 7500
      };
    };

  const getProgressPercentage = (spent: number, budget: number) => {
    return (spent / budget) * 100;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const handleAddBudget = (newBudget: any) => {
    const budgetWithDetails = {
      id: Date.now(),
      ...newBudget,
      spent: 0,
      remaining: newBudget.budget
    };
    setBudgets(prev => [...prev, budgetWithDetails]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleEditBudget = (updatedBudget: any) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === updatedBudget.id 
        ? { ...budget, ...updatedBudget, remaining: updatedBudget.budget - budget.spent }
        : budget
    ));
    setShowEditBudget(false);
    setSelectedBudget(null);
  };

  const handleDeleteBudget = () => {
    setBudgets((prev: Budget[]) => prev.filter(budget => budget.id !== selectedBudget?.id));
    setShowDeleteConfirm(false);
    setSelectedBudget(null);
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = budgets.reduce((sum, budget) => sum + budget.remaining, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Money Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%2010000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=200&height=100&seq=bg-money-1&orientation=landscape" 
          alt="Background" 
          className="absolute top-20 right-4 w-32 h-16 object-cover opacity-30 rotate-12"
        />
        <img 
          src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%205000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=200&height=100&seq=bg-money-2&orientation=landscape" 
          alt="Background" 
          className="absolute top-40 left-4 w-28 h-14 object-cover opacity-30 -rotate-12"
        />
        <img 
          src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%2010000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=200&height=100&seq=bg-money-3&orientation=landscape" 
          alt="Background" 
          className="absolute top-60 right-8 w-36 h-18 object-cover opacity-20 rotate-6"
        />
      </div>

      {/* Header */}
      <div className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <i className="ri-arrow-left-line text-white"></i>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Gestion Budget</h1>
          </div>
          <button 
            onClick={() => setShowNewBudget(true)}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center !rounded-button shadow-lg"
          >
            <i className="ri-add-line text-white"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-20 px-4">
        {/* Period Selector */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all !rounded-button ${
                selectedPeriod === 'week'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all !rounded-button ${
                selectedPeriod === 'month'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all !rounded-button ${
                selectedPeriod === 'year'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Année
            </button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-xl border border-white/20 mb-6 relative overflow-hidden">
          {/* Money decoration */}
          <div className="absolute top-2 right-2 opacity-20">
            <img 
              src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%2010000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=120&height=60&seq=overview-money-1&orientation=landscape" 
              alt="Money decoration" 
              className="w-24 h-12 object-cover rotate-12"
            />
          </div>
          <div className="absolute bottom-2 left-2 opacity-15">
            <img 
              src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%205000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=100&height=50&seq=overview-money-2&orientation=landscape" 
              alt="Money decoration" 
              className="w-20 h-10 object-cover -rotate-6"
            />
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-4">Aperçu du budget mensuel</h3>
          <div className="grid grid-cols-3 gap-4 text-center relative z-10">
            <div>
              <p className="text-2xl font-bold text-white">{formatNumber(totalBudget)}</p>
              <p className="text-sm text-blue-100">Budget total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-300">{formatNumber(totalSpent)}</p>
              <p className="text-sm text-blue-100">Dépensé</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-300">{formatNumber(totalRemaining)}</p>
              <p className="text-sm text-blue-100">Restant</p>
            </div>
          </div>
          
          <div className="mt-6 relative z-10">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>Progression</span>
              <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-300 shadow-sm" 
                style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Budget Chart */}
        <BudgetChart budgets={budgets} />

        {/* Budget Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Budgets par catégorie</h3>
            <button 
              onClick={() => setShowNewBudget(true)}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
            >
              Ajouter +
            </button>
          </div>
          
          {budgets.map((budget) => {
            const percentage = getProgressPercentage(budget.spent, budget.budget);
            const progressColor = getProgressColor(percentage);
            
            return (
              <div key={budget.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 relative overflow-hidden">
                {/* Money decoration for high budget categories */}
                {budget.budget >= 30000 && (
                  <div className="absolute top-2 right-2 opacity-10">
                    <img 
                      src={`https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%2010000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=80&height=40&seq=category-money-${budget.id}&orientation=landscape`} 
                      alt="Money decoration" 
                      className="w-16 h-8 object-cover rotate-6"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r from-${budget.color}-50 to-${budget.color}-100 rounded-full flex items-center justify-center shadow-sm`}>
                      <i className={`${budget.icon} text-${budget.color}-600`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{budget.category}</p>
                      <p className="text-sm text-gray-600">
                        {formatNumber(budget.spent)} / {formatNumber(budget.budget)} FCFA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        +{formatNumber(budget.remaining)} FCFA
                      </p>
                      <p className="text-sm text-gray-500">{Math.round(percentage)}%</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedBudget(budget);
                        setShowEditBudget(true);
                      }}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
                    >
                      <i className="ri-more-line text-gray-600"></i>
                    </button>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 relative z-10">
                  <div 
                    className={`${progressColor} h-2 rounded-full transition-all duration-300 shadow-sm`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                
                {percentage >= 80 && (
                  <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg relative z-10">
                    <i className="ri-alert-line text-orange-600 text-sm"></i>
                    <p className="text-sm text-orange-700">
                      {percentage >= 90 ? 'Budget presque épuisé !' : 'Attention, budget bientôt atteint'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* New Budget Modal */}
      {showNewBudget && (
        <BudgetForm 
          onClose={() => setShowNewBudget(false)}
          onSubmit={handleAddBudget}
          title="Nouveau budget"
        />
      )}

      {/* Edit Budget Modal */}
      {showEditBudget && selectedBudget && (
        <BudgetForm 
          onClose={() => {
            setShowEditBudget(false);
            setSelectedBudget(null);
          }}
          onSubmit={handleEditBudget}
          title="Modifier le budget"
          initialData={selectedBudget}
          onDelete={() => setShowDeleteConfirm(true)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-red-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
              Supprimer ce budget ?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Cette action est irréversible. Le budget sera définitivement supprimé.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl !rounded-button hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteBudget}
                className="py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl !rounded-button hover:from-red-600 hover:to-red-700 transition-colors shadow-lg"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 left-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg z-50">
          <div className="flex items-center gap-3">
            <i className="ri-check-line text-xl"></i>
            <p className="font-medium">Budget créé avec succès !</p>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 shadow-lg">
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
              <i className="ri-pie-chart-line text-blue-600 text-lg"></i>
            </div>
            <span className="text-xs text-blue-600 font-medium">Budget</span>
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

// Budget Form Component
function BudgetForm({ onClose, onSubmit, title, initialData = null, onDelete = null }: any) {
  const [category, setCategory] = useState(initialData?.category || '');
  const [customCategory, setCustomCategory] = useState('');
  const [budget, setBudget] = useState(initialData?.budget?.toString() || '');
  const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || '');
  const [selectedColor, setSelectedColor] = useState(initialData?.color || '');

  // Consistent number formatting function
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const categories = [
    { name: 'Alimentation', icon: 'ri-restaurant-line', color: 'red' },
    { name: 'Transport', icon: 'ri-bus-line', color: 'blue' },
    { name: 'Shopping', icon: 'ri-shopping-bag-line', color: 'purple' },
    { name: 'Santé', icon: 'ri-heart-line', color: 'green' },
    { name: 'Loisirs', icon: 'ri-gamepad-line', color: 'pink' },
    { name: 'Éducation', icon: 'ri-book-line', color: 'indigo' },
    { name: 'Logement', icon: 'ri-home-line', color: 'orange' },
    { name: 'Vêtements', icon: 'ri-shirt-line', color: 'teal' }
  ];

  const quickAmounts = [10000, 20000, 30000, 50000, 75000, 100000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((category || customCategory) && budget && selectedIcon && selectedColor) {
      const budgetData = {
        ...(initialData && { id: initialData.id }),
        category: customCategory || category,
        budget: parseInt(budget),
        icon: selectedIcon,
        color: selectedColor
      };
      onSubmit(budgetData);
      onClose();
    }
  };

  const handleCategorySelect = (cat: any) => {
    setCategory(cat.name);
    setCustomCategory('');
    setSelectedIcon(cat.icon);
    setSelectedColor(cat.color);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-white/95 backdrop-blur-sm w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto relative">
        {/* Money decoration */}
        <div className="absolute top-4 right-4 opacity-5">
          <img 
            src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%205000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=100&height=50&seq=form-money-1&orientation=landscape" 
            alt="Money decoration" 
            className="w-20 h-10 object-cover rotate-12"
          />
        </div>
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <i className="ri-close-line text-gray-600"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Catégorie
            </label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`p-3 rounded-xl border-2 transition-all !rounded-button ${
                    category === cat.name
                      ? `border-${cat.color}-500 bg-gradient-to-r from-${cat.color}-50 to-${cat.color}-100 shadow-lg`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-${cat.color}-50 to-${cat.color}-100 rounded-full flex items-center justify-center shadow-sm`}>
                    <i className={`${cat.icon} text-${cat.color}-600`}></i>
                  </div>
                  <p className="text-xs font-medium text-gray-700">{cat.name}</p>
                </button>
              ))}
            </div>
            
            {/* Custom Category */}
            <input
              type="text"
              value={customCategory}
              onChange={(e) => {
                setCustomCategory(e.target.value);
                setCategory('');
              }}
              placeholder="Ou créer une catégorie personnalisée..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Budget Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant du budget (FCFA)
            </label>
            <div className="relative">
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="0"
                className="w-full p-4 border border-gray-200 rounded-xl text-2xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
              {/* Money icons in input */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20">
                <img 
                  src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%2010000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=60&height=30&seq=input-money-1&orientation=landscape" 
                  alt="Money icon" 
                  className="w-12 h-6 object-cover"
                />
              </div>
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setBudget(amount.toString())}
                  className="py-2 px-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-sm font-medium !rounded-button hover:from-gray-100 hover:to-gray-200 transition-all shadow-sm"
                >
                  {formatNumber(amount)}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={!(category || customCategory) || !budget}
              className={`w-full py-4 font-semibold rounded-xl !rounded-button transition-all shadow-lg ${
                (category || customCategory) && budget
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {initialData ? 'Mettre à jour' : 'Créer le budget'}
            </button>
            
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="w-full py-3 bg-gradient-to-r from-red-50 to-red-100 text-red-600 font-medium rounded-xl !rounded-button hover:from-red-100 hover:to-red-200 transition-all shadow-sm"
              >
                <i className="ri-delete-bin-line mr-2"></i>
                Supprimer ce budget
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
