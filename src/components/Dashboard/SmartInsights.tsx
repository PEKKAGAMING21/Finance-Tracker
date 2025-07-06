import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Calendar,
  DollarSign,
  PieChart
} from 'lucide-react';

const insights = [
  {
    id: '1',
    type: 'warning',
    icon: AlertTriangle,
    title: 'Budget Alert',
    description: 'You\'ve spent 85% of your monthly food budget',
    action: 'Review budget',
    color: 'bg-warning-500',
    textColor: 'text-warning-600',
  },
  {
    id: '2',
    type: 'success',
    icon: CheckCircle,
    title: 'Great Progress',
    description: 'You saved $200 more than last month',
    action: 'Keep it up!',
    color: 'bg-secondary-500',
    textColor: 'text-secondary-600',
  },
  {
    id: '3',
    type: 'tip',
    icon: TrendingDown,
    title: 'Spending Tip',
    description: 'Consider reducing entertainment expenses by 15%',
    action: 'View details',
    color: 'bg-primary-500',
    textColor: 'text-primary-600',
  },
  {
    id: '4',
    type: 'info',
    icon: Calendar,
    title: 'Upcoming Bills',
    description: 'You have 3 bills due next week totaling $245',
    action: 'Schedule payments',
    color: 'bg-accent-500',
    textColor: 'text-accent-600',
  },
];

const predictions = [
  {
    category: 'Food & Dining',
    predicted: 520,
    actual: 485,
    trend: 'down',
  },
  {
    category: 'Transportation',
    predicted: 180,
    actual: 195,
    trend: 'up',
  },
  {
    category: 'Entertainment',
    predicted: 120,
    actual: 140,
    trend: 'up',
  },
];

export function SmartInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Smart Insights
          </h3>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon;
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${insight.color}`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {insight.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {insight.description}
                  </p>
                  <button className={`text-xs font-medium mt-2 ${insight.textColor} hover:underline`}>
                    {insight.action}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Spending Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center">
            <PieChart className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Spending Predictions
          </h3>
        </div>

        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <motion.div
              key={prediction.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {prediction.category}
                </p>
                <div className="flex items-center gap-1">
                  {prediction.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-error-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-secondary-500" />
                  )}
                  <span className={`text-xs font-medium ${
                    prediction.trend === 'up' ? 'text-error-600' : 'text-secondary-600'
                  }`}>
                    {prediction.trend === 'up' ? '+' : '-'}${Math.abs(prediction.actual - prediction.predicted)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                <span>Predicted: ${prediction.predicted}</span>
                <span>•</span>
                <span>Actual: ${prediction.actual}</span>
              </div>
              
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    prediction.trend === 'up' ? 'bg-error-500' : 'bg-secondary-500'
                  }`}
                  style={{
                    width: `${Math.min((prediction.actual / prediction.predicted) * 100, 100)}%`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <p className="text-xs text-primary-600 dark:text-primary-400">
            💡 Tip: Based on your spending patterns, consider setting up automatic savings for next month.
          </p>
        </div>
      </motion.div>
    </div>
  );
}