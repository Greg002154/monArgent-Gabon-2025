
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SavingsGoal from './SavingsGoal';

export default function SavingsPage() {
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [showBambooSetup, setShowBambooSetup] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showGoalDetails, setShowGoalDetails] = useState(false);
  const [showBambooInfo, setShowBambooInfo] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [hasBambooAccount, setHasBambooAccount] = useState(false);
  const [isPremium, setIsPremium] = useState(false); 
  const [selectedGoalForTransfer, setSelectedGoalForTransfer] = useState<any>(null);
  const [selectedGoalForEdit, setSelectedGoalForEdit] = useState<any>(null);
  const [selectedGoalForDetails, setSelectedGoalForDetails] = useState<any>(null);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Nouveau téléphone',
      target: 150000,
      current: 75000,
      deadline: '2024-06-15',
      icon: 'ri-smartphone-line',
      color: 'blue',
      bambooAccount: true,
      lockPeriod: '6 mois',
      interestRate: 2.5,
      autoSave: true
    },
    {
      id: 2,
      title: 'Voyage à Paris',
      target: 500000,
      current: 120000,
      deadline: '2024-12-20',
      icon: 'ri-plane-line',
      color: 'purple',
      bambooAccount: true,
      lockPeriod: '12 mois',
      interestRate: 3.2,
      autoSave: false
    },
    {
      id: 3,
      title: 'Fonds d\'urgence',
      target: 200000,
      current: 180000,
      deadline: '2024-08-30',
      icon: 'ri-shield-line',
      color: 'green',
      bambooAccount: false,
      lockPeriod: null,
      interestRate: 0,
      autoSave: false
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    target: '',
    deadline: '',
    category: '',
    enableBamboo: false,
    lockPeriod: '6',
    monthlyAmount: ''
  });

  const [transferData, setTransferData] = useState({
    mobileProvider: '',
    phoneNumber: '',
    amount: '',
    pin: ''
  });

  const [bambooConfig, setBambooConfig] = useState({
    phoneNumber: '',
    accountNumber: '',
    pin: '',
    notifications: true,
    autoTransfer: false,
    monthlyLimit: ''
  });

  const predefinedGoals = [
    { name: 'Téléphone', icon: 'ri-smartphone-line', amount: '150000', color: 'blue' },
    { name: 'Voyage', icon: 'ri-plane-line', amount: '300000', color: 'purple' },
    { name: 'Voiture', icon: 'ri-car-line', amount: '2000000', color: 'red' },
    { name: 'Formation', icon: 'ri-graduation-cap-line', amount: '80000', color: 'orange' },
    { name: 'Urgence', icon: 'ri-shield-line', amount: '200000', color: 'green' },
    { name: 'Entreprise', icon: 'ri-briefcase-line', amount: '500000', color: 'indigo' },
    { name: 'Maison', icon: 'ri-home-line', amount: '5000000', color: 'yellow' },
    { name: 'Mariage', icon: 'ri-heart-line', amount: '1000000', color: 'pink' }
  ];

  const lockPeriods = [
    { value: '3', label: '3 mois', rate: 1.8 },
    { value: '6', label: '6 mois', rate: 2.5 },
    { value: '12', label: '12 mois', rate: 3.2 },
    { value: '24', label: '24 mois', rate: 4.1 }
  ];

  const quickAmounts = ['25000', '50000', '100000', '200000', '500000', '1000000'];

  const totalSavings = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTargets = goals.reduce((sum, goal) => sum + goal.target, 0);
  const bambooSavings = goals.filter(g => g.bambooAccount).reduce((sum, goal) => sum + goal.current, 0);

  const calculateRecommendedPeriod = (target: number, monthlyCapacity: number) => {
    const months = Math.ceil(target / monthlyCapacity);
    if (months <= 3) return '3';
    if (months <= 6) return '6';
    if (months <= 12) return '12';
    return '24';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.target || !formData.deadline) {
      return;
    }

    const selectedPeriod = lockPeriods.find(p => p.value === formData.lockPeriod);

    const newGoal = {
      id: Date.now(),
      title: formData.title,
      target: parseInt(formData.target),
      current: 0,
      deadline: formData.deadline,
      icon: formData.category ? predefinedGoals.find(g => g.name === formData.category)?.icon || 'ri-target-line' : 'ri-target-line',
      color: formData.category ? predefinedGoals.find(g => g.name === formData.category)?.color || 'blue' : 'blue',
      bambooAccount: formData.enableBamboo,
      lockPeriod: formData.enableBamboo ? selectedPeriod?.label : null,
      interestRate: formData.enableBamboo ? selectedPeriod?.rate : 0,
      autoSave: formData.enableBamboo
    };

    setGoals([...goals, newGoal]);
    setFormData({ title: '', target: '', deadline: '', category: '', enableBamboo: false, lockPeriod: '6', monthlyAmount: '' });
    setShowNewGoal(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const selectPredefinedGoal = (goal: any) => {
    setFormData({
      ...formData,
      title: goal.name,
      target: goal.amount,
      category: goal.name
    });
  };

  const updateGoal = (goalId: number, newCurrent: number) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, current: Math.min(newCurrent, goal.target) }
        : goal
    ));
  };

  const deleteGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    setShowDeleteConfirm(false);
    setSelectedGoalForEdit(null);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferData.mobileProvider && transferData.phoneNumber && transferData.amount && transferData.pin) {
      if (selectedGoalForTransfer) {
        const newAmount = selectedGoalForTransfer.current + parseInt(transferData.amount);
        updateGoal(selectedGoalForTransfer.id, newAmount);
      }

      setTransferData({ mobileProvider: '', phoneNumber: '', amount: '', pin: '' });
      setShowTransferModal(false);
      setSelectedGoalForTransfer(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleBambooConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bambooConfig.phoneNumber && bambooConfig.accountNumber && bambooConfig.pin) {
      setHasBambooAccount(true);
      setShowBambooSetup(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleEditGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoalForEdit && formData.title && formData.target) {
      const updatedGoals = goals.map(goal =>
        goal.id === selectedGoalForEdit.id
          ? {
              ...goal,
              title: formData.title,
              target: parseInt(formData.target),
              deadline: formData.deadline,
              bambooAccount: formData.enableBamboo,
              lockPeriod: formData.enableBamboo ? lockPeriods.find(p => p.value === formData.lockPeriod)?.label : null,
              interestRate: formData.enableBamboo ? lockPeriods.find(p => p.value === formData.lockPeriod)?.rate : 0,
              autoSave: formData.enableBamboo
            }
          : goal
      );
      setGoals(updatedGoals);
      setShowEditGoal(false);
      setSelectedGoalForEdit(null);
      setFormData({ title: '', target: '', deadline: '', category: '', enableBamboo: false, lockPeriod: '6', monthlyAmount: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const openTransferModal = (goal: any) => {
    setSelectedGoalForTransfer(goal);
    setShowTransferModal(true);
  };

  const openEditGoal = (goal: any) => {
    setSelectedGoalForEdit(goal);
    setFormData({
      title: goal.title,
      target: goal.target.toString(),
      deadline: goal.deadline,
      category: goal.title,
      enableBamboo: goal.bambooAccount,
      lockPeriod: goal.bambooAccount ? lockPeriods.find(p => p.label === goal.lockPeriod)?.value || '6' : '6',
      monthlyAmount: ''
    });
    setShowEditGoal(true);
  };

  const openGoalDetails = (goal: any) => {
    setSelectedGoalForDetails(goal);
    setShowGoalDetails(true);
  };

  const checkPremiumForBamboo = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return false;
    }
    return true;
  };

  const handleBambooSetup = () => {
    if (checkPremiumForBamboo()) {
      setShowBambooSetup(true);
    }
  };

  const handleNewGoalWithBamboo = (enableBamboo: boolean) => {
    if (enableBamboo && !checkPremiumForBamboo()) {
      return false;
    }
    return true;
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
            <h1 className="text-xl font-bold text-gray-800">Épargne & Objectifs</h1>
          </div>
          <button
            onClick={() => setShowNewGoal(true)}
            className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center !rounded-button"
          >
            <i className="ri-add-line text-white"></i>
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 left-4 right-4 bg-green-600 text-white p-4 rounded-xl z-40 flex items-center gap-3">
          <i className="ri-check-line text-xl"></i>
          <span className="font-medium">Opération réussie !</span>
        </div>
      )}

      {/* Content */}
      <div className="pt-20 pb-20 px-4">
        {/* Bamboo Bank Integration */}
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
              <h3 className="text-lg font-bold flex items-center gap-2">
                Banque Bamboo
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Partenaire Officiel</span>
              </h3>
              <p className="text-green-100 text-sm">Établissement de Microfinance</p>
            </div>
          </div>

          {/* Premium Status Indicator */}
          {!isPremium && (
            <div className="bg-orange-500/20 rounded-xl p-3 mb-4 border border-orange-300/20">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-vip-crown-line text-orange-200"></i>
                <span className="text-sm font-medium text-orange-100">Fonctionnalité Premium</span>
              </div>
              <p className="text-xs text-orange-100">
                L\'épargne Bamboo nécessite un abonnement Premium pour être activée
              </p>
            </div>
          )}

          <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100 text-sm">Total épargné Bamboo</p>
                <p className="text-2xl font-bold">
                  {isPremium ? `${goals.filter(g => g.bambooAccount).reduce((sum, goal) => sum + goal.current, 0).toLocaleString()} FCFA` : '--- FCFA'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm">Intérêts gagnés</p>
                <p className="text-lg font-bold">
                  {isPremium ? `+${Math.round(goals.filter(g => g.bambooAccount).reduce((sum, goal) => sum + goal.current, 0) * 0.025 / 12).toLocaleString()} FCFA` : '+--- FCFA'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBambooSetup}
              className="flex-1 py-3 bg-white/20 rounded-xl font-medium backdrop-blur-sm !rounded-button"
            >
              <i className="ri-settings-line mr-2"></i>
              Configurer
            </button>
            {isPremium ? (
              <Link href="/savings/bamboo" className="flex-1 py-3 bg-white text-green-600 rounded-xl font-medium text-center !rounded-button">
                <i className="ri-arrow-right-line mr-2"></i>
                Gérer
              </Link>
            ) : (
              <button
                onClick={() => setShowPremiumModal(true)}
                className="flex-1 py-3 bg-white text-green-600 rounded-xl font-medium !rounded-button"
              >
                <i className="ri-vip-crown-line mr-2"></i>
                Premium
              </button>
            )}
          </div>
        </div>

        {/* Savings Overview */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Total épargné</p>
              <h3 className="text-3xl font-bold" suppressHydrationWarning={true}>{totalSavings.toLocaleString()} FCFA</h3>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-piggy-bank-line text-white"></i>
            </div>
          </div>
          <div className="flex justify-between text-sm text-green-100">
            <span suppressHydrationWarning={true}>Objectif total: {totalTargets.toLocaleString()} FCFA</span>
            <span suppressHydrationWarning={true}>{totalTargets > 0 ? Math.round((totalSavings / totalTargets) * 100) : 0}% atteint</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                <i className="ri-target-line text-blue-600 text-sm"></i>
              </div>
              <p className="text-xs text-gray-600">Objectifs</p>
            </div>
            <p className="text-xl font-bold text-blue-600">{goals.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                <i className="ri-calendar-line text-green-600 text-sm"></i>
              </div>
              <p className="text-xs text-gray-600">Ce mois</p>
            </div>
            <p className="text-xl font-bold text-green-600" suppressHydrationWarning={true}>+25K</p>
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
              <p className="text-xs text-gray-600">Bamboo</p>
            </div>
            <p className="text-xl font-bold text-green-600">{goals.filter(g => g.bambooAccount).length}</p>
          </div>
        </div>

        {/* Savings Tips */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
              <i className="ri-lightbulb-line text-green-600"></i>
            </div>
            <h3 className="font-semibold text-gray-800">Conseil Bamboo</h3>
            <button
              onClick={() => setShowBambooInfo(true)}
              className="ml-auto w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <i className="ri-information-line text-gray-600 text-sm"></i>
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            Avec un compte Bamboo bloqué 12 mois, vos 100 000 FCFA rapportent 3 200 FCFA d\'intérêts par an !
          </p>
        </div>

        {/* Savings Goals */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Mes objectifs d\'épargne</h3>

          {goals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-${goal.color}-50 rounded-full flex items-center justify-center`}>
                    <i className={`${goal.icon} text-${goal.color}-600 text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                    <p className="text-sm text-gray-500">
                      {goal.current.toLocaleString()} / {goal.target.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openGoalDetails(goal)}
                    className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center !rounded-button"
                  >
                    <i className="ri-eye-line text-gray-600"></i>
                  </button>
                  {goal.bambooAccount && (
                    <button
                      onClick={() => openTransferModal(goal)}
                      className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center !rounded-button"
                    >
                      <i className="ri-phone-line text-green-600"></i>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const newCurrent = goal.current + 10000;
                      updateGoal(goal.id, newCurrent);
                    }}
                    className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center !rounded-button"
                  >
                    <i className="ri-add-line text-green-600"></i>
                  </button>
                  <button
                    onClick={() => openEditGoal(goal)}
                    className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center !rounded-button"
                  >
                    <i className="ri-edit-line text-gray-600"></i>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{Math.round((goal.current / goal.target) * 100)}% atteint</span>
                  <span className="text-green-600">+{(goal.target - goal.current).toLocaleString()} FCFA</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`bg-${goal.color}-500 h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Bamboo Account Info */}
              {goal.bambooAccount && (
                <div className="bg-green-50 rounded-xl p-3 mb-3 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                      alt="Bamboo"
                      className="w-6 h-3 object-contain"
                    />
                    <span className="text-sm font-medium text-green-800">Compte Bamboo</span>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      {goal.lockPeriod}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700">Taux d\'intérêt:</span>
                      <span className="font-medium text-green-800 ml-1">{goal.interestRate}%</span>
                    </div>
                    <div>
                      <span className="text-green-700">Intérêts prévus:</span>
                      <span className="font-medium text-green-800 ml-1">
                        +{Math.round(goal.current * goal.interestRate / 100).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Goal Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <i className="ri-calendar-line text-gray-400 text-sm"></i>
                  <span className="text-sm text-gray-600">
                    {Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours restants
                  </span>
                </div>
                {goal.bambooAccount && (
                  <div className="flex items-center gap-2">
                    <i className="ri-lock-line text-green-600 text-sm"></i>
                    <span className="text-sm text-green-600 font-medium">Bloqué</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {goals.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-target-line text-gray-400 text-2xl"></i>
              </div>
              <p className="text-gray-500 mb-4">Aucun objectif d\'épargne pour le moment</p>
              <button
                onClick={() => setShowNewGoal(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium !rounded-button"
              >
                Créer mon premier objectif
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bamboo Configuration Modal */}
      {showBambooSetup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg p-1 flex items-center justify-center">
                  <img
                    src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                    alt="Bamboo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Configuration Bamboo</h2>
              </div>
              <button
                onClick={() => setShowBambooSetup(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <form onSubmit={handleBambooConfigSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={bambooConfig.phoneNumber}
                  onChange={(e) => setBambooConfig({ ...bambooConfig, phoneNumber: e.target.value })}
                  placeholder="07 XX XX XX XX"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de compte Bamboo
                </label>
                <input
                  type="text"
                  value={bambooConfig.accountNumber}
                  onChange={(e) => setBambooConfig({ ...bambooConfig, accountNumber: e.target.value })}
                  placeholder="123456789"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code PIN Bamboo
                </label>
                <input
                  type="password"
                  value={bambooConfig.pin}
                  onChange={(e) => setBambooConfig({ ...bambooConfig, pin: e.target.value })}
                  placeholder="••••"
                  maxLength="4"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limite mensuelle (FCFA)
                </label>
                <input
                  type="number"
                  value={bambooConfig.monthlyLimit}
                  onChange={(e) => setBambooConfig({ ...bambooConfig, monthlyLimit: e.target.value })}
                  placeholder="100000"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <h3 className="font-semibold text-green-800 mb-3">Paramètres avancés</h3>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-600">Recevoir des alertes SMS</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      checked={bambooConfig.notifications}
                      onChange={(e) => setBambooConfig({ ...bambooConfig, notifications: e.target.checked })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="notifications"
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${bambooConfig.notifications ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${bambooConfig.notifications ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Transfert automatique</p>
                    <p className="text-sm text-gray-600">Épargne automatique mensuelle</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoTransfer"
                      checked={bambooConfig.autoTransfer}
                      onChange={(e) => setBambooConfig({ ...bambooConfig, autoTransfer: e.target.checked })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="autoTransfer"
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${bambooConfig.autoTransfer ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${bambooConfig.autoTransfer ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors !rounded-button"
              >
                Configurer le compte Bamboo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Goal Details Modal */}
      {showGoalDetails && selectedGoalForDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${selectedGoalForDetails.color}-50 rounded-full flex items-center justify-center`}>
                  <i className={`${selectedGoalForDetails.icon} text-${selectedGoalForDetails.color}-600`}></i>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{selectedGoalForDetails.title}</h2>
              </div>
              <button
                onClick={() => setShowGoalDetails(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-4">
              {/* Progress Circle */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round((selectedGoalForDetails.current / selectedGoalForDetails.target) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">atteint</div>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {selectedGoalForDetails.current.toLocaleString()} FCFA
                </p>
                <p className="text-gray-600">
                  sur {selectedGoalForDetails.target.toLocaleString()} FCFA
                </p>
              </div>

              {/* Goal Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-target-line text-blue-600"></i>
                    <span className="text-sm font-medium text-blue-800">Objectif</span>
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    {selectedGoalForDetails.target.toLocaleString()} FCFA
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-money-dollar-circle-line text-green-600"></i>
                    <span className="text-sm font-medium text-green-800">Restant</span>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    {(selectedGoalForDetails.target - selectedGoalForDetails.current).toLocaleString()} FCFA
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-calendar-line text-gray-600"></i>
                  <span className="text-sm font-medium text-gray-800">Échéance</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(selectedGoalForDetails.deadline).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  {Math.ceil((new Date(selectedGoalForDetails.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours restants
                </p>
              </div>

              {/* Bamboo Info */}
              {selectedGoalForDetails.bambooAccount && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                      alt="Bamboo"
                      className="w-6 h-3 object-contain"
                    />
                    <span className="text-sm font-medium text-green-800">Compte Bamboo - {selectedGoalForDetails.lockPeriod}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700">Taux d\'intérêt:</span>
                      <span className="font-medium text-green-800 ml-1">{selectedGoalForDetails.interestRate}% / an</span>
                    </div>
                    <div>
                      <span className="text-green-700">Intérêts prévus:</span>
                      <span className="font-medium text-green-800 ml-1">
                        +{Math.round(selectedGoalForDetails.current * selectedGoalForDetails.interestRate / 100).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                    <p className="text-xs text-green-700">
                      <i className="ri-lock-line mr-1"></i>
                      Fonds bloqués jusqu\'à l\'échéance. Aucun retrait anticipé possible.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowGoalDetails(false);
                    openEditGoal(selectedGoalForDetails);
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium !rounded-button"
                >
                  <i className="ri-edit-line mr-2"></i>
                  Modifier
                </button>
                <button
                  onClick={() => {
                    setShowGoalDetails(false);
                    setSelectedGoalForEdit(selectedGoalForDetails);
                    setShowDeleteConfirm(true);
                  }}
                  className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-medium !rounded-button"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bamboo Info Modal */}
      {showBambooInfo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg p-1 flex items-center justify-center">
                  <img
                    src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                    alt="Bamboo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Banque Bamboo</h3>
              </div>
              <button
                onClick={() => setShowBambooInfo(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Taux d\'intérêt</h4>
                <div className="space-y-2">
                  {lockPeriods.map((period) => (
                    <div key={period.value} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{period.label}</span>
                      <span className="text-sm font-medium text-green-600">{period.rate}% / an</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Conditions</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dépôt minimum: 15 000 FCFA</li>
                  <li>• Fonds bloqués pendant la période choisie</li>
                  <li>• Intérêts calculés et versés mensuellement</li>
                  <li>• Aucun retrait anticipé possible</li>
                  <li>• Transfert depuis Mobile Money autorisé</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-2">Exemple de calcul</h4>
                <p className="text-sm text-green-700">
                  Pour 100 000 FCFA bloqués 12 mois à 3,2% :
                  <br />
                  <strong>Intérêts annuels = 3 200 FCFA</strong>
                  <br />
                  <strong>Intérêts mensuels = 267 FCFA</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedGoalForEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-red-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
              Supprimer cet objectif ?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              L\'objectif "{selectedGoalForEdit.title}" sera définitivement supprimé.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium !rounded-button"
              >
                Annuler
              </button>
              <button
                onClick={() => deleteGoal(selectedGoalForEdit.id)}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium !rounded-button"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Goal Modal */}
      {showNewGoal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Nouvel objectif</h2>
              <button
                onClick={() => setShowNewGoal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            {/* Predefined Goals */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Objectifs populaires</h3>
              <div className="grid grid-cols-4 gap-3">
                {predefinedGoals.map((goal) => (
                  <button
                    key={goal.name}
                    onClick={() => selectPredefinedGoal(goal)}
                    className={`p-3 rounded-xl border-2 transition-all ${formData.category === goal.name ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'} !rounded-button`}
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${formData.category === goal.name ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <i className={`${goal.icon} text-${goal.color}-600 text-sm`}></i>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{goal.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l\'objectif
                </label>
                <input
                  type="text"
                  placeholder="Ex: Nouveau vélo"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant cible (FCFA)
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-xl font-semibold"
                  required
                />

                <div className="grid grid-cols-3 gap-2 mt-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setFormData({ ...formData, target: amount })}
                      className="py-2 px-3 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors !rounded-button"
                    >
                      {parseInt(amount).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date limite
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Bamboo Bank Option */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
                      <img
                        src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                        alt="Bamboo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Compte Bamboo</h4>
                      <p className="text-sm text-gray-600">Épargne bloquée avec intérêts</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableBamboo"
                      checked={formData.enableBamboo}
                      onChange={(e) => setFormData({ ...formData, enableBamboo: e.target.checked })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="enableBamboo"
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${formData.enableBamboo ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${formData.enableBamboo ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </label>
                  </div>
                </div>

                {formData.enableBamboo && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Période de blocage
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {lockPeriods.map((period) => (
                          <button
                            key={period.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, lockPeriod: period.value })}
                            className={`p-3 rounded-xl border-2 transition-all text-sm !rounded-button ${formData.lockPeriod === period.value ? 'border-green-500 bg-green-100' : 'border-gray-200 bg-white'}`}
                          >
                            <div className="font-medium">{period.label}</div>
                            <div className="text-xs text-green-600">{period.rate}% / an</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 text-sm border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                          alt="Bamboo"
                          className="w-4 h-2 object-contain"
                        />
                        <span className="font-medium text-green-800">Informations Bamboo</span>
                      </div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Dépôt minimum: 15 000 FCFA</li>
                        <li>• Fonds bloqués pendant la période choisie</li>
                        <li>• Intérêts calculés mensuellement</li>
                        <li>• Transfert depuis Mobile Money</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors !rounded-button"
              >
                Créer l\'objectif
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Goal Modal */}
      {showEditGoal && selectedGoalForEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Modifier l\'objectif</h2>
              <button
                onClick={() => setShowEditGoal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <form onSubmit={handleEditGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l\'objectif
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant cible (FCFA)
                </label>
                <input
                  type="number"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-xl font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date limite
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditGoal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium !rounded-button"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors !rounded-button"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && selectedGoalForTransfer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Transfert Mobile Money</h2>
              <button
                onClick={() => setShowTransferModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 bg-${selectedGoalForTransfer.color}-50 rounded-full flex items-center justify-center`}>
                  <i className={`${selectedGoalForTransfer.icon} text-${selectedGoalForTransfer.color}-600`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{selectedGoalForTransfer.title}</h3>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                      alt="Bamboo"
                      className="w-4 h-2 object-contain"
                    />
                    <p className="text-sm text-gray-600">Transfert vers compte Bamboo</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opérateur mobile
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTransferData({ ...transferData, mobileProvider: 'moov' })}
                    className={`p-4 rounded-xl border-2 transition-all !rounded-button ${transferData.mobileProvider === 'moov' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-phone-line text-blue-600"></i>
                    </div>
                    <p className="text-sm font-medium">Moov Money</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransferData({ ...transferData, mobileProvider: 'airtel' })}
                    className={`p-4 rounded-xl border-2 transition-all !rounded-button ${transferData.mobileProvider === 'airtel' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
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
                  value={transferData.phoneNumber}
                  onChange={(e) => setTransferData({ ...transferData, phoneNumber: e.target.value })}
                  placeholder="07 XX XX XX XX"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à transférer (FCFA)
                </label>
                <input
                  type="number"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                  placeholder="15000"
                  min="15000"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-xl font-semibold"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Montant minimum: 15 000 FCFA</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code PIN Mobile Money
                </label>
                <input
                  type="password"
                  value={transferData.pin}
                  onChange={(e) => setTransferData({ ...transferData, pin: e.target.value })}
                  placeholder="••••"
                  maxLength="4"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-xl font-semibold"
                  required
                />
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                    alt="Bamboo"
                    className="w-4 h-2 object-contain"
                  />
                  <span className="text-sm font-medium text-green-800">Attention Bamboo</span>
                </div>
                <p className="text-xs text-green-700">
                  Une fois transféré, votre argent sera bloqué pendant {selectedGoalForTransfer.lockPeriod}
                  dans votre compte Bamboo. Aucun retrait anticipé ne sera possible.
                </p>
              </div>

              <button
                type="submit"
                disabled={!transferData.mobileProvider || !transferData.phoneNumber || !transferData.amount || !transferData.pin}
                className={`w-full py-4 font-semibold rounded-xl !rounded-button transition-all ${transferData.mobileProvider && transferData.phoneNumber && transferData.amount && transferData.pin ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Confirmer le transfert
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Premium Required Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-vip-crown-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Requis</h3>
              <p className="text-gray-600 mb-4">
                L\'épargne avec Bamboo Bank est une fonctionnalité exclusive aux membres Premium.
              </p>

              <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="https://static.readdy.ai/image/f2c4d747c44d3b9549c83e1972fe99d0/924067f0809801d2943e59186dcf8ebd.jfif"
                    alt="Bamboo"
                    className="w-6 h-3 object-contain"
                  />
                  <span className="text-sm font-medium text-green-800">Avantages Premium</span>
                </div>
                <ul className="text-xs text-green-700 space-y-1 text-left">
                  <li>• Épargne Bamboo avec intérêts jusqu\'à 4.1%</li>
                  <li>• Comptes bloqués sécurisés</li>
                  <li>• Transferts Mobile Money</li>
                  <li>• Objectifs d\'épargne illimités</li>
                  <li>• Analyses financières avancées</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">1 000 FCFA/mois</p>
                  <p className="text-sm text-gray-500">ou 10 200 FCFA/an (-15%)</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium !rounded-button"
                  >
                    Plus tard
                  </button>
                  <Link
                    href="/premium"
                    className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium text-center !rounded-button"
                  >
                    Passer au Premium
                  </Link>
                </div>
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
