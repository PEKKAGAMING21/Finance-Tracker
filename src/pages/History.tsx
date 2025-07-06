import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Utensils,
  Car,
  ShoppingBag,
  Gamepad2,
  Receipt,
  HeartPulse,
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown
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

// Mock data - in a real app, this would come from your database
const expenses = [
  {
    id: '1',
    title: 'Dinner at Italian Restaurant',
    description: 'Team dinner with colleagues',
    amount: 85.50,
    category: 'Food & Dining',
    date: new Date('2024-01-15'),
    icon: 'utensils',
    color: '#ef4444',
    group: 'Office Team',
    status: 'settled',
  },
  {
    id: '2',
    title: 'Uber to Airport',
    description: 'Trip to Bali - shared ride',
    amount: 32.00,
    category: 'Transportation',
    date: new Date('2024-01-14'),
    icon: 'car',
    color: '#f97316',
    group: 'Trip to Bali',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    description: 'Weekly groceries for apartment',
    amount: 124.75,
    category: 'Shopping',
    date: new Date('2024-01-14'),
    icon: 'shopping-bag',
    color: '#8b5cf6',
    group: 'Roommates',
    status: 'settled',
  },
  {
    id: '4',
    title: 'Netflix Subscription',
    description: 'Monthly entertainment bill',
    amount: 15.99,
    category: 'Entertainment',
    date: new Date('2024-01-13'),
    icon: 'gamepad',
    color: '#06b6d4',
    group: null,
    status: 'settled',
  },
  {
    id: '5',
    title: 'Electricity Bill',
    description: 'Monthly utility payment',
    amount: 89.20,
    category: 'Bills & Utilities',
    date: new Date('2024-01-12'),
    icon: 'receipt',
    color: '#10b981',
    group: 'Roommates',
    status: 'pending',
  },
  {
    id: '6',
    title: 'Doctor Visit',
    description: 'Regular checkup',
    amount: 150.00,
    category: 'Healthcare',
    date: new Date('2024-01-10'),
    icon: 'heart-pulse',
    color: '#ec4899',
    group: null,
    status: 'settled',
  },
  {
    id: '7',
    title: 'Coffee Shop',
    description: 'Morning coffee and pastry',
    amount: 8.50,
    category: 'Food & Dining',
    date: new Date('2024-01-09'),
    icon: 'utensils',
    color: '#ef4444',
    group: null,
    status: 'settled',
  },
  {
    id: '8',
    title: 'Gas Station',
    description: 'Fill up the tank',
    amount: 45.00,
    category: 'Transportation',
    date: new Date('2024-01-08'),
    icon: 'car',
    color: '#f97316',
    group: null,
    status: 'settled',
  },
];

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Healthcare'];
  const statuses = ['all', 'settled', 'pending'];
  const periods = ['all', 'today', 'week', 'month', 'year'];

  // Filter and sort expenses
  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           expense.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || expense.status === selectedStatus;
      
      let matchesPeriod = true;
      if (selectedPeriod !== 'all') {
        const now = new Date();
        const expenseDate = expense.date;
        
        switch (selectedPeriod) {
          case 'today':
            matchesPeriod = expenseDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesPeriod = expenseDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesPeriod = expenseDate >= monthAgo;
            break;
          case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            matchesPeriod = expenseDate >= yearAgo;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPeriod;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = a.date.getTime() - b.date.getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const settledAmount = filteredExpenses
    .filter(expense => expense.status === 'settled')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const pendingAmount = filteredExpenses
    .filter(expense => expense.status === 'pending')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Title', 'Category', 'Amount', 'Group', 'Status', 'Description'],
      ...filteredExpenses.map(expense => [
        format(expense.date, 'yyyy-MM-dd'),
        expense.title,
        expense.category,
        expense.amount.toString(),
        expense.group || 'Personal',
        expense.status,
        expense.description
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense-history.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Expense History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and analyze all your expenses
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportData}
          className="px-4 py-2 bg-secondary-600 text-white rounded-lg font-medium hover:bg-secondary-700 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Expenses
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Settled
              </p>
              <p className="text-2xl font-bold text-secondary-600">
                ${settledAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending
              </p>
              <p className="text-2xl font-bold text-warning-600">
                ${pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-500 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Search expenses..."
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {periods.map(period => (
                    <option key={period} value={period}>
                      {period === 'all' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="title">Title</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Expenses List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="col-span-4 flex items-center gap-2">
              <button
                onClick={() => handleSort('title')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
              >
                Expense
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <button
                onClick={() => handleSort('category')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
              >
                Category
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <button
                onClick={() => handleSort('date')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
              >
                Date
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <button
                onClick={() => handleSort('amount')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
              >
                Amount
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
            <div className="col-span-2">Status</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredExpenses.map((expense, index) => {
            const IconComponent = iconMap[expense.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Expense Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: expense.color }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {expense.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {expense.description}
                      </p>
                      {expense.group && (
                        <p className="text-xs text-primary-600 dark:text-primary-400">
                          {expense.group}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {expense.category}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {format(expense.date, 'MMM dd, yyyy')}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${expense.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      expense.status === 'settled'
                        ? 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-400'
                        : 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400'
                    }`}>
                      {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredExpenses.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No expenses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}