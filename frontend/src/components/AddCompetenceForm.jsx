import { useState } from 'react';
import api from '../services/api';
import { Plus, Trash2 } from 'lucide-react';

const AddCompetenceForm = ({ onAdd }) => {
  const [nom, setNom] = useState('');
  const [sousCompetences, setSousCompetences] = useState(['']);
  const [currentSousCompetence, setCurrentSousCompetence] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validSousCompetences = sousCompetences.filter(sc => sc.trim() !== '');
      const res = await api.post('/competences', {
        nom,
        sousCompetences: validSousCompetences
      });
      onAdd(res.data);
      setNom('');
      setSousCompetences(['']);
      setCurrentSousCompetence('');
    } catch (err) {
      console.error(err);
    }
  };

  const addSousCompetence = () => {
    if (currentSousCompetence.trim() !== '') {
      setSousCompetences([...sousCompetences.filter(sc => sc.trim() !== ''), currentSousCompetence.trim(), '']);
      setCurrentSousCompetence('');
    }
  };

  const removeSousCompetence = (index) => {
    const newSousCompetences = sousCompetences.filter((_, i) => i !== index);
    setSousCompetences(newSousCompetences.length ? newSousCompetences : ['']);
  };

  const updateSousCompetence = (index, value) => {
    const newSousCompetences = [...sousCompetences];
    newSousCompetences[index] = value;
    setSousCompetences(newSousCompetences);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0D0221] via-[#3D1A78] to-[#0D0221] text-white">
      <h1 className="text-4xl font-bold text-center text-[#00E0FF] mb-10 drop-shadow-lg">
         Ajouter une compétence
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#14002E]/80 backdrop-blur-lg border border-[#5B21B6] rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto text-white space-y-6"
      >
        {/* Nom compétence */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Nom de la compétence</label>
          <input
            type="text"
            placeholder="Nom de la compétence"
            className="w-full p-3 rounded-lg bg-[#1E034B] border border-[#00E0FF] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        {/* Sous-compétences */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Sous-compétences</label>

          {sousCompetences.map((sousComp, index) => (
            <div key={index} className="flex gap-2 mb-3 items-center">
              <input
                type="text"
                placeholder={`Sous-compétence ${index + 1}`}
                className="flex-1 p-3 rounded-lg bg-[#3E1A7A] border border-[#5B21B6] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00E0FF]"
                value={sousComp}
                onChange={(e) => updateSousCompetence(index, e.target.value)}
              />
              {sousCompetences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSousCompetence(index)}
                  className="p-2 bg-[#FF4C7D]/20 text-[#FF4C7D] rounded-full hover:bg-[#FF4C7D]/30 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {/* Ajouter nouvelle sous-compétence */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Nouvelle sous-compétence"
              className="flex-1 p-3 rounded-lg bg-[#3E1A7A] border border-[#5B21B6] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00E0FF]"
              value={currentSousCompetence}
              onChange={(e) => setCurrentSousCompetence(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSousCompetence())}
            />
            <button
              type="button"
              onClick={addSousCompetence}
              className="bg-[#00E0FF]/10 hover:bg-[#00E0FF]/20 text-[#00E0FF] px-4 py-2 rounded-lg flex items-center gap-1 font-semibold"
            >
              <Plus className="w-4 h-4" /> Ajouter
            </button>
          </div>
        </div>

        {/* Bouton submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-[#00FFAB]/20 hover:bg-[#00FFAB]/30 text-[#00FFAB] font-bold px-6 py-3 rounded-lg shadow transition-all"
          >
            🚀 Créer la compétence
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompetenceForm;
