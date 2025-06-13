import { motion } from 'framer-motion';
import Container from '../ui/Container';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  index: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl bg-white p-6 shadow-subtle md:p-8"
    >
      <div className="mb-4 text-primary-500">
        {/* 5 stars */}
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <blockquote className="mb-6 text-slate-700">{quote}</blockquote>
      <div>
        <div className="font-medium text-slate-900">{author}</div>
        <div className="text-sm text-slate-500">
          {role}, {company}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Suzao has transformed how we approach local marketing. We've seen a 3x ROI on our campaigns with authentic engagement from real customers.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "Urban Cafe Chain"
    },
    {
      quote: "As a micro-influencer, Suzao has connected me with local businesses that perfectly align with my values. The platform is intuitive and the campaign management tools save me hours.",
      author: "Marcus Chen",
      role: "Lifestyle Influencer",
      company: "@marcusexplores"
    },
    {
      quote: "We were struggling to reach our local audience effectively. Suzao matched us with the perfect neighborhood influencers, and we've seen foot traffic increase by 40%.",
      author: "Priya Patel",
      role: "Owner",
      company: "Bloom Boutique"
    },
    {
      quote: "The analytics and reporting features are incredible. I can show my clients exactly how our influencer campaigns are performing and justify every marketing dollar spent.",
      author: "David Rodriguez",
      role: "Agency Founder",
      company: "Local Edge Marketing"
    },
    {
      quote: "I've tried other platforms, but Suzao's focus on local markets makes all the difference. My content feels authentic, and my followers appreciate the local business recommendations.",
      author: "Emma Wright",
      role: "Food & Travel Creator",
      company: "@emmatastestheworld"
    },
    {
      quote: "The automated campaign management has reduced our marketing overhead by 30%. We're reaching more customers with less effort than ever before.",
      author: "Michael Barnes",
      role: "CEO",
      company: "FitZone Gyms"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold text-slate-900">Success Stories</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            See how businesses and influencers are thriving with Suzao.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;