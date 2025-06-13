import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Billing = () => {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-medium text-slate-900">Billing</h3>
      <p className="text-slate-600">Billing details and payment methods will be managed here.</p>
      <div className="mt-6 flex justify-end">
        <Button>
          Manage Billing
        </Button>
      </div>
    </Card>
  );
};

export default Billing;
