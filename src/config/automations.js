// 7 AI automation services
// Each entry drives the "What We Automate" card (text content).
export const automations = [
  {
    id: 'ai-chatbots',
    icon: 'forum',
    title: 'AI Chatbots & Simple Automations',
    explanation:
      'We build AI-powered chatbots that answer your customers instantly, 24/7, on your website or WhatsApp. They handle common questions, share information, and guide customers without your team replying manually every time.',
    benefits: [
      'Automated customer responses',
      'Website chatbots',
      'WhatsApp chatbots',
      '24/7 customer support automation',
    ],
    tags: ['GPT-4', 'Claude', 'RAG', 'Web + WhatsApp'],
  },
  {
    id: 'lead-gen-crm',
    icon: 'hub',
    title: 'Lead Generation & CRM Automation',
    explanation:
      'We help you automatically capture potential customers and organize their information in one place. When someone shows interest or fills out a form, their details are saved automatically and your sales team gets notified to follow up.',
    benefits: [
      'Automatic lead capture',
      'Customer information organization',
      'CRM integration',
      'Sales follow-up automation',
      'Team notifications',
    ],
    tags: ['HubSpot', 'Salesforce', 'Pipedrive', 'Apollo'],
  },
  {
    id: 'business-process',
    icon: 'account_tree',
    title: 'Business Process Automation',
    explanation:
      'We automate repetitive tasks your team performs every day. Instead of manually moving information between emails, spreadsheets, files, and software, the system completes those tasks automatically.',
    benefits: [
      'Automated workflows',
      'Task automation',
      'Software integration',
      'Automatic notifications',
      'Data synchronization',
    ],
    tags: ['n8n', 'Make', 'Zapier', 'Custom APIs'],
  },
  {
    id: 'ai-content',
    icon: 'edit_note',
    title: 'AI Content & Marketing Automation',
    explanation:
      'We build systems that help create and manage marketing content automatically using AI. Your business can generate content ideas, social media posts, emails, or marketing campaigns and schedule them with less manual effort.',
    benefits: [
      'AI-generated content',
      'Social media automation',
      'Email marketing automation',
      'Content scheduling',
      'Marketing workflow automation',
    ],
    tags: ['GPT-4', 'Jasper', 'Surfer SEO', 'Buffer'],
  },
  {
    id: 'data-extraction',
    icon: 'database',
    title: 'Data Extraction & Processing',
    explanation:
      'We build systems that automatically read information from documents, PDFs, emails, or websites and organize it into useful data. This saves your team from manually reading hundreds of files and entering information one by one.',
    benefits: [
      'PDF data extraction',
      'Document processing',
      'Website data extraction',
      'Email data processing',
      'Automatic spreadsheet/database organization',
    ],
    tags: ['Python', 'OCR', 'ETL', 'BigQuery'],
  },
  {
    id: 'email-spam',
    icon: 'shield',
    title: 'Email SPAM Control',
    explanation:
      'We help businesses automatically filter unwanted and unnecessary emails so important messages are easier to find. The system identifies spam, organizes incoming emails, and highlights messages that need urgent attention.',
    benefits: [
      'Spam filtering',
      'Email organization',
      'Important email detection',
      'Priority email alerts',
      'Automated inbox management',
    ],
    tags: ['Gmail API', 'Outlook', 'ML Classifiers', 'DKIM/SPF'],
  },
  {
    id: 'whatsapp-automation',
    icon: 'chat',
    title: 'WhatsApp Lead Automation',
    explanation:
      'We automate WhatsApp conversations with potential customers so your business responds faster and captures interested leads automatically. When someone shows interest, their information is collected and sent directly to your sales process.',
    benefits: [
      'Automated WhatsApp messaging',
      'Lead qualification',
      'Customer response handling',
      'Lead information capture',
      'Sales team notifications',
    ],
    tags: ['WhatsApp Business API', 'Twilio', '360dialog', 'Gupshup'],
  },
]

// How It Works - 3 step process
export const processSteps = [
  {
    id: 'discover',
    step: '01',
    icon: 'travel_explore',
    title: 'Discover & Map',
    description: 'We audit your operations, document every manual process, and pinpoint the highest-ROI automation opportunities in a 90-minute working session.',
    bullets: [
      'Process audit & bottleneck analysis',
      'ROI scoring for every candidate',
      'Roadmap with quick wins & long plays',
    ],
  },
  {
    id: 'build',
    step: '02',
    icon: 'build_circle',
    title: 'Design & Build',
    description: 'Our engineers design the workflow, build it on enterprise-grade infrastructure, and test every edge case before a single byte touches production.',
    bullets: [
      'Architecture & system design',
      'Implementation & staging tests',
      'Security & compliance review',
    ],
  },
  {
    id: 'launch',
    step: '03',
    icon: 'rocket_launch',
    title: 'Launch & Optimize',
    description: 'We deploy with zero downtime, monitor every run, and continuously tune performance. You get a dashboard, alerts, and a dedicated success manager.',
    bullets: [
      'Zero-downtime deployment',
      'Live monitoring & alerting',
      'Monthly optimization reviews',
    ],
  },
]
