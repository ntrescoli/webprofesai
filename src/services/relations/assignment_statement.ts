import { supabase } from '../supabaseClient';

export const getAssignmentStatement = async () => {
    let { data: assignment_statements, error } = await supabase
        .from('assignment_statements')
        .select('*')
    return { assignment_statements, error }
}