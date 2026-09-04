/**
 * src/i18n/types.ts
 * Type definitions for ToolNest internationalization (i18n).
 */

export interface NavTranslations {
  home: string;
  ageCalculator: string;
  birthdayFacts: string;
  decisionWheel: string;
  randomPicker: string;
  countdown: string;
  nameMeaning: string;
  about: string;
  privacy: string;
  contact: string;
  switchLanguage: string;
}

export interface CommonTranslations {
  calculate: string;
  spin: string;
  pick: string;
  create: string;
  share: string;
  shareAsImage: string;
  downloadImage: string;
  copyLink: string;
  linkCopied: string;
  reset: string;
  clear: string;
  retry: string;
  loading: string;
  generating: string;
  retrying: string;
  error: string;
  success: string;
  howItWorks: string;
  useCases: string;
  faq: string;
  relatedTools: string;
  exploreMore: string;
  madeWith: string;
  quickIdeas: string;
  winner: string;
  shuffle: string;
  remove: string;
  add: string;
  options: string;
  result: string;
  downloadCard: string;
}

export interface WheelTranslations {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  spinButton: string;
  spinning: string;
  optionsHeading: string;
  addPlaceholder: string;
  quickIdeasHeading: string;
  aiGeneratorTitle: string;
  aiGeneratorSubtitle: string;
  aiPromptPlaceholder: string;
  aiGenerateBtn: string;
  aiCountLabel: string;
  aiGeneratingText: string;
  aiRetryingText: string;
  replaceConfirmTitle: string;
  replaceConfirmDesc: string;
  replaceConfirmBtn: string;
  replaceCancelBtn: string;
  winnerAnnounce: string;
  presetEat: string;
  presetWatch: string;
  presetYesNo: string;
}

export interface PickerTranslations {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  itemsLabel: string;
  itemsPlaceholder: string;
  pickWinnerBtn: string;
  splitTeamsBtn: string;
  pickStudentBtn: string;
  allowDuplicates: string;
  numWinners: string;
  numTeams: string;
  teamLabel: string;
  remainingItems: string;
  emptyError: string;
}

export interface AgeTranslations {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  birthDateLabel: string;
  calculateBtn: string;
  exactAgeHeading: string;
  years: string;
  months: string;
  weeks: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  nextBirthdayHeading: string;
  milestoneHeading: string;
  dateDiffHeading: string;
  compareDateLabel: string;
}

export interface BirthdayTranslations {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  inputDateLabel: string;
  revealBtn: string;
  zodiacLabel: string;
  elementLabel: string;
  stoneLabel: string;
  flowerLabel: string;
  weekdayLabel: string;
  generationLabel: string;
  milestonesHeading: string;
  famousHeading: string;
  cardWatermark: string;
}

export interface CountdownTranslations {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  eventTitleLabel: string;
  eventTitlePlaceholder: string;
  targetDateLabel: string;
  targetTimeLabel: string;
  createBtn: string;
  shareHeading: string;
  daysRemaining: string;
  hoursRemaining: string;
  minutesRemaining: string;
  secondsRemaining: string;
  eventPassed: string;
  viewCountdownTitle: string;
  liveCountdown: string;
  watermark: string;
}

export interface NamesTranslations {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  searchPlaceholder: string;
  allGenders: string;
  boyNames: string;
  girlNames: string;
  unisexNames: string;
  allOrigins: string;
  meaningLabel: string;
  originLabel: string;
  pronounceLabel: string;
  aiInsightsHeading: string;
  siblingHeading: string;
}

export interface TranslationDictionary {
  siteName: string;
  tagline: string;
  description: string;
  badgeFree: string;
  badgeNoSignup: string;
  badgePrivacy: string;
  footerTagline: string;
  footerCopyright: string;
  nav: NavTranslations;
  common: CommonTranslations;
  wheel: WheelTranslations;
  picker: PickerTranslations;
  age: AgeTranslations;
  birthday: BirthdayTranslations;
  countdown: CountdownTranslations;
  names: NamesTranslations;
  home: {
    heroTitle: string;
    heroSubtitle: string;
    exploreToolsHeading: string;
    whyChooseTitle: string;
    whyFast: string;
    whyFastDesc: string;
    whyPrivate: string;
    whyPrivateDesc: string;
    whyFree: string;
    whyFreeDesc: string;
  };
  notFound: {
    title: string;
    heading: string;
    subtext: string;
    backHome: string;
    exploreTitle: string;
  };
  about: {
    title: string;
    metaDesc: string;
    badge: string;
    heading: string;
    subheading: string;
    philosophyTitle: string;
    philosophyP1: string;
    philosophyP2: string;
    methodologyTitle: string;
    methodologyP1: string;
    editorialTitle: string;
    editorialP1: string;
    toolsTitle: string;
    launchTool: string;
    techTitle: string;
    techP1: string;
    contactTitle: string;
    contactDesc: string;
    contactBtn: string;
  };
  contact: {
    title: string;
    metaDesc: string;
    badge: string;
    heading: string;
    subheading: string;
    emailTitle: string;
    emailDesc: string;
    responseTitle: string;
    responseDesc: string;
    responseHours: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitBtn: string;
    successMsg: string;
  };
  privacy: {
    title: string;
    metaDesc: string;
    badge: string;
    heading: string;
    lastUpdated: string;
    dateStr: string;
    introTitle: string;
    introP: string;
    collectTitle: string;
    collectP1: string;
    collectP2: string;
    cookiesTitle: string;
    cookiesP1: string;
    analyticsTitle: string;
    analyticsP: string;
    urlTitle: string;
    urlP: string;
  };
}

