import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { ExpenseChart } from '../components/Dashboard/ExpenseChart';
import { RecentExpenses } from '../components/Dashboard/RecentExpenses';
import { SmartInsights } from '../components/Dashboard/SmartInsights';

const stats = [
  {
    title: 'Total Expenses',
    value: '$3,245.67',
    change: '+12% from last month',
    changeType: 'negative' as const,
    icon: DollarSign,
    color: 'bg-primary-500',
  },
  {
    title: 'Monthly Budget',
    value: '$4,000.00',
    change: '81% used',
    changeType: 'neutral' as const,
    icon: TrendingUp,
    color: 'bg-secondary-500',
  },
  {
    title: 'Money Saved',
    value: '$754.33',
    change: '+5% from last month',
    changeType: 'positive' as const,
    icon: TrendingDown,
    color: 'bg-accent-500',
  },
  {
    title: 'Active Groups',
    value: '3',
    change: '1 new this month',
    changeType: 'positive' as const,
    icon: Users,
    color: 'bg-warning-500',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Export Report
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Charts */}
      <ExpenseChart />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentExpenses />
        </div>
        <div className="lg:col-span-2">
          <SmartInsights />
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Ready to track more expenses?</h3>
            <p className="text-primary-100 text-sm">
              Add your latest expenses or create a new group for bill splitting.
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              Add Expense
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Create Group
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}