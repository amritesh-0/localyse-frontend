import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { z } from 'zod';
import { sendContactForm } from '../../../services/contactAPI';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const EmailSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'account', label: 'Account Issues' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnerships', label: 'Partnership Questions' },
    { value: 'feature', label: 'Feature Requests' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      contactSchema.parse(formData);
      // Call backend API
      await sendContactForm(formData);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      });
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ form: error.message || 'Failed to send message. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-6 font-bold text-slate-900">Email Support</h1>
          <p className="mb-12 text-lg text-slate-600">
            Need help? Send us a message and we&apos;ll get back to you shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <Card padding="lg">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                  <Send size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">Message Sent!</h3>
                <p className="mb-6 max-w-md text-slate-600">
                  Sit relax! We&apos;ve received your message. One of Team executive will get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Input
                      label="Your Name"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      disabled={isSubmitting}
                    />

                    <Input
                      label="Your Email"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.category}
                      aria-describedby="category-error"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p id="category-error" className="mt-1 text-sm text-red-600">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.subject ? 'border-red-600' : ''
                      }`}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.subject}
                      aria-describedby="subject-error"
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-sm text-red-600">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      className={`block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.message ? 'border-red-600' : ''
                      }`}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.message}
                      aria-describedby="message-error"
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {errors.form && (
                    <p className="text-red-600 text-center text-sm">{errors.form}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    icon={<Send size={16} />}
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </>
            )}
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default EmailSupport;
