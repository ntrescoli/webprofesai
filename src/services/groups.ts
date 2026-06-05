import { supabase } from '../services/supabaseClient';

export const getGroups = async () => {
    let { data: groups, error } = await supabase
        .from('groups')
        .select('*')
    return { groups, error }
}