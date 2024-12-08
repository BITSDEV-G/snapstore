import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, User, Settings } from 'lucide-react';

const roles = [
  { id: 'photographer', title: 'Photographer', icon: Camera, description: 'Showcase your work and get hired for events' },
  { id: 'client', title: 'Client', icon: User, description: 'Find and book talented photographers for your events' },
  { id: 'admin', title: 'Admin', icon: Settings, description: 'Manage the platform and ensure smooth operations' },
];

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-amber-900"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundPosition: ['0% 50%', '50% 50%', '100% 50%'],
        }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        style={{ backgroundSize: '200% 200%' }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1595233/pexels-photo-1595233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl font-bold text-center text-amber-400 mb-6 z-10"
      >
        Choose Your Role
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-300 text-center mb-8 z-10"
      >
        Select how you&apos;d like to use SnapStore
      </motion.p>
      <div className="space-y-4 z-10">
        {roles.map((role, index) => (
          <motion.button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className={`w-full p-4 rounded-xl flex items-center transition-all duration-300 ${
              selectedRole === role.id
                ? 'bg-amber-500 text-black ring-4 ring-amber-400 shadow-lg'
                : 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white hover:ring-2 hover:ring-amber-500'
            }`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.4 + index * 0.1,
              duration: 0.6,
              ease: 'easeOut',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <role.icon
              className={`w-8 h-8 mr-4 ${
                selectedRole === role.id ? 'text-black' : 'text-amber-400'
              }`}
            />
            <div className="text-left">
              <h3 className="font-semibold text-lg">{role.title}</h3>
              <p className="text-sm opacity-80">{role.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="mt-8 z-10"
          >
            <motion.button
              onClick={handleContinue}
              className="w-full bg-amber-500 text-black py-3 rounded-xl font-semibold text-lg hover:bg-amber-400"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 4px 20px rgba(255, 191, 0, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              Continue as {roles.find((r) => r.id === selectedRole)?.title}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

RoleSelection.propTypes = {
  onRoleSelect: PropTypes.func.isRequired,
};

export default RoleSelection;
