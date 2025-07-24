
'use client';

import { useState } from 'react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  icon: string;
  color: string;
  date: string;
  time: string;
  location?: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
  };

  const handleDeleteExpense = () => {
    // Simulate delete
    console.log('Deleting expense:', selectedExpense?.id);
    setShowDeleteConfirm(false);
    setSelectedExpense(null);
  };

  const handleEditExpense = () => {
    // Simulate edit
    console.log('Editing expense:', selectedExpense?.id);
    setSelectedExpense(null);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Historique des dépenses</h3>
          <button className="text-sm text-red-600 font-medium">
            Exporter
          </button>
        </div>
        
        {expenses.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-receipt-line text-gray-400 text-2xl"></i>
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Aucune dépense</h4>
            <p className="text-sm text-gray-500">
              Commencez par enregistrer votre première dépense
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div 
                key={expense.id} 
                onClick={() => handleExpenseClick(expense)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${expense.color}-50 rounded-full flex items-center justify-center`}>
                      <i className={`${expense.icon} text-${expense.color}-600`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{expense.description}</p>
                      <p className="text-sm text-gray-500">{expense.date} • {expense.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-${expense.color}-600`}>-{expense.amount.toLocaleString()} FCFA</p>
                    <div className="flex items-center gap-1 justify-end">
                      <div className={`w-2 h-2 bg-${expense.color}-400 rounded-full`}></div>
                    </div>
                  </div>
                </div>
                {expense.location && (
                  <div className="flex items-center gap-2 ml-13">
                    <i className="ri-map-pin-line text-gray-400 text-sm"></i>
                    <p className="text-sm text-gray-500">{expense.location}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Détails de la dépense</h2>
              <button 
                onClick={() => setSelectedExpense(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* Amount */}
              <div className="text-center">
                <div className={`w-16 h-16 bg-${selectedExpense.color}-50 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${selectedExpense.icon} text-${selectedExpense.color}-600 text-2xl`}></i>
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  -{selectedExpense.amount.toLocaleString()} FCFA
                </p>
                <p className="text-gray-500">{selectedExpense.description}</p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-calendar-line text-gray-400"></i>
                    <span className="text-gray-700">Date</span>
                  </div>
                  <span className="font-medium text-gray-800">
                    {selectedExpense.date} à {selectedExpense.time}
                  </span>
                </div>

                {selectedExpense.location && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <span className="text-gray-700">Lieu</span>
                    </div>
                    <span className="font-medium text-gray-800">{selectedExpense.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-price-tag-line text-gray-400"></i>
                    <span className="text-gray-700">Catégorie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 bg-${selectedExpense.color}-500 rounded-full`}></div>
                    <span className="font-medium text-gray-800 capitalize">{selectedExpense.category}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleEditExpense}
                  className="py-3 px-4 bg-blue-50 text-blue-600 font-medium rounded-xl !rounded-button hover:bg-blue-100 transition-colors"
                >
                  <i className="ri-edit-line mr-2"></i>
                  Modifier
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="py-3 px-4 bg-red-50 text-red-600 font-medium rounded-xl !rounded-button hover:bg-red-100 transition-colors"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-alert-line text-red-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
              Supprimer cette dépense ?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Cette action est irréversible. La dépense sera définitivement supprimée.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl !rounded-button"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteExpense}
                className="py-3 px-4 bg-red-600 text-white font-medium rounded-xl !rounded-button"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}