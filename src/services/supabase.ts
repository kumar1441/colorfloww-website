import { createClient } from '@supabase/supabase-js';

const url  = import.meta.env.VITE_SUPABASE_URL  as string;
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key);

export interface ShareRow {
    id: string;
    color_hex: string;
    color_name: string;
    sharer_image_url: string | null;
    visit_count: number;
    created_at: string;
}

export async function getShare(shareId: string): Promise<ShareRow | null> {
    const { data, error } = await supabase
        .from('shares')
        .select('*')
        .eq('id', shareId)
        .single();

    if (error || !data) return null;
    return data as ShareRow;
}
