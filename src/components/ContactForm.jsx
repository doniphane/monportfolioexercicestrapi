import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

/**
 * ContactForm
 *
 * A contact form component that allows users to send a message.
 * On submission, it validates input, sends an email via EmailJS,
 * and stores the message in a Strapi backend.
 *
 * @component
 * @example
 * return (
 *   <ContactForm />
 * )
 *
 * @returns {JSX.Element} The rendered contact form component
 */
export default function ContactForm() {
    /**
     * Reference to the form DOM element used by EmailJS.
     * @type {React.MutableRefObject<HTMLFormElement>}
     */
    const formRef = useRef();

    /**
     * State used to store success or error messages after submission.
     * @type {[{ success: string|null, error: string|null }, Function]}
     */
    const [status, setStatus] = useState({
        success: null,
        error: null,
    });

    /**
     * Handles the submission of the contact form.
     * Sends the form data to both EmailJS and Strapi.
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
     * @returns {Promise<void>}
     */
    const sendEmail = async (e) => {
        e.preventDefault();

        const form = formRef.current;
        const formData = new FormData(form);
        const user_name = formData.get('user_name');
        const user_email = formData.get('user_email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!user_name || !user_email || !subject || !message) {
            setStatus({ error: 'Tous les champs sont requis.', success: null });
            return;
        }

        try {
            // Send data to Strapi CMS
            const response = await fetch('http://localhost:1337/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        name: user_name,
                        email: user_email,
                        subject,
                        message,
                        date: new Date().toISOString(),
                    },
                }),
            });

            if (!response.ok) throw new Error("Erreur lors de l'enregistrement dans Strapi");

            // Send email using EmailJS
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // Success
            setStatus({ success: 'Message envoyé avec succès !', error: null });
            form.reset();
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
