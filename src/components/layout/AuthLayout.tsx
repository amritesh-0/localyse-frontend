import { Outlet, Link } from 'react-router-dom';
import Logo from '../../../public/assets/Logo.png';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      
    <div className="pt-6">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
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
