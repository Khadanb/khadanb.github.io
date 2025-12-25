import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans flex flex-col overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#0f172a_100%)] -z-10" />
      <div className="fixed w-[500px] h-[500px] bg-gradient-to-br from-primary to-secondary blur-[80px] rounded-full opacity-15 animate-blob -z-10" />

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
