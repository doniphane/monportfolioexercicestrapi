import { useEffect, useState } from 'react';
import CategoryFilter from '../src/components/CategoryFilter';
import ContactForm from '../src/components/ContactForm';
function App() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/projets?populate=cover&populate=categories');
        const data = await response.json();
        setProjets(data.data);
      } catch (error) {
        console.error('Erreur lors du fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black via-gray-900 to-black">
        <p className="text-white text-2xl animate-pulse">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black p-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-wide animate-fade-in mb-6">
          Mes Projets
        </h1>


        <CategoryFilter projets={projets} />
        <br />
        <ContactForm />

      </div>
    </div>
  );
}

export default App;
