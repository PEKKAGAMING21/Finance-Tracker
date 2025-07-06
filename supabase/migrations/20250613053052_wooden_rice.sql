/*
  # Finance Tracker Database Schema

  1. New Tables
    - `profiles` - User profile information
    - `categories` - Expense categories with icons and colors
    - `groups` - User groups for bill splitting
    - `group_members` - Group membership tracking
    - `expenses` - Individual expense records
    - `splits` - Bill splitting information
    - `settlements` - Group settlement tracking
    - `budgets` - User budget management
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure group access and expense sharing
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email text UNIQUE NOT NULL,
    full_name text NOT NULL DEFAULT '',
    avatar_url text,
    phone text,
    currency text DEFAULT 'USD',
    timezone text DEFAULT 'UTC',
    dark_mode boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    icon text NOT NULL DEFAULT 'tag',
    color text NOT NULL DEFAULT '#3B82F6',
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text DEFAULT '',
    icon text DEFAULT 'users',
    color text DEFAULT '#10B981',
    created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    invite_code text UNIQUE DEFAULT encode(gen_random_bytes(6), 'base64'),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Group members table
CREATE TABLE IF NOT EXISTS group_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id uuid REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    role text DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at timestamptz DEFAULT now(),
    UNIQUE(group_id, user_id)
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text DEFAULT '',
    amount decimal(12,2) NOT NULL CHECK (amount > 0),
    category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
    receipt_url text,
    date date NOT NULL DEFAULT CURRENT_DATE,
    is_recurring boolean DEFAULT false,
    recurring_period text CHECK (recurring_period IN ('daily', 'weekly', 'monthly', 'yearly')),
    next_due_date date,
    tags text[] DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Splits table (for bill splitting)
CREATE TABLE IF NOT EXISTS splits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id uuid REFERENCES expenses(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    amount decimal(12,2) NOT NULL CHECK (amount >= 0),
    paid boolean DEFAULT false,
    paid_at timestamptz,
    created_at timestamptz DEFAULT now(),
    UNIQUE(expense_id, user_id)
);

-- Settlements table
CREATE TABLE IF NOT EXISTS settlements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id uuid REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
    from_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    to_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    amount decimal(12,2) NOT NULL CHECK (amount > 0),
    description text DEFAULT '',
    settled boolean DEFAULT false,
    settled_at timestamptz,
    created_at timestamptz DEFAULT now(),
    CHECK (from_user_id != to_user_id)
);

-- Budgets table
CREATE TABLE IF NOT EXISTS budgets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
    amount decimal(12,2) NOT NULL CHECK (amount > 0),
    period text NOT NULL DEFAULT 'monthly' CHECK (period IN ('weekly', 'monthly', 'yearly')),
    start_date date NOT NULL DEFAULT CURRENT_DATE,
    end_date date NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type text DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
    read boolean DEFAULT false,
    action_url text,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies
CREATE POLICY "Users can manage own categories" ON categories
    FOR ALL USING (auth.uid() = user_id);

-- Groups policies
CREATE POLICY "Users can view groups they belong to" ON groups
    FOR SELECT USING (
        auth.uid() = created_by OR 
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = groups.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create groups" ON groups
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group admins can update groups" ON groups
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = groups.id AND user_id = auth.uid() AND role = 'admin'
        )
    );

-- Group members policies
CREATE POLICY "Users can view group members of their groups" ON group_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm2 
            WHERE gm2.group_id = group_members.group_id AND gm2.user_id = auth.uid()
        )
    );

CREATE POLICY "Group admins can manage members" ON group_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM groups g 
            WHERE g.id = group_id AND g.created_by = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM group_members gm 
            WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid() AND gm.role = 'admin'
        )
    );

-- Expenses policies
CREATE POLICY "Users can view expenses they have access to" ON expenses
    FOR SELECT USING (
        auth.uid() = user_id OR
        (group_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = expenses.group_id AND user_id = auth.uid()
        ))
    );

CREATE POLICY "Users can create expenses" ON expenses
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        (group_id IS NULL OR EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = expenses.group_id AND user_id = auth.uid()
        ))
    );

CREATE POLICY "Users can update own expenses" ON expenses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses" ON expenses
    FOR DELETE USING (auth.uid() = user_id);

-- Splits policies
CREATE POLICY "Users can view splits for accessible expenses" ON splits
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM expenses e 
            WHERE e.id = expense_id AND (
                e.user_id = auth.uid() OR 
                (e.group_id IS NOT NULL AND EXISTS (
                    SELECT 1 FROM group_members gm 
                    WHERE gm.group_id = e.group_id AND gm.user_id = auth.uid()
                ))
            )
        )
    );

CREATE POLICY "Expense owners can manage splits" ON splits
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM expenses e 
            WHERE e.id = expense_id AND e.user_id = auth.uid()
        )
    );

-- Settlements policies
CREATE POLICY "Users can view settlements in their groups" ON settlements
    FOR SELECT USING (
        auth.uid() = from_user_id OR 
        auth.uid() = to_user_id OR
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = settlements.group_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create settlements" ON settlements
    FOR INSERT WITH CHECK (
        (auth.uid() = from_user_id OR auth.uid() = to_user_id) AND
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = settlements.group_id AND user_id = auth.uid()
        )
    );

-- Other policies
CREATE POLICY "Users can manage own budgets" ON budgets
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own notifications" ON notifications
    FOR ALL USING (auth.uid() = user_id);

-- Functions and Triggers

-- Function to create default categories for new users
CREATE OR REPLACE FUNCTION create_default_categories()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO categories (name, icon, color, user_id, is_default) VALUES
        ('Food & Dining', 'utensils', '#ef4444', NEW.id, true),
        ('Transportation', 'car', '#f97316', NEW.id, true),
        ('Shopping', 'shopping-bag', '#8b5cf6', NEW.id, true),
        ('Entertainment', 'gamepad', '#06b6d4', NEW.id, true),
        ('Bills & Utilities', 'receipt', '#10b981', NEW.id, true),
        ('Healthcare', 'heart-pulse', '#ec4899', NEW.id, true),
        ('Education', 'graduation-cap', '#3b82f6', NEW.id, true),
        ('Travel', 'plane', '#84cc16', NEW.id, true),
        ('Other', 'more-horizontal', '#6b7280', NEW.id, true);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create default categories
CREATE TRIGGER create_default_categories_trigger
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_default_categories();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_groups_updated_at
    BEFORE UPDATE ON groups
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_expenses_updated_at
    BEFORE UPDATE ON expenses
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_budgets_updated_at
    BEFORE UPDATE ON budgets
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_group_id ON expenses(group_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category_id ON expenses(category_id);
CREATE INDEX IF NOT EXISTS idx_splits_expense_id ON splits(expense_id);
CREATE INDEX IF NOT EXISTS idx_splits_user_id ON splits(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_settlements_group_id ON settlements(group_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);