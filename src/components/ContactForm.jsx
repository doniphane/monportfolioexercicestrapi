import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

/**
 * Composant React pour un formulaire de contact.
 * Il permet d'envoyer un message par EmailJS et d'enregistrer les données dans Strapi.
 *
 * @component
 * @returns {JSX.Element} Le formulaire de contact rendu
 */
export default function ContactForm() {
    /** Référence au formulaire HTML */
    const formRef = useRef();

    /** État du message de confirmation ou d'erreur */
    const [status, setStatus] = useState({
        /** Message de succès (null si aucun) */
        success: null,
        /** Message d'erreur (null si aucun) */
        error: null,
    });

    /**
     * Gère la soumission du formulaire :
     * - Valide les champs
     * - Enregistre les données dans Strapi
     * - Envoie un e-mail via EmailJS
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission du formulaire
     */
    const sendEmail = async (e) => {
        e.preventDefault();

        const form = formRef.current;
        const formData = new FormData(form);
        const user_name = formData.get('user_name');
        const user_email = formData.get('user_email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validation simple
        if (!user_name || !user_email || !subject || !message) {
            setStatus({ error: 'Tous les champs sont requis.', success: null });
            return;
        }

        try {
            // Enregistrement dans Strapi
            const response = await fetch('http://localhost:1337/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        name: user_name,
                        email: user_email,
                        subject: subject,
                        message: message,
                        date: new Date().toISOString(), // correspond au champ "date" dans Strapi
                    },
                }),
            });

            if (!response.ok) throw new Error("Erreur lors de l'enregistrement dans Strapi");

            // Envoi du message via EmailJS
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus({ success: 'Message envoyé avec succès !', error: null });
            form.reset(); // Réinitialise le formulaire
        } catch (err) {
            setStatus({ error: err.message || 'Une erreur est survenue.', success: null });
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={sendEmail}
            className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
        >
            <h2 className="text-xl font-bold mb-4">Formulaire de contact</h2>

            {status.error && <p className="text-red-500 mb-2">{status.error}</p>}
            {status.success && <p className="text-green-500 mb-2">{status.success}</p>}

            <label className="block mb-2">
                Nom :
                <input
                    type="text"
                    name="user_name"
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                Email :
                <input
                    type="email"
                    name="user_email"
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-2">
                Sujet :
                <input
                    type="text"
                    name="subject"
                    className="w-full p-2 border rounded"
                    required
                />
            </label>

            <label className="block mb-4">
                Message :
                <textarea
                    name="message"
                    rows={5}
                    className="w-full p-2 border rounded"
                    required
                ></textarea>
            </label>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Envoyer le message
            </button>
        </form>
    );
}
