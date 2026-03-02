import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

const NAVER_TALK = 'https://talk.naver.com/W6H2WZ6'

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = translations[lang].about

  const p2Parts = t.storyP2.split('{strong}')

  return (
    <div className="page-wrapper">
      <div className="page-hero about-hero">
        <div className="page-hero-content">
          <p className="section-label">{t.label}</p>
          <h1 className="page-title">{t.title}</h1>
          <p className="page-subtitle">{t.subtitle}</p>
        </div>
      </div>

      <div className="section-inner about-container">

        <div className="about-intro">
          <h2 className="about-section-title">{t.storyTitle}</h2>
          <p className="about-intro-text">{t.storyP1}</p>
          <p className="about-intro-text">
            {p2Parts[0]}<strong>{t.storyP2Strong}</strong>{p2Parts[1]}
          </p>
        </div>

        <div className="about-values">
          <h2 className="about-section-title">{t.valuesTitle}</h2>
          <div className="about-values-grid">
            {t.values.map((v) => (
              <div key={v.title} className="about-value-card">
                <span className="about-value-icon">{v.icon}</span>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-features">
          <h2 className="about-section-title">{t.featuresTitle}</h2>
          <ul className="about-features-list">
            {t.features.map((f) => (
              <li key={f} className="about-feature-item">
                <span className="about-feature-check">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-location">
          <h2 className="about-section-title">{t.locationTitle}</h2>
          <div className="about-location-info">
            <p><strong>{lang === 'ko' ? '주소' : 'Address'}:</strong> {t.locationAddr}</p>
            <p><strong>{lang === 'ko' ? '전화' : 'Phone'}:</strong> {t.locationPhone}</p>
            <p><strong>{lang === 'ko' ? '교통' : 'Transit'}:</strong> {t.locationTransit}</p>
            <p><strong>{lang === 'ko' ? '운영시간' : 'Hours'}:</strong> {t.locationHours}</p>
          </div>
        </div>

        <div className="about-cta">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <div className="about-cta-buttons">
            <Link to="/inquiry" className="btn btn-primary">{t.ctaInquire}</Link>
            <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="btn btn-naver">
              {t.ctaNaver}
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
