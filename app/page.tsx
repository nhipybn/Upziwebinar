'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { AnalyticsTracker } from '@/components/analytics-tracker'

export default function WebinarLandingPage() {
  // Trạng thái định vị máy khách
  const [isMounted, setIsMounted] = useState(false)

  // Hàm xử lý cuộn mượt chung cho tất cả các nút trên menu
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  // Hàm xử lý nút cuộn ở Khối 4
  const handleRegister = () => {
    scrollToSection('register-form')
  }

  // =========================================================
  // KÍCH HOẠT MÃ NHÚNG CHÍNH THỨC CỦA BOWNOW THEO CHUẨN REACT DOM
  useEffect(() => {
    setIsMounted(true)

    // Khởi tạo và nạp Script nhúng Form của BowNow sau khi div chứa đã sẵn sàng
    const bownowScript = document.createElement('script')
    bownowScript.id = '_bownow_cs_sid_1d9e0c1d1dcfe0dd1cba'
    bownowScript.charset = 'utf-8'
    bownowScript.src = 'https://contents.bownow.jp/js/UTC_2adc512c6b59165cf79a/trace.js'
    bownowScript.async = true

    // Đính thẳng vào đầu trang để kích hoạt luồng vẽ Form
    document.getElementsByTagName('head')[0].appendChild(bownowScript)

    return () => {
      // Dọn dẹp script khi hủy component để tránh trùng lặp dữ liệu
      const oldScript = document.getElementById('_bownow_cs_sid_7eb998ad2209fbb3a437')
      if (oldScript && document.head.contains(oldScript)) {
        document.head.removeChild(oldScript)
      }
    }
  }, [])

  return (
    <>
      <AnalyticsTracker />
      <main className="min-h-screen bg-[#faf8ff] text-[#1a1a2e] antialiased selection:bg-[#9345FF]/20 overflow-x-hidden" style={{ fontFamily: "var(--font-manrope), var(--font-inter), sans-serif" }}>

        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white border-b border-[#ede9fe] backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-10">
            <div className="flex items-center gap-3 shrink-0">
              <img src="/Logo Upzi.png" alt="Upzi Logo" className="w-52 h-14 object-contain" />
            </div>

            <div className="hidden md:flex items-center gap-8 ml-auto">
              <button onClick={() => scrollToSection('target-audience')} className="text-[#4a5f7f] hover:text-[#9345FF] font-bold transition-colors text-[15px]">
                Đối Tượng Tham Dự
              </button>
              <button onClick={() => scrollToSection('webinar-content')} className="text-[#4a5f7f] hover:text-[#9345FF] font-bold transition-colors text-[15px]">
                Nội Dung Hội Thảo
              </button>
              <button onClick={() => scrollToSection('about-upzi')} className="text-[#4a5f7f] hover:text-[#9345FF] font-bold transition-colors text-[15px]">
                Về Upzi & Diễn Giả
              </button>
            </div>

            <Button onClick={() => scrollToSection('register-form')} className="bg-[#9345FF] hover:bg-[#7531D6] text-white font-bold px-5 py-3 rounded-xl shadow-md text-[15px] transition-all duration-200 hover:scale-[1.02]">
              Đăng Ký Ngay
            </Button>
          </div>
        </nav>

        {/* Banner Tràn Màn Hình */}
        <section className="w-full bg-[#faf8ff] block p-0 m-0 overflow-hidden">
          <img src="/NAVIGOS .png" alt="Navigos Webinar Gen Z Recruitment Banner" className="w-full h-auto block m-0 p-0" style={{ maxWidth: '100%', display: 'block' }} />
        </section>

        {/* KHỐI 1: ĐỐI TƯỢNG THAM DỰ */}
        <section id="target-audience" className="w-full py-28 bg-white border-t border-b border-[#ede9fe]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mx-auto mb-10">
              <h2 className="text-4xl font-extrabold text-[#1a1a2e] tracking-tight sm:text-5xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Đối Tượng Tham Dự</h2>
              <p className="text-[#666] mt-4 text-xl font-medium leading-relaxed whitespace-normal max-w-3xl mx-auto">Webinar mang lại giá trị thực chiến vượt trội cho những nhà quản lý nhân sự thế hệ mới.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { title: "Giám đốc/quản lý nhân sự (HR Manager / HRBP)", desc: "Xây dựng chiến lược thu hút và tuyển dụng nhân sự trẻ." },
                { title: "Phụ trách tuyển dụng (Talent Acquisition Team)", desc: "Tìm kiếm giải pháp nâng cao chất lượng ứng viên và tối ưu hiệu quả tuyển dụng." },
                { title: "Xây dựng thương hiệu nhà tuyển dụng (Employer Branding Manager)", desc: "Muốn xây dựng hình ảnh nhà tuyển dụng để tiếp cận Gen Z từ sớm." },
                { title: "Quản lý nhóm/quản lý cấp trung (Team Leader / Middle Manager)", desc: "Thường xuyên tham gia tuyển dụng và phát triển đội ngũ trẻ trong đơn vị." }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#faf8ff] p-10 rounded-3xl border-2 border-[#ede9fe] flex items-start gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-8 h-8 bg-[#9345FF] rounded-xl shrink-0 flex items-center justify-center text-white text-base font-bold mt-1">✓</div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-[#1a1a2e] text-2xl">{item.title}</h3>
                    <p className="text-[#666] text-base leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KHỐI 2: GIÁ TRỊ NHẬN ĐƯỢC */}
        <section className="w-full py-28 bg-[#f5f0ff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-[#1a1a2e] sm:text-5xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Sau webinar, Anh/Chị sẽ nhận được</h2>
              <p className="text-[#666] mt-4 text-xl font-medium leading-relaxed">Được đúc kết từ dữ liệu thực tế và kinh nghiệm đồng hành cùng hàng ngàn doanh nghiệp.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { image: "Upzi Mascot 1.png", title: "1. Hiểu cách Gen Z lựa chọn công việc", desc: "Khám phá những yếu tố ảnh hưởng đến quyết định ứng tuyển của Gen Z và cách họ tìm hiểu doanh nghiệp trước khi nộp hồ sơ." },
                { image: "Upzi Mascot 2.png", title: "2. Biết cách tối ưu thông điệp tuyển dụng", desc: "Hiểu cách xây dựng tiêu đề, JD và nội dung tuyển dụng giúp truyền tải rõ giá trị công việc và thu hút đúng nhóm ứng viên mục tiêu." },
                { image: "Upzi Mascot 3.png", title: "3. Tiếp cận Employer Branding thực tiễn", desc: "Hiểu cách doanh nghiệp có thể hiện diện sớm trong hành trình nghề nghiệp của Gen Z và xây dựng lợi thế tuyển dụng dài hạn." },
                { image: "Upzi Mascot 4.png", title: "4. Bài test nhanh: 5 giá trị Gen Z tìm kiếm", desc: "Tự đánh giá thông điệp tuyển dụng hiện tại của doanh nghiệp bạn trong 5 phút — có kết quả ngay và tải về PDF để lưu lại." },
                { image: "Upzi Mascot 5.png", title: "5. Checklist tips tối ưu tin tuyển dụng", desc: "Những mẹo nhanh, dễ áp dụng ngay để tin đăng tiếp cận đúng ứng viên hơn và tăng tỷ lệ ứng tuyển." },
                { image: "Upzi Mascot 6.png", title: "6. Tư vấn chuyên sâu 1-1 cùng Upzi", desc: "Đặt lịch trao đổi riêng về chiến lược tuyển dụng Gen Z, dựa trên đúng tình hình và bài toán của doanh nghiệp bạn." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white text-[#1a1a2e] p-8 rounded-3xl border border-[#ede9fe] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#faf8ff] rounded-2xl flex items-center justify-center p-2 border border-[#ede9fe] shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="font-extrabold text-[#1a1a2e] text-xl tracking-tight leading-snug" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[#666] text-sm leading-relaxed font-medium pt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KHỐI 4: NỘI DUNG BUỔI HỘI THẢO */}
        <section id="webinar-content" className="w-full py-28 bg-[#551CAF] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image src="/section-recruitment.png" alt="Quy Trình Tuyển Dụng" fill className="object-cover" />
              </div>
              <div className="space-y-10">
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Nội Dung Buổi Hội Thảo</h2>
                <div className="space-y-4">
                  {[
                    "Vì sao ngân sách tuyển dụng tăng nhưng ứng viên Gen Z phù hợp lại giảm?",
                    "Phễu tuyển dụng đã thay đổi như thế nào?",
                    "Framework 3A: Employer Branding để tuyển đúng người.",
                    "5 Quick Wins áp dụng ngay trong tuần.",
                    "Q&A trực tiếp cùng chuyên gia."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-5 bg-white/10 p-5 rounded-2xl border border-white/10">
                      <div className="w-8 h-8 rounded-xl bg-[#E0E722] flex items-center justify-center text-[#3C3489] font-bold text-sm shrink-0 mt-0.5">{idx + 1}</div>
                      <p className="text-base text-gray-100 leading-relaxed font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <Button onClick={handleRegister} className="bg-[#E0E722] hover:bg-[#cbd319] text-[#3C3489] text-lg font-bold px-10 py-6 rounded-xl w-full sm:w-auto shadow-xl transition-transform duration-200 hover:scale-[1.02]">
                  Đăng Ký Tham Gia Ngay
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* KHỐI 5: ĐỘI NGŨ DIỄN GIẢ - ĐÃ ĐƯỢC CHỈNH BÓP KHUNG 350PX SIÊU CÂN ĐỐI */}
        <section id="about-upzi" className="w-full py-24 bg-white border-t border-b border-[#ede9fe]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-[#1a1a2e] tracking-tight sm:text-5xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Đội Ngũ Diễn Giả
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {[
                {
                  name: "Ms. Trần Thị Ngọc Ánh",
                  roleTag: "Diễn Giả",
                  title: "Quản lý Kinh doanh, Upzi",
                  company: "Navigos Group – đơn vị sở hữu VietnamWorks, website tuyển dụng hàng đầu Việt Nam",
                  bio: "Gắn bó với Navigos Group gần 7 năm, chị Ánh là một trong những người tiên phong xây dựng and đưa Upzi ra thị trường – sản phẩm tuyển dụng dành riêng cho sinh viên and Gen Z mới ra trường. Đồng hành cùng Upzi từ những ngày đầu, chị trực tiếp đặt nền móng cho chiến lược kinh doanh, dẫn dắt một đội ngũ Sales trẻ, đồng thời tư vấn giải pháp tuyển dụng and Employer Branding cho doanh nghiệp thuộc nhiều lĩnh vực. Hành trình này giúp chị thấu hiểu sâu sắc cách Gen Z tìm việc and ra quyết định nghề nghiệp, từ đó đồng hành cùng doanh nghiệp làm mới câu chuyện Employer Branding để đón đầu thế hệ nhân sự mới.",
                  image: "/speaker-1.png"
                },
                {
                  name: "Ms. Nông Thị Thìn",
                  roleTag: "Điều Phối",
                  title: "Marketing Consultance\nB2B Sales for Vietnam & Oversea Market",
                  company: "CloudCIRCUS Asia",
                  bio: "Hơn 13 năm kinh nghiệm trong lĩnh vực B2B Marketing, Sales and Customer Success. Từng đảm nhiệm nhiều vị trí tại Fujitsu Vietnam and hiện là chuyên gia tư vấn Marketing B2B tại CloudCIRCUS Asia, với thế mạnh trong xây dựng chiến lược thu hút khách hàng, phát triển thương hiệu doanh nghiệp and tối ưu hiệu quả chuyển đổi cho khối doanh nghiệp FDI.",
                  image: "/speaker-2.png"
                }
              ].map((speaker, idx) => (
                <div key={idx} className="bg-[#faf8ff] rounded-3xl overflow-hidden border-2 border-[#ede9fe] flex flex-col shadow-sm min-h-[720px]">

                  <div className="w-full bg-[#faf8ff] pt-8 pb-4 flex items-center justify-center px-4">
                    <div className="relative h-64 w-64 sm:h-[350px] sm:w-[350px] max-w-full rounded-3xl overflow-hidden shadow-sm border border-[#ede9fe]">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="transition-transform duration-300 hover:scale-105 scale-100 object-cover mx-auto"
                      />
                    </div>
                  </div>

                  <div className="p-10 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 shrink-0">
                      <h3 className="text-2xl font-bold text-[#1a1a2e]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{speaker.name}</h3>
                      <p className="text-sm font-extrabold text-[#9345FF] uppercase tracking-wider bg-[#f3ebff] inline-block px-3 py-1 rounded-md">{speaker.roleTag}</p>
                      <p className="text-[#1a1a2e] font-bold text-base whitespace-pre-line pt-2">{speaker.title}</p>
                      <p className="text-xs text-[#9ca3af] uppercase font-bold tracking-wider pt-1">{speaker.company}</p>
                    </div>

                    <div className="flex-1 flex items-center pt-6">
                      <p className="text-[#666] text-base leading-relaxed font-medium">{speaker.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KHỐI 6: CHUẨN HOÁ IFRAME TRỎ THẲNG LINK PHÂN PHỐI FORM CỦA BOWNOW (AN TOÀN TUYỆT ĐỐI) */}
        <section id="register-form" className="bg-[#0a1230] rounded-2xl p-6 sm:p-12 mt-8 sm:mt-12">  
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                Đăng Ký Tham Gia
              </h2>
              <p className="text-sm text-[rgba(255,255,255,0.5)]">
                Hãy để Upzi lắng nghe và đồng hành cùng Đội ngũ Nhân sự.
              </p>
            </div>
            <div className="bg-transparent overflow-x-auto w-full">  
              <iframe
                src="https://contents.bownow.jp/forms/view?form_id=sid_7eb998ad2209fbb3a437"
                width="100%"
                height="800"
                frameBorder="0"
                scrolling="yes"
                style={{ display: 'block', border: 'none', minWidth: '100%' }}
                title="Upzi Contact Form"
              >
                Loading form...
              </iframe>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="w-full bg-white border-t border-gray-200 py-12 text-gray-600 antialiased" style={{ fontFamily: "var(--font-manrope), var(--font-inter), sans-serif" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-8">
              <img src="/Logo Upzi.png" className="h-14 w-auto object-contain" />
              <div className="text-left">
                <p className="text-gray-900 font-bold text-base">Một sản phẩm của Công Ty Cổ Phần Navigos Group Việt Nam</p>
                <p className="text-gray-500 text-sm mt-0.5 font-medium">Tầng 20, tòa nhà E.Town Central, 11 Đoàn Văn Bơ, Phường Xóm Chiếu, TP.HCM, Việt Nam</p>
              </div>
            </div>

            <hr className="border-gray-200 my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
              <div>
                <h3 className="text-gray-900 font-extrabold mb-3 text-sm tracking-wide uppercase">Liên hệ</h3>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="text-gray-600">Hotline: <span className="text-gray-900 font-bold">028 7305 8500</span></li>
                  <li className="text-gray-600">Zalo: <a href="https://zalo.me/0703377017" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-bold hover:text-[#9345FF] hover:underline transition-colors">070 3377 017</a></li>
                  <li className="text-gray-600">Email: <a href="mailto:upzi-support@navigosgroup.com" className="text-gray-800 hover:text-[#9345FF] hover:underline transition-colors font-semibold">upzi-support@navigosgroup.com</a></li>
                  <li className="text-gray-600">Fanpage: <a href="https://facebook.com/UpziFanpage" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#9345FF] hover:underline transition-colors font-semibold">facebook.com/UpziFanpage</a></li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm tracking-wide uppercase">
                  <a href="https://www.upzi.vn/" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-extrabold hover:text-[#9345FF] transition-colors">Về Upzi</a>
                </h3>
                <ul className="space-y-2 text-sm font-medium">
                  <li><a href="https://www.upzi.vn/thoa-thuan-su-dung" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#9345FF] hover:underline underline-offset-4 decoration-gray-400 transition-colors">Điều khoản sử dụng</a></li>
                  <li><a href="https://www.upzi.vn/quy-dinh-bao-mat" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#9345FF] hover:underline underline-offset-4 decoration-gray-400 transition-colors">Chính sách bảo mật thông tin cá nhân</a></li>
                </ul>
              </div>
            </div>

            <hr className="border-gray-200 my-6" />
            <div className="text-left text-xs sm:text-sm text-gray-400 font-medium">&copy; 2025 Upzi. All rights reserved</div>
          </div>
        </footer>
      </main>
    </>
  )
}