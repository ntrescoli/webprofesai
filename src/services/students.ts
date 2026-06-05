import { supabase } from '../services/supabaseClient';

export const getStudents = async () => {
    let { data: students, error } = await supabase
        .from('students')
        .select('*')
    return { students, error }
}