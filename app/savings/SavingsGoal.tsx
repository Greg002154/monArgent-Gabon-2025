
'use client';

import { useState } from 'react';

interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
  color: string;
}

interface SavingsGoalProps {
  goal: Goal;
  onUpdate: (goalId: number, newCurrent: number) => void;
  onDelete: (goalId: number) => void;
}

export default function SavingsGoal({ goal, onUpdate, onDelete }: SavingsGoalProps) {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [amount, setAmount] = useState('');

  const percentage = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;
  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      const newCurrent = goal.current + parseInt(amount);
      onUpdate(goal.id, newCurrent);
      setAmount('');
      setShowAddMoney(false);
    }
  };

  const handleDelete = () => {
    onDelete(goal.id);
    setShowDeleteConfirm(false);
    setShowOptions(false);
  };

  const quickAmounts = ['5000', '10000', '25000', '50000'];

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
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
              onClick={() => setShowAddMoney(true)}
              className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center !rounded-button"
            >
              <i className="ri-add-line text-green-600"></i>
            </button>
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center !rounded-button relative"
            >
              <i className="ri-more-line text-gray-600"></i>
            </button>
          </div>
        </div>

        {/* Options Menu */}
        {showOptions && (
          <div className="absolute right-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 min-w-[150px]">
            <button
              onClick={() => {
                setShowAddMoney(true);
                setShowOptions(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
            >
              <i className="ri-add-line text-green-600"></i>
              Ajouter argent
            </button>
            <button
              onClick={() => {
                setShowDeleteConfirm(true);
                setShowOptions(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
            >
              <i className="ri-delete-bin-line"></i>
              Supprimer
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{Math.round(percentage)}% atteint</span>
            <span className="text-green-600">+{remaining.toLocaleString()} FCFA</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`bg-${goal.color}-500 h-3 rounded-full transition-all duration-300`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Goal Info */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="ri-calendar-line text-gray-400 text-sm"></i>
            <span className="text-sm text-gray-600">
              {daysLeft > 0 ? `${daysLeft} jours restants` : 'Échéance dépassée'}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            {Math.round(remaining / Math.max(daysLeft, 1)).toLocaleString()} FCFA/jour
          </span>
        </div>

        {percentage >= 100 && (
          <div className="mt-3 flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <i className="ri-check-line text-green-600"></i>
            <p className="text-sm text-green-700 font-medium">Objectif atteint ! 🎉</p>
          </div>
        )}

        {percentage >= 80 && percentage < 100 && (
          <div className="mt-3 flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
            <i className="ri-fire-line text-orange-600"></i>
            <p className="text-sm text-orange-700 font-medium">Plus que {remaining.toLocaleString()} FCFA ! 🔥</p>
          </div>
        )}
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Ajouter à l'épargne</h3>
              <button 
                onClick={() => setShowAddMoney(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Objectif: {goal.title}</p>
              <p className="text-lg font-semibold text-gray-800">
                Reste {remaining.toLocaleString()} FCFA à épargner
              </p>
            </div>

            <form onSubmit={handleAddMoney} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à ajouter (FCFA)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="5000"
                  className="w-full p-4 border border-gray-200 rounded-xl text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount)}
                    className="py-2 px-3 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors !rounded-button"
                  >
                    {parseInt(quickAmount).toLocaleString()}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors !rounded-button"
              >
                Ajouter l'épargne
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-delete-bin-line text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Supprimer l'objectif</h3>
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir supprimer l'objectif "{goal.title}" ? 
                Cette action est irréversible.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors !rounded-button"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors !rounded-button"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close options */}
      {showOptions && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setShowOptions(false)}
        ></div>
      )}
    </>
  );
}
