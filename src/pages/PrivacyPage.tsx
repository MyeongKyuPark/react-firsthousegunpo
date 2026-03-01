export default function PrivacyPage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero privacy-hero">
        <div className="page-hero-content">
          <p className="section-label">LEGAL</p>
          <h1 className="page-title">개인정보처리방침</h1>
          <p className="page-subtitle">처음하우스 군포역점의 개인정보 보호 정책</p>
        </div>
      </div>

      <div className="section-inner privacy-container">
        <p className="privacy-updated">최종 업데이트: 2025년 3월 1일</p>

        <div className="privacy-section">
          <h2>1. 개인정보처리방침 개요</h2>
          <p>
            처음하우스 군포역점(이하 "당사")은 이용자의 개인정보를 소중히 여기며,
            「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 당사 웹사이트
            (https://react-firsthousegunpo.pages.dev) 이용 과정에서 수집되는 개인정보의
            처리 방법과 보호 조치를 안내합니다.
          </p>
        </div>

        <div className="privacy-section">
          <h2>2. 수집하는 개인정보 항목</h2>
          <p>당사는 다음과 같은 개인정보를 수집할 수 있습니다.</p>
          <ul>
            <li><strong>필수 항목:</strong> 이름, 연락처(전화번호)</li>
            <li><strong>선택 항목:</strong> 입실 예정일, 희망 방 형태, 입주 기간, 문의사항</li>
            <li><strong>자동 수집:</strong> IP 주소, 브라우저 유형, 방문 페이지, 쿠키 정보</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>3. 개인정보의 수집 및 이용 목적</h2>
          <ul>
            <li>입실 상담 및 문의 응대</li>
            <li>입주 계약 진행 및 관리</li>
            <li>서비스 개선을 위한 통계 분석</li>
            <li>법령에 따른 의무 이행</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>4. 개인정보의 보유 및 이용기간</h2>
          <p>
            수집된 개인정보는 이용 목적 달성 후 즉시 파기합니다.
            단, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 기간 동안 안전하게 보관합니다.
          </p>
          <ul>
            <li>문의 접수 및 상담 기록: 상담 종료 후 1년</li>
            <li>계약 관련 기록: 계약 종료 후 3년 (상법 기준)</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>5. 제3자 광고 서비스 (Google AdSense)</h2>
          <p>
            당사 웹사이트는 Google Inc.가 제공하는 광고 서비스인 <strong>Google AdSense</strong>를
            사용합니다. Google AdSense는 쿠키를 사용하여 이용자에게 관심사 기반 광고를 제공합니다.
          </p>
          <ul>
            <li>Google은 쿠키를 통해 이용자의 이전 방문 기록을 바탕으로 광고를 표시합니다.</li>
            <li>이용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google 광고 설정</a>에서 개인화 광고를 비활성화할 수 있습니다.</li>
            <li>Google의 개인정보 처리방침: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>6. 쿠키(Cookie) 정책</h2>
          <p>
            당사 웹사이트는 서비스 향상 및 광고 제공을 위해 쿠키를 사용합니다.
            쿠키는 이용자의 컴퓨터에 저장되는 소규모 텍스트 파일입니다.
          </p>
          <ul>
            <li><strong>필수 쿠키:</strong> 웹사이트의 기본 기능 유지에 필요</li>
            <li><strong>분석 쿠키:</strong> 방문자 통계 수집 (Google Analytics)</li>
            <li><strong>광고 쿠키:</strong> 관심사 기반 광고 제공 (Google AdSense)</li>
          </ul>
          <p>
            브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 서비스 이용에 제한이 생길 수 있습니다.
          </p>
        </div>

        <div className="privacy-section">
          <h2>7. 개인정보의 제3자 제공</h2>
          <p>
            당사는 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
            다만, 다음의 경우는 예외입니다.
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 따라 관련 기관에 제공이 필요한 경우</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>8. 이용자의 권리</h2>
          <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul>
            <li>개인정보 열람 요청</li>
            <li>개인정보 수정·삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
          </ul>
          <p>권리 행사는 아래 연락처를 통해 요청하실 수 있습니다.</p>
        </div>

        <div className="privacy-section">
          <h2>9. 개인정보 보호 책임자</h2>
          <ul>
            <li><strong>업체명:</strong> 처음하우스 군포역점</li>
            <li><strong>주소:</strong> 경기도 군포시 군포역 1길 32 4층</li>
            <li><strong>전화:</strong> 0507-1492-5963</li>
            <li><strong>이메일:</strong> firsthousegunpo@gmail.com</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>10. 방침 변경 안내</h2>
          <p>
            본 개인정보처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있습니다.
            변경 시 웹사이트를 통해 사전 공지하겠습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
