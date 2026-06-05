import { useEffect, useState } from 'react';
import { getGroups } from '../services/groups';
import { getStudents } from '../services/students';
import { getGroupsStudents } from '../services/relations/groups_students';

interface Group {
  id_group: string;
  name: string;
}

interface Student {
  id_student: string;
  name: string;
  surname: string;
}

interface GroupStudent {
  id_group: string;
  id_student: string;
}

export const AlumnosView = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [groupsStudents, setGroupsStudents] = useState<GroupStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [groupsResult, studentsResult, groupsStudentsResult] = await Promise.all([
          getGroups(),
          getStudents(),
          getGroupsStudents()
        ]);

        if (groupsResult.error) throw groupsResult.error;
        if (groupsResult.groups) setGroups(groupsResult.groups);

        if (studentsResult.error) throw studentsResult.error;
        if (studentsResult.students) setStudents(studentsResult.students);

        if (groupsStudentsResult.error) throw groupsStudentsResult.error;
        if (groupsStudentsResult.groupsStudents) setGroupsStudents(groupsStudentsResult.groupsStudents);
      } catch (err) {
        console.error('Error cargando datos de Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Cargando datos desde Supabase...</div>;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const studentsById = new Map(students.map((student) => [student.id_student, student]));

  const groupsWithStudents = groups.map((group) => ({
    group,
    students: groupsStudents
      .filter((groupStudent) => groupStudent.id_group === group.id_group)
      .map((groupStudent) => studentsById.get(groupStudent.id_student))
      .filter((student): student is Student => Boolean(student))
  }));

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Panel de Control de Alumnos</h2>
        <p className="text-sm text-slate-400">Resultados de los scripts ejecutados sobre el contenedor virtual.</p>
      </div>

      {groups.length === 0 ? (
        <p className="text-sm text-slate-500">No hay grupos creados en la base de datos.</p>
      ) : (
        groupsWithStudents.map(({ group, students: groupStudents }) => (
          <section key={group.id_group} className="space-y-3">
            <h3 className="text-lg font-medium text-emerald-400">Grupo: {group.name}</h3>
            <div className="border border-distro-border rounded-xl bg-distro-header/30 overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-distro-border bg-distro-header/70 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Alumno</th>
                    <th className="p-4">Práctica 1</th>
                    <th className="p-4">Práctica 2</th>
                    <th className="p-4">Práctica 3</th>
                    <th className="p-4">Práctica 4</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-distro-border/40 text-slate-300">
                  {groupStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-slate-500 italic">
                        No hay alumnos asignados a este grupo.
                      </td>
                    </tr>
                  ) : (
                    groupStudents.map((student) => (
                      <tr key={student.id_student} className="hover:bg-distro-header/40 transition">
                        <td className="p-4 font-medium text-white flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-distro-border flex items-center justify-center font-bold text-xs text-distro-text">
                            {getInitials(`${student.name} ${student.surname}`)}
                          </div>
                          <span>{student.name} {student.surname || ''}</span>
                        </td>
                        <td className="p-4 text-slate-500 italic">Sin entregar</td>
                        <td className="p-4 text-right text-slate-500">-</td>
                        <td className="p-4 text-right text-slate-500">-</td>
                        <td className="p-4 text-right text-slate-500">-</td>
                        <td className="p-4 text-right text-slate-500">-</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </div>
  );
};