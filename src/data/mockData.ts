import { Job, Candidate, EmailInboxItem, AssessmentTest } from '../types/recruitment';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-fe-01',
    title: 'Senior Frontend Engineer (React / TypeScript)',
    code: 'TECH-FE-01',
    department: 'Khối Công nghệ & Sản phẩm',
    location: 'Hà Nội / Hybrid (2 ngày WFH)',
    type: 'Full-time',
    experienceRequired: '4+ năm kinh nghiệm',
    salaryRange: '35,000,000 - 55,000,000 VNĐ',
    deadline: '2026-11-30',
    status: 'Active',
    applicantCount: 24,
    description:
      'Chịu trách nhiệm kiến trúc và phát triển giao diện Web quy mô lớn, tối ưu hóa trải nghiệm người dùng, performance Core Web Vitals và dẫn dắt đội ngũ kỹ sư Frontend.',
    requirements: [
      'Tối thiểu 4 năm kinh nghiệm làm việc chuyên sâu với React, TypeScript và Modern JavaScript.',
      'Thành thạo quản lý State (Redux Toolkit, Zustand, TanStack Query), SSR/SSG với Next.js.',
      'Kinh nghiệm thực chiến về Performance Optimization, Bundle Splitting, Core Web Vitals.',
      'Sử dụng thành thạo Tailwind CSS, CSS-in-JS, xây dựng Design System và Micro-frontends.',
      'Có tư duy sản phẩm, viết Unit/E2E test (Jest, Playwright) và giao tiếp tốt.',
    ],
    benefits: [
      'Mức lương cạnh tranh, thưởng tháng 13 + thưởng hiệu quả kinh doanh lên tới 3 tháng lương.',
      'Gói bảo hiểm sức khỏe cao cấp PVI cho nhân viên và người thân.',
      'Trang bị MacBook Pro M3 Max + màn hình 4K.',
      'Phụ cấp học tập 20,000,000 VNĐ/năm cho các chứng chỉ quốc tế.',
    ],
    criteria: [
      {
        id: 'crit-fe-1',
        name: 'Kinh nghiệm React & TypeScript thực chiến (>= 4 năm)',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Đã xây dựng và duy trì các hệ thống Web SPA phức tạp với React và TypeScript.',
      },
      {
        id: 'crit-fe-2',
        name: 'Kiến trúc Next.js, SSR & State Management',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Nắm vững Next.js App Router, SSR, Zustand hoặc TanStack Query.',
      },
      {
        id: 'crit-fe-3',
        name: 'Tối ưu hiệu năng Core Web Vitals & Web Vitals',
        category: 'Kỹ năng cứng',
        mandatory: false,
        weight: 4,
        description: 'Tối ưu LCP, FID, CLS, tree shaking, code splitting cho app hàng triệu người dùng.',
      },
      {
        id: 'crit-fe-4',
        name: 'Kỹ năng Viết Test (Unit / E2E) & CI/CD',
        category: 'Kỹ năng cứng',
        mandatory: false,
        weight: 3,
        description: 'Viết test với Jest, Vitest hoặc Playwright, tích hợp GitHub Actions.',
      },
      {
        id: 'crit-fe-5',
        name: 'Kỹ năng Đọc hiểu tài liệu & Giao tiếp tiếng Anh',
        category: 'Ngôn ngữ',
        mandatory: false,
        weight: 3,
        description: 'Đọc tài liệu kỹ thuật trôi chảy, có thể thảo luận với đồng nghiệp quốc tế.',
      },
    ],
  },
  {
    id: 'job-be-02',
    title: 'Senior Backend Engineer (Go / Node.js & Microservices)',
    code: 'TECH-BE-02',
    department: 'Khối Công nghệ & Sản phẩm',
    location: 'TP. Hồ Chí Minh / Hybrid',
    type: 'Full-time',
    experienceRequired: '4+ năm kinh nghiệm',
    salaryRange: '40,000,000 - 65,000,000 VNĐ',
    deadline: '2026-11-25',
    status: 'Active',
    applicantCount: 18,
    description:
      'Phát triển hệ thống microservices chịu tải cao, thiết kế kiến trúc phân tán, xử lý hàng triệu transaction mỗi ngày trên nền tảng Go, PostgreSQL và Kafka.',
    requirements: [
      'Từ 4 năm kinh nghiệm Backend với Go (Golang) hoặc Node.js / TypeScript.',
      'Kinh nghiệm thiết kế kiến trúc Microservices, RESTful API, gRPC.',
      'Thành thạo cơ sở dữ liệu quan hệ (PostgreSQL) và NoSQL/Cache (Redis, MongoDB).',
      'Có kinh nghiệm với Message Broker (Kafka hoặc RabbitMQ) và Docker / Kubernetes.',
    ],
    benefits: [
      'Lương thưởng cạnh tranh, xét tăng lương 2 lần/năm.',
      'Cổ phần ESOP cho nhân sự đóng góp xuất sắc.',
      'Môi trường làm việc quốc tế, linh hoạt remote.',
    ],
    criteria: [
      {
        id: 'crit-be-1',
        name: 'Kinh nghiệm Golang hoặc Node.js quy mô lớn',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Xử lý concurrency cao, memory optimization.',
      },
      {
        id: 'crit-be-2',
        name: 'Kiến trúc Microservices, gRPC & Kafka',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 5,
        description: 'Thiết kế event-driven, distributed tracing, load balancing.',
      },
      {
        id: 'crit-be-3',
        name: 'Tối ưu cơ sở dữ liệu SQL & Caching',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Index optimization, query execution plan, Redis caching pattern.',
      },
      {
        id: 'crit-be-4',
        name: 'DevOps cơ bản: Docker, K8s, CI/CD',
        category: 'Kỹ năng cứng',
        mandatory: false,
        weight: 3,
        description: 'Triển khai dịch vụ lên Kubernetes, giám sát bằng Prometheus/Grafana.',
      },
    ],
  },
  {
    id: 'job-pm-03',
    title: 'Lead Product Manager (B2B SaaS)',
    code: 'PROD-PM-03',
    department: 'Khối Phát triển Sản phẩm',
    location: 'Hà Nội / On-site',
    type: 'Full-time',
    experienceRequired: '3+ năm kinh nghiệm',
    salaryRange: '45,000,000 - 70,000,000 VNĐ',
    deadline: '2026-12-15',
    status: 'Active',
    applicantCount: 15,
    description:
      'Định hình chiến lược sản phẩm B2B SaaS, dẫn dắt discovery, quản lý backlog, làm việc cùng Engineering & UI/UX để đưa sản phẩm chiếm lĩnh thị trường.',
    requirements: [
      'Ít nhất 3 năm kinh nghiệm làm Product Manager cho sản phẩm B2B / SaaS.',
      'Kỹ năng phân tích dữ liệu, định lượng và định tính (SQL, Mixpanel, Google Analytics).',
      'Hiểu biết sâu sắc về hành trình người dùng và mô hình kinh doanh phần mềm B2B.',
      'Tiếng Anh giao tiếp lưu loát.',
    ],
    benefits: [
      'Lương hấp dẫn + Bonus doanh số sản phẩm.',
      'Cơ hội dẫn dắt sản phẩm mở rộng thị trường Đông Nam Á.',
    ],
    criteria: [
      {
        id: 'crit-pm-1',
        name: 'Kinh nghiệm quản lý sản phẩm B2B SaaS',
        category: 'Kinh nghiệm',
        mandatory: true,
        weight: 5,
        description: 'Đã trực tiếp ra mắt và phát triển tính năng cho B2B SaaS.',
      },
      {
        id: 'crit-pm-2',
        name: 'Tư duy dựa trên số liệu (Data-driven mindset)',
        category: 'Kỹ năng cứng',
        mandatory: true,
        weight: 4,
        description: 'Sử dụng công cụ Product Analytics để tối ưu Retention & Adoption.',
      },
      {
        id: 'crit-pm-3',
        name: 'Giao tiếp Tiếng Anh chuyên nghiệp',
        category: 'Ngôn ngữ',
        mandatory: true,
        weight: 4,
        description: 'Phỏng vấn và trao đổi trực tiếp với khách hàng quốc tế.',
      },
    ],
  },
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-01',
    name: 'Nguyễn Hải Nam',
    email: 'nam.nguyenhai89@gmail.com',
    phone: '0987 654 321',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-fe-01',
    appliedJobTitle: 'Senior Frontend Engineer (React / TypeScript)',
    appliedDate: '2026-10-18',
    source: 'Email',
    expectedSalary: '45,000,000 VNĐ',
    noticePeriod: '30 ngày',
    stage: 'interview_1',
    extractedInfo: {
      fullName: 'Nguyễn Hải Nam',
      email: 'nam.nguyenhai89@gmail.com',
      phone: '0987 654 321',
      currentRole: 'Senior Frontend Developer tại VNG Corporation',
      yearsOfExperience: 5.5,
      summary:
        'Hơn 5 năm kinh nghiệm chuyên sâu phát triển ứng dụng Web quy mô lớn với ReactJS, NextJS và TypeScript. Từng dẫn dắt team 6 người tối ưu Core Web Vitals giảm 40% thời gian tải trang.',
      skills: ['React', 'TypeScript', 'Next.js', 'Redux Toolkit', 'Zustand', 'Tailwind CSS', 'GraphQL', 'Jest', 'Vite'],
      softSkills: ['Lãnh đạo nhóm', 'Giải quyết vấn đề', 'Mentoring junior', 'Tư duy thẩm mỹ UI/UX'],
      languages: ['Tiếng Việt (Bản ngữ)', 'Tiếng Anh (IELTS 7.0)'],
      certifications: ['AWS Certified Cloud Practitioner', 'Meta Frontend Developer Professional Certificate'],
      education: [
        {
          degree: 'Kỹ sư Công nghệ Thông tin',
          school: 'Đại học Bách Khoa Hà Nội',
          year: '2016 - 2021',
        },
      ],
      workExperience: [
        {
          role: 'Senior Frontend Engineer',
          company: 'VNG Corporation',
          period: '2023 - Hiện tại',
          description: 'Phụ trách kiến trúc module Zalo Web Mini App, tối ưu bundle size giảm 35%, quản lý state với Zustand.',
        },
        {
          role: 'Frontend Developer',
          company: 'FPT Software',
          period: '2021 - 2023',
          description: 'Xây dựng dashboard tài chính cho khách hàng Nhật Bản bằng React, TypeScript và ChartJS.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 94,
      matchLevel: 'Cao',
      recommendation: 'Tuyển dụng ngay',
      summaryAssessment:
        'Ứng viên Nguyễn Hải Nam có hồ sơ cực kỳ xuất sắc và đáp ứng 95% yêu cầu của vị trí Senior Frontend. Ứng viên có 5.5 năm kinh nghiệm thực tế tại các công ty công nghệ lớn, có kinh nghiệm tối ưu hóa hiệu năng và dẫn dắt kỹ thuật. Khả năng tiếng Anh tốt (IELTS 7.0).',
      strengths: [
        '5.5 năm kinh nghiệm vững chắc với React & TypeScript (vượt yêu cầu 4 năm).',
        'Có chứng chỉ quốc tế và kinh nghiệm tối ưu Core Web Vitals cụ thể (giảm 40% loading time).',
        'Kỹ năng tiếng Anh lưu loát IELTS 7.0, tự tin giao tiếp quốc tế.',
        'Đã từng giữ vai trò Lead/Mentor nhóm 6 thành viên.',
      ],
      gapsOrConcerns: [
        'Kinh nghiệm Micro-frontends trên dự án thực tế ở mức trung bình, cần kiểm tra sâu hơn.',
        'Mức lương kỳ vọng (45M) ở mức cao trong dải ngân sách, cần thương lượng khéo léo.',
      ],
      suggestedInterviewQuestions: [
        'Anh có thể giải thích chi tiết quy trình anh đã phân tích bundle và tối ưu hóa 35% dung lượng tại VNG?',
        'Khi một component React bị re-render không mong muốn trong danh sách hàng nghìn phần tử, anh dùng công cụ nào để trace và xử lý?',
        'Cách anh xây dựng một hệ thống Design System tái sử dụng chung cho nhiều dự án con?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm React & TypeScript thực chiến (>= 4 năm)',
          status: 'Đạt',
          score: 98,
          evidence: '5.5 năm kinh nghiệm làm việc tại VNG và FPT Software chuyên sâu React & TS.',
          notes: 'Vượt kỳ vọng so với tiêu chí ban đầu đưa ra.',
        },
        {
          criterionName: 'Kiến trúc Next.js, SSR & State Management',
          status: 'Đạt',
          score: 92,
          evidence: 'Sử dụng Next.js, Zustand, Redux Toolkit trên dự án thực tế phục vụ hàng trăm nghìn người dùng.',
          notes: 'Nắm chắc tư duy kiến trúc và server components.',
        },
        {
          criterionName: 'Tối ưu hiệu năng Core Web Vitals & Web Vitals',
          status: 'Đạt',
          score: 95,
          evidence: 'Dẫn chứng cụ thể: Tối ưu Core Web Vitals giảm 40% thời gian tải trang tại VNG.',
          notes: 'Minh chứng rất rõ ràng, định lượng bằng số liệu.',
        },
        {
          criterionName: 'Kỹ năng Viết Test (Unit / E2E) & CI/CD',
          status: 'Đạt một phần',
          score: 80,
          evidence: 'Có sử dụng Jest nhưng chưa thấy nhiều bằng chứng về E2E (Playwright/Cypress).',
          notes: 'Cần kiểm tra thêm về quy trình viết automation test trong buổi phỏng vấn.',
        },
        {
          criterionName: 'Kỹ năng Đọc hiểu tài liệu & Giao tiếp tiếng Anh',
          status: 'Đạt',
          score: 96,
          evidence: 'Đạt chứng chỉ IELTS 7.0.',
          notes: 'Giao tiếp tốt và đọc hiểu tài liệu quốc tế.',
        },
      ],
    },
    testResult: {
      testId: 'test-fe-01',
      score: 90,
      passed: true,
      completedAt: '2026-10-19 14:30',
      correctAnswers: 9,
      totalQuestions: 10,
      timeSpentMinutes: 18,
      breakdown: [
        { topic: 'React Hooks & State', score: 100 },
        { topic: 'TypeScript Advanced', score: 90 },
        { topic: 'Web Performance', score: 85 },
        { topic: 'System Design UI', score: 85 },
      ],
      answers: [],
    },
    interviewSchedule: {
      id: 'sched-01',
      date: '2026-10-22',
      time: '14:30 - 15:30',
      round: 'Phỏng vấn Kỹ thuật Vòng 1',
      interviewer: 'Trần Văn Quyết (Head of Engineering)',
      meetingLink: 'https://meet.google.com/talentpulse-fe-nam',
      notes: 'Tập trung hỏi về kiến trúc Micro-frontend và kinh nghiệm tối ưu bundle.',
      status: 'scheduled',
    },
    talentPoolData: {
      isSaved: true,
      tags: ['Top Performer', 'Senior React', 'IELTS 7.0', 'Potential Tech Lead'],
      rating: 5,
      savedDate: '2026-10-18',
      notes: 'Ứng viên cực sáng giá, nên ưu tiên chốt offer sớm nếu phỏng vấn đạt.',
      category: 'Frontend Engineering',
    },
    emailLogs: [
      {
        id: 'em-log-1',
        type: 'interview_invite',
        subject: '[TalentPulse] Thư mời tham dự Phỏng vấn Kỹ thuật - Vị trí Senior Frontend Engineer',
        sentAt: '2026-10-19 09:15',
        recipient: 'nam.nguyenhai89@gmail.com',
        status: 'opened',
        htmlPreview: '<p>Chào bạn Nam, TalentPulse xin mời bạn tham gia vòng phỏng vấn kỹ thuật...</p>',
      },
    ],
    notes: [
      {
        id: 'note-1',
        author: 'Lê Thu Trang (Senior HR)',
        createdAt: '2026-10-19 10:00',
        content: 'Đã gọi điện thoại sơ bộ (screening call), ứng viên giao tiếp tự tin, phong thái chuyên nghiệp.',
      },
    ],
  },
  {
    id: 'cand-02',
    name: 'Trần Thị Bích Ngọc',
    email: 'bichngoc.tran.dev@gmail.com',
    phone: '0912 345 678',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-fe-01',
    appliedJobTitle: 'Senior Frontend Engineer (React / TypeScript)',
    appliedDate: '2026-10-17',
    source: 'LinkedIn',
    expectedSalary: '38,000,000 VNĐ',
    noticePeriod: '15 ngày',
    stage: 'assessment',
    extractedInfo: {
      fullName: 'Trần Thị Bích Ngọc',
      email: 'bichngoc.tran.dev@gmail.com',
      phone: '0912 345 678',
      currentRole: 'Frontend Developer tại Tiki Corporation',
      yearsOfExperience: 4.0,
      summary:
        '4 năm kinh nghiệm xây dựng ứng dụng Thương mại điện tử với React, Redux và Next.js. Chuyên môn sâu về responsive design, UI component library và tích hợp cổng thanh toán.',
      skills: ['React', 'JavaScript (ES6+)', 'TypeScript', 'Redux', 'Next.js', 'Tailwind CSS', 'Sass', 'RESTful API'],
      softSkills: ['Làm việc nhóm', 'Cẩn thận tỉ mỉ', 'Quản lý thời gian'],
      languages: ['Tiếng Việt', 'Tiếng Anh (Toeic 820)'],
      certifications: [],
      education: [
        {
          degree: 'Cử nhân Khoa học Máy tính',
          school: 'Đại học Khoa học Tự nhiên TP.HCM',
          year: '2017 - 2021',
        },
      ],
      workExperience: [
        {
          role: 'Frontend Developer',
          company: 'Tiki Corporation',
          period: '2022 - Hiện tại',
          description: 'Phát triển trang thanh toán (Checkout) và giỏ hàng, cải thiện tỷ lệ chuyển đổi đơn hàng thêm 8%.',
        },
        {
          role: 'Junior Frontend Developer',
          company: 'KMS Technology',
          period: '2020 - 2022',
          description: 'Xây dựng website responsive và tích hợp API cho đối tác Mỹ.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 86,
      matchLevel: 'Cao',
      recommendation: 'Rất tiềm năng',
      summaryAssessment:
        'Ứng viên Trần Thị Bích Ngọc đạt 4 năm kinh nghiệm phù hợp với yêu cầu tối thiểu. Có nền tảng vững vàng trong lĩnh vực Thương mại điện tử (E-commerce), thành thạo React và Redux. Cần đánh giá thêm về chiều sâu TypeScript và kỹ năng tối ưu hiệu năng chuyên sâu.',
      strengths: [
        '4 năm kinh nghiệm sát với yêu cầu JD.',
        'Kinh nghiệm thực tế trong dự án E-commerce lớn tại Tiki.',
        'Kỳ vọng lương rất hợp lý (38M), thời gian onboard nhanh (15 ngày).',
        'Có tư duy về trải nghiệm người dùng và chuyển đổi doanh số.',
      ],
      gapsOrConcerns: [
        'TypeScript chưa phải kỹ năng thế mạnh nhất (chủ yếu ES6 và JavaScript truyền thống).',
        'Ít kinh nghiệm về Micro-frontends hoặc quản lý State hiện đại (Zustand/TanStack Query).',
      ],
      suggestedInterviewQuestions: [
        'Trong dự án Tiki, bạn đã giải quyết bài toán đồng bộ giỏ hàng thời gian thực giữa nhiều tabs/thiết bị như thế nào?',
        'Sự khác biệt giữa Generic Types và Mapped Types trong TypeScript là gì và bạn ứng dụng nó khi nào?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm React & TypeScript thực chiến (>= 4 năm)',
          status: 'Đạt một phần',
          score: 82,
          evidence: '4 năm kinh nghiệm React, nhưng chủ yếu dùng JS/ES6, mới làm quen TS 1.5 năm.',
          notes: 'Đủ điều kiện kinh nghiệm nhưng cần kiểm tra sâu về TypeScript.',
        },
        {
          criterionName: 'Kiến trúc Next.js, SSR & State Management',
          status: 'Đạt',
          score: 88,
          evidence: 'Dự án Tiki dùng Next.js và Redux, xử lý SEO và SSR tốt.',
          notes: 'Đáp ứng tốt tiêu chí.',
        },
        {
          criterionName: 'Tối ưu hiệu năng Core Web Vitals & Web Vitals',
          status: 'Đạt một phần',
          score: 78,
          evidence: 'Đã tối ưu trang checkout nhưng chưa có nhiều kinh nghiệm sâu về CLS, LCP.',
          notes: 'Cần hướng dẫn thêm trong dự án lớn.',
        },
        {
          criterionName: 'Kỹ năng Viết Test (Unit / E2E) & CI/CD',
          status: 'Đạt một phần',
          score: 75,
          evidence: 'Chỉ mới viết unit test cơ bản cho logic tính toán.',
          notes: 'Mức độ đáp ứng trung bình.',
        },
        {
          criterionName: 'Kỹ năng Đọc hiểu tài liệu & Giao tiếp tiếng Anh',
          status: 'Đạt',
          score: 85,
          evidence: 'TOEIC 820, làm việc với khách hàng KMS Technology.',
          notes: 'Tốt.',
        },
      ],
    },
    testResult: {
      testId: 'test-fe-01',
      score: 82,
      passed: true,
      completedAt: '2026-10-19 16:40',
      correctAnswers: 8,
      totalQuestions: 10,
      timeSpentMinutes: 20,
      breakdown: [
        { topic: 'React Hooks & State', score: 90 },
        { topic: 'TypeScript Advanced', score: 70 },
        { topic: 'Web Performance', score: 80 },
        { topic: 'System Design UI', score: 85 },
      ],
      answers: [],
    },
    talentPoolData: {
      isSaved: true,
      tags: ['E-commerce Specialist', 'React Developer', 'Fast Onboard'],
      rating: 4,
      savedDate: '2026-10-17',
      notes: 'Thích hợp nếu cần người bổ sung nhanh chóng cho mảng Checkout / Customer Portal.',
      category: 'Frontend Engineering',
    },
    emailLogs: [
      {
        id: 'em-log-2',
        type: 'assessment_invite',
        subject: '[TalentPulse] Bài kiểm tra năng lực trực tuyến - Senior Frontend Engineer',
        sentAt: '2026-10-18 10:00',
        recipient: 'bichngoc.tran.dev@gmail.com',
        status: 'opened',
        htmlPreview: '<p>Mời bạn tham gia làm bài test online...</p>',
      },
    ],
    notes: [],
  },
  {
    id: 'cand-03',
    name: 'Đặng Quốc Huy',
    email: 'huy.dangquoc.tech@outlook.com',
    phone: '0903 888 999',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-be-02',
    appliedJobTitle: 'Senior Backend Engineer (Go / Node.js & Microservices)',
    appliedDate: '2026-10-16',
    source: 'Direct Upload',
    expectedSalary: '50,000,000 VNĐ',
    noticePeriod: '30 ngày',
    stage: 'interview_2',
    extractedInfo: {
      fullName: 'Đặng Quốc Huy',
      email: 'huy.dangquoc.tech@outlook.com',
      phone: '0903 888 999',
      currentRole: 'Backend Lead tại FinTech Solution Corp',
      yearsOfExperience: 6.0,
      summary:
        'Kỹ sư Backend 6 năm kinh nghiệm chuyên sâu về ngôn ngữ Go, kiến trúc microservices và hạ tầng đám mây AWS. Đã từng thiết kế hệ thống thanh toán xử lý 25,000 TPS.',
      skills: ['Golang', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'gRPC', 'AWS'],
      softSkills: ['Kiến trúc hệ thống', 'Quản lý sự cố khẩn cấp (Incident Response)', 'Tư duy an toàn bảo mật'],
      languages: ['Tiếng Việt', 'Tiếng Anh (Giao tiếp tốt)'],
      certifications: ['AWS Certified Solutions Architect Associate', 'Certified Kubernetes Administrator (CKA)'],
      education: [
        {
          degree: 'Kỹ sư Phần mềm',
          school: 'Đại học Bách Khoa TP.HCM',
          year: '2014 - 2019',
        },
      ],
      workExperience: [
        {
          role: 'Backend Tech Lead',
          company: 'FinTech Solution Corp',
          period: '2022 - Hiện tại',
          description: 'Thiết kế core payment gateway bằng Go và Kafka, giảm p99 latency từ 320ms xuống 45ms.',
        },
        {
          role: 'Senior Software Engineer',
          company: 'Gojek Tech Vietnam',
          period: '2019 - 2022',
          description: 'Phát triển dịch vụ định vị và tính cước xe sử dụng Go và Redis cluster.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 97,
      matchLevel: 'Cao',
      recommendation: 'Tuyển dụng ngay',
      summaryAssessment:
        'Hồ sơ của Đặng Quốc Huy tiệm cận mức hoàn hảo cho vị trí Senior Backend. 6 năm kinh nghiệm với Go, có chứng chỉ CKA và AWS Solutions Architect, từng xử lý hệ thống tải khủng 25k TPS. Điểm AI đánh giá toàn diện 97/100.',
      strengths: [
        'Kinh nghiệm Go thực chiến 6 năm tại các công ty Fintech & Tech Unicorn (Gojek).',
        'Có 2 chứng chỉ uy tín: AWS Solutions Architect và Kubernetes CKA.',
        'Thành tích tối ưu latency ấn tượng (p99 giảm từ 320ms xuống 45ms).',
        'Am hiểu sâu về Kafka, Distributed Locking, Database Replication.',
      ],
      gapsOrConcerns: [
        'Kỳ vọng lương cao (50M), nhưng hoàn toàn xứng đáng với năng lực.',
      ],
      suggestedInterviewQuestions: [
        'Trong hệ thống 25k TPS, anh giải quyết vấn đề idempotency (chống trùng lặp giao dịch) khi Kafka re-balance như thế nào?',
        'Kinh nghiệm phân vùng database (sharding vs partitioning) của anh trên PostgreSQL?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm Golang hoặc Node.js quy mô lớn',
          status: 'Đạt',
          score: 98,
          evidence: '6 năm kinh nghiệm Go, thiết kế core payment xử lý 25k TPS.',
          notes: 'Xuất sắc, vượt tiêu chuẩn.',
        },
        {
          criterionName: 'Kiến trúc Microservices, gRPC & Kafka',
          status: 'Đạt',
          score: 98,
          evidence: 'Xây dựng kiến trúc event-driven trên Kafka và gRPC cho hàng triệu giao dịch/ngày.',
          notes: 'Rất chuyên sâu.',
        },
        {
          criterionName: 'Tối ưu cơ sở dữ liệu SQL & Caching',
          status: 'Đạt',
          score: 96,
          evidence: 'Tối ưu p99 latency từ 320ms xuống 45ms nhờ Redis Cluster & tuning Postgres.',
          notes: 'Rất tốt.',
        },
        {
          criterionName: 'DevOps cơ bản: Docker, K8s, CI/CD',
          status: 'Đạt',
          score: 95,
          evidence: 'Có chứng chỉ CKA (Certified Kubernetes Administrator).',
          notes: 'Vượt kỳ vọng cho một Senior Backend.',
        },
      ],
    },
    testResult: {
      testId: 'test-be-01',
      score: 95,
      passed: true,
      completedAt: '2026-10-18 11:20',
      correctAnswers: 10,
      totalQuestions: 10,
      timeSpentMinutes: 16,
      breakdown: [
        { topic: 'Golang Concurrency & Channels', score: 100 },
        { topic: 'Distributed Systems & Kafka', score: 95 },
        { topic: 'Database Performance', score: 90 },
      ],
      answers: [],
    },
    interviewSchedule: {
      id: 'sched-02',
      date: '2026-10-23',
      time: '10:00 - 11:00',
      round: 'Phỏng vấn Trưởng phòng & CTO Vòng 2',
      interviewer: 'Lê Hoàng Long (CTO)',
      meetingLink: 'https://meet.google.com/talentpulse-be-huy',
      notes: 'Thảo luận sâu về System Architecture và văn hóa engineering.',
      status: 'scheduled',
    },
    talentPoolData: {
      isSaved: true,
      tags: ['Top Elite', 'Go Master', 'CKA', 'Fintech Specialist'],
      rating: 5,
      savedDate: '2026-10-16',
      notes: 'Ứng viên top-tier, sẵn sàng chốt offer mức tối đa ngân sách.',
      category: 'Backend Engineering',
    },
    emailLogs: [
      {
        id: 'em-log-3',
        type: 'interview_invite',
        subject: '[TalentPulse] Thư mời phỏng vấn Vòng 2 (Final Round) với CTO',
        sentAt: '2026-10-18 15:00',
        recipient: 'huy.dangquoc.tech@outlook.com',
        status: 'opened',
        htmlPreview: '<p>Kính gửi anh Huy, chúc mừng anh đã vượt qua Vòng 1...</p>',
      },
    ],
    notes: [
      {
        id: 'note-2',
        author: 'Trần Văn Quyết (Head of Engineering)',
        createdAt: '2026-10-18 16:30',
        content: 'Vòng 1 phỏng vấn kỹ thuật đạt điểm A+. Trả lời sắc bén tất cả các câu hỏi về distributed system.',
      },
    ],
  },
  {
    id: 'cand-04',
    name: 'Phạm Minh Tuấn',
    email: 'tuan.pm2020@gmail.com',
    phone: '0977 123 456',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-fe-01',
    appliedJobTitle: 'Senior Frontend Engineer (React / TypeScript)',
    appliedDate: '2026-10-19',
    source: 'Email',
    expectedSalary: '32,000,000 VNĐ',
    stage: 'cv_filter',
    extractedInfo: {
      fullName: 'Phạm Minh Tuấn',
      email: 'tuan.pm2020@gmail.com',
      phone: '0977 123 456',
      currentRole: 'Web Developer tại Agency ABC',
      yearsOfExperience: 2.5,
      summary: 'Lập trình viên Web với 2.5 năm kinh nghiệm làm việc với React, HTML5, CSS3 và WordPress.',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'WordPress', 'PHP cơ bản'],
      softSkills: ['Chăm chỉ', 'Học hỏi nhanh'],
      languages: ['Tiếng Việt'],
      certifications: [],
      education: [
        {
          degree: 'Cử nhân CNTT',
          school: 'Đại học Công nghệ Giao thông Vận tải',
          year: '2018 - 2022',
        },
      ],
      workExperience: [
        {
          role: 'Web Developer',
          company: 'Agency ABC',
          period: '2022 - Hiện tại',
          description: 'Cắt HTML/CSS và làm website giới thiệu cho doanh nghiệp bằng React và WordPress.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 52,
      matchLevel: 'Thấp',
      recommendation: 'Không phù hợp',
      summaryAssessment:
        'Ứng viên Phạm Minh Tuấn mới chỉ có 2.5 năm kinh nghiệm làm Web Agency quy mô nhỏ, chưa đáp ứng yêu cầu tối thiểu 4 năm của vị trí Senior Frontend. Thiếu kinh nghiệm chuyên sâu về TypeScript, Next.js, kiến trúc lớn và tối ưu hiệu năng.',
      strengths: [
        'Kỹ năng cắt HTML/CSS và UI giao diện cơ bản tốt.',
        'Mức lương kỳ vọng thấp (32M).',
      ],
      gapsOrConcerns: [
        'Chưa đủ số năm kinh nghiệm yêu cầu (2.5 năm so với 4+ năm).',
        'Chưa có kinh nghiệm thực tế với TypeScript trong môi trường enterprise.',
        'Chưa từng làm việc với Next.js hoặc hệ thống Micro-frontends.',
        'Tiếng Anh hạn chế.',
      ],
      suggestedInterviewQuestions: [
        'Nếu bạn tham gia dự án lớn với TypeScript nghiêm ngặt (strict mode), bạn chuẩn bị học hỏi như thế nào?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm React & TypeScript thực chiến (>= 4 năm)',
          status: 'Chưa đạt',
          score: 45,
          evidence: 'Chỉ có 2.5 năm kinh nghiệm và chủ yếu là JavaScript cơ bản.',
          notes: 'Không đạt tiêu chí bắt buộc quan trọng nhất.',
        },
        {
          criterionName: 'Kiến trúc Next.js, SSR & State Management',
          status: 'Chưa đạt',
          score: 40,
          evidence: 'CV không đề cập tới Next.js hoặc các state management library hiện đại.',
          notes: 'Chưa đạt.',
        },
        {
          criterionName: 'Tối ưu hiệu năng Core Web Vitals & Web Vitals',
          status: 'Chưa đạt',
          score: 50,
          evidence: 'Chưa có dự án yêu cầu tối ưu performance chuyên sâu.',
          notes: 'Chưa đạt.',
        },
        {
          criterionName: 'Kỹ năng Viết Test (Unit / E2E) & CI/CD',
          status: 'Chưa đạt',
          score: 30,
          evidence: 'Không có kinh nghiệm viết automated test.',
          notes: 'Chưa đạt.',
        },
        {
          criterionName: 'Kỹ năng Đọc hiểu tài liệu & Giao tiếp tiếng Anh',
          status: 'Đạt một phần',
          score: 60,
          evidence: 'Đọc hiểu tài liệu cơ bản nhưng chưa tự tin giao tiếp.',
          notes: 'Mức độ cơ bản.',
        },
      ],
    },
    talentPoolData: {
      isSaved: true,
      tags: ['Junior/Middle Level', 'Potential Future Hire', 'Agency Background'],
      rating: 2,
      savedDate: '2026-10-19',
      notes: 'Chưa đủ trình độ Senior, có thể lưu lại liên hệ khi mở đợt tuyển Junior/Middle Frontend.',
      category: 'Junior Engineering',
    },
    emailLogs: [],
    notes: [],
  },
  {
    id: 'cand-05',
    name: 'Vũ Hoàng Mai',
    email: 'mai.vuhoang.pm@gmail.com',
    phone: '0934 567 890',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    appliedJobId: 'job-pm-03',
    appliedJobTitle: 'Lead Product Manager (B2B SaaS)',
    appliedDate: '2026-10-15',
    source: 'LinkedIn',
    expectedSalary: '55,000,000 VNĐ',
    stage: 'offer',
    extractedInfo: {
      fullName: 'Vũ Hoàng Mai',
      email: 'mai.vuhoang.pm@gmail.com',
      phone: '0934 567 890',
      currentRole: 'Senior Product Manager tại Base.vn',
      yearsOfExperience: 4.5,
      summary:
        'Product Manager 4.5 năm kinh nghiệm dẫn dắt các dòng sản phẩm B2B SaaS quản trị doanh nghiệp. Tăng trưởng MRR sản phẩm thêm 45% trong 18 tháng và duy trì tỷ lệ Net Churn dưới 1.2%.',
      skills: ['Product Strategy', 'B2B SaaS', 'Agile/Scrum', 'Mixpanel', 'SQL Data Analysis', 'Figma', 'User Research'],
      softSkills: ['Thuyết trình', 'Thương lượng đàm phán', 'Tư duy chiến lược'],
      languages: ['Tiếng Việt', 'Tiếng Anh (Thành thạo - C1)'],
      certifications: ['Certified Scrum Product Owner (CSPO)'],
      education: [
        {
          degree: 'Cử nhân Quản trị Kinh doanh Quốc tế',
          school: 'Đại học Ngoại Thương Hà Nội',
          year: '2016 - 2020',
        },
      ],
      workExperience: [
        {
          role: 'Senior Product Manager',
          company: 'Base.vn',
          period: '2022 - Hiện tại',
          description: 'Quản lý nhóm sản phẩm Base HRM & Payroll với 2,000+ doanh nghiệp vừa và lớn sử dụng.',
        },
      ],
    },
    aiAnalysis: {
      overallScore: 95,
      matchLevel: 'Cao',
      recommendation: 'Tuyển dụng ngay',
      summaryAssessment:
        'Ứng viên Vũ Hoàng Mai có background B2B SaaS rất khớp với mô tả công việc. Kinh nghiệm thực chiến tại Base.vn với sản phẩm quản trị nhân sự, tư duy số liệu tốt, tiếng Anh C1 xuất sắc.',
      strengths: [
        'Kinh nghiệm thực chiến B2B SaaS tại Base.vn (top công ty SaaS tại VN).',
        'Chứng chỉ CSPO, kỹ năng phân tích dữ liệu chuyên nghiệp (SQL, Mixpanel).',
        'Tiếng Anh lưu loát C1.',
        'Thành tích tăng trưởng MRR và kiểm soát churn rate rất ấn tượng.',
      ],
      gapsOrConcerns: [],
      suggestedInterviewQuestions: [
        'Làm thế nào chị cân bằng giữa yêu cầu tùy biến riêng (customization) của khách hàng lớn và định hướng chuẩn hóa sản phẩm SaaS?',
      ],
      criteriaEvaluations: [
        {
          criterionName: 'Kinh nghiệm quản lý sản phẩm B2B SaaS',
          status: 'Đạt',
          score: 96,
          evidence: '4.5 năm phụ trách Base HRM với hơn 2000 doanh nghiệp sử dụng.',
          notes: 'Khớp hoàn toàn yêu cầu cốt lõi.',
        },
        {
          criterionName: 'Tư duy dựa trên số liệu (Data-driven mindset)',
          status: 'Đạt',
          score: 94,
          evidence: 'Thành thạo SQL, Mixpanel, phân tích cohort và churn rate dưới 1.2%.',
          notes: 'Rất vững.',
        },
        {
          criterionName: 'Giao tiếp Tiếng Anh chuyên nghiệp',
          status: 'Đạt',
          score: 95,
          evidence: 'Đạt trình độ C1, tốt nghiệp Ngoại Thương.',
          notes: 'Xuất sắc.',
        },
      ],
    },
    talentPoolData: {
      isSaved: true,
      tags: ['SaaS Expert', 'CSPO', 'Strategic Thinker', 'High Impact'],
      rating: 5,
      savedDate: '2026-10-15',
      notes: 'Đã hoàn thành 2 vòng phỏng vấn với đánh giá xuất sắc từ Ban Giám đốc.',
      category: 'Product Management',
    },
    emailLogs: [
      {
        id: 'em-log-4',
        type: 'offer',
        subject: '[TalentPulse] Thư mời nhận việc (Job Offer) - Vị trí Lead Product Manager',
        sentAt: '2026-10-19 11:00',
        recipient: 'mai.vuhoang.pm@gmail.com',
        status: 'opened',
        htmlPreview: '<p>Chúc mừng chị Vũ Hoàng Mai, công ty TalentPulse trân trọng gửi thư mời hợp tác...</p>',
      },
    ],
    notes: [],
  },
];

export const INITIAL_EMAIL_INBOX: EmailInboxItem[] = [
  {
    id: 'mail-01',
    senderName: 'Lê Văn An',
    senderEmail: 'an.levan.dev@gmail.com',
    subject: 'Ứng tuyển vị trí Senior Frontend Engineer - Lê Văn An',
    receivedAt: 'Hôm nay, 10:15',
    hasAttachment: true,
    attachmentFileName: 'CV_LeVanAn_Senior_Frontend.pdf',
    predictedJobId: 'job-fe-01',
    predictedJobTitle: 'Senior Frontend Engineer (React / TypeScript)',
    status: 'unread',
    emailBody: `Kính gửi Bộ phận Tuyển dụng Công ty TalentPulse,

Tôi tên là Lê Văn An, hiện có hơn 4 năm kinh nghiệm lập trình Frontend chuyên sâu về ReactJS, TypeScript và Next.js. Tôi đã đọc bản mô tả công việc của quý công ty và cảm thấy kinh nghiệm cũng như đam mê của mình rất phù hợp.

Tôi xin gửi kèm CV chi tiết đính kèm trong thư này. Rất mong có cơ hội được trao đổi trực tiếp cùng quý công ty.

Trân trọng,
Lê Văn An
SĐT: 0945 123 789`,
    cvContentSample: `HỌ VÀ TÊN: LÊ VĂN AN
Vị trí: Senior Frontend Developer
Email: an.levan.dev@gmail.com | SĐT: 0945 123 789 | TP. Hà Nội
Kinh nghiệm: 4.5 năm

TÓM TẮT:
Frontend Engineer với 4.5 năm kinh nghiệm phát triển Web App với React, TypeScript, Next.js và Tailwind CSS. Có kinh nghiệm tối ưu hóa Core Web Vitals, xây dựng Design System và Micro-frontends.

KỸ NĂNG:
- Lập trình: React, TypeScript, Next.js, Redux Toolkit, Zustand, Tailwind CSS, GraphQL, Jest.
- Tiếng Anh: TOEIC 850, giao tiếp kỹ thuật tốt.

KINH NGHIỆM LÀM VIỆC:
1. Senior Frontend Developer tại TechCorp VN (2023 - Nay)
- Kiến trúc lại hệ thống quản lý kho với Next.js App Router và Zustand.
- Cải thiện điểm Lighthouse từ 65 lên 92.
2. Frontend Developer tại VNApp (2020 - 2023)
- Phát triển giao diện web portal bằng React và TypeScript.

HỌC VẤN:
- Đại học Bách Khoa Hà Nội - Kỹ thuật Phần mềm (2016 - 2020)`,
  },
  {
    id: 'mail-02',
    senderName: 'Trần Minh Đức',
    senderEmail: 'duc.tranminh.go@gmail.com',
    subject: 'Application for Senior Backend Engineer (Go / Microservices) - Tran Minh Duc',
    receivedAt: 'Hôm qua, 17:30',
    hasAttachment: true,
    attachmentFileName: 'Tran_Minh_Duc_Backend_Go_Resume.pdf',
    predictedJobId: 'job-be-02',
    predictedJobTitle: 'Senior Backend Engineer (Go / Node.js & Microservices)',
    status: 'read',
    emailBody: `Dear HR Team at TalentPulse,

I am writing to express my strong interest in the Senior Backend Engineer position at your company. With 5 years of hands-on experience developing distributed systems using Golang, Kafka, and PostgreSQL, I believe I can bring immediate value to your engineering team.

Please find my attached resume for your consideration.

Best regards,
Tran Minh Duc
Phone: 0918 765 432`,
    cvContentSample: `NAME: TRAN MINH DUC
Role: Senior Golang & Backend Engineer
Email: duc.tranminh.go@gmail.com | Phone: 0918 765 432
Location: Ho Chi Minh City

SUMMARY:
Senior Backend Engineer with 5 years experience building scalable, fault-tolerant microservices with Golang, PostgreSQL, Redis, Kafka and Docker. Strong focus on high-throughput architectures and concurrency.

CORE SKILLS:
- Languages: Go (Golang), Node.js, C++
- Databases: PostgreSQL, Redis, MongoDB
- Streaming & MQ: Apache Kafka, RabbitMQ
- DevOps & Cloud: Docker, Kubernetes, AWS (EC2, S3, RDS)
- Architecture: Microservices, gRPC, Event-driven, Clean Architecture

EXPERIENCE:
1. Senior Backend Developer - VNPAY (2022 - Present)
- Designed transaction settlement service in Go, handling 15,000 transactions/second.
- Integrated Kafka event streaming for real-time reconciliation.
2. Software Engineer - Axon Active (2019 - 2022)
- Built enterprise REST and gRPC microservices in Go and Node.js.

EDUCATION:
- HCMC University of Technology (BK HCM) - Computer Engineering (2015 - 2019)`,
  },
  {
    id: 'mail-03',
    senderName: 'Hoàng Kim Yến',
    senderEmail: 'yen.hoangkim.hr@gmail.com',
    subject: 'Ứng tuyển Chuyên viên Product Manager - Hoàng Kim Yến',
    receivedAt: 'Hôm qua, 14:15',
    hasAttachment: true,
    attachmentFileName: 'HoangKimYen_CV_Product_Manager.pdf',
    predictedJobId: 'job-pm-03',
    predictedJobTitle: 'Lead Product Manager (B2B SaaS)',
    status: 'unread',
    emailBody: `Chào Bộ phận Tuyển dụng,

Tôi xin gửi hồ sơ ứng tuyển vị trí Product Manager. Tôi có hơn 3 năm kinh nghiệm trong lĩnh vực EdTech và B2B SaaS, từng quản lý lộ trình sản phẩm và phân tích người dùng.

CV chi tiết đính kèm trong thư. Mong sớm nhận được phản hồi từ quý công ty!`,
    cvContentSample: `HỌ TÊN: HOÀNG KIM YẾN
Vị trí: Product Manager (SaaS / EdTech)
Email: yen.hoangkim.hr@gmail.com | SĐT: 0966 555 444
Kinh nghiệm: 3.5 năm

TÓM TẮT:
Product Manager có tư duy sản phẩm định lượng, kinh nghiệm xây dựng sản phẩm từ giai đoạn 0 lên 1, dẫn dắt đội ngũ Agile 10 thành viên.

KỸ NĂNG:
- Product Discovery, User Research, Wireframing (Figma), Agile/Scrum
- Analytics: Amplitude, Google Analytics, SQL cơ bản
- Ngôn ngữ: Tiếng Anh IELTS 7.5

KINH NGHIỆM:
- Product Manager tại Topica Edtech (2022 - Nay)
- Associate PM tại Got It Vietnam (2020 - 2022)`,
  },
];

export const INITIAL_ASSESSMENTS: AssessmentTest[] = [
  {
    id: 'test-fe-01',
    jobId: 'job-fe-01',
    testTitle: 'Bài Test Năng Lực Senior Frontend & React Architecture',
    durationMinutes: 20,
    passingScore: 75,
    questions: [
      {
        id: 'q-1',
        topic: 'React Hooks & State',
        question:
          'Trong React 18/19, khi một component thực hiện nhiều lệnh cập nhật state liên tiếp trong một hàm setTimeout hoặc Promise, hành vi batching diễn ra như thế nào?',
        options: [
          'React sẽ re-render ngay sau mỗi lần gọi setState riêng lẻ.',
          'React sẽ tự động gom (automatic batching) tất cả các cập nhật state lại thành một lần re-render duy nhất.',
          'Chỉ batching nếu được bọc trong hàm flushSync().',
          'Tùy thuộc vào việc component là Class Component hay Functional Component.',
        ],
        correctIndex: 1,
        explanation:
          'Kể từ React 18, tính năng Automatic Batching được áp dụng cho tất cả các bản cập nhật state, bao gồm cả bên trong promises, setTimeout, và native event handlers để tối ưu hiệu năng.',
      },
      {
        id: 'q-2',
        topic: 'TypeScript Advanced',
        question:
          'Khi muốn tạo một Type mới từ Type T nhưng loại bỏ đi thuộc tính mang kiểu dữ liệu null hoặc undefined, Utility Type nào của TypeScript là phù hợp nhất?',
        options: ['Omit<T, null>', 'NonNullable<T>', 'Exclude<T, undefined>', 'Extract<T, any>'],
        correctIndex: 1,
        explanation: 'NonNullable<T> loại bỏ null và undefined khỏi kiểu union type T.',
      },
      {
        id: 'q-3',
        topic: 'Web Performance',
        question:
          'Chỉ số Largest Contentful Paint (LCP) trong Core Web Vitals đo lường điều gì và ngưỡng lý tưởng của Google là bao nhiêu?',
        options: [
          'Đo thời gian phản hồi đầu tiên của server (TTFB), ngưỡng < 500ms.',
          'Đo thời gian phần tử nội dung lớn nhất (ảnh, block chữ) được render xong trên viewport, ngưỡng lý tưởng <= 2.5 giây.',
          'Đo độ trễ khi người dùng click vào button đầu tiên (FID), ngưỡng < 100ms.',
          'Đo độ dịch chuyển bố cục không mong muốn (CLS), ngưỡng < 0.1.',
        ],
        correctIndex: 1,
        explanation:
          'LCP đo thời gian render phần tử nội dung lớn nhất có thể nhìn thấy trong viewport. Ngưỡng tốt theo Google khuyến nghị là <= 2.5 giây.',
      },
      {
        id: 'q-4',
        topic: 'Next.js & SSR',
        question:
          'Trong Next.js App Router (v13+), mặc định tất cả các components nằm trong thư mục app/ là loại component nào?',
        options: [
          'Client Components',
          'Server Components (React Server Components)',
          'Static Pure Components',
          'Edge Runtime Components',
        ],
        correctIndex: 1,
        explanation:
          'Trong Next.js App Router, tất cả component mặc định là React Server Components (RSC) trừ khi được khai báo dòng "use client" ở đầu file.',
      },
      {
        id: 'q-5',
        topic: 'Architecture & Design',
        question:
          'Kỹ thuật nào giúp chia nhỏ bundle JavaScript lớn thành các file nhỏ hơn để chỉ tải khi component hoặc route đó được người dùng truy cập tới?',
        options: [
          'Server-Side Hydration',
          'Dynamic Import (React.lazy / code-splitting)',
          'Memoization với useMemo',
          'Web Worker multithreading',
        ],
        correctIndex: 1,
        explanation:
          'Code-splitting thông qua dynamic import() hoặc React.lazy cho phép chia nhỏ file bundle và lazy-load khi thực sự cần.',
      },
    ],
  },
  {
    id: 'test-be-01',
    jobId: 'job-be-02',
    testTitle: 'Bài Test Năng Lực Senior Backend & Go Microservices',
    durationMinutes: 20,
    passingScore: 75,
    questions: [
      {
        id: 'bq-1',
        topic: 'Golang Concurrency',
        question:
          'Khi hai Goroutines cùng ghi vào một Go Map thông thường mà không có cơ chế khóa bảo vệ (sync.Mutex hoặc sync.RWMutex), hiện tượng gì sẽ xảy ra?',
        options: [
          'Dữ liệu tự động merge một cách an toàn.',
          'Chương trình sẽ throw exception và tự recover.',
          'Chương trình sẽ bị fatal crash (fatal error: concurrent map writes) ngay lập tức.',
          'Một goroutine sẽ tự động chờ goroutine kia hoàn tất.',
        ],
        correctIndex: 2,
        explanation:
          'Go map không thread-safe. Runtime của Go phát hiện concurrent writes và sẽ kích hoạt fatal crash mà không thể recover bằng recover().',
      },
      {
        id: 'bq-2',
        topic: 'Distributed Systems & Kafka',
        question:
          'Trong Apache Kafka, nếu một Consumer Group có 4 consumers nhưng Topic chỉ có 3 Partitions, điều gì sẽ xảy ra?',
        options: [
          'Mỗi partition sẽ gửi bản sao message cho 2 consumers.',
          '3 consumers sẽ được gán mỗi người 1 partition, và 1 consumer sẽ ở trạng thái nhàn rỗi (idle).',
          'Kafka sẽ tự động tạo thêm 1 partition mới.',
          'Toàn bộ Consumer Group sẽ báo lỗi Rebalance Timeout.',
        ],
        correctIndex: 1,
        explanation:
          'Trong Kafka, mỗi partition chỉ có thể được tiêu thụ bởi tối đa 1 consumer trong cùng một Consumer Group. Do đó consumer thứ 4 sẽ idle.',
      },
      {
        id: 'bq-3',
        topic: 'Database Performance',
        question:
          'Trong PostgreSQL, khi truy vấn WHERE cột A = 1 AND cột B > 100, loại chỉ mục (index) nào thường mang lại hiệu năng tối ưu nhất?',
        options: [
          'Tạo 2 single B-tree index riêng biệt cho cột A và cột B.',
          'Tạo một Composite (Composite B-tree) index với thứ tự (A, B).',
          'Tạo Hash index trên cột B.',
          'Tạo GIN index trên cột A.',
        ],
        correctIndex: 1,
        explanation:
          'Composite index (A, B) cho phép PostgreSQL tìm chính xác giá trị A trước, sau đó quét dải giá trị B một cách liên tục (range scan) rất nhanh.',
      },
    ],
  },
];

export const LINKEDIN_SAMPLE_PROFILES = [
  {
    label: 'Nguyễn Thành Trung - Tech Lead / Fullstack (Shopee)',
    url: 'https://linkedin.com/in/trung-techlead-shopee',
    rawText: `Nguyen Thanh Trung
Head of Web Platform & Tech Lead at Shopee Vietnam
Ho Chi Minh City, Vietnam • 500+ connections

About:
Passionate Tech Lead with 7+ years of experience building high-scale web platforms, micro-frontends, and distributed systems. Leading an engineering team of 14 developers.

Experience:
- Tech Lead @ Shopee (2021 - Present): Architected Seller Centre web application with React, TypeScript, GraphQL, and micro-frontend architecture serving 2M daily active merchants.
- Senior Frontend Developer @ VNG (2018 - 2021): Led frontend revamping for Payment Gateway.

Skills:
React, TypeScript, Next.js, Node.js, GraphQL, Micro-frontends, System Architecture, Team Mentoring.

Education:
VNU University of Engineering and Technology (UET) - B.S in Computer Science (2013 - 2017)`,
  },
  {
    label: 'Đỗ Thảo Vy - Senior Product Manager (MoMo)',
    url: 'https://linkedin.com/in/vy-product-momo',
    rawText: `Do Thao Vy
Senior Product Manager - Financial Services at MoMo (M_Service)
Ho Chi Minh City, Vietnam

About:
Data-driven Product Manager with 5 years experience scaling FinTech & SaaS products. Successfully launched Consumer Lending feature reaching 1.5M active borrowers.

Experience:
- Senior Product Manager @ MoMo (2022 - Present): Leading Financial Products team. Increased loan approval conversion by 28%.
- Product Owner @ Timo Digital Bank (2019 - 2022): Designed digital onboarding and KYC flow.

Skills:
Product Strategy, FinTech, Data Analytics, Mixpanel, User Research, Scrum / Agile, Wireframing.

Education:
Foreign Trade University - International Business Management`,
  },
];
