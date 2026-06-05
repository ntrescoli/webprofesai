import { supabase } from '../supabaseClient';

export const getGroupsStudents = async () => {
    let { data: groupsStudents, error } = await supabase
        .from('groups_students')
        .select('*')
    return { groupsStudents, error }
}