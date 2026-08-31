import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Calendar, MapPin, Plus, ShieldCheck, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const CreateEventPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Certified verifier profiles from store
  const verifiers = store.getProfiles().filter(p => p.role === 'VERIFIER');

  const [formData, setFormData] = useState({
    title: '',
    sport: 'Badminton',
    category: 'Men & Women Singles U-19',
    event_level: 'District',
    description: '',
    venue: '',
    district: currentUser?.district || 'Pune',
    state: currentUser?.state || 'Maharashtra',
    start_date: '2026-10-10',
    end_date: '2026-10-12',
    registration_deadline: '2026-10-05',
    verifier_id: verifiers.length > 0 ? verifiers[0].id : ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    store.createEvent({
      title: formData.title,
      sport: formData.sport,
      category: formData.category,
      event_level: formData.event_level,
      description: formData.description,
      venue: formData.venue,
      district: formData.district,
      state: formData.state,
      start_date: formData.start_date,
      end_date: formData.end_date,
      registration_deadline: formData.registration_deadline,
      organizer_id: currentUser.id,
      verifier_id: formData.verifier_id || undefined,
      status: 'OPEN'
    });

    navigate('/organizer/events');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        to="/organizer/events"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tournaments
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
          Create Grassroots Tournament
        </h1>
        <p className="text-xs text-slate-500">
          Publish a sanctioned badminton event with assigned independent referee verification
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader
          title="Tournament Specification & Verification Setup"
          subtitle="All fields will be publicly visible to athletes and scouts"
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tournament Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Pune Junior Badminton Championship 2026"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sport</label>
                <input
                  type="text"
                  name="sport"
                  value={formData.sport}
                  disabled
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Competition Level *</label>
                <select
                  name="event_level"
                  value={formData.event_level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                >
                  <option value="District">District Championship</option>
                  <option value="Inter-College">Inter-College Tournament</option>
                  <option value="Grassroots Academy">Grassroots Academy Series</option>
                  <option value="State Open">State Open Invitational</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age / Category *</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Junior U-17 Singles or Open Mixed Doubles"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Technical Verifier *</label>
                <select
                  name="verifier_id"
                  value={formData.verifier_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                >
                  {verifiers.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.full_name} ({v.institution || 'State Referees Board'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Venue Name *</label>
                <input
                  type="text"
                  name="venue"
                  placeholder="e.g. Balewadi Badminton Hall"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District *</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Date *</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registration Deadline *</label>
                <input
                  type="date"
                  name="registration_deadline"
                  value={formData.registration_deadline}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tournament Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Provide tournament regulations, match format (best of 3 sets to 21), and guidelines..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Link to="/organizer/events">
                <Button variant="outline" size="sm">Cancel</Button>
              </Link>
              <Button type="submit" variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Publish Tournament
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
