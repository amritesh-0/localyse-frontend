import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { accountDeletionApi } from '../../services/accountDeletionApi';

const AccountDeletionRequestPage = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [requestType, setRequestType] = useState<'full' | 'partial'>('full');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await accountDeletionApi.submitRequest({ email, reason, requestType, details });
      setStatus('success');
      setEmail('');
      setReason('');
      setDetails('');
    } catch (error: any) {
      console.error('Error submitting deletion request:', error);
      setStatus('error');
      setErrorMessage(error.response?.data?.error || 'Failed to submit request. Please try again later.');
    }
  };

  return (
    <div className="py-16">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-10 text-center">
            <h1 className="mb-4 font-bold text-slate-900">Deletion Request</h1>
            <p className="text-lg text-slate-600">
              Please let us know if you'd like to delete your entire account or just specific data.
            </p>
          </div>

          <Card padding="lg">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                  <CheckCircle size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Request Submitted</h3>
                <p className="mb-6 max-w-md text-slate-600">
                  Your request has been received. Our team will process it within 7 business days and confirm once the requested data has been deleted.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setStatus('idle')}
                >
                  Go Back
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Request Type</label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setRequestType('full')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        requestType === 'full'
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-medium">Full Account Deletion</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        requestType === 'full' ? 'border-primary-600' : 'border-slate-300'
                      }`}>
                        {requestType === 'full' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRequestType('partial')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        requestType === 'partial'
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-medium">Partial Data Deletion</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        requestType === 'partial' ? 'border-primary-600' : 'border-slate-300'
                      }`}>
                        {requestType === 'partial' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
                      </div>
                    </button>
                  </div>
                </div>

                {requestType === 'partial' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1.5"
                  >
                    <label htmlFor="details" className="block text-sm font-medium text-slate-700">
                      What data would you like us to delete?
                    </label>
                    <textarea
                      id="details"
                      required
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. My search history, profile picture, etc."
                    />
                  </motion.div>
                )}

                <div>
                  <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Reason for request (Optional)
                  </label>
                  <textarea
                    id="reason"
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Why would you like this data removed?"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 text-red-800 rounded-xl">
                    <AlertCircle size={18} />
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  fullWidth
                  icon={<Send size={16} />}
                  iconPosition="right"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Deletion Request'}
                </Button>
              </form>
            )}
          </Card>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              By submitting this request, you understand that all your data, including profile information and activity history, will be permanently removed.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AccountDeletionRequestPage;
