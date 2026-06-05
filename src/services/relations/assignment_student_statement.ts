import { supabase } from '../supabaseClient';

export const getAssignmentStudentsStatement = async () => {
    let { data: assignment_student_statement, error } = await supabase
        .from('assignment_student_statement')
        .select('*')
    return { assignment_student_statement, error }
}