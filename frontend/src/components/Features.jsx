import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      title: "High-Quality Photos",
      description: "Access our vast collection of professional, high-resolution photographs.",
      icon: "📸"
    },
    {
      title: "User Profiles",
      description: "Create and customize your profile to showcase your photography interests.",
      icon: "👤"
    },
    {
      title: "Categories",
      description: "Browse through various categories to find the perfect photo for your needs.",
      icon: "🗂️"
    },
    {
      title: "Secure Transactions",
      description: "Shop with confidence using our secure payment processing system.",
      icon: "🔒"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-400 mb-4">
            Why Choose SnapStore?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the features that make SnapStore the perfect platform for photography enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-lg hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

