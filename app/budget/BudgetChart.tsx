
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Budget {
  id: number;
  category: string;
  icon: string;
  color: string;
  budget: number;
  spent: number;
  remaining: number;
}

interface BudgetChartProps {
  budgets: Budget[];
}

export default function BudgetChart({ budgets }: BudgetChartProps) {
  // Consistent number formatting function to avoid hydration errors
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const chartData = budgets.map(budget => ({
    name: budget.category,
    value: budget.spent,
    color: getColorHex(budget.color)
  }));

  function getColorHex(color: string): string {
    const colors: { [key: string]: string } = {
      'red': '#EF4444',
      'blue': '#3B82F6',
      'purple': '#8B5CF6',
      'pink': '#EC4899',
      'green': '#10B981',
      'orange': '#F97316'
    };
    return colors[color] || '#6B7280';
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6 relative overflow-hidden">
      {/* Background money decoration */}
      <div className="absolute top-4 right-4 opacity-5">
        <img 
          src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%2010000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=120&height=60&seq=chart-money-1&orientation=landscape" 
          alt="Money decoration" 
          className="w-24 h-12 object-cover rotate-12"
        />
      </div>
      <div className="absolute bottom-4 left-4 opacity-5">
        <img 
          src="https://readdy.ai/api/search-image?query=Central%20African%20CFA%20franc%205000%20banknote%2C%20detailed%20currency%20note%2C%20official%20design%2C%20high%20quality%20scan%2C%20isolated%20on%20white%20background%2C%20realistic%20banknote%20photography%2C%20sharp%20details%2C%20professional%20lighting&width=100&height=50&seq=chart-money-2&orientation=landscape" 
          alt="Money decoration" 
          className="w-20 h-10 object-cover -rotate-6"
        />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4 relative z-10">Répartition des dépenses</h3>
      
      <div className="h-64 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              strokeWidth={3}
              stroke="#ffffff"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
        {budgets.map((budget) => (
          <div key={budget.id} className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-lg">
            <div 
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: getColorHex(budget.color) }}
            ></div>
            <span className="text-sm text-gray-700 font-medium">{budget.category}</span>
            <span className="text-xs text-gray-500 ml-auto">
              {formatNumber(budget.spent)} FCFA
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
