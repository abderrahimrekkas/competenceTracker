import { useEffect, useState } from 'react';
import api from '../services/api';
import { CheckCircle, XCircle } from 'lucide-react';

const CompetenceList = () => {
  const [competences, setCompetences] = useState([]);
  const [validations, setValidations] = useState({});

  useEffect(() => {
    api.get('/competences')
      .then(res => {
        setCompetences(res.data);
        const initialValidations = {};
        res.data.forEach(comp => {
          if (comp._id) {
            initialValidations[comp._id] = {
              sousCompetences: comp.sousCompetences?.map(() => false) || [],
              globale: false
            };
          }
        });
        setValidations(initialValidations);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSousCompetenceToggle = (compId, sousCompIndex) => {
    setValidations(prev => {
      const newValidations = JSON.parse(JSON.stringify(prev));

      if (newValidations[compId] && newValidations[compId].sousCompetences) {
        newValidations[compId].sousCompetences[sousCompIndex] =
          !newValidations[compId].sousCompetences[sousCompIndex];

        const total = newValidations[compId].sousCompetences.length;
        const validCount = newValidations[compId].sousCompetences.filter(v => v).length;
        const percentage = validCount / total;

        newValidations[compId].globale = percentage >= 0.6;
      }

      return newValidations;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F003B] to-[#4E2D9B] text-white px-6 py-10">
      <h2 className="text-4xl font-extrabold text-[#00F6FF] mb-10 text-center drop-shadow-lg">
        🧠 Compétences à valider
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {competences.map((competence) => {
          const compVal = validations[competence._id];
          if (!compVal) return null;

          const totalSous = compVal.sousCompetences.length;
          const validCount = compVal.sousCompetences.filter(v => v).length;
          const isValid = compVal.globale;

          return (
            <div
              key={competence._id}
              className="bg-white/5 backdrop-blur-md border border-[#4E2D9B] p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Nom */}
              <h3 className="text-xl font-bold text-center text-[#00F6FF] mb-4">{competence.nom}</h3>

              {/* Badge */}
              <div className="flex justify-center mb-4">
                {isValid ? (
                  <span className="bg-[#00FFAB]/20 text-[#00FFAB] border border-[#00FFAB] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Validée
                  </span>
                ) : (
                  <span className="bg-[#FF4C7D]/10 text-[#FF4C7D] border border-[#FF4C7D] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-[#FF4C7D]" /> Non validée
                  </span>
                )}
              </div>

              {/* Stat */}
              <div className="text-sm text-gray-300 text-center mb-4">
                {validCount} / {totalSous} sous-compétences validées
              </div>

              {/* Liste des sous-compétences */}
              <ul className="space-y-3">
                {competence.sousCompetences?.map((sousComp, index) => (
                  <li
                    key={index}
                    className={`flex items-center justify-between border-l-4 pl-3 pr-2 py-2 rounded-md transition-all ${
                      compVal.sousCompetences[index]
                        ? 'border-[#00FFAB] bg-[#1F003B]/40'
                        : 'border-[#00F6FF]/30 bg-[#3E1A7A]'
                    } hover:bg-[#4B2391]`}
                  >
                    <span className="text-sm text-white">{sousComp}</span>
                    <input
                      type="checkbox"
                      checked={compVal.sousCompetences[index] || false}
                      onChange={() => handleSousCompetenceToggle(competence._id, index)}
                      className="h-4 w-4 accent-[#00F6FF]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompetenceList;
