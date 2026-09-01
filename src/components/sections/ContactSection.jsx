import React, { useState } from 'react'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

const INPUT_CLASSES =
  'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body text-body-md text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/20 transition-all duration-200'

const LABEL_CLASSES = 'block font-label-sm text-label-sm text-on-surface mb-2'

const ERROR_CLASSES = 'text-error text-label-sm mt-1.5 flex items-center gap-1'

const ContactSection = ({ isVisible }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Tell us about your automation needs'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', company: '', message: '' })
  }

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-accent-blue/20 flex items-center justify-center mx-auto mb-6">
            <Icon name="check_circle" size={40} color="#3B82F6" />
          </div>
          <h2 className="font-headline text-headline-lg text-on-surface mb-4">
            Message Received!
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-8">
            We'll review your automation needs and get back to you within one business day.
          </p>
          <Button
            variant="secondary"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-label-sm text-label-sm text-accent-blue uppercase tracking-widest mb-4">
            Let's Talk
          </span>
          <h2 className="font-headline text-headline-lg md:text-headline-xl text-on-surface mb-4">
            Ready to Automate?
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant">
            Tell us what you're dealing with. No pitch decks — just a real conversation about your operations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name + Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className={LABEL_CLASSES}>
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                value={formState.name}
                onChange={handleChange}
                className={INPUT_CLASSES}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className={ERROR_CLASSES}>
                  <Icon name="error" size={14} color="#ffb4ab" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={LABEL_CLASSES}>
                Work Email <span className="text-error">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                value={formState.email}
                onChange={handleChange}
                className={INPUT_CLASSES}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className={ERROR_CLASSES}>
                  <Icon name="error" size={14} color="#ffb4ab" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className={LABEL_CLASSES}>
              Company / Organization
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Acme Corp"
              value={formState.company}
              onChange={handleChange}
              className={INPUT_CLASSES}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={LABEL_CLASSES}>
              What needs automating? <span className="text-error">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe the manual processes that are eating up your team's time..."
              value={formState.message}
              onChange={handleChange}
              className={`${INPUT_CLASSES} resize-none`}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className={ERROR_CLASSES}>
                <Icon name="error" size={14} color="#ffb4ab" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>

        {/* Trust note */}
        <p className="text-center font-code text-code-sm text-on-surface-variant/60 mt-8">
          No spam. No sales pressure. Just a real conversation.
        </p>
      </div>
    </section>
  )
}

export default ContactSection