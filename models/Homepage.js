import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  quote: { type: String, required: true },
  avatarUrl: { type: String, required: false }
});

const HomepageSchema = new mongoose.Schema({
  // Singleton enforcer
  singletonId: { type: String, default: 'homepage_config', unique: true },
  
  // Images
  heroBannerImage: { type: String, required: true },
  fullWidthImage: { type: String, required: true },
  
  // Aircraft Overview Section
  overviewHeading: { type: String, required: true },
  overviewSubheading: { type: String, required: true },
  
  // Technology Section
  techHeading: { type: String, required: true },
  techSubheading: { type: String, required: true },
  techSubtext: { type: String, required: true },
  
  // Community & Testimonials
  communityHeading: { type: String, required: true },
  communitySubheading: { type: String, required: true },
  testimonials: [TestimonialSchema],
  
  // CTA Section
  ctaHeading: { type: String, required: true },
  ctaSubheading: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Homepage || mongoose.model('Homepage', HomepageSchema);
