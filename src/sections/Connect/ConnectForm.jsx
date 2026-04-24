import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ConnectForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setEmailError(value && !EMAIL_RE.test(value) ? "Please enter a valid email address." : "");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="connect-form" onSubmit={handleSubmit} noValidate>
      <div className="connect-form__row">
        <div className="connect-form__group">
          <label className="connect-form__label" htmlFor="name">Name</label>
          <input
            className="connect-form__input"
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="connect-form__group">
          <label className="connect-form__label" htmlFor="email">Email</label>
          <input
            className={`connect-form__input${emailError ? " connect-form__input--invalid" : ""}`}
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
          {emailError && (
            <p className="connect-form__feedback connect-form__feedback--error">{emailError}</p>
          )}
        </div>
      </div>
      <div className="connect-form__group">
        <label className="connect-form__label" htmlFor="message">Message</label>
        <textarea
          className="connect-form__input"
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What's on your mind?"
          rows={5}
          required
        />
      </div>
      <button
        type="submit"
        className="connect-form__submit"
        disabled={status === "sending" || !!emailError || !form.email}
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "success" && (
        <p className="connect-form__feedback connect-form__feedback--success">
          Message sent! I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="connect-form__feedback connect-form__feedback--error">
          Something is wrong with the email service. I'll have to fix it. Please contact me another way.
        </p>
      )}
    </form>
  );
}
