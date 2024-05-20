import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

export const supabaseAdminClient = createClient(process.env.PUBLIC_SUPABASE_URL || '', process.env.PRIVATE_SUPABASE_SERVICE_KEY || '');
