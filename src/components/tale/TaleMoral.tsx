import { motion } from "framer-motion";

interface TaleMoralProps {
  moral: string;
}

const TaleMoral = ({ moral }: TaleMoralProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-12 p-6 bg-magical-gold/10 rounded-xl border border-magical-gold/20"
    >
      <h3 className="text-magical-turquoise text-xl font-semibold mb-4">Morale de l'histoire :</h3>
      <p className="text-white/90 italic text-lg">{moral}</p>
    </motion.div>
  );
};

export default TaleMoral;