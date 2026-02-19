import { useState } from 'react'

const NAVER_TALK = 'https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen'

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    roomType: '',
    period: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // fallback: show thank you anyway for demo
      setSubmitted(true)
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero inquiry-hero">
        <div className="page-hero-content">
          <p className="section-label">INQUIRY</p>
          <h1 className="page-title">입실 문의</h1>
          <p className="page-subtitle">빠른 답변으로 꼭 맞는 방을 찾아드립니다</p>
        </div>
      </div>

      <div className="section-inner inquiry-container">
        {/* 빠른 문의 버튼 */}
        <div className="quick-contact-section">
          <h2 className="quick-contact-title">빠른 문의</h2>
          <div className="quick-contact-grid">
            <a href="tel:0507-1492-5963" className="quick-btn quick-btn-phone">
              <span className="quick-btn-icon">📞</span>
              <span className="quick-btn-label">전화 문의</span>
              <span className="quick-btn-sub">0507-1492-5963</span>
            </a>
            <a
              href="https://open.kakao.com/me/firsthousegunpo"
              target="_blank"
              rel="noopener noreferrer"
              className="quick-btn quick-btn-kakao"
            >
              <span className="quick-btn-icon">💛</span>
              <span className="quick-btn-label">카카오 문의</span>
              <span className="quick-btn-sub">카카오플러스친구</span>
            </a>
            <a
              href={NAVER_TALK}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-btn quick-btn-naver"
            >
              <span className="quick-btn-icon">💬</span>
              <span className="quick-btn-label">네이버 톡톡</span>
              <span className="quick-btn-sub">바로 채팅 문의</span>
            </a>
          </div>
        </div>

        {/* 문의 폼 */}
        <div className="inquiry-form-section">
          <h2 className="inquiry-form-title">문의 양식</h2>
          <p className="inquiry-form-sub">아래 양식을 작성해 주시면 빠르게 연락드리겠습니다.</p>

          {submitted ? (
            <div className="inquiry-thank-you">
              <span className="thank-you-icon">🎉</span>
              <h3>문의가 접수되었습니다!</h3>
              <p>빠른 시일 내에 연락드리겠습니다.<br />감사합니다 😊</p>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="date">입실 예정일</label>
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
                <label className="form-label" htmlFor="roomType">원하는 방 형태</label>
                <select
                  id="roomType"
                  name="roomType"
                  className="form-input"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                >
                  <option value="">선택해 주세요</option>
                  <option value="프리미엄 외창형">프리미엄 외창형</option>
                  <option value="프리미엄 내창형">프리미엄 내창형</option>
                  <option value="디럭스 외창형">디럭스 외창형</option>
                  <option value="디럭스 내창형">디럭스 내창형</option>
                  <option value="스탠다드 외창형">스탠다드 외창형</option>
                  <option value="스탠다드 내창형">스탠다드 내창형</option>
                  <option value="스터디 외창형">스터디 외창형</option>
                  <option value="스터디 내창형">스터디 내창형</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="period">입주 기간</label>
                <select
                  id="period"
                  name="period"
                  className="form-input"
                  value={formData.period}
                  onChange={handleChange}
                  required
                >
                  <option value="">선택해 주세요</option>
                  <option value="1개월">1개월</option>
                  <option value="2개월">2개월</option>
                  <option value="3개월">3개월</option>
                  <option value="6개월">6개월</option>
                  <option value="장기">장기</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">문의사항</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="궁금하신 점이나 특별히 원하시는 조건을 자유롭게 입력해 주세요."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn">
                문의 보내기
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
