import { useState } from 'react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { TerminalView } from './views/TerminalView';
import { GradesView } from './views/GradesView';
import { AssignmentListView } from './views/AssignmentListView';
import { CoursesView } from './views/CoursesView';
import { LandingView } from './views/LandingView';
import { CrearExamenView } from './views/CreateAssignmentView'; // Importamos la nueva vista
import { AssignmentLoginView } from './views/studentPOV/AssignmentLoginView';
import { AssignmentView } from './views/studentPOV/AssignmentView';
import { AssignmentSubmittedView } from './views/studentPOV/AssignmentSubmittedView';

export default function App() {
  const [view, setView] = useState<string>('landing');

  if (view === 'landing') {
    return <LandingView onLogin={() => setView('terminal')} />;
  }

  if (view === 'assignment-login') {
    return <AssignmentLoginView onNavigate={setView}/>;
  }

  if (view === 'assignment') {
    return <AssignmentView onNavigate={setView}/>;
  }

  if (view === 'assignment-submitted') {
    return <AssignmentSubmittedView/>;
  }

  return (
    <DashboardLayout currentView={view} onNavigate={setView}>
      {view === 'terminal' && <TerminalView />}
      {view === 'grades' && <GradesView />}
      {view === 'examenes' && <AssignmentListView />}
      {view === 'cursos' && <CoursesView />}
      {view === 'crear-examen' && <CrearExamenView onCancel={() => setView('examenes')} />}
    </DashboardLayout>
  );
}