import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { CPSPunisherLogo } from './CPSPunisherLogo';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Crown,
  Star,
  Scale,
  Building2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CheckoutPageProps {
  tier: 'essential' | 'professional' | 'attorney' | 'enterprise';
  onBack: () => void;
  onSuccess: () => void;
}

const tierDetails = {
  essential: {
    name: 'Essential',
    price: 39,
    icon: Star,
    color: 'from-blue-400 to-blue-600',
    features: ['3 Active Cases', '25 Document Uploads', 'AI Analysis (25 credits)', 'PDF Export']
  },
  professional: {
    name: 'Professional',
    price: 79,
    icon: Crown,
    color: 'from-purple-400 to-purple-600',
    features: ['Unlimited Cases', 'Unlimited Documents', 'AI Analysis (100 credits)', 'Legal Research']
  },
  attorney: {
    name: 'Attorney Suite',
    price: 299,
    icon: Scale,
    color: 'from-amber-400 to-amber-600',
    features: ['Everything in Professional', 'AI Legal Assistant', 'Federal Litigation Tools', 'Multi-Client Management']
  },
  enterprise: {
    name: 'Enterprise',
    price: 999,
    icon: Building2,
    color: 'from-rose-400 to-rose-600',
    features: ['Everything in Attorney', 'Unlimited Team Members', 'Custom Branding', 'Dedicated Support']
  }
};

export function CheckoutPage({ tier, onBack, onSuccess }: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment Info
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Billing Info
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const details = tierDetails[tier];
  const TierIcon = details.icon;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!cardName.trim()) {
      newErrors.cardName = 'Please enter cardholder name';
    }
    if (!expiryDate || expiryDate.length !== 5) {
      newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
    }
    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Please enter valid CVV';
    }
    if (!email || !email.includes('@')) {
      newErrors.email = 'Please enter valid email';
    }
    if (!address.trim()) {
      newErrors.address = 'Please enter billing address';
    }
    if (!city.trim()) {
      newErrors.city = 'Please enter city';
    }
    if (!state.trim()) {
      newErrors.state = 'Please enter state';
    }
    if (!zipCode.trim()) {
      newErrors.zipCode = 'Please enter ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing (In production, use Stripe API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo: Save subscription to localStorage
      localStorage.setItem('cps_user_tier', tier);
      localStorage.setItem('cps_subscription_status', 'active');
      localStorage.setItem('cps_subscription_date', new Date().toISOString());

      toast.success('Payment successful! Welcome to ' + details.name);
      onSuccess();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <CPSPunisherLogo size="small" showText={true} variant="image" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Information */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <Label htmlFor="cardNumber" className="text-gray-900">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className={`mt-1 ${errors.cardNumber ? 'border-red-500' : ''}`}
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <Label htmlFor="cardName" className="text-gray-900">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className={`mt-1 ${errors.cardName ? 'border-red-500' : ''}`}
                    />
                    {errors.cardName && (
                      <p className="text-xs text-red-600 mt-1">{errors.cardName}</p>
                    )}
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-gray-900">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        className={`mt-1 ${errors.expiryDate ? 'border-red-500' : ''}`}
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-xs text-red-600 mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-gray-900">CVV *</Label>
                      <Input
                        id="cvv"
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        placeholder="123"
                        className={`mt-1 ${errors.cvv ? 'border-red-500' : ''}`}
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Billing Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Billing Information</h2>

                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gray-900">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-gray-900">Street Address *</Label>
                    <Input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main Street"
                      className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-900">City *</Label>
                      <Input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New York"
                        className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-gray-900">State *</Label>
                      <Input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="NY"
                        className={`mt-1 ${errors.state ? 'border-red-500' : ''}`}
                      />
                      {errors.state && (
                        <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <Label htmlFor="zipCode" className="text-gray-900">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="10001"
                      className={`mt-1 ${errors.zipCode ? 'border-red-500' : ''}`}
                    />
                    {errors.zipCode && (
                      <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country" className="text-gray-900">Country *</Label>
                    <Input
                      id="country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-1"
                      readOnly
                    />
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Complete Purchase - ${details.price}/month
                  </>
                )}
              </Button>

              {/* Security Notice */}
              <Alert className="border-green-300 bg-green-50">
                <Shield className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-900 text-sm">
                  <strong>Secure Payment:</strong> All transactions are encrypted and secure. 
                  Your payment information is never stored on our servers.
                </AlertDescription>
              </Alert>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-6 border-2 border-purple-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>

                {/* Selected Plan */}
                <div className={`p-4 rounded-lg bg-gradient-to-r ${details.color} mb-4`}>
                  <div className="flex items-center gap-3 mb-2">
                    <TierIcon className="w-8 h-8 text-white" />
                    <div>
                      <div className="font-bold text-white text-lg">{details.name}</div>
                      <div className="text-white/80 text-sm">Monthly Subscription</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {details.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>{details.name} Plan</span>
                    <span>${details.price}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Due Today</span>
                    <span>${details.price}.00</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Billed monthly. Cancel anytime.
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Money-Back Guarantee */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-green-900">30-Day Money-Back Guarantee</div>
                      <div className="text-xs text-green-700">Risk-free trial. Full refund if not satisfied.</div>
                    </div>
                  </div>
                </div>

                {/* Demo Note */}
                <Alert className="mt-4 border-blue-300 bg-blue-50">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  <AlertDescription className="text-blue-900 text-xs">
                    <strong>Demo Mode:</strong> This is a demonstration. No real charges will be made. 
                    Use any test card number (e.g., 4242 4242 4242 4242).
                  </AlertDescription>
                </Alert>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
