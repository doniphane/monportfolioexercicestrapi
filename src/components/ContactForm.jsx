import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        subject: '',
        message: '',
    });

    const formRef = useRef();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            console.log('Message envoyé avec succès:', result.text);
            setFormData({
                user_name: '',
                user_email: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error.text);
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Formulaire de contact</h2>

            <label className="block mb-2">
                Nom:
                <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                Email:
                <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                Sujet:
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block mb-4">
                Message:
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows={5}
                />
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
