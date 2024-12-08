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
        className="text-3xl font-extrabold text-center text-amber-400 mb-4 z-10"
      >
        Choose Your Role
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-300 text-center mb-6 z-10"
      >
        Select how you&apos;d like to use SnapStore
      </motion.p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 z-10 w-full max-w-4xl">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className={`p-4 rounded-lg shadow-md border cursor-pointer flex flex-col items-center text-center transition-transform ${
              selectedRole === role.id
                ? 'bg-amber-500 text-black border-amber-500 shadow-amber-400 transform scale-105'
                : 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white hover:shadow-lg hover:shadow-amber-500 border-gray-600'
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
              className={`w-10 h-10 mb-2 ${
                selectedRole === role.id ? 'text-black' : 'text-amber-400'
              }`}
            />
            <div className="text-left">
              <h3 className="font-bold text-base mb-1">{role.title}</h3>
              <p className="text-sm opacity-80">{role.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="mt-6 z-10 w-full max-w-md"
          >
            <motion.button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-2 rounded-lg font-semibold text-base hover:shadow-md hover:shadow-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-400"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 6px 25px rgba(255, 191, 0, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                scale: [1, 1.02, 1],
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