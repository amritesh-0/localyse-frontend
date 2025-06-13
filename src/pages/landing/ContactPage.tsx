import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

import { sendContactForm } from '../../services/contactAPI';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);

      sendContactForm(formData)
        .then(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrors({ form: error.message || 'Failed to send message' });
        });
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
          <h1 className="mb-6 font-bold text-slate-900">Contact Us</h1>
          <p className="mb-12 text-lg text-slate-600">
            Have questions or want to learn more about Suzao? We're here to help.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="space-y-6">
              <Card padding="lg">
                <h3 className="mb-4 text-lg font-medium text-slate-900">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 rounded-full bg-primary-100 p-2 text-primary-600">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Email</p>
                      <a href="mailto:help.fluno@gmail.com" className="text-sm text-slate-600 hover:text-primary-600">
                        help.fluno@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 rounded-full bg-primary-100 p-2 text-primary-600">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Phone</p>
                      <a href="tel:+916202988337" className="text-sm text-slate-600 hover:text-primary-600">
                        +91 6202988337
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 rounded-full bg-primary-100 p-2 text-primary-600">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Office</p>
                      <p className="text-sm text-slate-600">
                         AIC, MUJ<br />
                        Jaipur, Rajasthan<br />
                       India
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card padding="lg">
                <h3 className="mb-4 text-lg font-medium text-slate-900">Business Hours</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium text-slate-900">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium text-slate-900">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium text-slate-900">Closed</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-slate-500">All times are in Pacific Time (PT)</p>
              </Card>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card padding="lg">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                    <Send size={24} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">Message Sent!</h3>
                  <p className="mb-6 max-w-md text-slate-600">
                    Thank you for contacting us. We've received your message and will respond to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="mb-6 text-xl font-semibold text-slate-900">Send us a message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Input
                        label="Your Name"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
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
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Business Partnership">Business Partnership</option>
                        <option value="Influencer Partnership">Influencer Partnership</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Billing Question">Billing Question</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="How can we help you?"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>
                    
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
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                question: 'How does Suzao match businesses with influencers?',
                answer: 'We use a combination of AI algorithms and human curation to match businesses with local influencers based on location, audience demographics, content style, and brand alignment.',
              },
              {
                question: 'What size businesses can use Suzao?',
                answer: 'Suzao is designed for businesses of all sizes, from local mom-and-pop shops to regional chains. Our tiered pricing ensures accessibility for even the smallest businesses.',
              },
              {
                question: 'How much does it cost to use Suzao?',
                answer: 'We offer a range of plans starting with a free tier for basic usage. Our paid plans start at $29/month and scale based on your needs and campaign volume.',
              },
              {
                question: 'As an influencer, how do I get paid for campaigns?',
                answer: 'Influencers can set their own rates in their profile. When a business approves your participation in a campaign, payment is held in escrow and released upon successful completion.',
              },
            ].map((faq, index) => (
              <Card key={index} padding="lg">
                <h3 className="mb-2 text-lg font-medium text-slate-900">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ContactPage;