import { useEffect, useState } from 'react';
import { getAssignments } from '../services/assignments';

interface Assignment {
  id_asignment: string;
  title: string;
  description: string;
}

export const AssignmentsView = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const assignmentsResult = await getAssignments();
        if (assignmentsResult.error) throw assignmentsResult.error;
        if (assignmentsResult.assignments) setAssignments(assignmentsResult.assignments);
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

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Exámenes Disponibles</h2>
        <p className="text-sm text-slate-400">Banco de evaluaciones automáticas por validación de estado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((e) => (
          <div key={e.id_asignment} className="border border-distro-border bg-distro-header/20 rounded-xl p-5 flex flex-col justify-between hover:border-distro-accent/40 transition shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-bold font-mono tracking-wide uppercase rounded border border-distro-accent/30 bg-distro-accent/10 text-distro-accent">
                  intermedio
                </span>
                {/* {e.activo && (
                  <span className="text-xs font-medium text-emerald-400 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span> Desplegado
                  </span>
                )} */}
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{e.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{e.description}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-distro-border/50 flex justify-end">
              <button className="text-xs font-bold text-distro-accent hover:text-white transition">
                Configurar Parámetros &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};