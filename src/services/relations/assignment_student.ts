import { supabase } from '../supabaseClient';

export const getAssignmentStudents = async () => {
    let { data: assignment_student, error } = await supabase
        .from('assignment_student')
        .select('*')
    return { assignment_student, error }
}