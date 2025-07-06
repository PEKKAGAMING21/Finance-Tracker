import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  user_id: string;
}

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category_id: string;
  user_id: string;
  group_id?: string;
  receipt_url?: string;
  date: string;
  is_recurring: boolean;
  recurring_period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  created_at: string;
  category?: Category;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_by: string;
  created_at: string;
  members?: GroupMember[];
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  user?: User;
}

export interface Split {
  id: string;
  expense_id: string;
  user_id: string;
  amount: number;
  paid: boolean;
  created_at: string;
}

export interface Settlement {
  id: string;
  group_id: string;
  from_user_id: string;
  to_user_id: string;
  amount: number;
  settled: boolean;
  settled_at?: string;
  created_at: string;
}