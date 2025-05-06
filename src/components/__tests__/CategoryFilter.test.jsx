
import { render, screen, fireEvent } from '@testing-library/react';

// On importe le composant que l’on veut tester
import CategoryFilter from '../../components/CategoryFilter';


import '@testing-library/jest-dom';

// On importe les fonctions de test de Vitest
import { describe, it, expect } from 'vitest';

// Données fictives simulant deux projets, chacun avec une catégorie différente
const mockProjets = [
    {
        id: 1,
        title: 'Projet Web',
        description: 'Site vitrine moderne',
        link: 'https://cdn.pixabay.com/photo/2016/11/08/14/43/dumbo-1808477_1280.jpg',
        cover: {
            formats: {
                medium: {
                    url: 'https://cdn.pixabay.com/photo/2016/11/08/14/43/dumbo-1808477_1280.jpg',
                },
            },
        },
        categories: [{ id: 1, name: 'Web' }],
    },
    {
        id: 2,
        title: 'Projet Mobile',
        description: 'Application React Native',
        link: 'https://cdn.pixabay.com/photo/2016/11/08/14/43/dumbo-1808477_1280.jpg',
        cover: {
            formats: {
                medium: {
                    url: 'https://cdn.pixabay.com/photo/2016/11/08/14/43/dumbo-1808477_1280.jpg',
                },
            },
        },
        categories: [{ id: 2, name: 'Mobile' }],
    },
];

// Regroupe tous les tests liés au composant CategoryFilter
describe('CategoryFilter component', () => {

    // Teste que les deux projets s’affichent correctement dès le premier rendu
    it('affiche tous les projets au chargement', () => {
        render(<CategoryFilter projets={mockProjets} />);
        expect(screen.getByText('Projet Web')).toBeInTheDocument();
        expect(screen.getByText('Projet Mobile')).toBeInTheDocument();
    });

    // Teste le filtrage par la catégorie "Web"
    it('filtre les projets par catégorie', () => {
        render(<CategoryFilter projets={mockProjets} />);

        // Simule la sélection de la catégorie "Web"
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'Web' },
        });

        // Vérifie que seul le projet Web est affiché
        expect(screen.getByText('Projet Web')).toBeInTheDocument();
        expect(screen.queryByText('Projet Mobile')).not.toBeInTheDocument();
    });

    // Teste le filtrage par la catégorie "Mobile"
    it('filtre les projets par Mobile', () => {
        render(<CategoryFilter projets={mockProjets} />);

        // Simule la sélection de la catégorie "Mobile"
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'Mobile' },
        });

        // Vérifie que seul le projet Mobile est affiché
        expect(screen.getByText('Projet Mobile')).toBeInTheDocument();
        expect(screen.queryByText('Projet Web')).not.toBeInTheDocument();
    });
});

