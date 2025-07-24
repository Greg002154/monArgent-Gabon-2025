
'use client';

import { useState } from 'react';

interface ExpenseFormProps {
  onClose: () => void;
  onAddExpense?: (expense: any) => void;
}

export default function ExpenseForm({ onClose, onAddExpense }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { id: 'food', name: 'Alimentation', icon: 'ri-restaurant-line', color: 'red' },
    { id: 'transport', name: 'Transport', icon: 'ri-bus-line', color: 'blue' },
    { id: 'shopping', name: 'Shopping', icon: 'ri-shopping-bag-line', color: 'purple' },
    { id: 'health', name: 'Santé', icon: 'ri-heart-line', color: 'green' },
    { id: 'education', name: 'Éducation', icon: 'ri-book-line', color: 'indigo' },
    { id: 'entertainment', name: 'Loisirs', icon: 'ri-gamepad-line', color: 'pink' }
  ];

  const commonLocations = [
    'Centre-ville, Libreville',
    'Marché du Mont-Bouët',
    'Centre commercial Akanda',
    'Université Omar Bongo',
    'Hôpital Central',
    'Aéroport Léon Mba',
    'Port-Gentil',
    'Franceville'
  ];

  const quickAmounts = [1000, 2500, 5000, 10000, 15000, 25000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && category) {
      const newExpense = {
        id: Date.now(),
        amount: parseInt(amount),
        category,
        description,
        location,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      
      if (onAddExpense) {
        onAddExpense(newExpense);
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationPicker(false);
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Dépense enregistrée !</h3>
          <p className="text-gray-600">Votre dépense a été ajoutée avec succès.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Nouvelle dépense</h2>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="ri-close-line text-gray-600"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant (FCFA)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full p-4 border border-gray-200 rounded-xl text-2xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => handleQuickAmount(quickAmount)}
                  className="py-2 px-3 bg-gray-100 rounded-lg text-sm font-medium !rounded-button hover:bg-gray-200 transition-colors"
                >
                  {quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Catégorie
            </label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl border-2 transition-all !rounded-button ${
                    category === cat.id
                      ? `border-${cat.color}-500 bg-${cat.color}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 mx-auto mb-2 bg-${cat.color}-50 rounded-full flex items-center justify-center`}>
                    <i className={`${cat.icon} text-${cat.color}-600`}></i>
                  </div>
                  <p className="text-xs font-medium text-gray-700">{cat.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optionnel)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Déjeuner au restaurant"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{description.length}/100 caractères</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lieu (optionnel)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Centre-ville, Libreville"
                className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                maxLength={50}
              />
              <button
                type="button"
                onClick={() => setShowLocationPicker(!showLocationPicker)}
                className={`px-4 py-4 rounded-xl !rounded-button transition-colors ${
                  showLocationPicker ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className="ri-map-pin-line"></i>
              </button>
            </div>

            {/* Location Picker */}
            {showLocationPicker && (
              <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-2">Lieux fréquents :</p>
                <div className="space-y-2">
                  {commonLocations.map((loc, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleLocationSelect(loc)}
                      className="w-full text-left p-2 rounded-lg text-sm text-gray-700 hover:bg-white transition-colors"
                    >
                      <i className="ri-map-pin-line text-gray-400 mr-2"></i>
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!amount || !category}
            className={`w-full py-4 font-semibold rounded-xl !rounded-button transition-all ${
              amount && category
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Enregistrer la dépense
          </button>
        </form>
      </div>
    </div>
  );
}