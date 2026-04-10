export type DiffText = {
  type: 'unchanged' | 'addition' | 'deletion';
  text: string;
};

export interface TosSection {
  id: string;
  title: string;
  legalText: DiffText[];
  summary: string;
  scenario: string;
}

export const tosData: TosSection[] = [
  {
    id: "1",
    title: "1. What services are covered by these Terms",
    legalText: [
      { type: 'unchanged', text: "These Terms govern your use of our services, which include TikTok applications, websites, software (e.g. the TikTok embeddable media player), features, technologies, and related services " },
      { type: 'deletion', text: "(excluding third party services)" },
      { type: 'addition', text: "(e.g. enabling third party search engines to surface public TikTok content)" },
      { type: 'unchanged', text: ", accessed or delivered via any platform or device (the “Platform”), except where we state that other terms apply." }
    ],
    summary: "These terms apply to your use of the TikTok app, website, and related services.",
    scenario: "Whether you are scrolling on your phone or watching a TikTok embedded on a news article, these rules apply to your activity."
  },
  {
    id: "3.2",
    title: "3.2 Account details",
    legalText: [
      { type: 'unchanged', text: "To access the full functionality of the Platform, you must create an account with us. We may offer different types of accounts. You represent and warrant that all information you provide to us when you create an account, and when you access and use the Platform, is and will remain complete and accurate. " },
      { type: 'addition', text: "We may revoke, reclaim, and/or reassign the username of your account in certain circumstances, such as, when you have not logged into your account for 180 days." }
    ],
    summary: "You need an account for full access. You must provide accurate info, and we can take back your username if you are inactive for 180 days.",
    scenario: "If you stop using TikTok for 6 months, someone else might be able to claim your username."
  },
  {
    id: "3.5",
    title: "3.5 Ownership of content and grant of licenses",
    legalText: [
      { type: 'unchanged', text: "Except with respect to TikTok Content and unless expressly stated otherwise, as between you and TikTok USDS Joint Venture, you own Your Content. " },
      { type: 'addition', text: "Due to the nature of generative AI, output may not be unique to a specific user, and your ownership of Output does not extend to other users' output. " },
      { type: 'unchanged', text: "By creating, inputting, publishing, and otherwise providing Your Content on or to the Platform, you grant to TikTok USDS Joint Venture a license to use Your Content that is: non-exclusive, irrevocable, and royalty-free... assignable and sub-licensable... and worldwide." }
    ],
    summary: "You own the content you create, but you give TikTok a permanent, free license to use, modify, and share it anywhere.",
    scenario: "If you upload a funny video, TikTok can use it in a global TV commercial without paying you or asking for further permission."
  },
  {
    id: "3.8",
    title: "3.8 Permissions you give TikTok USDS Joint Venture",
    legalText: [
      { type: 'unchanged', text: "To help us provide the Platform, including to give our users a better experience, you agree that we can: Use your name, profile image and username when you interact with ads and sponsored content. " },
      { type: 'deletion', text: "We will ask for your consent before doing so. " },
      { type: 'addition', text: "To enable these features, you give us permission to use your name, profile image and username... without any compensation to you." }
    ],
    summary: "TikTok can use your profile info to show your friends when you interact with ads.",
    scenario: "If you 'like' a sponsored post for a new shoe brand, your friends might see an ad for those shoes that says 'Your friend liked this'."
  },
  {
    id: "5.1",
    title: "5.1 Your rights (Deleting your account)",
    legalText: [
      { type: 'unchanged', text: "If you delete your account, these Terms (as may be amended) will terminate as an agreement between you and us, except for obligations that remain in place which by their nature should survive the termination of these Terms, including the obligations set out in: Section 3.5 “Ownership of content and grant of licenses”..." }
    ],
    summary: "You can delete your account to end this agreement, but TikTok still keeps the licenses to the content you already posted.",
    scenario: "Even if you delete your TikTok account, videos you posted previously might still be used by TikTok or remain visible if others shared them."
  }
];

export const industryComparisons = [
  {
    topic: "Content Ownership",
    tiktok: "Claims irrevocable, sub-licensable right to use your content globally.",
    industry: "Standard (Instagram/YouTube have similar broad licenses).",
    status: "warning"
  },
  {
    topic: "Data Retention",
    tiktok: "Keeps data indefinitely unless account is deleted; some data survives deletion.",
    industry: "Industry average is 90 days post-deletion.",
    status: "danger"
  },
  {
    topic: "Inactivity",
    tiktok: "Can reclaim username after 180 days of inactivity.",
    industry: "Twitter is 30 days, Instagram is undefined.",
    status: "info"
  },
  {
    topic: "Arbitration",
    tiktok: "Requires informal resolution first, then exclusive venue in California.",
    industry: "Standard for US tech companies.",
    status: "warning"
  }
];
