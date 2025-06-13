import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Security = () => {
  return (
    <>
      <Card>
        <h3 className="mb-4 text-lg font-medium text-slate-900">Reset Your Password</h3>
        <p className="mb-6 text-slate-700">
          If you have forgotten your password or want to change it, you can reset it securely using the link below.
          Click the button to receive a password reset email with instructions.
        </p>
        <div className="flex justify-start">
          <Button
            onClick={() => {
              // Redirect to forgot password page
              window.location.href = '/forgot-password';
            }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
          >
            Reset Password
          </Button>
        </div>
      </Card>

      {/* Two-Factor Authentication section remains unchanged */}
      <Card className="mt-6">
        <h3 className="mb-4 text-lg font-medium text-slate-900">Two-Factor Authentication</h3>
        <p className="mb-4 text-slate-600">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-700">
            Two-factor authentication is currently disabled. Team is working on it.
          </div>
          <Button variant="outline">
            Enable 2FA
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Security;
