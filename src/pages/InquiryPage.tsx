import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

const NAVER_TALK = 'https://talk.naver.com/W6H2WZ6'

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    roomType: '',
    period: '',
    message: '',
  })
  const { lang } = useLanguage()
  const t = translations[lang].inquiry

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/xeelkyby', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      setSubmitted(true)
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero inquiry-hero">
        <div className="page-hero-content">
          <p className="section-label">{t.label}</p>
          <h1 className="page-title">{t.title}</h1>
          <p className="page-subtitle">{t.subtitle}</p>
        </div>
      </div>

      <div className="section-inner inquiry-container">
        <div className="quick-contact-section">
          <h2 className="quick-contact-title">{t.quickTitle}</h2>
          <div className="quick-contact-grid">
            <a href="tel:0507-1492-5963" className="quick-btn quick-btn-phone">
              <span className="quick-btn-icon">📞</span>
              <span className="quick-btn-label">{t.phoneLabel}</span>
              <span className="quick-btn-sub">0507-1492-5963</span>
            </a>
            <a
              href="https://open.kakao.com/me/firsthousegunpo"
              target="_blank"
              rel="noopener noreferrer"
              className="quick-btn quick-btn-kakao"
            >
              <span className="quick-btn-icon">💛</span>
              <span className="quick-btn-label">{t.kakaoLabel}</span>
              <span className="quick-btn-sub">{t.kakaoSub}</span>
            </a>
            <a
              href={NAVER_TALK}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-btn quick-btn-naver"
            >
              <span className="quick-btn-icon">💬</span>
              <span className="quick-btn-label">{t.naverLabel}</span>
              <span className="quick-btn-sub">{t.naverSub}</span>
            </a>
          </div>
        </div>

        <div className="inquiry-form-section">
          <h2 className="inquiry-form-title">{t.formTitle}</h2>
          <p className="inquiry-form-sub">{t.formSub}</p>

          {submitted ? (
            <div className="inquiry-thank-you">
              <span className="thank-you-icon">🎉</span>
              <h3>{t.thankYouTitle}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t.thankYouDesc}</p>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">{t.labelName}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder={t.placeholderName}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">{t.labelPhone}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-input"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="date">{t.labelDate}</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="roomType">{t.labelRoomType}</label>
                <select
                  id="roomType"
                  name="roomType"
                  className="form-input"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t.selectPlaceholder}</option>
                  {t.roomTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="period">{t.labelPeriod}</label>
                <select
                  id="period"
                  name="period"
                  className="form-input"
                  value={formData.period}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t.selectPlaceholder}</option>
                  {t.periodOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">{t.labelMessage}</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder={t.placeholderMessage}
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn">
                {t.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
