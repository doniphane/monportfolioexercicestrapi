import { useState } from 'react';

/**
 * CategoryFilter
 *
 * Displays a list of projects that can be filtered by category.
 * A dropdown allows the user to select a category, and the projects are displayed accordingly.
 *
 * @component
 *
 * @example
 * return (
 *   <CategoryFilter projets={projectsData} />
 * )
 *
 * @param {Object} props
 * @param {Array<Object>} props.projets - The list of projects to display
 * @param {number} props.projets[].id - Unique identifier for the project
 * @param {string} props.projets[].title - Title of the project
 * @param {string} props.projets[].description - Description of the project
 * @param {string} props.projets[].link - External link to the project
 * @param {Object} props.projets[].cover - Cover image object
 * @param {Object} props.projets[].cover.formats - Available image formats
 * @param {Object} props.projets[].cover.formats.medium - Medium format image
 * @param {string} props.projets[].cover.formats.medium.url - URL of the medium format image
 * @param {Array<Object>} props.projets[].categories - Categories assigned to the project
 * @param {number} props.projets[].categories[].id - Unique category ID
 * @param {string} props.projets[].categories[].name - Name of the category
 *
 * @returns {JSX.Element} The rendered category filter with project cards
 */
function CategoryFilter({ projets }) {
    /**
     * Selected category in the dropdown filter
     * @type {[string, Function]}
     */
    const [selectedCategory, setSelectedCategory] = useState('Toutes');

    /**
     * List of available categories, including "Toutes"
     * @type {string[]}
     */
    const categories = [
        'Toutes',
        ...new Set(
            projets.flatMap((projet) => projet.categories.map((cat) => cat.name))
        ),
    ];

    /**
     * Projects to display based on the selected category
     * @type {Array<Object>}
     */
    const filteredProjets =
        selectedCategory === 'Toutes'
            ? projets
            : projets.filter((projet) =>
                projet.categories.some((cat) => cat.name === selectedCategory)
            );

    return (
        <div className="flex flex-col items-center">

            {/* Dropdown menu for selecting category */}
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

            {/* Project grid */}
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
