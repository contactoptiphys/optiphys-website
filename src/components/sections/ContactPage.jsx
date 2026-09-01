import React, { useState } from 'react'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { automations } from '../../config/automations'

const INPUT_CLASSES =
  'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body text-body-md text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/20 transition-all duration-200'

const LABEL_CLASSES = 'block font-label-sm text-label-sm text-on-surface mb-2'

const ERROR_CLASSES = 'text-error text-label-sm mt-1.5 flex items-center gap-1'

const ContactPage = ({ onBack }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)

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
    if (formState.phone.trim() && !/^[+()\d\s-]{3,30}$/.test(formState.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number'
    }
    if (!formState.service) {
      newErrors.service = 'Please select a service'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (submitError) {
      setSubmitError(null)
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
    setSubmitError(null)

    try {
      // Neutralize values that Google Sheets would otherwise interpret as formulas
      // (=, +, -, @) by prefixing a single apostrophe. The Sheet will display the
      // apostrophe as the user-typed character (e.g. "=SUM" stays as "=SUM").
      const safe = (val) => {
        const str = String(val ?? '').trim()
        if (!str) return ''
        return /^[=+\-@]/.test(str) ? `'${str}` : str
      }

      const formData = {
        name: safe(formState.name),
        email: safe(formState.email),
        phone: safe(formState.phone),
        company: safe(formState.company),
        service: formState.service
      }

      await fetch(import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      // Note: With mode: 'no-cors', the response is opaque.
      // Google Apps Script returns a 302 redirect on success — we treat
      // no network error as success, matching the standard Apps Script pattern.
      setIsSubmitting(false)
      setSubmitted(true)
    } catch {
      setIsSubmitting(false)
      setSubmitError('Failed to submit. Please try again or email us directly at contact.optiphys@gmail.com')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-accent-blue/20 flex items-center justify-center mx-auto mb-6">
            <Icon name="check_circle" size={40} color="#3B82F6" />
          </div>
          <h2 className="font-headline text-headline-lg text-on-surface mb-4">
            Service Booked Successfully!
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-8">
            Thank you for choosing OptiPhys. We'll reach out within one business day to discuss your automation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" onClick={onBack}>
              Back to Home
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSubmitted(false)
                setFormState({ name: '', email: '', phone: '', company: '', service: '' })
              }}
            >
              Book Another Service
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/80 backdrop-blur-xl">
        <div className="flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors">
            <Icon name="arrow_back" size={24} />
            <span className="font-label-sm text-label-sm">Back</span>
          </button>
          <Logo size={64} />
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Company Info */}
          <div className="flex flex-col justify-center">
            <div className="glass-panel p-8 md:p-10 rounded-2xl">
              <h1 className="font-headline text-headline-lg text-on-surface mb-2">
                Get in Touch
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant mb-8">
                Ready to automate your business? Let's discuss how OptiPhys can help streamline your operations.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="mail" size={24} color="#3B82F6" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Email Us</p>
                    <a
                      href="mailto:contact.optiphys@gmail.com"
                      className="font-body text-body-md text-on-surface hover:text-accent-blue transition-colors"
                    >
                      contact.optiphys@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="phone" size={24} color="#3B82F6" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Call Us</p>
                    <p className="font-body text-body-md text-on-surface">+91 78423 63232</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="location_on" size={24} color="#3B82F6" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Location</p>
                    <p className="font-body text-body-md text-on-surface">
                      Hyderabad, Telangana<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="workflow-line my-8" />

              {/* Company tagline */}
              <p className="font-body text-body-md text-on-surface-variant italic">
                "Streamlining businesses with intelligent automation solutions."
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <div className="glass-panel p-8 md:p-10 rounded-2xl">
              <h2 className="font-headline text-headline-md text-on-surface mb-6">
                Book a Service With Us
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                    maxLength={100}
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
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    maxLength={254}
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

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={LABEL_CLASSES}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    maxLength={30}
                    value={formState.phone}
                    onChange={handleChange}
                    className={INPUT_CLASSES}
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className={LABEL_CLASSES}>
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Acme Corp"
                    maxLength={150}
                    value={formState.company}
                    onChange={handleChange}
                    className={INPUT_CLASSES}
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className={LABEL_CLASSES}>
                    Service Interested In <span className="text-error">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className={`${INPUT_CLASSES} cursor-pointer appearance-none bg-surface-container`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23c2c6d6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '20px',
                    }}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                  >
                    <option value="" disabled className="text-on-surface-variant">
                      Select a service...
                    </option>
                    {automations.map((service) => (
                      <option key={service.id} value={service.id} className="text-on-surface bg-surface-container">
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="service-error" className={ERROR_CLASSES}>
                      <Icon name="error" size={14} color="#ffb4ab" />
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/30">
                    <Icon name="error" size={18} color="#ffb4ab" className="flex-shrink-0 mt-0.5" />
                    <p className="font-body text-body-sm text-error">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        Booking...
                      </span>
                    ) : (
                      'Book a Service With Us'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContactPage
