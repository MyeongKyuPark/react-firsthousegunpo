import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const t = translations[lang].privacy

  return (
    <div className="page-wrapper">
      <div className="page-hero privacy-hero">
        <div className="page-hero-content">
          <p className="section-label">{t.label}</p>
          <h1 className="page-title">{t.title}</h1>
          <p className="page-subtitle">{t.subtitle}</p>
        </div>
      </div>

      <div className="section-inner privacy-container">
        <p className="privacy-updated">{t.updated}</p>

        {t.sections.map((section) => (
          <div key={section.heading} className="privacy-section">
            <h2>{section.heading}</h2>
            {section.content && <p dangerouslySetInnerHTML={{ __html: section.content }} />}
            {section.list.length > 0 && (
              <ul>
                {section.list.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
            {'footer' in section && section.footer && <p>{section.footer}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
