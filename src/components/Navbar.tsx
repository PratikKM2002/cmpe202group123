import Link from 'next/link';
import { FaUtensils } from 'react-icons/fa';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useBusinessAuth } from '@/hooks/useBusinessAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { isAuthenticated: isUserAuthenticated } = useUserAuth();
  const { isAuthenticated: isBusinessAuthenticated } = useBusinessAuth();
  const { isAuthenticated: isAdminAuthenticated } = useAdminAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Try to get the username from localStorage
    const name = localStorage.getItem('user-name');
    setUsername(name);
    // Listen for storage changes (e.g., login/logout in other tabs)
    const handleStorage = () => {
      setUsername(localStorage.getItem('user-name'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [isUserAuthenticated, isBusinessAuthenticated, isAdminAuthenticated]);

  const handleLogout = () => {
    // Clear all possible tokens
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-token-expiration');
    localStorage.removeItem('user-name');
    localStorage.removeItem('business-token');
    localStorage.removeItem('business-token-expiration');
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-token-expiration');
    toast({
      description: "Logged out successfully",
    });
    setUsername(null);
    router.push('/restaurants');
  };

  const isAuthenticated = isUserAuthenticated || isBusinessAuthenticated || isAdminAuthenticated;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-orange-600">
          <FaUtensils className="text-orange-500" />
          DineReserve
        </Link>
        <nav className="flex flex-wrap gap-2 md:gap-6 items-center mt-2 md:mt-0">
          {[
            { href: '/restaurants', label: 'Restaurants' },
            { href: '/search', label: 'Search-by-zipcode' },
            { href: '/my-bookings', label: 'My Bookings' },
            { href: '/business-owner', label: 'Business-Owner' },
            { href: '/admin', label: 'Admin-Dashboard' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-orange-600 font-medium transition px-3 py-1 rounded-lg hover:bg-orange-50"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              {username && (
                <span className="text-gray-700 font-medium px-3 py-1">Welcome, {username}</span>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-orange-600 font-medium transition px-3 py-1 rounded-lg hover:bg-orange-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/user/login"
              className="text-gray-700 hover:text-orange-600 font-medium transition px-3 py-1 rounded-lg hover:bg-orange-50"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}