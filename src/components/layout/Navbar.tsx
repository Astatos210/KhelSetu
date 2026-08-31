import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Award,
  ChevronDown,
  Compass,
  FileCheck2,
  FolderLock,
  Layers,
  
  Menu,
  
  Search,
  ShieldCheck,
  Trophy,
  User,
  X,
  
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { RoleBadge } from '../common/Badge';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'ATHLETE', label: 'Aarav Joshi (Athlete)', desc: 'Register for events & test movement' },
    { role: 'ORGANIZER', label: 'Vikram Malhotra (Organizer)', desc: 'Manage events & submit results' },
    { role: 'VERIFIER', label: 'Dr. Sunita Rao (Verifier)', desc: 'Independent review & approval' },
    { role: 'SCOUT', label: 'Rajesh Kadam (Scout)', desc: 'Discover verified grassroots talent' },
    { role: 'ADMIN', label: 'Platform Admin', desc: 'System governance & audit log' }
  ];

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);

    // Auto-navigate to role dashboard
    switch (role) {
      case 'ATHLETE':
        navigate('/athlete/dashboard');
        break;
      case 'ORGANIZER':
        navigate('/organizer/dashboard');
        break;
      case 'VERIFIER':
        navigate('/verifier/dashboard');
        break;
      case 'SCOUT':
        navigate('/scout/dashboard');
        break;
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
    }
  };

  const getNavLinks = () => {
    switch (currentRole) {
      case 'ATHLETE':
        return [
          { name: 'Dashboard', path: '/athlete/dashboard', icon: Layers },
          { name: 'Discover Events', path: '/athlete/events', icon: Compass },
          { name: 'My Achievements', path: '/athlete/achievements', icon: Trophy },
          { name: 'AI Movement Test', path: '/athlete/movement-test', icon: Activity },
          { name: 'Profile', path: '/athlete/profile', icon: User }
        ];
      case 'ORGANIZER':
        return [
          { name: 'Dashboard', path: '/organizer/dashboard', icon: Layers },
          { name: 'My Events', path: '/organizer/events', icon: Trophy },
          { name: '+ Create Event', path: '/organizer/events/new', icon: Award }
        ];
      case 'VERIFIER':
        return [
          { name: 'Review Queue', path: '/verifier/dashboard', icon: FileCheck2 }
        ];
      case 'SCOUT':
        return [
          { name: 'Scout Talent', path: '/scout/dashboard', icon: Search }
        ];
      case 'ADMIN':
        return [
          { name: 'Overview', path: '/admin/dashboard', icon: Layers },
          { name: 'Organizations', path: '/admin/organizations', icon: ShieldCheck },
          { name: 'Audit Trail', path: '/admin/audit-log', icon: FolderLock }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#12355B] to-[#146C94] flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-[#12355B] font-['Outfit']">
                  Khel<span className="text-[#146C94]">Setu</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 -mt-1">
                  खेल सेतु • Verified
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#12355B]/10 text-[#12355B]'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action / Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-left transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                  <img
                    src={currentUser?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={currentUser?.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser?.full_name?.split(' ')[0]}
                    </span>
                    {currentRole && <RoleBadge role={currentRole} />}
                  </div>
                  <span className="text-[10px] text-slate-400 block -mt-0.5">Click to switch role</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-0.5" />
              </button>

              {/* Dropdown Menu */}
              {roleDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setRoleDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-slate-200 z-30 py-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Switch Persona
                      </p>
                    </div>

                    <div className="p-1 space-y-1">
                      {roles.map((r) => (
                        <button
                          key={r.role}
                          onClick={() => handleRoleSelect(r.role)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                            currentRole === r.role
                              ? 'bg-[#12355B]/10 font-bold text-[#12355B]'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <RoleBadge role={r.role} />
                          <div className="min-w-0">
                            <span className="block font-semibold truncate">{r.label}</span>
                            <span className="block text-[10px] text-slate-400 truncate">{r.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="px-3 pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-xs">
                      <Link
                        to="/login"
                        onClick={() => setRoleDropdownOpen(false)}
                        className="text-[#146C94] hover:underline font-medium"
                      >
                        All Login Accounts
                      </Link>
                      <Link
                        to="/"
                        onClick={() => setRoleDropdownOpen(false)}
                        className="text-slate-500 hover:text-slate-800"
                      >
                        Public Home
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive ? 'bg-[#12355B]/10 text-[#12355B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-slate-600">
              Home
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-[#146C94] font-medium">
              Demo Logins
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
