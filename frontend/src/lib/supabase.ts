import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
})

export interface Profile { id: string; full_name: string; avatar_url: string | null; role: 'freelancer' | 'client' | 'both'; country: string; city: string | null; bio: string | null; website: string | null; phone: string | null; created_at: string; updated_at: string }
export interface FreelancerProfile { id: string; user_id: string; headline: string | null; description: string | null; skills: string[] | null; languages: string[] | null; portfolio_urls: string[] | null; average_rating: number | null; total_reviews: number | null; total_sales: number | null; verified: boolean; available: boolean; created_at: string; updated_at: string }
export interface Service { id: string; freelancer_id: string; category_id: string; title: string; slug: string; description: string; image_url: string | null; gallery_urls: string[] | null; price: number; currency: string; delivery_time_days: number; revisions: number; tags: string[] | null; is_active: boolean; is_featured: boolean; total_orders: number; average_rating: number; created_at: string; updated_at: string }
export interface Order { id: string; order_number: string; client_id: string; freelancer_id: string; service_id: string; status: string; amount: number; currency: string; requirements: string | null; delivery_url: string | null; delivered_at: string | null; completed_at: string | null; cancelled_at: string | null; cancel_reason: string | null; created_at: string; updated_at: string }
export interface Review { id: string; order_id: string; client_id: string; freelancer_id: string; service_id: string; rating: number; comment: string | null; created_at: string }
export interface Category { id: string; name: string; slug: string; description: string | null; icon: string | null; parent_id: string | null; sort_order: number; created_at: string }
