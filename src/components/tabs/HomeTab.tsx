import { useApp } from '@/context/AppContext';
import { Calendar, Droplets, Pill, Bell, Star, Building2, Stethoscope, FlaskConical, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: <Calendar className="w-12 h-12 text-primary" />,
    title: 'Doctor Appointments',
    description: 'Book appointments with specialists instantly. Choose from various departments and time slots.',
  },
  {
    icon: <Droplets className="w-12 h-12 text-destructive" />,
    title: 'Blood Donation',
    description: 'Register as a donor or request blood in emergencies. Connect with nearby donors quickly.',
  },
  {
    icon: <Pill className="w-12 h-12 text-primary" />,
    title: 'Medicine Delivery',
    description: 'Upload prescriptions and get medicines delivered to your doorstep the same day.',
  },
  {
    icon: <Bell className="w-12 h-12 text-warning" />,
    title: 'Smart Alerts',
    description: 'Get timely reminders for appointments, blood donation requests, and order updates.',
  },
];

const doctors = [
  { name: 'Dr. Sarah Anderson', specialty: 'Cardiologist', rating: 4.9, experience: '15+ years', qualification: 'MBBS, MD Cardiology', availability: 'Mon-Fri' },
  { name: 'Dr. Michael Chen', specialty: 'Dentist', rating: 4.8, experience: '12+ years', qualification: 'BDS, MDS', availability: 'All Days' },
  { name: 'Dr. Emily Roberts', specialty: 'Dermatologist', rating: 4.9, experience: '10+ years', qualification: 'MBBS, MD Dermatology', availability: 'Tue-Sat' },
  { name: 'Dr. James Wilson', specialty: 'Neurologist', rating: 4.7, experience: '18+ years', qualification: 'MBBS, DM Neurology', availability: 'Mon-Sat' },
];

const facilities = [
  { icon: <Building2 className="w-12 h-12 text-primary" />, title: 'Intensive Care Unit', description: 'Advanced ICU with 24/7 monitoring and life support systems for critical patients' },
  { icon: <Stethoscope className="w-12 h-12 text-primary" />, title: 'Operation Theatres', description: 'Fully equipped surgical suites with advanced technology and sterile environment' },
  { icon: <FlaskConical className="w-12 h-12 text-primary" />, title: 'Diagnostic Laboratory', description: 'State-of-the-art lab with accurate and quick test results for all diagnostics' },
  { icon: <Clock className="w-12 h-12 text-primary" />, title: '24/7 Pharmacy', description: 'Well-stocked pharmacy with all essential medications available round the clock' },
];

const testimonials = [
  { quote: 'Excellent service! The appointment booking was seamless and the doctors were very professional. Highly recommended!', author: 'Rajesh Kumar, Hyderabad', rating: 5 },
  { quote: 'The blood donation feature is amazing. I was able to find a donor within minutes during an emergency. Thank you BookMyCare!', author: 'Priya Sharma, Chennai', rating: 5 },
  { quote: 'Medicine delivery service is super convenient. Got my prescription medicines delivered the same day. Great platform!', author: 'Amit Patel, Mumbai', rating: 5 },
];

export function HomeTab() {
  const { appointments, donors, medicines, alerts } = useApp();

  const stats = [
    { label: 'Appointments', count: appointments.length, icon: <Calendar className="w-6 h-6 text-primary" /> },
    { label: 'Blood Donors', count: donors.length, icon: <Droplets className="w-6 h-6 text-destructive" /> },
    { label: 'Medicine Orders', count: medicines.length, icon: <Pill className="w-6 h-6 text-success" /> },
    { label: 'Alerts', count: alerts.length, icon: <Bell className="w-6 h-6 text-warning" /> },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Banner */}
      <div className="gradient-primary rounded-xl p-12 md:p-16 text-center text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_70%)] animate-pulse-glow" />
        <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">Welcome to BookMyCare!</h2>
        <p className="text-lg md:text-xl opacity-90 relative z-10">Your Complete Healthcare Management Platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center card-hover">
            <div className="flex justify-center mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-primary mb-1">{stat.count}</div>
            <div className="text-muted-foreground text-sm">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">Our Medical Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="p-8 text-center card-hover">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Expert Doctors */}
      <Card className="p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">Meet Our Expert Doctors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="bg-muted/50 rounded-xl p-6 card-hover">
              <h4 className="font-semibold text-lg mb-1">{doctor.name}</h4>
              <div className="text-primary font-medium mb-2">{doctor.specialty}</div>
              <div className="flex items-center gap-1 text-warning mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-foreground ml-1">{doctor.rating}/5</span>
              </div>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>{doctor.experience} experience</p>
                <p>{doctor.qualification}</p>
                <p>Available {doctor.availability}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Medical Facilities */}
      <Card className="p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">Our Medical Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <div key={facility.title} className="text-center p-6 card-hover rounded-xl">
              <div className="flex justify-center mb-4">{facility.icon}</div>
              <h3 className="text-lg font-semibold text-primary mb-2">{facility.title}</h3>
              <p className="text-muted-foreground text-sm">{facility.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Testimonials */}
      <div className="gradient-primary rounded-xl p-8 md:p-12 text-primary-foreground">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Our Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex gap-1 text-warning mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <p className="font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
