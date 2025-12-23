"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // Google Apps Script Web App URL'ini buraya yapıştır
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!GOOGLE_SCRIPT_URL) {
      setSubmitStatus({
        type: 'error',
        message: 'Form yapılandırması eksik. Lütfen yöneticiye ulaşın.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
        });
        // Formu temizle
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Bir hata oluştu. Lütfen tekrar deneyin.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Space elements */}
      <div className="nebula w-96 h-96 bg-neon-cyan/5 top-1/4 left-0" style={{ animationDelay: "4s" }} />
      <div className="nebula w-80 h-80 bg-electric-purple/5 bottom-1/4 right-0" style={{ animationDelay: "6s" }} />
      
      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Contact Mission Control</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-soft-white/70 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all text-soft-white placeholder:text-soft-white/30"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-soft-white/70 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all text-soft-white placeholder:text-soft-white/30"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-soft-white/70 mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all text-soft-white placeholder:text-soft-white/30"
                placeholder="+90 555 123 4567"
              />
            </div>
            
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-soft-white/70 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all text-soft-white placeholder:text-soft-white/30 resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            
            {/* Status Message */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan'
                    : 'bg-red-500/20 border border-red-500/50 text-red-400'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 bg-signature-gradient text-void-black font-semibold rounded-full hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? 'Gönderiliyor...' : 'Submit Message'}
                {!isSubmitting && (
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </motion.form>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center items-center md:items-start"
          >
            <p className="text-soft-white/70 mb-6 text-lg">
              Or reach out directly:
            </p>
            <motion.a
              href="mailto:alinaavsar@aerilabs.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 text-neon-cyan hover:text-electric-purple transition-colors text-lg"
            >
              <Mail className="w-6 h-6" />
              alinaavsar@aerilabs.com
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

