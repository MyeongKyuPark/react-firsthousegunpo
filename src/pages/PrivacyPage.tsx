import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

type BoldLabelItem = { label: string; value: string }
type LinkItem = { prefix?: string; href: string; linkText: string; suffix?: string }
type ListItem = string | BoldLabelItem | LinkItem

function isBoldLabel(item: ListItem): item is BoldLabelItem {
  return typeof item === 'object' && 'label' in item
}

function isLink(item: ListItem): item is LinkItem {
  return typeof item === 'object' && 'href' in item
}

function renderListItem(item: ListItem, i: number) {
  if (isBoldLabel(item)) {
    return <li key={i}><strong>{item.label}:</strong> {item.value}</li>
  }
  if (isLink(item)) {
    return (
      <li key={i}>
        {item.prefix}
        <a href={item.href} target="_blank" rel="noopener noreferrer">{item.linkText}</a>
        {item.suffix}
      </li>
    )
  }
  return <li key={i}>{item}</li>
}

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
            {section.content && <p>{section.content}</p>}
            {section.list.length > 0 && (
              <ul>
                {(section.list as ListItem[]).map((item, i) => renderListItem(item, i))}
              </ul>
            )}
            {'footer' in section && section.footer && <p>{section.footer}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
