import type { Metadata } from 'next';
import React from 'react';
import CliniciansContent from './CliniciansContent';

export const metadata: Metadata = {
  title: 'Speechworks | Clinical Advisory Board',
  description: 'Build the tools you wish existed. Steer the development of a platform that actually eliminates administrative friction and drives practice growth.',
  openGraph: {
    title: 'Speechworks | Clinical Advisory Board',
    description: 'Build the tools you wish existed. We are recruiting forward-thinking private practice SLPs.',
    url: 'https://speechworks.app/clinicians',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speechworks | Clinical Advisory Board',
    description: 'Build the tools you wish existed. We are recruiting forward-thinking private practice SLPs.',
  }
};

export default function CliniciansPage() {
  return <CliniciansContent />;
}
