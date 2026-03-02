import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

export default function FaqPage() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})
  const { lang } = useLanguage()
  const t = translations[lang].faq

  const toggle = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero faq-hero">
        <div className="page-hero-content">
          <p className="section-label">{t.label}</p>
          <h1 className="page-title">{t.title}</h1>
          <p className="page-subtitle">{t.subtitle}</p>
        </div>
      </div>

      <div className="section-inner faq-container">
        {t.categories.map((cat) => (
          <div key={cat.category} className="faq-category">
            <div className="faq-category-header">
              <span className="faq-category-icon">{cat.icon}</span>
              <h2 className="faq-category-title">{cat.category}</h2>
            </div>
            <div className="faq-list">
              {cat.items.map((item, idx) => {
                const key = `${cat.category}-${idx}`
                const isOpen = !!openMap[key]
                return (
                  <div key={key} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-arrow">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p style={{ whiteSpace: 'pre-line' }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="faq-cta">
          <p>{t.ctaText}</p>
          <div className="faq-cta-buttons">
            <a href="tel:0507-1492-5963" className="btn btn-primary">{t.phoneBtn}</a>
            <a
              href="https://open.kakao.com/me/firsthousegunpo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-kakao"
            >
              {t.kakaoBtn}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
