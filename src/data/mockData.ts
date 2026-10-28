import { Job, Candidate, EmailInboxItem, AssessmentTest } from '../types/recruitment';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-mkt-01',
    title: 'Senior Digital Marketing Manager (Performance & Growth)',
    code: 'MKT-DIGITAL-01',
    department: 'Khối Tiếp thị & Tăng trưởng Số',
    location: 'Hà Nội / Hybrid (2 ngày WFH)',
    type: 'Full-time',
    experienceRequired: '4+ năm kinh nghiệm',
    salaryRange: '35,000,000 - 55,000,000 VNĐ',
    deadline: '2026-11-30',
    status: 'Active',
    applicantCount: 16,
    createdAt: '2026-10-15',
    description:
      'Chịu trách nhiệm hoạch định và thực thi chiến lược Digital Marketing đa kênh toàn diện, tối ưu hóa ngân sách Paid Ads hàng tháng, dẫn dắt đội ngũ tăng trưởng người dùng (Growth Marketing) và nâng cao chỉ số chuyển đổi CRO.',
    requirements: [
      'Tối thiểu 4 năm kinh nghiệm làm việc chuyên sâu trong lĩnh vực Digital Marketing, Growth Hacking hoặc Performance Marketing.',
      'Kinh nghiệm quản lý ngân sách quảng cáo đa kênh từ 500,000,000 VNĐ/tháng trở lên (Facebook Ads, Google Ads, TikTok Ads, Programmatic).',
      'Thành thạo các công cụ phân tích dữ liệu: Google Analytics 4 (GA4), Mixpanel, Google Tag Manager (GTM), Looker Studio.',
      'Tư duy dựa trên số liệu (Data-driven mindset), nắm vững các chỉ số: CAC, LTV, ROAS, CPL, Churn Rate.',
      'Khả năng lãnh đạo, quản lý đội ngũ từ 4-8 nhân sự và làm việc hiệu quả cùng bộ phận Sản phẩm & Sales.',
      'Tiếng Anh giao tiếp và làm việc chuyên nghiệp (IELTS >= 6.5 hoặc tương đương).',
    ],
    benefits: [
      'Mức lương cạnh tranh từ 35 - 55 triệu VNĐ/tháng + Thưởng KPI hiệu quả chiến dịch hàng quý.',
      'Ngân sách thực chiến lớn, tự chủ quyết định phân bổ kênh và thử nghiệm các chiến lược Growth mới.',
      'Bảo hiểm sức khỏe cao cấp PVI Care toàn diện cho bản thân và người thân.',
      'Trang bị MacBook Pro M3, phụ cấp đào tạo và tham dự các hội thảo Marketing quốc tế.',
    ],
    criteria: [
      {
        id: 'crit-mkt-1',
        name: 'Kinh nghiệm Quản lý Ngân sách Ads & Tối ưu ROAS / CAC (>= 4 năm)',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Từng quản lý ngân sách lớn, tối ưu hóa chi phí thu hút khách hàng (CAC) và lợi nhuận trên chi phí quảng cáo (ROAS).',
      },
      {
        id: 'crit-mkt-2',
        name: 'Kỹ năng Phân tích Dữ liệu số (GA4, Looker Studio, GTM)',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Thành thạo tracking event, xây dựng dashboard trực quan hóa dữ liệu và phân tích phễu chuyển đổi (Conversion Funnel).',
      },
      {
        id: 'crit-mkt-3',
        name: 'Chiến lược Tăng trưởng Growth Hacking & Tối ưu CRO',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Thiết kế thử nghiệm A/B Testing, tối ưu hóa Landing Page và hành trình trải nghiệm người dùng.',
      },
      {
        id: 'crit-mkt-4',
        name: 'Năng lực Lãnh đạo Đội ngũ Tiếp thị (Team 4+ người)',
        category: 'Kỹ năng mềm',
        mandatory: false,
        weight: 4,
        description: 'Kinh nghiệm phân công công việc, đào tạo nhân viên và phối hợp với phòng Sales/Product.',
      },
      {
        id: 'crit-mkt-5',
        name: 'Ngoại ngữ Tiếng Anh làm việc quốc tế',
        category: 'Ngôn ngữ',
        mandatory: false,
        weight: 3,
        description: 'Giao tiếp tốt với đối tác nước ngoài và đọc hiểu tài liệu chuyên sâu về Marketing toàn cầu.',
      },
    ],
  },
  {
    id: 'job-mkt-02',
    title: 'Content Marketing & Brand Communications Lead',
    code: 'MKT-BRAND-02',
    department: 'Khối Thương hiệu & Truyền thông',
    location: 'TP. Hồ Chí Minh / Hybrid',
    type: 'Full-time',
    experienceRequired: '4+ năm kinh nghiệm',
    salaryRange: '30,000,000 - 45,000,000 VNĐ',
    deadline: '2026-11-25',
    status: 'Active',
    applicantCount: 12,
    createdAt: '2026-10-18',
    description:
      'Định hình tiếng nói thương hiệu (Brand Voice), xây dựng chiến lược nội dung đa kênh (Omni-channel Content Strategy), dẫn dắt các chiến dịch truyền thông sáng tạo và quản lý toàn bộ hệ thống kênh Inbound Marketing.',
    requirements: [
      'Từ 4 năm kinh nghiệm làm Content Marketing, Brand Management tại các Brand lớn hoặc Creative Agency uy tín.',
      'Thành thạo xây dựng thông điệp thương hiệu (Key Message), Brand Persona và Content Pillar.',
      'Kinh nghiệm triển khai nội dung đa định dạng: Video ngắn (TikTok, Reels), Podcast, Ebook chuyên sâu và bài viết Inbound SEO.',
      'Kỹ năng quản trị khủng hoảng truyền thông mạng xã hội và làm việc cùng đối tác báo chí/KOLs.',
      'Khả năng sáng tạo ý tưởng đột phá (Creative Concepting) và quản lý tiến độ sản xuất nội dung.',
    ],
    benefits: [
      'Mức lương 30 - 45 triệu VNĐ/tháng + Thưởng thương hiệu theo độ phủ chiến dịch.',
      'Môi trường năng động, khuyến khích sáng tạo không giới hạn và thử nghiệm xu hướng truyền thông mới.',
      'Chế độ Hybrid linh hoạt 2 ngày làm việc từ xa mỗi tuần.',
    ],
    criteria: [
      {
        id: 'crit-brand-1',
        name: 'Kinh nghiệm Chiến lược Content & Brand Storytelling (>= 4 năm)',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Từng chủ trì các chiến dịch truyền thông định vị thương hiệu thành công, tạo dấu ấn trên thị trường.',
      },
      {
        id: 'crit-brand-2',
        name: 'Quản trị Kênh truyền thông Đa nền tảng (TikTok, Social, PR)',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Nắm vững thuật toán phân phối nội dung, gia tăng tương tác tự nhiên và kiểm soát rủi ro truyền thông.',
      },
      {
        id: 'crit-brand-3',
        name: 'Kỹ năng Inbound Marketing & SEO Content định hướng chuyển đổi',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Sáng tạo nội dung chất lượng cao mang giá trị bền vững, thu hút độc giả tiềm năng thành khách hàng.',
      },
      {
        id: 'crit-brand-4',
        name: 'Quản lý Agency, KOLs và Đội ngũ Sáng tạo nội dung',
        category: 'Kỹ năng mềm',
        mandatory: false,
        weight: 3,
        description: 'Đàm phán chi phí hiệu quả với đối tác, giám sát chất lượng sản phẩm truyền thông đạt chuẩn chỉn chu.',
      },
    ],
  },
  {
    id: 'job-mkt-03',
    title: 'Senior Performance Marketing Specialist (Paid Media & Ads)',
    code: 'MKT-PERF-03',
    department: 'Khối Tiếp thị Số & Quảng cáo',
    location: 'Hà Nội / On-site',
    type: 'Full-time',
    experienceRequired: '3+ năm kinh nghiệm',
    salaryRange: '25,000,000 - 40,000,000 VNĐ',
    deadline: '2026-12-05',
    status: 'Active',
    applicantCount: 15,
    createdAt: '2026-10-20',
    description:
      'Chuyên trách tối ưu hóa chiến dịch quảng cáo trả phí (Paid Media) trên Facebook Ads, Google Ads, TikTok Ads và YouTube Ads. Kiểm soát chặt chẽ CPA, CPL, tối ưu hóa điểm hòa vốn và gia tăng lợi nhuận trên ngân sách chi tiêu.',
    requirements: [
      'Tối thiểu 3 năm kinh nghiệm thực chiến chạy quảng cáo với ngân sách từ 300,000,000 VNĐ/tháng trở lên.',
      'Thành thạo cấu hình Pixel, Conversions API (CAPI), Google Tag Manager và mô hình phân bổ Attribution.',
      'Có kỹ năng phân tích hành vi người dùng, A/B Testing mẫu quảng cáo (Ad Creatives, Hooks, Video scripts).',
      'Nhạy bén với số liệu tài chính, hiểu rõ biên lợi nhuận, LTV và phương pháp scale ngân sách an toàn.',
    ],
    benefits: [
      'Lương cứng 25 - 40 triệu VNĐ + Thưởng hoa hồng trực tiếp theo hiệu quả vượt mục tiêu ROAS/CPA.',
      'Được cấp thẻ tín dụng doanh nghiệp ngân sách lớn, hỗ trợ tài khoản Agency VIP.',
    ],
    criteria: [
      {
        id: 'crit-perf-1',
        name: 'Kinh nghiệm Triển khai Facebook, Google & TikTok Ads ngân sách lớn',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Thực chiến quản lý chiến dịch lớn, scale ngân sách linh hoạt mà không bị gãy hiệu quả CPA.',
      },
      {
        id: 'crit-perf-2',
        name: 'Tối ưu hóa Phễu chuyển đổi (Funnel CRO, CPL & ROAS)',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 5,
        description: 'Tối ưu từng điểm chạm từ hiển thị (Impression), Click (CTR), Form Lead đến Chốt đơn (Conversion).',
      },
      {
        id: 'crit-perf-3',
        name: 'Tracking kỹ thuật: Pixel, CAPI, GTM & Phân bổ Attribution',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Cài đặt tracking chuẩn xác trong bối cảnh các quy định bảo mật iOS 14.5+ và cookieless.',
      },
      {
        id: 'crit-perf-4',
        name: 'A/B Testing Mẫu Quảng Cáo & Kịch bản Video ngắn',
        category: 'Kỹ năng mềm',
        mandatory: false,
        weight: 3,
        description: 'Liên tục sản xuất và thử nghiệm các format visual, hook mở đầu thu hút khách hàng tiềm năng.',
      },
    ],
  },
  {
    id: 'job-mkt-04',
    title: 'SEO & Growth Marketing Specialist (B2B & E-commerce)',
    code: 'MKT-SEO-04',
    department: 'Khối Tăng trưởng Sản phẩm',
    location: 'TP. Hồ Chí Minh / Hybrid',
    type: 'Full-time',
    experienceRequired: '3+ năm kinh nghiệm',
    salaryRange: '22,000,000 - 35,000,000 VNĐ',
    deadline: '2026-12-15',
    status: 'Active',
    applicantCount: 9,
    createdAt: '2026-10-22',
    description:
      'Chịu trách nhiệm toàn diện về chiến lược tối ưu hóa công cụ tìm kiếm (SEO Onpage, Offpage, Technical SEO), đưa hàng nghìn từ khóa chiến lược lên Top 1-3 Google, biến Organic Search thành nguồn khách hàng tiềm năng bền vững.',
    requirements: [
      'Ít nhất 3 năm kinh nghiệm SEO thực chiến, có case study tăng trưởng Organic Traffic ấn tượng (> 200,000 traffic/tháng).',
      'Thành thạo Technical SEO: Schema Markup, Core Web Vitals, Crawl Budget, Site Architecture.',
      'Sử dụng chuyên sâu Semrush, Ahrefs, Screaming Frog, Google Search Console, BigQuery.',
      'Hiểu biết về Content Hub / Topic Cluster và tối ưu tỷ lệ chuyển đổi từ bài viết SEO thành Lead mua hàng.',
    ],
    benefits: [
      'Lương 22 - 35 triệu VNĐ + Thưởng dự án theo số lượng từ khóa mục tiêu đạt Top 3.',
      'Được cấp ngân sách mua bản quyền full các công cụ SEO hàng đầu thế giới (Ahrefs Agency, Semrush Guru).',
    ],
    criteria: [
      {
        id: 'crit-seo-1',
        name: 'Kinh nghiệm SEO On-page / Off-page & Technical SEO quy mô lớn',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Tối ưu cấu trúc website, xử lý indexation, canonical, redirect và liên kết nội bộ bài bản.',
      },
      {
        id: 'crit-seo-2',
        name: 'Nghiên cứu Từ khóa & Kiến trúc Topic Cluster / Content Hub',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Phân tích Search Intent chính xác, phân bổ nhóm từ khóa đem lại giá trị thương mại cao.',
      },
      {
        id: 'crit-seo-3',
        name: 'Sử dụng thành thạo Tool SEO: Semrush, Ahrefs, Screaming Frog',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Audit website chuyên sâu, phân tích đối thủ cạnh tranh và phát hiện cơ hội Backlink tự nhiên.',
      },
      {
        id: 'crit-seo-4',
        name: 'Tối ưu Tỷ lệ Chuyển đổi (Organic CRO to Qualified Lead)',
        category: 'Kỹ năng cứng',
        mandatory: false,
        weight: 4,
        description: 'Thiết kế Call-to-action (CTA) và phễu Inbound chuyển traffic thành khách hàng tiềm năng.',
      },
    ],
  },
];

export const INITIAL_CANDIDATES: Candidate[] = [
  // 1. Nguyễn Thùy Linh - Senior Digital Marketing Manager (Stage: interview_1)
  {
    id: 'cand-mkt-01',
    name: 'Nguyễn Thùy Linh',
    email: 'linh.nguyenthuy.mkt@gmail.com',
    phone: '0988 567 890',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-01',
    appliedJobTitle: 'Senior Digital Marketing Manager (Performance & Growth)',
    appliedDate: '2026-10-18',
    source: 'Tải lên CV (File Upload)',
    sourceFileName: 'CV_NguyenThuyLinh_Digital_Marketing_Manager.pdf',
    expectedSalary: '45,000,000 VNĐ',
    noticePeriod: '30 ngày',
    stage: 'interview_1',
    rawCvText: `HỌ VÀ TÊN: NGUYỄN THÙY LINH
Vị trí ứng tuyển: Senior Digital Marketing Manager
Email: linh.nguyenthuy.mkt@gmail.com | SĐT: 0988 567 890 | Hà Nội
Kinh nghiệm: 6 năm quản lý chiến lược Digital Marketing đa kênh

TÓM TẮT NĂNG LỰC:
- 6 năm kinh nghiệm dẫn dắt chiến lược Digital Marketing & Growth Hacking tại Shopee Vietnam và Khối Ngân hàng Số Techcombank.
- Từng quản lý ngân sách quảng cáo hơn 15 tỷ VNĐ/năm, duy trì chỉ số ROAS trung bình 4.8x và giảm 28% chi phí CAC.
- Xây dựng hệ thống tracking dữ liệu tự động với GA4, BigQuery và Looker Studio.
- Tiếng Anh lưu loát IELTS 7.5, kỹ năng thuyết trình và đàm phán cấp cao.`,
    extractedInfo: {
      fullName: 'Nguyễn Thùy Linh',
      email: 'linh.nguyenthuy.mkt@gmail.com',
      phone: '0988 567 890',
      currentRole: 'Senior Digital Marketing Lead tại Shopee Vietnam',
      yearsOfExperience: 6.0,
      summary:
        'Chuyên gia Digital Marketing với 6 năm kinh nghiệm dẫn dắt các chiến dịch tăng trưởng số quy mô lớn. Từng quản lý ngân sách hơn 15 tỷ VNĐ/năm tại Shopee và Techcombank, đạt ROAS 4.8x và tối ưu hóa chi phí CAC vượt trội.',
      skills: [
        'Digital Marketing Strategy',
        'Performance Ads (Facebook, Google, TikTok)',
        'GA4 & Looker Studio',
        'Growth Hacking',
        'Conversion Rate Optimization (CRO)',
        'Omni-channel Funnel',
        'Budget Allocation',
      ],
      softSkills: ['Quản lý đội ngũ', 'Tư duy chiến lược', 'Giải quyết vấn đề', 'Thuyết trình dữ liệu'],
      languages: ['Tiếng Việt (Bản ngữ)', 'Tiếng Anh (IELTS 7.5)'],
      certifications: [
        'Google Ads Search & Measurement Certified',
        'Meta Certified Digital Marketing Associate',
        'HubSpot Inbound Marketing Certified',
      ],
      education: [
        {
          degree: 'Cử nhân Marketing Quốc tế',
          school: 'Đại học Kinh tế Quốc dân (NEU)',
          year: '2016 - 2020',
        },
      ],
      workExperience: [
        {
          role: 'Senior Digital Marketing Lead',
          company: 'Shopee Vietnam',
          period: '2023 - Hiện tại',
          description:
            'Chỉ đạo chiến lược truyền thông số cho các chiến dịch Mega Sale (9.9, 11.11), quản lý đội ngũ 7 nhân viên, tối ưu ngân sách quảng cáo hơn 1.2 tỷ VNĐ/tháng.',
        },
        {
          role: 'Digital Marketing Specialist',
          company: 'Ngân hàng Techcombank',
          period: '2020 - 2023',
          description:
            'Phụ trách kênh Digital Acquisition cho ứng dụng Mobile Banking mới, tăng trưởng 180,000 tài khoản mở mới qua kênh Paid Media.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 94,
      matchLevel: 'Cao',
      recommendation: 'Tuyển dụng ngay',
      summaryAssessment:
        'Hồ sơ của Nguyễn Thùy Linh cực kỳ xuất sắc và đáp ứng 95% tiêu chuẩn vị trí Senior Digital Marketing Manager. Ứng viên có kinh nghiệm thực chiến tại các thương hiệu top đầu (Shopee, Techcombank), số liệu minh chứng rõ ràng (ROAS 4.8x, giảm 28% CAC), tiếng Anh IELTS 7.5 và tư duy quản lý đội ngũ vững vàng.',
      strengths: [
        '6 năm kinh nghiệm thực chiến quản lý ngân sách lớn tại Shopee & Techcombank (vượt yêu cầu 4 năm).',
        'Thành tích tăng trưởng số ấn tượng: ROAS trung bình 4.8x, giảm chi phí CAC 28%.',
        'Ngoại ngữ tiếng Anh chuẩn mực IELTS 7.5, tự tin giao tiếp và làm việc với các đối tác toàn cầu.',
        'Đã có kinh nghiệm dẫn dắt team 7 nhân sự và làm việc trực tiếp cùng C-level.',
      ],
      gapsOrConcerns: [
        'Mức lương kỳ vọng (45M) ở mức cao trong dải ngân sách, cần thương lượng lộ trình gắn với KPI quý.',
      ],
      suggestedInterviewQuestions: [
        'Khi một chiến dịch Performance lớn gặp tình trạng suy giảm ROAS đột ngột trong tuần đầu tiên, quy trình phân tích nguyên nhân của bạn gồm những bước nào?',
        'Bạn đã từng áp dụng mô hình phân bổ Attribution Modeling nào giữa các kênh Search, Social và Inbound để tối ưu hóa ngân sách?',
        'Cách bạn đào tạo và nâng cao năng lực cho các bạn chuyên viên Digital cấp dưới khi thuật toán quảng cáo thay đổi liên tục?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Quản lý Ngân sách Ads & Tối ưu ROAS / CAC (>= 4 năm)',
          status: 'Đạt',
          score: 98,
          evidence: '6 năm kinh nghiệm quản lý ngân sách hơn 15 tỷ VNĐ/năm tại Shopee và Techcombank, ROAS 4.8x.',
          notes: 'Vượt kỳ vọng tiêu chuẩn ban đầu.',
        },
        {
          criterionName: 'Kỹ năng Phân tích Dữ liệu số (GA4, Looker Studio, GTM)',
          status: 'Đạt',
          score: 95,
          evidence: 'Thành thạo tracking event, xây dựng dashboard tự động kết hợp GA4 và BigQuery.',
          notes: 'Nắm rất sâu về tracking kỹ thuật.',
        },
        {
          criterionName: 'Chiến lược Tăng trưởng Growth Hacking & Tối ưu CRO',
          status: 'Đạt',
          score: 92,
          evidence: 'Tối ưu hóa phễu đăng ký ứng dụng Techcombank, cải thiện 34% tỷ lệ hoàn tất KYC.',
          notes: 'Tư duy số liệu rất định lượng.',
        },
        {
          criterionName: 'Năng lực Lãnh đạo Đội ngũ Tiếp thị (Team 4+ người)',
          status: 'Đạt',
          score: 90,
          evidence: 'Quản lý trực tiếp 7 nhân sự chuyên viên Digital tại Shopee Vietnam.',
          notes: 'Có năng lực lãnh đạo thực tế.',
        },
        {
          criterionName: 'Ngoại ngữ Tiếng Anh làm việc quốc tế',
          status: 'Đạt',
          score: 96,
          evidence: 'Chứng chỉ IELTS 7.5 còn hiệu lực.',
          notes: 'Giao tiếp tiếng Anh trôi chảy.',
        },
      ],
    },
    assessmentStatus: 'completed',
    assessmentInviteDate: '2026-10-18 10:00',
    autoSentTestTitle: 'Bài Test Đánh Giá Toàn Diện: Digital Marketing & Growth Manager (Năng Lực + IQ + EQ + AQ)',
    iqScore: 90,
    eqScore: 94,
    aqScore: 92,
    testResult: {
      testId: 'test-combo-mkt-01',
      testTitle: 'Bài Test Đánh Giá Toàn Diện: Digital Marketing & Growth Manager (Năng Lực + IQ + EQ + AQ)',
      score: 92,
      passed: true,
      completedAt: '2026-10-19 14:30',
      correctAnswers: 9,
      totalQuestions: 10,
      timeSpentMinutes: 19,
      iqScore: 90,
      eqScore: 94,
      aqScore: 92,
      psychometricSummary:
        'Chỉ số EQ và AQ rất cao, thấu hiểu tâm lý khách hàng, giao tiếp hòa giải xung đột phòng ban khéo léo và giữ sự điềm tĩnh kiên trì khi chiến dịch đối mặt với khủng hoảng chi phí.',
      breakdown: [
        { topic: 'Digital Marketing & Growth Strategy', score: 95 },
        { topic: 'IQ - Phân tích dữ liệu & Logic A/B Testing', score: 90 },
        { topic: 'EQ - Trí tuệ cảm xúc & Quản trị đội ngũ', score: 94 },
        { topic: 'AQ - Khả năng chịu áp lực & Ứng biến thuật toán', score: 92 },
      ],
      answers: [],
    },
    interviewSchedule: {
      id: 'sched-mkt-01',
      date: '2026-10-29',
      time: '14:30 - 15:30',
      round: 'Phỏng vấn Chuyên môn Vòng 1',
      interviewer: 'Phan Minh Tuấn (Chief Marketing Officer)',
      meetingLink: 'https://meet.google.com/talentpulse-mkt-linh',
      notes: 'Tập trung đào sâu vào chiến lược tối ưu ngân sách 15 tỷ và kỹ năng quản lý team.',
      status: 'scheduled',
    },
    talentPoolData: {
      isSaved: true,
      tags: ['Top Elite', 'Digital Leader', 'IELTS 7.5', 'Ex-Shopee', 'High ROAS'],
      rating: 5,
      savedDate: '2026-10-18',
      notes: 'Ứng viên hàng đầu cho vị trí Trưởng phòng Digital Marketing, ưu tiên chốt phỏng vấn sớm.',
      category: 'Digital Marketing',
    },
    emailLogs: [
      {
        id: 'em-log-mkt-1',
        type: 'interview_invite',
        subject: '[TalentPulse] Thư mời tham dự Phỏng vấn Vòng 1 - Vị trí Senior Digital Marketing Manager',
        sentAt: '2026-10-19 09:30',
        recipient: 'linh.nguyenthuy.mkt@gmail.com',
        status: 'opened',
        htmlPreview: '<p>Kính gửi bạn Nguyễn Thùy Linh, TalentPulse xin mời bạn tham gia vòng phỏng vấn chuyên môn qua Google Meet...</p>',
      },
    ],
    notes: [
      {
        id: 'note-mkt-1',
        author: 'Lê Thu Trang (Senior HR)',
        createdAt: '2026-10-19 10:15',
        content: 'Đã gọi điện thoại sàng lọc sơ bộ (phone screening). Ứng viên nói chuyện khúc chiết, tư duy số liệu cực kỳ rõ ràng.',
      },
    ],
  },

  // 2. Trần Quang Huy - Senior Performance Marketing Specialist (Stage: interview_2)
  {
    id: 'cand-mkt-02',
    name: 'Trần Quang Huy',
    email: 'huy.tranquang.ads@gmail.com',
    phone: '0903 777 666',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-03',
    appliedJobTitle: 'Senior Performance Marketing Specialist (Paid Media & Ads)',
    appliedDate: '2026-10-16',
    source: 'Tải lên CV (File Upload)',
    sourceFileName: 'TranQuangHuy_Performance_Ads_Senior.pdf',
    expectedSalary: '38,000,000 VNĐ',
    noticePeriod: '15 ngày',
    stage: 'interview_2',
    rawCvText: `HỌ TÊN: TRẦN QUANG HUY
Vị trí: Senior Performance Marketing Specialist
Kinh nghiệm: 5.5 năm chuyên sâu Paid Media (Facebook Ads, Google Ads, TikTok Ads)
Email: huy.tranquang.ads@gmail.com | SĐT: 0903 777 666
Chứng chỉ: Meta Certified Media Buying Professional, Google Ads Search Specialist`,
    extractedInfo: {
      fullName: 'Trần Quang Huy',
      email: 'huy.tranquang.ads@gmail.com',
      phone: '0903 777 666',
      currentRole: 'Senior Performance Marketer tại Traveloka Vietnam',
      yearsOfExperience: 5.5,
      summary:
        'Chuyên gia tối ưu hóa quảng cáo trả phí với 5.5 năm kinh nghiệm quản lý ngân sách từ 800 triệu đến 2 tỷ VNĐ/tháng. Đã từng giảm 32% chi phí CAC và tối ưu tỷ lệ chuyển đổi cho sản phẩm Du lịch & Fintech tại Traveloka và VNG.',
      skills: [
        'Facebook Ads',
        'Google Performance Max',
        'TikTok Ads',
        'Conversion API (CAPI)',
        'Google Tag Manager',
        'A/B Testing Creatives',
        'Attribution Modeling',
        'AppsFlyer & Adjust',
      ],
      softSkills: ['Xử lý sự cố kỹ thuật', 'Nhạy cảm số liệu', 'Tập trung kết quả'],
      languages: ['Tiếng Việt', 'Tiếng Anh (Giao tiếp tốt)'],
      certifications: [
        'Meta Certified Media Buying Professional',
        'Google Ads Video & Search Specialist Certification',
      ],
      education: [
        {
          degree: 'Cử nhân Thương mại Điện tử',
          school: 'Đại học Thương Mại (TMU)',
          year: '2015 - 2019',
        },
      ],
      workExperience: [
        {
          role: 'Senior Performance Marketer',
          company: 'Traveloka Vietnam',
          period: '2022 - Hiện tại',
          description:
            'Chạy chiến dịch Performance Max và TikTok Ads cho mảng Khách sạn & Vé máy bay, duy trì CPL dưới 45,000 VNĐ và scale ngân sách 1.5 tỷ/tháng.',
        },
        {
          role: 'Paid Media Specialist',
          company: 'VNG Corporation (ZaloPay)',
          period: '2019 - 2022',
          description:
            'Tối ưu hóa chiến dịch cài đặt ứng dụng (App Install Campaigns) và kích hoạt ví điện tử, đạt 350,000 users mới.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 96,
      matchLevel: 'Cao',
      recommendation: 'Tuyển dụng ngay',
      summaryAssessment:
        'Hồ sơ của Trần Quang Huy gần như hoàn hảo cho vị trí Senior Performance Marketing. 5.5 năm thực chiến ngân sách tỷ đồng tại Traveloka và ZaloPay, nắm vững tracking kỹ thuật CAPI, AppsFlyer, tư duy tối ưu hóa phễu chuyển đổi sắc bén.',
      strengths: [
        '5.5 năm thực chiến Paid Ads ngân sách khủng (vượt mức 3 năm yêu cầu).',
        'Thành thạo tracking kỹ thuật phức tạp (CAPI, GTM, AppsFlyer postback).',
        'Case study cụ thể giảm 32% CAC cho Traveloka trong mùa cao điểm.',
        'Có chứng chỉ quốc tế uy tín từ Meta và Google.',
      ],
      gapsOrConcerns: [
        'Cần trao đổi thêm về kỹ năng sáng tạo thông điệp video ngắn (Content Hook).',
      ],
      suggestedInterviewQuestions: [
        'Khi chuyển dịch từ chiến dịch Google Shopping sang Performance Max, bạn thiết lập Asset Groups và Signals như thế nào để tránh đốt ngân sách vào tệp rác?',
        'Cách bạn xử lý tình trạng chênh lệch số liệu chuyển đổi giữa Facebook Ads Manager và GA4 khi áp dụng First-click vs Data-driven Attribution?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Triển khai Facebook, Google & TikTok Ads ngân sách lớn',
          status: 'Đạt',
          score: 98,
          evidence: '5.5 năm kinh nghiệm quản lý ngân sách 800tr - 2 tỷ/tháng tại Traveloka & VNG.',
          notes: 'Xuất sắc, vượt tiêu chuẩn.',
        },
        {
          criterionName: 'Tối ưu hóa Phễu chuyển đổi (Funnel CRO, CPL & ROAS)',
          status: 'Đạt',
          score: 97,
          evidence: 'Giảm 32% CAC, duy trì CPL 45k tại Traveloka.',
          notes: 'Rất vững tay nghề.',
        },
        {
          criterionName: 'Tracking kỹ thuật: Pixel, CAPI, GTM & Phân bổ Attribution',
          status: 'Đạt',
          score: 96,
          evidence: 'Thành thạo AppsFlyer, CAPI, giải quyết tốt bài toán iOS 14.5+ tracking.',
          notes: 'Điểm cộng rất lớn cho mảng kỹ thuật số.',
        },
        {
          criterionName: 'A/B Testing Mẫu Quảng Cáo & Kịch bản Video ngắn',
          status: 'Đạt',
          score: 92,
          evidence: 'Thường xuyên A/B test 15-20 biến thể creative mỗi tuần.',
          notes: 'Rất chịu khó thử nghiệm.',
        },
      ],
    },
    assessmentStatus: 'completed',
    assessmentInviteDate: '2026-10-16 11:00',
    autoSentTestTitle: 'Bài Test Đánh Giá Toàn Diện: Performance Marketing Specialist (Năng Lực + IQ + EQ + AQ)',
    iqScore: 96,
    eqScore: 86,
    aqScore: 95,
    testResult: {
      testId: 'test-combo-mkt-03',
      testTitle: 'Bài Test Đánh Giá Toàn Diện: Performance Marketing Specialist (Năng Lực + IQ + EQ + AQ)',
      score: 95,
      passed: true,
      completedAt: '2026-10-18 11:20',
      correctAnswers: 10,
      totalQuestions: 10,
      timeSpentMinutes: 16,
      iqScore: 96,
      eqScore: 86,
      aqScore: 95,
      psychometricSummary:
        'Chỉ số IQ tính toán số học và AQ kiên trì vượt khó cực cao. Phản xạ nhạy bén khi đối mặt với sự cố tài khoản Ads bị disable hoặc biến động giá thầu bất thường.',
      breakdown: [
        { topic: 'Paid Media & Technical Tracking', score: 98 },
        { topic: 'IQ - Giải thuật tối ưu chi phí & Hòa vốn', score: 96 },
        { topic: 'EQ - Đàm phán và thuyết phục liên phòng ban', score: 86 },
        { topic: 'AQ - Khắc phục khủng hoảng tài khoản & Thuật toán', score: 95 },
      ],
      answers: [],
    },
    interviewSchedule: {
      id: 'sched-mkt-02',
      date: '2026-10-30',
      time: '10:00 - 11:00',
      round: 'Phỏng vấn Trưởng Bộ Phận & CMO Vòng 2',
      interviewer: 'Phan Minh Tuấn (CMO) & Vũ Thùy Linh (HR Lead)',
      meetingLink: 'https://meet.google.com/talentpulse-perf-huy',
      notes: 'Thảo luận sâu về kế hoạch scale ngân sách lên 3 tỷ/tháng cho quý tới.',
      status: 'scheduled',
    },
    talentPoolData: {
      isSaved: true,
      tags: ['Top Performer', 'Ads Master', 'Ex-Traveloka', 'High Scale'],
      rating: 5,
      savedDate: '2026-10-16',
      notes: 'Ứng viên top-tier chuyên mảng Paid Ads, sẵn sàng chốt offer mức tối đa dải ngân sách.',
      category: 'Performance Marketing',
    },
    emailLogs: [],
    notes: [],
  },

  // 3. Phạm Hoàng Yến - Content Marketing & Brand Lead (Stage: offer)
  {
    id: 'cand-mkt-03',
    name: 'Phạm Hoàng Yến',
    email: 'yen.phamhoang.brand@gmail.com',
    phone: '0934 889 900',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-02',
    appliedJobTitle: 'Content Marketing & Brand Communications Lead',
    appliedDate: '2026-10-15',
    source: 'Portal Website',
    sourceFileName: 'PhamHoangYen_Brand_Content_Lead_CV.pdf',
    expectedSalary: '42,000,000 VNĐ',
    noticePeriod: 'Sẵn sàng ngay',
    stage: 'offer',
    rawCvText: `HỌ VÀ TÊN: PHẠM HOÀNG YẾN
Vị trí: Content Marketing & Brand Communications Lead
Kinh nghiệm: 5 năm kinh nghiệm sáng tạo nội dung & xây dựng thương hiệu
Email: yen.phamhoang.brand@gmail.com | SĐT: 0934 889 900
Giải thưởng: Vietnam Young Lions Finalist, Top Campaign Marketing 2024`,
    extractedInfo: {
      fullName: 'Phạm Hoàng Yến',
      email: 'yen.phamhoang.brand@gmail.com',
      phone: '0934 889 900',
      currentRole: 'Senior Brand Content Lead tại Dentsu Redder',
      yearsOfExperience: 5.0,
      summary:
        'Chuyên gia truyền thông thương hiệu với 5 năm kinh nghiệm dẫn dắt các chiến dịch Brand Storytelling cho Vinamilk, Biti’s và Gojek. Đạt giải thưởng Vietnam Young Lions và dẫn dắt các chiến dịch đạt trên 15 triệu lượt tiếp cận tự nhiên.',
      skills: [
        'Brand Strategy',
        'Creative Concepting',
        'Social Media Management',
        'Video Storytelling (TikTok & YouTube)',
        'Inbound Content Marketing',
        'PR & Crisis Communications',
        'Agency Management',
      ],
      softSkills: ['Sáng tạo vượt trội', 'Thấu cảm cảm xúc khách hàng', 'Thuyết trình thuyết phục'],
      languages: ['Tiếng Việt', 'Tiếng Anh (C1 Advanced)'],
      certifications: ['HubSpot Content Marketing Certified', 'Certified Brand Strategist'],
      education: [
        {
          degree: 'Cử nhân Báo chí & Truyền thông',
          school: 'Đại học Khoa học Xã hội và Nhân văn TP.HCM',
          year: '2015 - 2019',
        },
      ],
      workExperience: [
        {
          role: 'Senior Brand Content Lead',
          company: 'Dentsu Redder Vietnam',
          period: '2022 - Hiện tại',
          description:
            'Chủ trì xây dựng Creative Concept và kịch bản viral video cho các thương hiệu FMCG lớn, quản trị mối quan hệ với hơn 50 KOLs/Influencers.',
        },
        {
          role: 'Content Strategist',
          company: 'Vinamilk',
          period: '2019 - 2022',
          description:
            'Xây dựng kênh Inbound Content & Fanpage với hơn 800,000 người theo dõi, tăng 45% tương tác thảo luận thương hiệu.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 95,
      matchLevel: 'Cao',
      recommendation: 'Tuyển dụng ngay',
      summaryAssessment:
        'Ứng viên Phạm Hoàng Yến có hồ sơ thương hiệu và sáng tạo xuất sắc nhất trong đợt tuyển dụng này. Kinh nghiệm agency hàng đầu (Dentsu Redder), tư duy storytelling đỉnh cao kết hợp với khả năng thấu hiểu tâm lý độc giả sâu sắc. Tiếng Anh C1 xuất sắc.',
      strengths: [
        '5 năm kinh nghiệm chuyên sâu Brand & Content tại Dentsu Redder & Vinamilk.',
        'Đã từng triển khai chiến dịch viral đạt trên 15 triệu views.',
        'Kỹ năng quản lý đối tác KOLs và Production House rất chuyên nghiệp.',
        'Tiếng Anh lưu loát C1, đạt chứng chỉ chuyên ngành uy tín.',
      ],
      gapsOrConcerns: [],
      suggestedInterviewQuestions: [
        'Khi một nội dung của công ty bị hiểu lầm trên mạng xã hội và bắt đầu xuất hiện bình luận tiêu cực, các bước xử lý khủng hoảng truyền thông trong 2 giờ đầu tiên của bạn là gì?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Chiến lược Content & Brand Storytelling (>= 4 năm)',
          status: 'Đạt',
          score: 98,
          evidence: '5 năm kinh nghiệm sáng tạo thương hiệu tại Dentsu Redder, chiến dịch 15M views.',
          notes: 'Xuất sắc vượt chuẩn.',
        },
        {
          criterionName: 'Quản trị Kênh truyền thông Đa nền tảng (TikTok, Social, PR)',
          status: 'Đạt',
          score: 95,
          evidence: 'Quản lý Fanpage 800k followers tại Vinamilk, vận hành kênh TikTok đạt triệu view.',
          notes: 'Rất vững vàng.',
        },
        {
          criterionName: 'Kỹ năng Inbound Marketing & SEO Content định hướng chuyển đổi',
          status: 'Đạt',
          score: 92,
          evidence: 'Đạt chứng chỉ HubSpot Content Marketing, xây dựng hệ thống Content Pillar bài bản.',
          notes: 'Tư duy inbound rất tốt.',
        },
        {
          criterionName: 'Quản lý Agency, KOLs và Đội ngũ Sáng tạo nội dung',
          status: 'Đạt',
          score: 94,
          evidence: 'Quản lý mạng lưới 50+ KOLs và làm việc trực tiếp với các nhà sản xuất video.',
          notes: 'Kinh nghiệm thực tế phong phú.',
        },
      ],
    },
    assessmentStatus: 'completed',
    autoSentTestTitle: 'Bài Test Đánh Giá Toàn Diện: Content Marketing & Brand Lead (Năng Lực + IQ + EQ + AQ)',
    iqScore: 88,
    eqScore: 96,
    aqScore: 92,
    testResult: {
      testId: 'test-combo-mkt-02',
      testTitle: 'Bài Test Đánh Giá Toàn Diện: Content Marketing & Brand Lead (Năng Lực + IQ + EQ + AQ)',
      score: 93,
      passed: true,
      completedAt: '2026-10-17 16:00',
      correctAnswers: 9,
      totalQuestions: 10,
      timeSpentMinutes: 20,
      iqScore: 88,
      eqScore: 96,
      aqScore: 92,
      psychometricSummary:
        'Chỉ số EQ 96 điểm thể hiện sự thấu cảm đặc biệt sâu sắc đối với tâm lý công chúng, khả năng kể chuyện chạm vào cảm xúc và truyền cảm hứng mạnh mẽ cho đồng đội.',
      breakdown: [
        { topic: 'Brand Storytelling & Viral Strategy', score: 98 },
        { topic: 'IQ - Nhận diện xu hướng độc giả & Logic phân bổ', score: 88 },
        { topic: 'EQ - Thấu cảm tâm lý khách hàng & Xử lý phản hồi', score: 96 },
        { topic: 'AQ - Đổi mới ý tưởng khi chiến dịch bị bão hòa', score: 92 },
      ],
      answers: [],
    },
    talentPoolData: {
      isSaved: true,
      tags: ['Brand Expert', 'Creative Storyteller', 'Young Lions', 'High EQ'],
      rating: 5,
      savedDate: '2026-10-15',
      notes: 'Đã hoàn thành xuất sắc 2 vòng phỏng vấn, ban lãnh đạo đã duyệt phê duyệt thư mời nhận việc.',
      category: 'Brand Communications',
    },
    emailLogs: [
      {
        id: 'em-log-mkt-3',
        type: 'offer',
        subject: '[TalentPulse] Thư mời nhận việc (Job Offer) - Vị trí Content Marketing & Brand Lead',
        sentAt: '2026-10-21 11:00',
        recipient: 'yen.phamhoang.brand@gmail.com',
        status: 'opened',
        htmlPreview: '<p>Kính gửi chị Phạm Hoàng Yến, TalentPulse trân trọng gửi thư mời hợp tác chính thức với mức lương 42,000,000 VNĐ cùng chính sách đãi ngộ...</p>',
      },
    ],
    notes: [],
  },

  // 4. Lê Hoàng Long - SEO & Growth Specialist (Stage: hired)
  {
    id: 'cand-mkt-04',
    name: 'Lê Hoàng Long',
    email: 'long.lehoang.seo@gmail.com',
    phone: '0912 345 678',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-04',
    appliedJobTitle: 'SEO & Growth Marketing Specialist (B2B & E-commerce)',
    appliedDate: '2026-10-12',
    source: 'Nội bộ Giới thiệu',
    sourceFileName: 'LeHoangLong_SEO_Growth_Lead_CV.pdf',
    expectedSalary: '32,000,000 VNĐ',
    noticePeriod: 'Đã nhận việc',
    stage: 'hired',
    extractedInfo: {
      fullName: 'Lê Hoàng Long',
      email: 'long.lehoang.seo@gmail.com',
      phone: '0912 345 678',
      currentRole: 'Senior SEO & Growth Specialist tại TopCV Vietnam',
      yearsOfExperience: 6.0,
      summary:
        'Chuyên gia SEO & Inbound Growth với 6 năm kinh nghiệm đưa hơn 12,000 từ khóa lên Top 1-3 Google. Tăng trưởng traffic tự nhiên từ 80k lên 450k lượt truy cập/tháng cho nền tảng tuyển dụng TopCV.',
      skills: [
        'Technical SEO',
        'Onpage & Offpage SEO',
        'Topic Cluster & Content Hub',
        'Semrush & Ahrefs',
        'Screaming Frog',
        'Google Search Console',
        'Core Web Vitals Optimization',
        'Inbound CRO',
      ],
      softSkills: ['Kiên nhẫn', 'Tư duy logic thuật toán', 'Làm việc độc lập'],
      languages: ['Tiếng Việt', 'Tiếng Anh (Đọc dịch tài liệu chuyên ngành tốt)'],
      certifications: ['Semrush SEO Toolkit Certified', 'Google Analytics Certification'],
      education: [
        {
          degree: 'Kỹ sư Hệ thống Thông tin',
          school: 'Đại học Bách Khoa Hà Nội',
          year: '2014 - 2019',
        },
      ],
      workExperience: [
        {
          role: 'Senior SEO & Growth Specialist',
          company: 'TopCV Vietnam',
          period: '2021 - 2026',
          description:
            'Chịu trách nhiệm toàn bộ chiến lược SEO cho TopCV Blog và Landing pages, tăng trưởng traffic 350% và tạo ra 45,000 leads tự nhiên/tháng.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 97,
      matchLevel: 'Cao',
      recommendation: 'Tuyển dụng ngay',
      summaryAssessment:
        'Ứng viên Lê Hoàng Long có kỹ năng Technical SEO và kiến trúc website đứng đầu ngành. Nền tảng kỹ sư CNTT Bách Khoa giúp ứng viên tối ưu Schema, Core Web Vitals và Crawl Budget cực kỳ xuất sắc. Đã hoàn tất thủ tục tuyển dụng.',
      strengths: [
        'Kinh nghiệm 6 năm SEO thực chiến tại TopCV (case study 450k traffic/tháng).',
        'Background kỹ thuật sâu sắc, tự code script tự động hóa audit SEO bằng Python.',
        'Hơn 12,000 từ khóa chiếm giữ vị trí Top 3 Google.',
      ],
      gapsOrConcerns: [],
      suggestedInterviewQuestions: [],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm SEO On-page / Off-page & Technical SEO quy mô lớn',
          status: 'Đạt',
          score: 99,
          evidence: '6 năm kinh nghiệm, quản lý hệ thống website 450,000 traffic/tháng.',
          notes: 'Top tier chuyên môn SEO.',
        },
        {
          criterionName: 'Nghiên cứu Từ khóa & Kiến trúc Topic Cluster / Content Hub',
          status: 'Đạt',
          score: 96,
          evidence: 'Triển khai thành công hơn 20 Topic Cluster bao phủ toàn ngành nhân sự.',
          notes: 'Rất bài bản.',
        },
        {
          criterionName: 'Sử dụng thành thạo Tool SEO: Semrush, Ahrefs, Screaming Frog',
          status: 'Đạt',
          score: 98,
          evidence: 'Chứng chỉ Semrush Certified, thành thạo Screaming Frog regex và API.',
          notes: 'Chuyên gia công cụ.',
        },
        {
          criterionName: 'Tối ưu Tỷ lệ Chuyển đổi (Organic CRO to Qualified Lead)',
          status: 'Đạt',
          score: 94,
          evidence: 'Đóng góp 45,000 CV và leads tự nhiên mỗi tháng từ kênh Organic.',
          notes: 'Gắn liền SEO với hiệu quả kinh doanh.',
        },
      ],
    },
    assessmentStatus: 'completed',
    autoSentTestTitle: 'Bài Test Đánh Giá Toàn Diện: SEO & Growth Marketing (Năng Lực + IQ + EQ + AQ)',
    iqScore: 98,
    eqScore: 88,
    aqScore: 94,
    testResult: {
      testId: 'test-combo-mkt-04',
      testTitle: 'Bài Test Đánh Giá Toàn Diện: SEO & Growth Marketing',
      score: 96,
      passed: true,
      completedAt: '2026-10-14 15:00',
      correctAnswers: 10,
      totalQuestions: 10,
      timeSpentMinutes: 18,
      iqScore: 98,
      eqScore: 88,
      aqScore: 94,
      psychometricSummary: 'Tư duy thuật toán và logic cấu trúc ở mức tuyệt vời (IQ 98). Kiên trì và bền bỉ trong các chiến dịch dài hạn.',
      breakdown: [
        { topic: 'Technical SEO & Architecture', score: 100 },
        { topic: 'IQ - Logic phân tích dữ liệu từ khóa', score: 98 },
        { topic: 'EQ - Phối hợp cùng team Content & Dev', score: 88 },
        { topic: 'AQ - Vượt qua các đợt cập nhật Google Core Update', score: 94 },
      ],
      answers: [],
    },
    talentPoolData: {
      isSaved: true,
      tags: ['Hired', 'SEO Master', 'TopCV', 'Technical Guru'],
      rating: 5,
      savedDate: '2026-10-12',
      notes: 'Đã ký hợp đồng lao động chính thức, nhận việc ngày 01/11/2026.',
      category: 'SEO & Inbound',
    },
    emailLogs: [],
    notes: [],
  },

  // 5. Đỗ Minh Khang - Senior Digital Marketing Manager (Stage: cv_filter)
  {
    id: 'cand-mkt-05',
    name: 'Đỗ Minh Khang',
    email: 'khang.dominh.growth@gmail.com',
    phone: '0977 123 456',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-01',
    appliedJobTitle: 'Senior Digital Marketing Manager (Performance & Growth)',
    appliedDate: '2026-10-24',
    source: 'Tải lên CV (File Upload)',
    sourceFileName: 'DoMinhKhang_Digital_Marketing_Resume.pdf',
    expectedSalary: '38,000,000 VNĐ',
    noticePeriod: '30 ngày',
    stage: 'cv_filter',
    rawCvText: `HỌ TÊN: ĐỖ MINH KHANG
Vị trí: Digital Marketing Specialist (E-commerce & Growth)
Kinh nghiệm: 4 năm kinh nghiệm tại Tiki và CleverAds
Email: khang.dominh.growth@gmail.com | SĐT: 0977 123 456
Tóm tắt: 4 năm kinh nghiệm quản lý kênh Paid Ads và xây dựng Funnel chuyển đổi E-commerce.`,
    extractedInfo: {
      fullName: 'Đỗ Minh Khang',
      email: 'khang.dominh.growth@gmail.com',
      phone: '0977 123 456',
      currentRole: 'Digital Marketing Specialist tại Tiki.vn',
      yearsOfExperience: 4.0,
      summary:
        'Chuyên viên Digital Marketing với 4 năm kinh nghiệm quản lý các chiến dịch đa kênh tại sàn TMĐT Tiki và CleverAds. Thế mạnh về tối ưu hóa quảng cáo chuyển đổi và quản trị phễu khách hàng.',
      skills: ['Facebook Ads', 'Google Ads', 'GA4', 'Tiki Ads', 'Klaviyo Email Marketing', 'Funnel Optimization'],
      softSkills: ['Linh hoạt', 'Chăm chỉ', 'Tập trung dữ liệu'],
      languages: ['Tiếng Việt', 'Tiếng Anh (IELTS 6.5)'],
      certifications: ['Google Ads Search Certification'],
      education: [
        {
          degree: 'Cử nhân Quản trị Kinh doanh',
          school: 'Đại học Kinh tế TP.HCM (UEH)',
          year: '2016 - 2020',
        },
      ],
      workExperience: [
        {
          role: 'Digital Marketing Specialist',
          company: 'Tiki.vn',
          period: '2022 - Hiện tại',
          description: 'Vận hành ngân sách quảng cáo 400 triệu/tháng cho ngành hàng Điện tử & Gia dụng.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 88,
      matchLevel: 'Cao',
      recommendation: 'Rất tiềm năng',
      summaryAssessment:
        'Ứng viên Đỗ Minh Khang đáp ứng tốt các yêu cầu cơ bản của vị trí Digital Marketing Manager. Có 4 năm kinh nghiệm E-commerce tại Tiki, kỹ năng chạy Ads thực chiến tốt, tiếng Anh IELTS 6.5 đạt chuẩn. Khả năng quản lý đội ngũ cần được kiểm tra kỹ hơn trong buổi phỏng vấn.',
      strengths: [
        '4 năm kinh nghiệm thực chiến E-commerce tại Tiki.',
        'Thành thạo tối ưu phễu chuyển đổi và Email Marketing tự động hóa.',
        'Mức lương kỳ vọng (38M) rất hợp lý trong dải ngân sách tuyển dụng.',
      ],
      gapsOrConcerns: [
        'Quy mô ngân sách quản lý (400tr/tháng) chưa đạt mức 500tr+ theo mô tả công việc lý tưởng.',
        'Kinh nghiệm quản lý đội ngũ từ 4 người trở lên chưa thể hiện rõ trong CV.',
      ],
      suggestedInterviewQuestions: [
        'Kinh nghiệm phân bổ ngân sách giữa Top of Funnel (nhận diện) và Bottom of Funnel (chốt đơn) của bạn tại Tiki như thế nào?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Quản lý Ngân sách Ads & Tối ưu ROAS / CAC (>= 4 năm)',
          status: 'Đạt',
          score: 86,
          evidence: '4 năm kinh nghiệm quản lý ngân sách khoảng 400 triệu/tháng tại Tiki.',
          notes: 'Đạt mức chuẩn kinh nghiệm.',
        },
        {
          criterionName: 'Kỹ năng Phân tích Dữ liệu số (GA4, Looker Studio, GTM)',
          status: 'Đạt',
          score: 88,
          evidence: 'Sử dụng thành thạo GA4 và dashboard theo dõi doanh số.',
          notes: 'Khá tốt.',
        },
        {
          criterionName: 'Chiến lược Tăng trưởng Growth Hacking & Tối ưu CRO',
          status: 'Đạt',
          score: 90,
          evidence: 'Tối ưu phễu E-commerce tăng 22% tỷ lệ thanh toán thành công.',
          notes: 'Thế mạnh rõ nét.',
        },
        {
          criterionName: 'Năng lực Lãnh đạo Đội ngũ Tiếp thị (Team 4+ người)',
          status: 'Đạt một phần',
          score: 75,
          evidence: 'Mới hỗ trợ hướng dẫn 2 thực tập sinh, chưa có vị trí Team Lead chính thức.',
          notes: 'Cần phỏng vấn thêm về năng lực lead.',
        },
        {
          criterionName: 'Ngoại ngữ Tiếng Anh làm việc quốc tế',
          status: 'Đạt',
          score: 88,
          evidence: 'IELTS 6.5.',
          notes: 'Đáp ứng yêu cầu.',
        },
      ],
    },
    emailLogs: [],
    notes: [],
  },

  // 6. Vũ Phương Thảo - Content Marketing & Brand Lead (Stage: assessment)
  {
    id: 'cand-mkt-06',
    name: 'Vũ Phương Thảo',
    email: 'thao.vuphuong.copy@gmail.com',
    phone: '0943 222 111',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-02',
    appliedJobTitle: 'Content Marketing & Brand Communications Lead',
    appliedDate: '2026-10-22',
    source: 'Email',
    sourceFileName: 'VuPhuongThao_Content_Lead_Portfolio.pdf',
    expectedSalary: '32,000,000 VNĐ',
    noticePeriod: '30 ngày',
    stage: 'assessment',
    rawCvText: `HỌ VÀ TÊN: VŨ PHƯƠNG THẢO
Vị trí: Content Lead / Senior Copywriter
Kinh nghiệm: 3.5 năm kinh nghiệm Agency (Ogilvy & Phibious)
Email: thao.vuphuong.copy@gmail.com | SĐT: 0943 222 111`,
    extractedInfo: {
      fullName: 'Vũ Phương Thảo',
      email: 'thao.vuphuong.copy@gmail.com',
      phone: '0943 222 111',
      currentRole: 'Senior Content Creator tại Ogilvy Vietnam',
      yearsOfExperience: 3.5,
      summary:
        'Chuyên viên sáng tạo nội dung 3.5 năm kinh nghiệm tại Ogilvy Vietnam. Chuyên trách sáng tạo thông điệp thương hiệu, kịch bản TVC và chiến dịch truyền thông đa nền tảng cho các nhãn hàng Lifestyle và F&B.',
      skills: ['Copywriting', 'Creative Concept', 'TikTok Script', 'Social Media Strategy', 'Content Planning'],
      softSkills: ['Nhạy cảm ngôn từ', 'Làm việc dưới áp lực Deadline'],
      languages: ['Tiếng Việt', 'Tiếng Anh (IELTS 7.0)'],
      certifications: ['Ogilvy Creative Masterclass'],
      education: [
        {
          degree: 'Cử nhân Quan hệ Công chúng (PR)',
          school: 'Học viện Báo chí và Tuyên truyền (AJC)',
          year: '2017 - 2021',
        },
      ],
      workExperience: [
        {
          role: 'Senior Content Creator',
          company: 'Ogilvy Vietnam',
          period: '2022 - Hiện tại',
          description: 'Sáng tạo thông điệp và kịch bản truyền thông cho các nhãn hàng Nestle, Unilever.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 86,
      matchLevel: 'Cao',
      recommendation: 'Rất tiềm năng',
      summaryAssessment:
        'Hồ sơ của Vũ Phương Thảo có văn phong sáng tạo tốt và tư duy thẩm mỹ cao. Kinh nghiệm tại Ogilvy là điểm cộng lớn. Hệ thống đã tự động gửi Thư mời làm bài test 4-in-1 trước khi chuyển sang vòng phỏng vấn.',
      strengths: [
        'Kinh nghiệm sáng tạo nội dung tại Creative Agency hàng đầu (Ogilvy).',
        'Văn phong hiện đại, khả năng bắt trend TikTok và Social Media nhanh nhạy.',
        'Tiếng Anh IELTS 7.0.',
      ],
      gapsOrConcerns: [
        'Kinh nghiệm 3.5 năm hơi tiệm cận mức yêu cầu 4 năm, cần đánh giá qua bài test tư duy.',
      ],
      suggestedInterviewQuestions: [],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Chiến lược Content & Brand Storytelling (>= 4 năm)',
          status: 'Đạt một phần',
          score: 82,
          evidence: '3.5 năm kinh nghiệm chuyên sâu tại Ogilvy và Phibious.',
          notes: 'Hơi thấp hơn mức 4 năm nhưng chất lượng dự án tốt.',
        },
        {
          criterionName: 'Quản trị Kênh truyền thông Đa nền tảng (TikTok, Social, PR)',
          status: 'Đạt',
          score: 90,
          evidence: 'Nhiều video TikTok đạt triệu view cho các chiến dịch F&B.',
          notes: 'Rất sáng tạo.',
        },
        {
          criterionName: 'Kỹ năng Inbound Marketing & SEO Content định hướng chuyển đổi',
          status: 'Đạt',
          score: 84,
          evidence: 'Có kỹ năng viết bài SEO và ebook giới thiệu sản phẩm.',
          notes: 'Khá tốt.',
        },
        {
          criterionName: 'Quản lý Agency, KOLs và Đội ngũ Sáng tạo nội dung',
          status: 'Đạt',
          score: 88,
          evidence: 'Từng làm việc với hơn 30 KOLs trong các dự án agency.',
          notes: 'Có kinh nghiệm phối hợp.',
        },
      ],
    },
    assessmentStatus: 'auto_sent',
    assessmentInviteDate: '2026-10-23 09:00',
    autoSentTestTitle: 'Bài Test Đánh Giá Toàn Diện: Content Marketing & Brand Lead (Năng Lực + IQ + EQ + AQ)',
    emailLogs: [
      {
        id: 'em-log-mkt-6',
        type: 'assessment_invite',
        subject: '[TalentPulse] Thư mời thực hiện Bài Test Năng Lực 4-in-1 (Chuyên môn + IQ + EQ + AQ)',
        sentAt: '2026-10-23 09:00',
        recipient: 'thao.vuphuong.copy@gmail.com',
        status: 'delivered',
        htmlPreview: '<p>Kính gửi bạn Vũ Phương Thảo, chúc mừng hồ sơ của bạn đã vượt qua vòng lọc CV...</p>',
      },
    ],
    notes: [],
  },

  // 7. Bùi Đức Anh - Senior Performance Marketing Specialist (Stage: talent_pool)
  {
    id: 'cand-mkt-07',
    name: 'Bùi Đức Anh',
    email: 'ducanh.bui.ads@gmail.com',
    phone: '0966 888 123',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-03',
    appliedJobTitle: 'Senior Performance Marketing Specialist (Paid Media & Ads)',
    appliedDate: '2026-10-10',
    source: 'Portal Website',
    sourceFileName: 'BuiDucAnh_Performance_SaaS.pdf',
    expectedSalary: '30,000,000 VNĐ',
    noticePeriod: '15 ngày',
    stage: 'talent_pool',
    extractedInfo: {
      fullName: 'Bùi Đức Anh',
      email: 'ducanh.bui.ads@gmail.com',
      phone: '0966 888 123',
      currentRole: 'Performance Marketer tại MISA JSC',
      yearsOfExperience: 4.0,
      summary:
        'Chuyên viên chạy quảng cáo trả phí 4 năm kinh nghiệm tập trung vào khách hàng B2B phần mềm và SaaS. Tối ưu chi phí thu thập Lead cho MISA, thành thạo Google Search Ads và LinkedIn Ads.',
      skills: ['Google Search Ads', 'LinkedIn Ads', 'Facebook B2B', 'GTM', 'HubSpot CRM Integration'],
      softSkills: ['Kỷ luật', 'Tư duy tài chính B2B'],
      languages: ['Tiếng Việt', 'Tiếng Anh'],
      certifications: ['Google Ads Search Certification'],
      education: [
        {
          degree: 'Cử nhân Kinh tế Đầu tư',
          school: 'Đại học Kinh tế Quốc dân (NEU)',
          year: '2016 - 2020',
        },
      ],
      workExperience: [
        {
          role: 'Performance Marketer',
          company: 'Công ty Cổ phần MISA',
          period: '2021 - 2026',
          description: 'Quản lý chiến dịch quảng cáo B2B mang về 2,500 qualified leads/tháng.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 84,
      matchLevel: 'Trung bình',
      recommendation: 'Cân nhắc phỏng vấn',
      summaryAssessment:
        'Ứng viên Bùi Đức Anh có thế mạnh rất lớn về quảng cáo B2B và Google Ads. Tuy nhiên vị trí hiện tại đang ưu tiên mở rộng mảng B2C/E-commerce với ngân sách lớn trên TikTok Ads và Facebook Ads. Đã lưu hồ sơ vào Talent Pool để tái liên hệ khi có dự án B2B SaaS.',
      strengths: [
        '4 năm kinh nghiệm quảng cáo B2B chắc chắn tại MISA.',
        'Chi phí mang về Lead thấp và tỷ lệ chuyển đổi CRM cao.',
      ],
      gapsOrConcerns: [
        'Kinh nghiệm chạy video ads và TikTok Ads còn hạn chế.',
      ],
      suggestedInterviewQuestions: [],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Triển khai Facebook, Google & TikTok Ads ngân sách lớn',
          status: 'Đạt một phần',
          score: 80,
          evidence: 'Mạnh về Google Search và LinkedIn, TikTok Ads ở mức cơ bản.',
          notes: 'Phù hợp B2B hơn B2C.',
        },
        {
          criterionName: 'Tối ưu hóa Phễu chuyển đổi (Funnel CRO, CPL & ROAS)',
          status: 'Đạt',
          score: 86,
          evidence: 'Mang về 2,500 leads/tháng cho phần mềm kế toán.',
          notes: 'Tốt.',
        },
        {
          criterionName: 'Tracking kỹ thuật: Pixel, CAPI, GTM & Phân bổ Attribution',
          status: 'Đạt',
          score: 85,
          evidence: 'Liên kết tốt với HubSpot CRM.',
          notes: 'Đạt chuẩn.',
        },
        {
          criterionName: 'A/B Testing Mẫu Quảng Cáo & Kịch bản Video ngắn',
          status: 'Đạt một phần',
          score: 76,
          evidence: 'Ít kinh nghiệm với short video.',
          notes: 'Cần trau dồi thêm.',
        },
      ],
    },
    talentPoolData: {
      isSaved: true,
      tags: ['B2B Specialist', 'Google Ads', 'MISA Alumni', 'Potential Lead'],
      rating: 4,
      savedDate: '2026-10-10',
      notes: 'Lưu trữ hồ sơ chất lượng cao cho các vị trí B2B Growth trong tương lai.',
      category: 'Performance Marketing',
    },
    emailLogs: [],
    notes: [],
  },

  // 8. Ngô Mai Chi - Senior Digital Marketing Manager (Stage: rejected)
  {
    id: 'cand-mkt-08',
    name: 'Ngô Mai Chi',
    email: 'chi.ngomaichi.mkt@gmail.com',
    phone: '0915 678 999',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-mkt-01',
    appliedJobTitle: 'Senior Digital Marketing Manager (Performance & Growth)',
    appliedDate: '2026-10-20',
    source: 'Portal Website',
    sourceFileName: 'NgoMaiChi_Digital_Marketing_CV.pdf',
    expectedSalary: '35,000,000 VNĐ',
    noticePeriod: 'Thỏa thuận',
    stage: 'rejected',
    extractedInfo: {
      fullName: 'Ngô Mai Chi',
      email: 'chi.ngomaichi.mkt@gmail.com',
      phone: '0915 678 999',
      currentRole: 'Digital Marketing Executive tại VNBrand',
      yearsOfExperience: 2.5,
      summary:
        'Chuyên viên tiếp thị số 2.5 năm kinh nghiệm chạy quảng cáo Facebook và quản lý Fanpage cho các thương hiệu thời trang địa phương.',
      skills: ['Facebook Ads', 'Canva', 'CapCut', 'Fanpage Moderation'],
      softSkills: ['Chăm chỉ', 'Hòa đồng'],
      languages: ['Tiếng Việt'],
      certifications: [],
      education: [
        {
          degree: 'Cử nhân Quản trị Kinh doanh',
          school: 'Đại học Công Nghiệp Hà Nội',
          year: '2018 - 2022',
        },
      ],
      workExperience: [
        {
          role: 'Digital Marketing Executive',
          company: 'VNBrand',
          period: '2022 - Nay',
          description: 'Chạy ads ngân sách 50 triệu/tháng cho shop thời trang.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 68,
      matchLevel: 'Thấp',
      recommendation: 'Không phù hợp',
      summaryAssessment:
        'Ứng viên chưa đáp ứng tiêu chuẩn bắt buộc cho vị trí Senior Manager (mới có 2.5 năm kinh nghiệm so với yêu cầu 4 năm, ngân sách quản lý 50 triệu/tháng thấp hơn nhiều so với quy mô 500 triệu/tháng). Đã gửi thư cảm ơn và từ chối chuyên nghiệp.',
      strengths: ['Có tinh thần học hỏi, trẻ trung năng động.'],
      gapsOrConcerns: [
        'Kinh nghiệm thực tế chưa đạt tiêu chuẩn Senior.',
        'Chưa có kinh nghiệm phân tích dữ liệu chuyên sâu với GA4 hay BigQuery.',
        'Chưa từng quản lý nhân sự cấp dưới.',
      ],
      suggestedInterviewQuestions: [],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Quản lý Ngân sách Ads & Tối ưu ROAS / CAC (>= 4 năm)',
          status: 'Chưa đạt',
          score: 60,
          evidence: '2.5 năm kinh nghiệm, ngân sách 50 triệu/tháng.',
          notes: 'Chưa đạt chuẩn.',
        },
        {
          criterionName: 'Kỹ năng Phân tích Dữ liệu số (GA4, Looker Studio, GTM)',
          status: 'Chưa đạt',
          score: 65,
          evidence: 'Chỉ xem báo cáo cơ bản trên Facebook Ads Manager.',
          notes: 'Chưa đủ chuyên sâu.',
        },
      ],
    },
    emailLogs: [
      {
        id: 'em-log-mkt-8',
        type: 'rejection',
        subject: '[TalentPulse] Thư cảm ơn & Thông báo kết quả ứng tuyển - Vị trí Senior Digital Marketing Manager',
        sentAt: '2026-10-21 16:30',
        recipient: 'chi.ngomaichi.mkt@gmail.com',
        status: 'delivered',
        htmlPreview: '<p>Kính gửi bạn Ngô Mai Chi, lời đầu tiên TalentPulse xin chân thành cảm ơn bạn đã quan tâm ứng tuyển...</p>',
      },
    ],
    notes: [],
  },
];

export const INITIAL_EMAIL_INBOX: EmailInboxItem[] = [
  {
    id: 'mail-mkt-01',
    senderName: 'Lê Thị Thảo Trang',
    senderEmail: 'thaotrang.marketing.lead@gmail.com',
    subject: 'Ứng tuyển vị trí Senior Digital Marketing Manager - Lê Thị Thảo Trang',
    receivedAt: 'Hôm nay, 10:15',
    hasAttachment: true,
    attachmentFileName: 'CV_LeThiThaoTrang_Digital_Marketing_Manager.pdf',
    predictedJobId: 'job-mkt-01',
    predictedJobTitle: 'Senior Digital Marketing Manager (Performance & Growth)',
    status: 'unread',
    emailBody: `Kính gửi Bộ phận Tuyển dụng Công ty TalentPulse,

Tôi tên là Lê Thị Thảo Trang, hiện có hơn 5 năm kinh nghiệm làm việc chuyên sâu trong lĩnh vực Digital Marketing & Growth Hacking tại các công ty E-commerce và FinTech. Sau khi tìm hiểu bản mô tả công việc (JD) cho vị trí Senior Digital Marketing Manager của công ty, tôi nhận thấy định hướng tăng trưởng của TalentPulse rất phù hợp với chuyên môn và mục tiêu phát triển của bản thân.

Tôi từng có kinh nghiệm quản lý ngân sách quảng cáo hơn 1.5 tỷ VNĐ/tháng, tối ưu hóa các chiến dịch Omni-channel với ROAS trung bình 4.2x và dẫn dắt đội ngũ 6 nhân viên.

Tôi xin gửi kèm bản CV chi tiết trong tệp đính kèm. Rất mong có cơ hội trao đổi trực tiếp cùng quý công ty.

Trân trọng,
Lê Thị Thảo Trang
SĐT: 0945 678 123`,
    cvContentSample: `HỌ VÀ TÊN: LÊ THỊ THẢO TRANG
Vị trí ứng tuyển: Senior Digital Marketing Manager
Email: thaotrang.marketing.lead@gmail.com | SĐT: 0945 678 123 | TP. Hà Nội
Kinh nghiệm: 5 năm kinh nghiệm Digital Marketing & Growth

TÓM TẮT:
Chuyên gia Digital Marketing với 5 năm kinh nghiệm thực chiến tại các nền tảng thương mại điện tử lớn. Quản lý ngân sách quảng cáo 1.5 tỷ/tháng, tối ưu hóa toàn diện CAC và ROAS.

KỸ NĂNG:
- Kênh quảng cáo: Facebook Ads, Google Ads (Search, Display, PMax), TikTok Ads.
- Công cụ phân tích: GA4, Google Tag Manager, Looker Studio, Adjust.
- Tăng trưởng: A/B Testing, Funnel Optimization, Lead Generation B2B & B2C.
- Tiếng Anh: IELTS 7.0, giao tiếp kỹ thuật chuyên nghiệp.

KINH NGHIỆM:
1. Digital Marketing Lead - Sendo E-commerce (2022 - Hiện tại)
- Dẫn dắt nhóm 6 nhân sự, kiểm soát ngân sách Paid Ads 18 tỷ/năm.
- Cải thiện tỷ lệ chuyển đổi phễu thanh toán (CRO) tăng 26%.
2. Senior Media Buyer - CleverAds (2020 - 2022)
- Triển khai chiến dịch quảng cáo cho các nhãn hàng ngân hàng & bán lẻ.

HỌC VẤN:
- Cử nhân Marketing - Đại học Kinh tế Quốc dân (2016 - 2020)`,
  },
  {
    id: 'mail-mkt-02',
    senderName: 'Nguyễn Hữu Nam',
    senderEmail: 'nam.nguyenhuu.ads@gmail.com',
    subject: 'Application for Senior Performance Marketing Specialist - Nguyen Huu Nam',
    receivedAt: 'Hôm qua, 17:30',
    hasAttachment: true,
    attachmentFileName: 'NguyenHuuNam_Performance_Ads_Resume.pdf',
    predictedJobId: 'job-mkt-03',
    predictedJobTitle: 'Senior Performance Marketing Specialist (Paid Media & Ads)',
    status: 'read',
    emailBody: `Dear HR Team at TalentPulse,

I am writing to express my keen interest in the Senior Performance Marketing Specialist position. With 4.5 years of intensive experience optimizing paid media campaigns across Meta, Google, and TikTok for multi-million-dollar accounts, I am confident in my ability to maximize ROAS and scale your digital growth.

Please find my attached resume for your consideration. I look forward to the opportunity to discuss how my skill set can support TalentPulse.

Sincerely,
Nguyen Huu Nam
Phone: 0918 333 444`,
    cvContentSample: `NAME: NGUYEN HUU NAM
Role: Senior Performance Marketing Specialist
Email: nam.nguyenhuu.ads@gmail.com | Phone: 0918 333 444
Location: Ho Chi Minh City

SUMMARY:
Data-driven Performance Marketer with 4.5 years of experience managing paid media campaigns with monthly ad spend exceeding 900M VND. Strong expertise in Conversions API (CAPI), AppsFlyer, and creative A/B testing.

CORE SKILLS:
- Advertising Channels: Meta Ads, Google Performance Max, TikTok Ads
- Analytics & Tracking: Google Analytics 4, GTM, CAPI, SQL basics
- Optimization: Funnel CRO, Attribution Modeling, Creative Hooks
- Languages: Vietnamese (Native), English (Fluent - TOEIC 880)

EXPERIENCE:
1. Senior Media Buyer - OnPoint E-commerce (2022 - Present)
- Scaled revenue for 4 beauty and FMCG brands, maintaining ROAS > 3.8.
2. Digital Marketer - Novaon Digital (2020 - 2022)
- Executed high-volume lead generation campaigns for financial clients.

EDUCATION:
- HCMC University of Economics (UEH) - International Business (2016 - 2020)`,
  },
];

export const INITIAL_ASSESSMENTS: AssessmentTest[] = [
  {
    id: 'test-combo-mkt-01',
    jobId: 'job-mkt-01',
    testTitle: 'Bài Test Đánh Giá Toàn Diện: Digital Marketing & Growth Manager (Năng Lực + IQ + EQ + AQ)',
    testType: 'combo_iq_eq_aq',
    description:
      'Bài kiểm tra đánh giá toàn diện 4 trong 1 dành cho vị trí Trưởng phòng Tiếp thị Số: Năng lực chuyên môn Digital Marketing (ROAS, CAC, Funnel), Tư duy logic phân tích số học IQ, Trí tuệ cảm xúc EQ và Chỉ số vượt khó AQ. Tự động gửi trước cho ứng viên khi hồ sơ đạt chuẩn lọc CV.',
    durationMinutes: 25,
    passingScore: 70,
    questions: [
      {
        id: 'mkt-tech-1',
        dimension: 'Chuyên môn',
        topic: 'Chuyên môn - Tối Ưu Chi Phí & Phân Bổ Ngân Sách Ads',
        question:
          'Một chiến dịch chạy quảng cáo Facebook đang có CPA là 120,000 VNĐ với biên lợi nhuận cho phép tối đa là 150,000 VNĐ. Khi bạn tăng ngân sách đột ngột lên gấp 3 lần (Scale Budget), CPA vọt lên 190,000 VNĐ (lỗ). Chiến lược xử lý chuẩn xác nhất của Digital Marketing Manager là gì?',
        options: [
          'Tắt toàn bộ chiến dịch ngay lập tức và dừng chạy quảng cáo Facebook.',
          'Hạ ngân sách về mức ban đầu, sau đó áp dụng chiến lược Scale dọc từ từ (tăng tối đa 15-20% mỗi 48h) kết hợp nhân bản nhóm quảng cáo sang các tệp Lookalike mới và mở rộng thêm kênh Google/TikTok để tránh bão hòa tệp.',
          'Giữ nguyên ngân sách và chờ đợi thuật toán tự tối ưu trong 3 tuần.',
          'Đổi toàn bộ mục tiêu chiến dịch từ Chuyển đổi (Conversion) sang Tương tác bài viết (Engagement) để giảm chi phí hiển thị.',
        ],
        correctIndex: 1,
        explanation:
          'Tăng ngân sách đột ngột quá 20% sẽ làm reset Learning Phase của Facebook Pixel và đẩy giá thầu Auction lên cao. Giải pháp đúng là scale từ tốn 15-20% hoặc scale ngang (Horizontal scaling) sang các tệp và kênh mới.',
      },
      {
        id: 'mkt-tech-2',
        dimension: 'Chuyên môn',
        topic: 'Chuyên môn - Tracking GA4 & Attribution Modeling',
        question:
          'Trong Google Analytics 4 (GA4), mô hình phân bổ dựa trên dữ liệu (Data-driven Attribution) khác biệt như thế nào so với mô hình Last Click truyền thống?',
        options: [
          'Mô hình Data-driven gán 100% công trạng chuyển đổi cho kênh đầu tiên người dùng nhìn thấy.',
          'Mô hình Data-driven sử dụng thuật toán máy học phân tích hành trình đa điểm chạm, chia nhỏ giá trị chuyển đổi cho từng kênh (Search, Social, Direct, Email) dựa trên mức độ đóng góp thực tế.',
          'Mô hình Data-driven chỉ áp dụng cho các chiến dịch Google Search Ads.',
          'Mô hình Data-driven không tính các lượt click từ thiết bị di động.',
        ],
        correctIndex: 1,
        explanation:
          'Data-driven Attribution trong GA4 sử dụng machine learning để phân bổ tỷ lệ đóng góp của từng điểm chạm (Touchpoint) trong suốt hành trình khách hàng thay vì chỉ dồn công trạng cho cú nhấp chuột cuối cùng.',
      },
      {
        id: 'mkt-iq-1',
        dimension: 'IQ',
        topic: 'IQ - Suy Luận Phân Tích Số Liệu & Tỷ Lệ Chuyển Đổi',
        question:
          'Một Landing Page ghi nhận 10,000 lượt truy cập (Traffic). Tỷ lệ Click vào nút Đăng ký là 8%, và trong số những người click, có 25% hoàn tất biểu mẫu để trở thành Lead. Chi phí để có 10,000 lượt truy cập trên là 20,000,000 VNĐ. Chi phí trung bình trên mỗi Lead (CPL) là bao nhiêu?',
        options: [
          '50,000 VNĐ / Lead',
          '80,000 VNĐ / Lead',
          '100,000 VNĐ / Lead',
          '125,000 VNĐ / Lead',
        ],
        correctIndex: 2,
        explanation:
          'Số người click = 10,000 x 8% = 800 người. Số Lead hoàn tất = 800 x 25% = 200 Leads. Chi phí trên mỗi Lead (CPL) = 20,000,000 / 200 = 100,000 VNĐ.',
      },
      {
        id: 'mkt-iq-2',
        dimension: 'IQ',
        topic: 'IQ - Nhận Diện Quy Luật & Logic Phễu',
        question:
          'Doanh thu tháng này tăng 30% nhờ một đợt Flash Sale giảm giá sâu 50%, nhưng chỉ số Customer Lifetime Value (LTV) dự báo giảm 40% và tỷ lệ khách hàng mua lại lần 2 (Repeat Purchase Rate) giảm từ 35% xuống 8%. Nhận định logic nào phản ánh chính xác nhất tình hình kinh doanh?',
        options: [
          'Chiến dịch thành công vang dội và công ty nên liên tục giảm giá 50% hàng tháng.',
          'Doanh thu ngắn hạn tăng ảo do săn hàng giá rẻ, nhưng thương hiệu đang thu hút tệp khách hàng kém trung thành (Bargain hunters) và làm xói mòn giá trị lâu dài của doanh nghiệp.',
          'Chỉ số Repeat Purchase không quan trọng bằng doanh thu trong tháng nên không cần quan tâm.',
          'Cần cắt giảm chi phí quảng cáo ngay lập tức.',
        ],
        correctIndex: 1,
        explanation:
          'Tư duy logic của người làm Growth đòi hỏi nhìn nhận bức tranh tổng thể: LTV và Repeat Rate giảm mạnh là cảnh báo đỏ rằng chiến dịch chỉ kéo khách vãng lai, làm tổn hại uy tín thương hiệu và sức khỏe tài chính dài hạn.',
      },
      {
        id: 'mkt-eq-1',
        dimension: 'EQ',
        topic: 'EQ - Hòa Giải Xung Đột Giữa Marketing và Sales',
        question:
          'Trưởng phòng Sales phản ánh gay gắt trong cuộc họp giao ban rằng: "Đội Marketing toàn mang về data rác, gọi điện khách toàn từ chối hoặc sai số điện thoại làm Sales mất thời gian!". Là Trưởng phòng Digital Marketing, phản ứng nào thể hiện chỉ số EQ và tính xây dựng cao nhất?',
        options: [
          'Phản bác ngay tại chỗ: "Do đội Sales kỹ năng chốt đơn yếu kém chứ Marketing chạy đúng target theo JD!".',
          'Bình tĩnh ghi nhận phản hồi, đề xuất cùng Trưởng phòng Sales ngồi lại nghe ngẫu nhiên 30 cuộc gọi mẫu để phân loại nguyên nhân (do kịch bản telesale, tiêu chuẩn lọc data hay thông điệp quảng cáo), sau đó thống nhất lại định nghĩa MQL (Marketing Qualified Lead) và tối ưu form đăng ký.',
          'Im lặng bỏ qua và tiếp tục giữ nguyên chiến dịch quảng cáo hiện tại.',
          'Gửi email khiếu nại lên Tổng Giám Đốc vì thái độ của phòng Sales.',
        ],
        correctIndex: 1,
        explanation:
          'EQ cao của một Manager thể hiện ở việc không phòng thủ cái tôi cá nhân, tiếp cận vấn đề bằng phương pháp đối chiếu dữ liệu khách quan (nghe mẫu cuộc gọi, chuẩn hóa MQL) và xây dựng mối quan hệ đồng hành win-win.',
      },
      {
        id: 'mkt-aq-1',
        dimension: 'AQ',
        topic: 'AQ - Bản Lĩnh Khắc Phục Khi Kênh Chủ Lực Gặp Khủng Hoảng',
        question:
          'Ngay trước thềm đợt khuyến mãi lớn nhất năm (Mega Sale 11.11), tài khoản Business Manager quảng cáo chính của công ty bất ngờ bị nền tảng vô hiệu hóa do nghi ngờ vi phạm chính sách thuật toán mới. Là người chịu trách nhiệm, bạn phản ứng ra sao?',
        options: [
          'Hoảng loạn, đổ lỗi cho nhân viên media buyer cấp dưới và báo cáo hủy chiến dịch.',
          'Bình tĩnh kích hoạt ngay kế hoạch dự phòng (Contingency Plan): chuyển ngân sách sang tài khoản Agency Backup đã chuẩn bị sẵn, tăng tốc đẩy mạnh kênh Google Search và TikTok Ads để bù đắp traffic, đồng thời gửi kháng nghị chính thức qua kênh hỗ trợ VIP của đối tác.',
          'Tự bỏ tiền túi nạp vào tài khoản cá nhân chạy chui.',
          'Chờ đợi nền tảng tự động mở khóa sau vài tuần.',
        ],
        correctIndex: 1,
        explanation:
          'AQ (Adversity Quotient) đo lường khả năng giữ vững tinh thần thép trong khủng hoảng, luôn có kế hoạch dự phòng rủi ro và hành động quyết đoán để giảm thiểu tối đa thiệt hại cho doanh nghiệp.',
      },
    ],
  },
  {
    id: 'test-combo-mkt-02',
    jobId: 'job-mkt-02',
    testTitle: 'Bài Test Đánh Giá Toàn Diện: Content Marketing & Brand Lead (Năng Lực + IQ + EQ + AQ)',
    testType: 'combo_iq_eq_aq',
    description:
      'Đánh giá 4 trong 1: Tư duy chiến lược nội dung thương hiệu, Khả năng phân tích xu hướng công chúng (IQ), Trí tuệ cảm xúc thấu cảm độc giả (EQ) và Năng lực sáng tạo liên tục khi ý tưởng cũ bị bão hòa (AQ).',
    durationMinutes: 25,
    passingScore: 70,
    questions: [
      {
        id: 'brand-tech-1',
        dimension: 'Chuyên môn',
        topic: 'Chuyên môn - Brand Storytelling & Content Pillar',
        question:
          'Khi xây dựng kiến trúc nội dung (Content Pillar) cho một thương hiệu mới gia nhập thị trường, tỷ lệ phân bổ nội dung nào theo mô hình Hero - Hub - Help là chuẩn mực và bền vững nhất?',
        options: [
          '100% nội dung Hero tạo viral bất kể chi phí.',
          '60% Help (nội dung giải quyết nỗi đau của khách hàng), 30% Hub (nội dung duy trì tương tác và giữ chân), 10% Hero (chiến dịch lớn đột phá gia tăng độ nhận diện).',
          '80% nội dung bán hàng trực tiếp (Hard-selling) và 20% bài viết giải trí.',
          'Chỉ đăng bài viết khi có chương trình giảm giá.',
        ],
        correctIndex: 1,
        explanation:
          'Mô hình Hero-Hub-Help của Google khuyến nghị phần lớn nội dung phải là Help (giải quyết câu hỏi tìm kiếm thường nhật) và Hub (nội dung định kỳ nuôi dưỡng tệp độc giả), kết hợp 1-2 chiến dịch Hero mỗi quý để bứt phá độ phủ.',
      },
      {
        id: 'brand-iq-1',
        dimension: 'IQ',
        topic: 'IQ - Logic Đánh Giá Hiệu Suất Nội Dung',
        question:
          'Một video TikTok đạt 2 triệu lượt xem (Views) nhưng tỷ lệ xem hết video (Completion Rate) chỉ đạt 4% và không tạo ra bất kỳ lượt click nào về website. Trong khi đó, một video khác chỉ có 80,000 lượt xem nhưng Completion Rate đạt 65% và mang về 1,200 khách hàng tiềm năng. Kết luận logic nào là đúng đắn?',
        options: [
          'Video 2 triệu view tốt hơn nhiều vì đạt độ phủ lớn.',
          'Video 80,000 view có chất lượng kịch bản và tệp khán giả mục tiêu chuẩn xác hơn nhiều, mang lại giá trị chuyển đổi kinh doanh thực tế thay vì con số view ảo.',
          'Cả hai video đều thất bại.',
          'Nên xóa video 80,000 view đi.',
        ],
        correctIndex: 1,
        explanation:
          'Chỉ số Completion Rate cao và chuyển đổi lead thực tế chứng minh nội dung đánh đúng nhu cầu của khách hàng tiềm năng, vượt trội hơn các nội dung clickbait chỉ có view bề nổi.',
      },
      {
        id: 'brand-eq-1',
        dimension: 'EQ',
        topic: 'EQ - Thấu Cảm & Phản Hồi Khiếu Nại Khách Hàng',
        question:
          'Dưới một bài viết giới thiệu sản phẩm mới, một khách hàng để lại bình luận bức xúc: "Dịch vụ quá tệ, chăm sóc khách hàng như lừa đảo!". Cách ứng xử thể hiện EQ và kỹ năng Brand Communications xuất sắc nhất là gì?',
        options: [
          'Lập tức xóa bình luận và chặn tài khoản khách hàng để bảo vệ hình ảnh thương hiệu.',
          'Phản hồi công khai lịch thiệp: "Chào bạn, thương hiệu rất lấy làm tiếc và chân thành xin lỗi vì trải nghiệm chưa trọn vẹn này. Chúng mình đã chủ động gửi tin nhắn riêng cho bạn để lắng nghe chi tiết và cam kết xử lý thỏa đáng ngay trong 30 phút tới ạ".',
          'Bình luận đôi co công khai và yêu cầu khách hàng đưa ra bằng chứng xác thực.',
          'Không phản hồi gì cả vì sợ làm sự việc lan rộng.',
        ],
        correctIndex: 1,
        explanation:
          'EQ cao thể hiện sự cầu thị, chân thành lắng nghe, chuyển hóa căng thẳng công khai thành xử lý trách nhiệm trong kênh riêng để bảo vệ niềm tin của cộng đồng người tiêu dùng.',
      },
      {
        id: 'brand-aq-1',
        dimension: 'AQ',
        topic: 'AQ - Khả Năng Đổi Mới Ý Tưởng Khi Bị Bão Hòa',
        question:
          'Định dạng bài viết dạng infographic và video ngắn của thương hiệu sau 6 tháng tăng trưởng tốt bắt đầu bị bão hòa, lượt tương tác giảm 50% và cả team cạn kiệt ý tưởng sáng tạo. Là Brand Lead, bạn làm gì?',
        options: [
          'Thất vọng, trách mắng team lười biếng và yêu cầu làm việc thêm giờ.',
          'Tổ chức buổi Design Sprint tái tạo ý tưởng: khảo sát trực tiếp 50 khách hàng trung thành để tìm kiếm các góc nhìn cuộc sống mới, thử nghiệm định dạng Podcast / User-Generated Content (UGC) và khuyến khích team thử nghiệm format mới mà không sợ sai.',
          'Sao chép y nguyên cách làm của đối thủ cạnh tranh.',
          'Cắt giảm toàn bộ chi phí sản xuất nội dung.',
        ],
        correctIndex: 1,
        explanation:
          'Bản lĩnh AQ của người làm sáng tạo là chấp nhận chu kỳ bão hòa là điều tự nhiên, biết cách truyền cảm hứng và tạo môi trường an toàn để đội ngũ tìm kiếm những hướng đi đột phá mới.',
      },
    ],
  },
  {
    id: 'test-combo-mkt-03',
    jobId: 'job-mkt-03',
    testTitle: 'Bài Test Đánh Giá Toàn Diện: Performance Marketing Specialist (Năng Lực + IQ + EQ + AQ)',
    testType: 'combo_iq_eq_aq',
    description:
      'Đánh giá kỹ thuật Paid Ads chuyên sâu, Phân bổ chuyển đổi, Tư duy tính toán tối ưu hóa chi phí và Năng lực ứng biến khi tài khoản quảng cáo bị vô hiệu hóa.',
    durationMinutes: 25,
    passingScore: 70,
    questions: [
      {
        id: 'perf-tech-1',
        dimension: 'Chuyên môn',
        topic: 'Chuyên môn - Meta Conversions API (CAPI) & Server-side Tracking',
        question:
          'Sau khi Apple cập nhật chính sách App Tracking Transparency (ATT) trên iOS 14.5+, giải pháp kỹ thuật nào giúp nhà quảng cáo phục hồi dữ liệu chuyển đổi bị mất và tối ưu thuật toán máy học của Meta hiệu quả nhất?',
        options: [
          'Chỉ chạy quảng cáo nhắm mục tiêu vào thiết bị Android.',
          'Triển khai Meta Conversions API (CAPI) theo cơ chế Server-side tracking kết hợp với Meta Pixel của trình duyệt và bật tính năng Advanced Matching để gửi dữ liệu định danh băm (Hashed Data) an toàn.',
          'Tắt toàn bộ tính năng theo dõi sự kiện chuyển đổi.',
          'Tăng giá thầu đấu giá lên gấp 2 lần.',
        ],
        correctIndex: 1,
        explanation:
          'Server-side CAPI kết hợp Browser Pixel và Event Deduplication là tiêu chuẩn vàng của ngành để bù đắp các tín hiệu bị chặn bởi trình duyệt và hệ điều hành di động.',
      },
      {
        id: 'perf-iq-1',
        dimension: 'IQ',
        topic: 'IQ - Tính Toán Biên Hòa Vốn & Tối Ưu ROAS',
        question:
          'Một sản phẩm bán lẻ có giá bán 500,000 VNĐ. Giá vốn sản phẩm (COGS) là 200,000 VNĐ. Chi phí đóng gói và vận chuyển là 50,000 VNĐ. Điểm hòa vốn ROAS (Break-even ROAS) tối thiểu mà chiến dịch quảng cáo cần đạt được để không bị lỗ là bao nhiêu?',
        options: [
          '1.5x',
          '2.0x',
          '2.5x',
          '3.0x',
        ],
        correctIndex: 1,
        explanation:
          'Lợi nhuận gộp trên mỗi sản phẩm = 500,000 - 200,000 - 50,000 = 250,000 VNĐ. Tỷ suất lợi nhuận gộp = 250,000 / 500,000 = 50%. Điểm hòa vốn ROAS = 1 / Tỷ suất lợi nhuận gộp = 1 / 0.5 = 2.0x (tương đương 200%).',
      },
      {
        id: 'perf-eq-1',
        dimension: 'EQ',
        topic: 'EQ - Thuyết Phục & Phối Hợp Cùng Đội Ngũ Thiết Kế Design',
        question:
          'Khi mẫu ảnh quảng cáo do Designer thiết kế rất đẹp về mặt mỹ thuật nhưng chỉ số Click-Through-Rate (CTR) thực tế lại rất thấp (< 0.5%), cách giao tiếp nào giúp Designer vui vẻ hợp tác chỉnh sửa lại?',
        options: [
          'Chê bai thẳng: "Ảnh thiết kế xấu quá không ai thèm click, làm lại ngay mẫu khác đi!".',
          'Khen ngợi bố cục thẩm mỹ của Designer, sau đó đưa ra số liệu thực tế từ bài A/B test và cùng thảo luận: "Thiết kế rất bắt mắt nhưng có vẻ nút kêu gọi hành động (CTA) và thông điệp ưu đãi chưa nổi bật trên màn hình điện thoại nhỏ. Chúng mình thử làm thêm 2 phiên bản có font chữ to hơn và đổi màu tương phản xem sao nhé".',
          'Tự vào Canva cắt ghép ảnh khác mà không báo cho Designer.',
          'Dừng chạy quảng cáo và báo cáo Designer không đạt yêu cầu.',
        ],
        correctIndex: 1,
        explanation:
          'Giao tiếp dựa trên số liệu khách quan kết hợp sự tôn trọng chuyên môn của đồng đội là bí quyết giúp Performance Marketer nhận được sự hỗ trợ nhiệt tình từ đội ngũ Design/Creative.',
      },
      {
        id: 'perf-aq-1',
        dimension: 'AQ',
        topic: 'AQ - Khả Năng Ứng Biến Khi Chi Phí Tăng Đột Biến',
        question:
          'Trong mùa mua sắm cuối năm, giá thầu hiển thị CPM của toàn thị trường tăng vọt 80% khiến chi phí chạy ads bị đội lên cao. Là Performance Specialist, hành động nào thể hiện tư duy xử lý nhạy bén nhất?',
        options: [
          'Cắt giảm toàn bộ ngân sách và không tham gia đợt sale.',
          'Tập trung tối đa vào tệp khách hàng ấm (Remarketing & Custom Audience người mua cũ), thử nghiệm các định dạng quảng cáo có CPM rẻ hơn như Short Video TikTok / Reels, tối ưu tỷ lệ chuyển đổi trên Landing Page để bù đắp cho sự gia tăng của CPM.',
          'Cố chấp đổ thêm thật nhiều tiền vào tệp cũ mà không thay đổi kịch bản.',
          'Đổi sang chạy mục tiêu tìm kiếm tin nhắn giá rẻ.',
        ],
        correctIndex: 1,
        explanation:
          'Khi CPM thị trường tăng khách quan, người làm Performance bản lĩnh sẽ tập trung tối ưu những yếu tố trong tầm kiểm soát: tỷ lệ chuyển đổi Landing Page, tệp Remarketing chất lượng cao và định dạng nội dung sáng tạo có CPM cạnh tranh hơn.',
      },
    ],
  },
];
