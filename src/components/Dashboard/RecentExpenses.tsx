import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Utensils, 
  Car, 
  ShoppingBag, 
  Gamepad2, 
  Receipt, 
  HeartPulse,
  MoreHorizontal 
} from 'lucide-react';

const iconMap = {
  'utensils': Utensils,
  'car': Car,
  'shopping-bag': ShoppingBag,
  'gamepad': Gamepad2,
  'receipt': Receipt,
  'heart-pulse': HeartPulse,
  'more-horizontal': MoreHorizontal,
};

const recentExpenses = [
  {
    id: '1',
    title: 'Dinner at Italian Restaurant',
    category: 'Food & Dining',
    amount: 85.50,
    date: new Date('2024-01-15'),
    icon: 'utensils',
    color: '#ef4444',
  },
  {
    id: '2',
    title: 'Uber to Airport',
    category: 'Transportation',
    amount: 32.00,
    date: new Date('2024-01-14'),
    icon: 'car',
    color: '#f97316',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    category: 'Shopping',
    amount: 124.75,
    date: new Date('2024-01-14'),
    icon: 'shopping-bag',
    color: '#8b5cf6',
  },
  {
    id: '4',
    title: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 15.99,
    date: new Date('2024-01-13'),
    icon: 'gamepad',
    color: '#06b6d4',
  },
  {
    id: '5',
    title: 'Electricity Bill',
    category: 'Bills & Utilities',
    amount: 89.20,
    date: new Date('2024-01-12'),
    icon: 'receipt',
    color: '#10b981',
  },
];

export function RecentExpenses() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Expenses
        </h3>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentExpenses.map((expense, index) => {
          const IconComponent = iconMap[expense.icon as keyof typeof iconMap];
          
          return (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: expense.color }}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {expense.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {expense.category} • {format(expense.date, 'MMM dd')}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  -${expense.amount.toFixed(2)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}