import { useState } from 'react';

function CategoryFilter({ projets }) {
    const [selectedCategory, setSelectedCategory] = useState('Toutes');


    const categories = [
        'Toutes',
        ...new Set(
            projets.flatMap((projet) => projet.categories.map((cat) => cat.name))
        ),
    ];


    const filteredProjets =
        selectedCategory === 'Toutes'
            ? projets
            : projets.filter((projet) =>
                projet.categories.some((cat) => cat.name === selectedCategory)
            );

    return (
        <div className="flex flex-col items-center">

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mb-8 p-2 rounded-md bg-white text-black shadow-md"
            >
                {categories.map((categorie) => (
                    <option key={categorie} value={categorie}>
                        {categorie}
                    </option>
                ))}
            </select>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredProjets.map((projet) => (
                    <div
                        key={projet.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                    >
                        <img
                            src={`http://localhost:1337${projet.cover.formats.medium.url}`}
                            alt={projet.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{projet.title}</h2>
                            <p className="text-gray-600 mb-4">{projet.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {projet.categories.map((categorie) => (
                                    <span
                                        key={categorie.id}
                                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                                    >
                                        {categorie.name}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={projet.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-sm font-semibold"
                            >
                                Voir le projet
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
