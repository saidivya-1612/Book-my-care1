import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const deliveryTimes = [
  'Morning (9 AM - 12 PM)',
  'Afternoon (12 PM - 3 PM)',
  'Evening (3 PM - 6 PM)',
  'Anytime',
];

export function MedicineTab() {
  const { currentUser, medicines, addMedicine, updateMedicineStatus, addAlert } = useApp();

  const [patientName, setPatientName] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('Anytime');

  const handleUploadPrescription = () => {
    if (!patientName || !prescriptionFile || !address || !contact) {
      toast.error('Please fill all fields');
      return;
    }

    const orderId = Math.random().toString(36).substr(2, 9);

    addMedicine({
      name: patientName,
      file: prescriptionFile.name,
      address,
      contact,
      time: deliveryTime,
      user: currentUser!.email,
      status: 'Pending Verification',
      ordered: new Date().toISOString(),
    });

    addAlert(`📋 Prescription uploaded for ${patientName}. Pharmacy verification in progress...`);
    toast.success('Medicine order placed successfully!');

    // Simulate verification after 5 seconds
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('bookmycare_data') || '{}');
      if (orders.medicines && orders.medicines.length > 0) {
        const lastOrder = orders.medicines[orders.medicines.length - 1];
        updateMedicineStatus(lastOrder.id, 'Verified - Out for Delivery');
        addAlert(`✅ Prescription verified! Medicine for ${patientName} will be delivered by end of day to ${address}.`);
        toast.success('Prescription verified! Delivery in progress');
      }
    }, 5000);

    setPatientName('');
    setPrescriptionFile(null);
    setAddress('');
    setContact('');
    setDeliveryTime('Anytime');

    // Reset file input
    const fileInput = document.getElementById('prescriptionFile') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const userOrders = medicines.filter(m => m.user === currentUser?.email);

  return (
    <div className="grid gap-6 lg:grid-cols-2 animate-fade-in">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          💊 Order Medicine
        </h3>

        <div className="space-y-4">
          <div>
            <Label>Patient Name</Label>
            <Input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <Label>Prescription</Label>
            <Input
              id="prescriptionFile"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
              className="cursor-pointer"
            />
          </div>

          <div>
            <Label>Delivery Address</Label>
            <Textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter complete delivery address"
              rows={3}
            />
          </div>

          <div>
            <Label>Contact</Label>
            <Input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <Label>Delivery Time</Label>
            <Select value={deliveryTime} onValueChange={setDeliveryTime}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deliveryTimes.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleUploadPrescription} className="w-full bg-success hover:bg-success/90 btn-hover">
            Place Order
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Your Orders</h3>
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <p className="text-muted-foreground">No orders yet</p>
          ) : (
            userOrders.map((order) => (
              <div key={order.id} className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-semibold">{order.name}</h4>
                <p className="text-sm text-muted-foreground">📋 Prescription: {order.file}</p>
                <p className="text-sm text-muted-foreground">📍 {order.address}</p>
                <p className="text-sm text-muted-foreground">📞 {order.contact}</p>
                <p className="text-sm text-muted-foreground">⏰ Delivery: {order.time}</p>
                <p className="text-sm font-medium text-primary mt-2">Status: {order.status}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
