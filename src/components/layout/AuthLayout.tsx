import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      
    <div className="pt-6">
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-primary-700 hover:text-primary-900 transition-colors">
          <Sparkles className="h-6 w-6 text-primary-600" />
          <span>Suzao</span>
        </Link>
      </div>

      {/* Main content outlet */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;