# FinanceTracker Pro 💰

A comprehensive, production-ready finance tracking web application inspired by Splitwise. Built with React, TypeScript, Tailwind CSS, and Supabase for seamless expense management, bill splitting, and smart financial insights.

![FinanceTracker Pro](https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🔐 User Management
- **Secure Authentication**: Email/password signup and login with JWT
- **Profile Management**: Edit profile, update preferences, and manage account settings
- **Password Security**: Change passwords with validation and security checks

### 💸 Expense Tracking
- **Smart Expense Entry**: Add expenses with categories, descriptions, and receipt uploads
- **Category Management**: Pre-defined categories with custom icons and colors
- **Recurring Expenses**: Set up automatic recurring bills and subscriptions
- **Receipt Storage**: Upload and store receipt images for record keeping

### 🤝 Bill Splitting (Splitwise-inspired)
- **Group Management**: Create and manage expense groups with friends/roommates
- **Flexible Splitting**: Equal splits, custom amounts, or percentage-based divisions
- **Real-time Balances**: Track who owes whom with live balance updates
- **Settlement Tracking**: Mark payments as settled and maintain payment history
- **Group Invitations**: Invite members via shareable links

### 📊 Data Visualization & Analytics
- **Interactive Charts**: Line graphs for spending trends, pie charts for category breakdown
- **Time-based Analysis**: Daily, weekly, monthly, and yearly expense views
- **Comparative Analytics**: Compare spending across different periods
- **Export Functionality**: Download expense data in CSV format

### 🧠 Smart Financial Insights
- **AI-Powered Suggestions**: Get personalized recommendations to optimize spending
- **Budget Alerts**: Notifications when approaching or exceeding budget limits
- **Spending Predictions**: Forecast future expenses based on historical data
- **Financial Health Score**: Overall assessment of spending habits

### 🔔 Notifications & Reminders
- **Due Date Alerts**: Reminders for upcoming bills and recurring expenses
- **Settlement Notifications**: Alerts for pending group settlements
- **Budget Warnings**: Notifications when overspending in categories
- **Weekly Reports**: Automated spending summaries

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, utility-first styling
- **Framer Motion** for smooth animations and transitions
- **Recharts** for beautiful, interactive data visualizations
- **React Router** for client-side routing
- **React Hot Toast** for elegant notifications

### Backend & Database
- **Supabase** for backend-as-a-service
- **PostgreSQL** database with Row Level Security (RLS)
- **Real-time subscriptions** for live data updates
- **File storage** for receipt uploads

### Development Tools
- **TypeScript** for enhanced developer experience
- **ESLint** for code quality and consistency
- **PostCSS & Autoprefixer** for CSS processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/financetracker-pro.git
   cd financetracker-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the database migrations (see Database Setup below)

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

### Database Setup

The application includes comprehensive database migrations. In your Supabase dashboard:

1. Go to the SQL Editor
2. Copy and paste the contents of `supabase/migrations/create_finance_tracker_schema.sql`
3. Run the migration to set up all tables, policies, and functions

## 📱 Usage Guide

### Getting Started
1. **Sign Up**: Create your account with email and password
2. **Set Up Profile**: Add your name, currency preference, and timezone
3. **Create Categories**: Default categories are provided, or create custom ones
4. **Add Your First Expense**: Start tracking with the "Add Expense" feature

### Managing Groups
1. **Create a Group**: Use the "Create Group" button in the Groups section
2. **Invite Members**: Share the group invite link with friends
3. **Add Group Expenses**: Select the group when adding expenses to split costs
4. **Settle Up**: Mark payments as settled when money is exchanged

### Viewing Analytics
- **Dashboard**: Get an overview of your financial health
- **History**: Browse and filter all your expenses
- **Charts**: Analyze spending patterns with interactive visualizations
- **Export**: Download your data for external analysis

## 🎨 Design Philosophy

FinanceTracker Pro follows modern design principles:

- **Apple-level Aesthetics**: Clean, intuitive interface with attention to detail
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode Support**: Automatic theme switching with user preference
- **Accessibility**: WCAG compliant with proper contrast ratios and keyboard navigation
- **Microinteractions**: Subtle animations that enhance user experience

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level security ensuring users only access their data
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Client and server-side validation for all user inputs
- **HTTPS Only**: Secure data transmission in production
- **Password Hashing**: Secure password storage with bcrypt

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema:

- **profiles**: User profile information
- **categories**: Expense categories with icons and colors
- **groups**: User groups for bill splitting
- **group_members**: Group membership tracking
- **expenses**: Individual expense records
- **splits**: Bill splitting information
- **settlements**: Group settlement tracking
- **budgets**: User budget management
- **notifications**: User notifications

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
1. Build: `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure environment variables

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Splitwise** for inspiration on bill splitting UX
- **Supabase** for providing an excellent backend platform
- **Tailwind CSS** for the utility-first CSS framework
- **Recharts** for beautiful chart components
- **Framer Motion** for smooth animations

## 📞 Support

- **Documentation**: [docs.financetracker.app](https://docs.financetracker.app)
- **Issues**: [GitHub Issues](https://github.com/yourusername/financetracker-pro/issues)
- **Email**: support@financetracker.app
- **Discord**: [Join our community](https://discord.gg/financetracker)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] Bank account integration
- [ ] Advanced budgeting tools
- [ ] Investment tracking
- [ ] Multi-currency support
- [ ] API for third-party integrations
- [ ] Advanced reporting and analytics
- [ ] Team collaboration features

---

**Built with ❤️ by the FinanceTracker team**

*Making personal finance management simple, social, and smart.*