import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#146C94] flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-extrabold text-base text-white font-['Outfit']">
                KhelSetu
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering grassroots badminton athletes with tamper-proof tournament verification, digital QR credentials, and objective movement assessments.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Grassroots Workflow
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/athlete/events" className="hover:text-white transition-colors">1. Discover & Register</Link></li>
              <li><Link to="/organizer/events" className="hover:text-white transition-colors">2. Organizer Score Submission</Link></li>
              <li><Link to="/verifier/dashboard" className="hover:text-white transition-colors">3. Independent Verification</Link></li>
              <li><Link to="/verify/KS-PUN-2026-0814" className="hover:text-white transition-colors">4. QR Credential Verification</Link></li>
              <li><Link to="/scout/dashboard" className="hover:text-white transition-colors">5. Scout Talent Search</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Demo Personas
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/athlete/dashboard" className="hover:text-white transition-colors">Athlete: Atharv Dere</Link></li>
              <li><Link to="/organizer/dashboard" className="hover:text-white transition-colors">Organizer: Sanskruti Talmale</Link></li>
              <li><Link to="/verifier/dashboard" className="hover:text-white transition-colors">Verifier: Dr. Nidhi Shende</Link></li>
              <li><Link to="/scout/dashboard" className="hover:text-white transition-colors">Scout: Shubham Wankhede</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Admin: Governance Cell</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Ethical Disclaimers
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              KhelSetu records grassroots tournament achievements. AI assessments provide movement observation only and do NOT offer medical diagnoses or predict professional career success.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} KhelSetu Grassroots Sports Initiative • All demo data is fictional
          </div>
          <div className="flex items-center gap-4">
            <Link to="/verify/KS-PUN-2026-0814" className="hover:text-white">Public Verification</Link>
            <Link to="/login" className="hover:text-white">Demo Logins</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
