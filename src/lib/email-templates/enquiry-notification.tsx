import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'

export interface EnquiryRow {
  label: string
  value: string
}

export interface EnquiryNotificationProps {
  visitorName?: string
  rows?: EnquiryRow[]
}

const EnquiryNotification = ({ visitorName, rows = [] }: EnquiryNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New website enquiry from ${visitorName || 'a website visitor'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Diglizer Website Enquiry</Heading>
        <Text style={intro}>
          {visitorName
            ? `${visitorName} submitted an enquiry through diglizersolution.com.`
            : 'A new enquiry was submitted through diglizersolution.com.'}
        </Text>
        <Hr style={rule} />
        <Section>
          {rows.map((row) => (
            <Section key={row.label} style={rowStyle}>
              <Text style={labelStyle}>{row.label}</Text>
              <Text style={valueStyle}>{row.value}</Text>
            </Section>
          ))}
        </Section>
        <Hr style={rule} />
        <Text style={footer}>Reply to this email to respond directly to the enquirer.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: EnquiryNotification,
  subject: (data: Record<string, any>) =>
    `New Diglizer Website Enquiry — ${data['visitorName'] || 'Website Visitor'}`,
  displayName: 'Website enquiry notification',
  previewData: {
    visitorName: 'Priya Sharma',
    rows: [
      { label: 'Name', value: 'Priya Sharma' },
      { label: 'Email', value: 'priya@example.com' },
      { label: 'Phone', value: '+91 98765 43210' },
      { label: 'Service(s)', value: 'Branding and Graphic Design' },
      { label: 'Message', value: 'We would like to discuss a brand refresh.' },
      { label: 'Source page', value: '/contact' },
      { label: 'Reference ID', value: 'ef9f0ca1-03d3-42ae-a7fd-ad8aa17431b7' },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px', maxWidth: '640px' }
const heading = { color: '#694699', fontSize: '22px', margin: '0 0 8px' }
const intro = { color: '#10051F', fontSize: '15px', margin: '0 0 8px' }
const rule = { borderColor: '#eeeaf3', margin: '16px 0' }
const rowStyle = { margin: '0 0 12px' }
const labelStyle = {
  color: '#6b6577',
  fontSize: '12px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  margin: '0 0 2px',
}
const valueStyle = {
  color: '#10051F',
  fontSize: '15px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}
const footer = { color: '#6b6577', fontSize: '13px', margin: '0' }

export default EnquiryNotification
