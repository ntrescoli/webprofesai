import { useState } from 'react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { TerminalView } from './views/TerminalView';
import { AlumnosView } from './views/StudentsView';
import { AssignmentsView } from './views/AssignmentsView';
import { LandingView } from './views/LandingView';
import { CrearExamenView } from './views/CreateAssignmentView'; // Importamos la nueva vista

export default function App() {
  const [view, setView] = useState<string>('landing');

  if (view === 'landing') {
    return <LandingView onLogin={() => setView('terminal')} />;
  }

  return (
    <DashboardLayout currentView={view} onNavigate={setView}>
      {view === 'terminal' && <TerminalView />}
      {view === 'alumnos' && <AlumnosView />}
      {view === 'examenes' && <AssignmentsView />}
      {view === 'crear-examen' && <CrearExamenView onCancel={() => setView('examenes')} />}
    </DashboardLayout>
  );
}