export interface BlogPost {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
}

/** 示例文章（占位数据，暂无详情页） */
export const blogPosts: BlogPost[] = [
  {
    id: 'degenerative-disc-disease',
    date: 'MAY 15, 2026',
    category: 'Patient education',
    title:
      "What 'Degenerative Disc Disease' Actually Means — And Why Your Treatment Options Are Better Than You Think",
    excerpt:
      'Degenerative disc disease is one of the most common diagnoses patients hear — and one of the most misunderstood. Learn what it really means, when it matters, and which conservative and advanced options may help.',
  },
  {
    id: 'neck-pain-stiffness',
    date: 'MAY 8, 2026',
    category: 'Patient education',
    title: 'Neck Pain and Stiffness: When to Rest, When to Seek Care, and What Actually Helps',
    excerpt:
      'Most neck pain improves with time and simple care. This guide explains red-flag symptoms, ergonomic habits, and when injections or targeted therapies may be appropriate.',
  },
  {
    id: 'sciatica-explained',
    date: 'APR 28, 2026',
    category: 'Patient education',
    title: 'Sciatica Explained: Causes, Timeline, and Steps You Can Take Before Surgery',
    excerpt:
      'Shooting leg pain often traces to nerve irritation in the lower back. Understand common causes, what imaging can and cannot tell you, and how a stepwise treatment plan is built.',
  },
  {
    id: 'prolotherapy-basics',
    date: 'APR 18, 2026',
    category: 'Treatments',
    title: 'Prolotherapy Basics: How Regenerative Injections Support Ligament and Tendon Healing',
    excerpt:
      'Prolotherapy aims to strengthen injured connective tissue and reduce pain without surgery. Here is how it works, who may benefit, and what to expect at each visit.',
  },
  {
    id: 'prp-non-steroidal',
    date: 'APR 5, 2026',
    category: 'Treatments',
    title: 'Platelet-Rich Plasma (PRP): A Non-Steroidal Option for Lasting Musculoskeletal Recovery',
    excerpt:
      'PRP uses growth factors from your own blood to support tissue repair. Learn how it differs from cortisone injections and when your physician may recommend it.',
  },
  {
    id: 'sacroiliac-joint-pain',
    date: 'MAR 22, 2026',
    category: 'Patient education',
    title: 'Sacroiliac Joint Pain: Why It Is Often Missed and How Stabilization Therapies Help',
    excerpt:
      'Low back and hip pain can originate from SI joint dysfunction. Recognize typical patterns, diagnostic clues, and specialized injection approaches used in comprehensive care.',
  },
  {
    id: 'perineural-injections',
    date: 'MAR 10, 2026',
    category: 'Treatments',
    title: 'Perineural Injections: Targeted Relief for Persistent Nerve-Related Pain',
    excerpt:
      'Also known as Lyftogt-style perineural treatment, these injections address inflamed nerves near the skin. Explore indications, safety, and how they fit into a broader pain plan.',
  },
  {
    id: 'prolozone-overview',
    date: 'FEB 26, 2026',
    category: 'Treatments',
    title: 'Prolozone Therapy: Combining Prolotherapy With Oxygen-Ozone for Chronic Pain',
    excerpt:
      'Prolozone augments traditional proliferative injections with an oxygen-ozone mixture. Review the goals of treatment, candidacy, and what recovery typically looks like.',
  },
  {
    id: 'fluoroscopy-guided-injections',
    date: 'FEB 12, 2026',
    category: 'Procedures',
    title: 'Why Fluoroscopy and Ultrasound Guidance Matter for Joint and Spine Injections',
    excerpt:
      'Image-guided injections improve accuracy and comfort. See when your doctor may use C-arm fluoroscopy or ultrasound and how that affects outcomes.',
  },
  {
    id: 'acute-vs-chronic-pain',
    date: 'JAN 30, 2026',
    category: 'Patient education',
    title: 'Acute vs. Chronic Pain: Building a Plan That Matches Your Timeline and Goals',
    excerpt:
      'Pain that lasts days behaves differently from pain that lasts months. Learn how evaluation, expectations, and treatment intensity change across each phase.',
  },
  {
    id: 'independent-physician-practice',
    date: 'JAN 15, 2026',
    category: 'Practice news',
    title: 'Choosing an Independent Physician Practice for Musculoskeletal Care Since 2001',
    excerpt:
      'Musculoskeletal Medicine, P.C. has served the Syracuse area with personalized, physician-directed care. Discover what independent practice means for your treatment experience.',
  },
  {
    id: 'second-opinion-spine',
    date: 'DEC 28, 2025',
    category: 'Patient education',
    title: 'When to Seek a Second Opinion for Spine and Joint Problems',
    excerpt:
      'Complex or persistent symptoms deserve a careful second look. Learn which situations warrant another evaluation and how to prepare for a productive visit.',
  },
  {
    id: 'exercise-with-back-pain',
    date: 'DEC 10, 2025',
    category: 'Patient education',
    title: 'Moving Safely With Back Pain: Exercise Principles That Support Recovery',
    excerpt:
      'Complete rest is rarely the best long-term strategy. Gentle mobility, core stability, and pacing can reduce flare-ups — here is how to start without overdoing it.',
  },
  {
    id: 'preparing-first-visit',
    date: 'NOV 22, 2025',
    category: 'Practice news',
    title: 'Preparing for Your First Visit: Forms, History, and Questions Worth Asking',
    excerpt:
      'Bring imaging reports, medication lists, and a clear timeline of symptoms. This checklist helps you get the most from your initial appointment at our offices.',
  },
]
