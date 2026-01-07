import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export function BloodTab() {
  const { currentUser, donors, addDonor, addBloodRequest, addAlert, getMatchingDonors } = useApp();

  // Donor form
  const [donorName, setDonorName] = useState('');
  const [donorBlood, setDonorBlood] = useState('');
  const [donorAge, setDonorAge] = useState('');
  const [donorContact, setDonorContact] = useState('');
  const [donorArea, setDonorArea] = useState('');

  // Request form
  const [requestName, setRequestName] = useState('');
  const [requestBlood, setRequestBlood] = useState('');
  const [requestHospital, setRequestHospital] = useState('');
  const [requestLocation, setRequestLocation] = useState('');
  const [requestContact, setRequestContact] = useState('');

  const handleRegisterDonor = () => {
    if (!donorName || !donorBlood || !donorAge || !donorContact || !donorArea) {
      toast.error('Please fill all fields');
      return;
    }

    const age = parseInt(donorAge);
    if (age < 18 || age > 65) {
      toast.error('Age must be between 18 and 65');
      return;
    }

    addDonor({
      name: donorName,
      blood: donorBlood,
      age,
      contact: donorContact,
      area: donorArea,
      user: currentUser!.email,
      registered: new Date().toISOString(),
    });

    addAlert(`✅ Successfully registered as ${donorBlood} blood donor in ${donorArea}`);
    toast.success('Registered as donor successfully!');

    setDonorName('');
    setDonorBlood('');
    setDonorAge('');
    setDonorContact('');
    setDonorArea('');
  };

  const handleRequestBlood = () => {
    if (!requestName || !requestBlood || !requestHospital || !requestLocation || !requestContact) {
      toast.error('Please fill all fields');
      return;
    }

    addBloodRequest({
      name: requestName,
      blood: requestBlood,
      hospital: requestHospital,
      location: requestLocation,
      contact: requestContact,
      user: currentUser!.email,
      requested: new Date().toISOString(),
    });

    const matching = getMatchingDonors(requestBlood, requestLocation);

    if (matching.length > 0) {
      addAlert(`🩸 URGENT: ${requestBlood} blood needed for ${requestName} at ${requestHospital}, ${requestLocation}. ${matching.length} matching donor(s) found nearby!`);
      toast.success(`Found ${matching.length} ${requestBlood} donor(s) nearby!`);
      matching.forEach(() => {
        addAlert(`🆘 Blood donation request: ${requestBlood} needed at ${requestHospital}, ${requestLocation}. Contact: ${requestContact}`);
      });
    } else {
      addAlert(`⚠️ Blood request placed for ${requestBlood}. No nearby donors available yet. We'll notify you when donors register.`);
      toast.warning('No matching donors found nearby');
    }

    setRequestName('');
    setRequestBlood('');
    setRequestHospital('');
    setRequestLocation('');
    setRequestContact('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            🩸 Register as Donor
          </h3>

          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label>Blood Group</Label>
              <Select value={donorBlood} onValueChange={setDonorBlood}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Age</Label>
              <Input
                type="number"
                value={donorAge}
                onChange={(e) => setDonorAge(e.target.value)}
                placeholder="18-65"
                min={18}
                max={65}
              />
            </div>

            <div>
              <Label>Contact</Label>
              <Input
                type="tel"
                value={donorContact}
                onChange={(e) => setDonorContact(e.target.value)}
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <Label>Area</Label>
              <Input
                value={donorArea}
                onChange={(e) => setDonorArea(e.target.value)}
                placeholder="Enter your area/locality"
              />
            </div>

            <Button onClick={handleRegisterDonor} variant="destructive" className="w-full btn-hover">
              Register as Donor
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            🆘 Request Blood
          </h3>

          <div className="space-y-4">
            <div>
              <Label>Patient Name</Label>
              <Input
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                placeholder="Enter patient name"
              />
            </div>

            <div>
              <Label>Blood Group Needed</Label>
              <Select value={requestBlood} onValueChange={setRequestBlood}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Hospital</Label>
              <Input
                value={requestHospital}
                onChange={(e) => setRequestHospital(e.target.value)}
                placeholder="Enter hospital name"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={requestLocation}
                onChange={(e) => setRequestLocation(e.target.value)}
                placeholder="Enter location/area"
              />
            </div>

            <div>
              <Label>Contact</Label>
              <Input
                type="tel"
                value={requestContact}
                onChange={(e) => setRequestContact(e.target.value)}
                placeholder="Enter contact number"
              />
            </div>

            <Button onClick={handleRequestBlood} variant="destructive" className="w-full btn-hover">
              Request Blood
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Registered Donors</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donors.length === 0 ? (
            <p className="text-muted-foreground">No donors yet</p>
          ) : (
            donors.slice(-10).reverse().map((donor) => (
              <div key={donor.id} className="bg-muted/50 p-4 rounded-lg border-l-4 border-destructive">
                <h4 className="font-semibold">{donor.name} ({donor.age} years) - {donor.blood}</h4>
                <p className="text-sm text-muted-foreground">📍 {donor.area}</p>
                <p className="text-sm text-muted-foreground">📞 {donor.contact}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
