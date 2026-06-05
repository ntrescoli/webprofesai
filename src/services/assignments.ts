import { supabase } from './supabaseClient';

export const getAssignments = async () => {
    let { data: assignments, error } = await supabase
        .from('assignments')
        .select('*')
    return { assignments, error }
}