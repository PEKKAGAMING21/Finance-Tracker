import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Settings, 
  UserPlus, 
  DollarSign,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const groups = [
  {
    id: '1',
    name: 'Roommates',
    description: 'Shared apartment expenses',
    members: [
      { id: '1', name: 'You', email: 'you@example.com', balance: -125.50 },
      { id: '2', name: 'Alex Johnson', email: 'alex@example.com', balance: 45.25 },
      { id: '3', name: 'Sarah Wilson', email: 'sarah@example.com', balance: 80.25 },
    ],
    totalBalance: -125.50,
    totalExpenses: 2340.75,
    recentExpenses: [
      { title: 'Groceries', amount: 89.50, paidBy: 'You' },
      { title: 'Internet Bill', amount: 65.00, paidBy: 'Alex Johnson' },
    ],
    color: 'from-primary-500 to-blue-600',
    icon: '🏠',
  },
  {
    id: '2',
    name: 'Trip to Bali',
    description: 'Vacation expenses',
    members: [
      { id: '1', name: 'You', email: 'you@example.com', balance: 280.00 },
      { id: '2', name: 'Mike Brown', email: 'mike@example.com', balance: -95.50 },
      { id: '3', name: 'Emma Davis', email: 'emma@example.com', balance: -85.75 },
      { id: '4', name: 'Tom Wilson', email: 'tom@example.com', balance: -98.75 },
    ],
    totalBalance: 280.00,
    totalExpenses: 1850.00,
    recentExpenses: [
      { title: 'Hotel Booking', amount: 450.00, paidBy: 'You' },
      { title: 'Dinner', amount: 120.00, paidBy: 'Mike Brown' },
    ],
    color: 'from-secondary-500 to-green-600',
    icon: '✈️',
  },
  {
    id: '3',
    name: 'Office Team',
    description: 'Team lunch and activities',
    members: [
      { id: '1', name: 'You', email: 'you@example.com', balance: 15.25 },
      { id: '2', name: 'Lisa Chen', email: 'lisa@example.com', balance: -8.50 },
      { id: '3', name: 'David Kim', email: 'david@example.com', balance: -6.75 },
    ],
    totalBalance: 15.25,
    totalExpenses: 345.80,
    recentExpenses: [
      { title: 'Team Lunch', amount: 85.00, paidBy: 'You' },
      { title: 'Coffee', amount: 24.50, paidBy: 'Lisa Chen' },
    ],
    color: 'from-accent-500 to-purple-600',
    icon: '💼',
  },
];

export function Groups() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [copiedInvite, setCopiedInvite] = useState<string | null>(null);

  const handleCopyInvite = (groupId: string) => {
    const inviteLink = `https://financetracker.app/join/${groupId}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedInvite(groupId);
    toast.success('Invite link copied!');
    setTimeout(() => setCopiedInvite(null), 2000);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Groups
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your shared expenses and split bills with friends
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Group
        </motion.button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
          placeholder="Search groups..."
        />
      </motion.div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
          >
            {/* Group Header */}
            <div className={`bg-gradient-to-r ${group.color} p-4 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{group.icon}</div>
                  <div>
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm opacity-90">{group.members.length} members</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyInvite(group.id);
                    }}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {copiedInvite === group.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Your balance</span>
                <span className={`font-semibold ${
                  group.totalBalance >= 0 ? 'text-green-200' : 'text-red-200'
                }`}>
                  {group.totalBalance >= 0 ? '+' : ''}${group.totalBalance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Group Content */}
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {group.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Expenses</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${group.totalExpenses.toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Members</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {group.members.length}
                  </p>
                </div>
              </div>

              {/* Recent Expenses */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recent Expenses
                </h4>
                {group.recentExpenses.slice(0, 2).map((expense, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {expense.title}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${expense.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Expandable Content */}
              {selectedGroup === group.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                >
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Member Balances
                  </h4>
                  <div className="space-y-2">
                    {group.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {member.name}
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${
                          member.balance >= 0 ? 'text-secondary-600' : 'text-error-600'
                        }`}>
                          {member.balance >= 0 ? '+' : ''}${member.balance.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Add Expense
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No groups found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first group to start splitting expenses'}
          </p>
          {!searchQuery && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Create Your First Group
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Create Group Modal - This could be extracted to a separate component */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Create New Group
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Roommates, Trip to Paris"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows={3}
                  placeholder="Brief description of this group"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Create Group
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}