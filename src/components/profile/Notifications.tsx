import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const Notifications = () => {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-medium text-slate-900">Notifications</h3>
      <div className="space-y-4">
        <Input
          label="Email Notifications"
          id="emailNotifications"
          type="checkbox"
          defaultChecked={true}
        />
        <Input
          label="SMS Notifications"
          id="smsNotifications"
          type="checkbox"
          defaultChecked={false}
        />
        <Input
          label="Push Notifications"
          id="pushNotifications"
          type="checkbox"
          defaultChecked={true}
        />
      </div>
    </Card>
  );
};

export default Notifications;
