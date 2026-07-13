# Webinar Landing Page - Setup Guide

Professional webinar landing page for UPZI recruitment webinar with advanced registration form and analytics tracking.

## Overview

This landing page includes:
- **Professional Registration Form** - Multi-step form with validation and error handling
- **Analytics Tracking** - Google Analytics 4, Facebook Pixel, and extensible tracking framework
- **API Backend** - Ready-to-connect registration endpoint
- **Responsive Design** - Mobile-first, professional aesthetic
- **All Content Sections** - Complete webinar information, speaker profiles, and more

---

## Registration Form Features

### Form Fields (Professional)

The registration form collects:

#### Personal Information
- **Họ và Tên** (Full Name) - Required
- **Email Công Ty** (Company Email) - Required, validated
- **Số Điện Thoại** (Phone) - Required, Vietnamese format validation
- **Công Ty / Tổ Chức** (Company) - Required

#### Professional Information
- **Chức Vụ** (Position) - Dropdown with 6 options
  - CEO / Founder
  - HRM / Giám Đốc Nhân Sự
  - HR Manager
  - Talent Acquisition Specialist
  - Nhân Viên Tuyển Dụng
  - Khác

- **Phòng Ban** (Department) - Dropdown
  - Phòng Nhân Sự
  - Bộ Phận Tuyển Dụng
  - Ban Quản Lý
  - Khác

- **Quy Mô Công Ty** (Company Size) - Dropdown
  - 1 - 50 nhân viên
  - 51 - 200 nhân viên
  - 201 - 500 nhân viên
  - 501 - 1000 nhân viên
  - Trên 1000 nhân viên

#### Consent
- **Marketing Consent** - Checkbox for email updates
- **Terms & Privacy** - Links to policies

### Form Validation

The form includes:
- Real-time field validation
- Email format validation
- Vietnamese phone number format validation (0xxx xxx xxx or +84xxx xxx xxx)
- Required field checking
- Error messages displayed below each field
- Success/error notifications

### Form Submission

The form submits to `/api/register` endpoint via POST request.

Data sent includes:
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "position": "string",
  "department": "string",
  "companySize": "string",
  "marketingConsent": boolean
}
```

---

## Analytics Tracking Setup

### 1. Google Analytics 4

**Setup Instructions:**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Get your **Measurement ID** (format: `G_XXXXXXXXXX`)
4. Add to environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
   ```

**What gets tracked:**
- Page views
- Registration form submissions (as "generate_lead" event)
- Page views with event details

**Custom Events:**
- `generate_lead` - When form is submitted
  - Includes: position, company, registration type

### 2. Facebook Pixel

**Setup Instructions:**

1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to Events Manager → Data Sources
3. Create/select a Pixel
4. Get your **Pixel ID**
5. Add to environment variables:
   ```
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
   ```

**What gets tracked:**
- Page views
- Registration form submissions (as "Lead" conversion)
  - Includes: value: 1.0, currency: VND

**Used for:**
- Retargeting website visitors
- Building custom audiences
- Optimizing ad campaigns
- Measuring ROI on Facebook ads

### 3. LinkedIn Insight Tag (Optional)

To enable LinkedIn tracking, uncomment the LinkedIn section in `components/analytics-tracker.tsx` and add:

```
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=YOUR_PARTNER_ID
```

### 4. Hotjar (Optional)

For heatmaps and session recording, uncomment the Hotjar section in `components/analytics-tracker.tsx` and add:

```
NEXT_PUBLIC_HOTJAR_ID=YOUR_HOTJAR_ID
```

---

## Backend Integration

### API Endpoint

**URL:** `/api/register`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Current Implementation

The API endpoint is configured with placeholder logic. To use it:

1. **Uncomment and implement** one or more of these integrations in `/app/api/register/route.ts`:

#### Option A: Save to Database
```typescript
// Example with Neon Postgres
import { db } from '@/db'

const savedRegistration = await db.webinarRegistrations.create(registrationData)
```

#### Option B: Save to CRM
```typescript
// Example with HubSpot
const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    properties: {
      firstname: registrationData.fullName.split(' ')[0],
      lastname: registrationData.fullName.split(' ')[1],
      email: registrationData.email,
      phone: registrationData.phone,
      company: registrationData.company,
    }
  })
})
```

#### Option C: Send Confirmation Email
```typescript
// Example with Sendgrid
import sgMail from '@sendgrid/mail'

await sgMail.send({
  to: registrationData.email,
  from: process.env.EMAIL_FROM_ADDRESS,
  subject: 'Xác Nhận Đăng Ký Webinar Tuyển Dụng Gen Z',
  html: `<p>Cảm ơn ${registrationData.fullName} đã đăng ký!</p>`
})
```

#### Option D: Add to Email List
```typescript
// Example with Mailchimp
const response = await fetch(
  `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`apikey:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
    },
    body: JSON.stringify({
      email_address: registrationData.email,
      status: registrationData.marketingConsent ? 'subscribed' : 'unsubscribed',
      merge_fields: {
        FNAME: registrationData.fullName,
        COMPANY: registrationData.company,
        POSITION: registrationData.position,
      }
    })
  }
)
```

### Error Handling

The API returns:

**Success (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "registrationId": "REG_1234567890",
  "data": {
    "email": "user@company.com",
    "company": "Company Name"
  }
}
```

**Error (400/500):**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Environment Variables Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your tracking IDs:
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID
   - `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` - Facebook Pixel ID

3. Configure backend services (optional):
   - Email service credentials
   - CRM API keys
   - Database connection string
   - Webinar platform credentials

---

## Customization

### 1. Change Company Name

Replace "UPZI" throughout:
- Navigation bar (line 20)
- Hero section (line 48)
- Form placeholder (line 360)
- Footer (line 414)

### 2. Change Colors

Colors are defined in the page component:
- Primary: `#2d3e50` (dark blue)
- Accent: `#0066cc` (bright blue)
- Background: `#faf8f3` (beige)

### 3. Update Webinar Details

Edit these sections:
- **Hero Section:** Lines 43-49 (title, description)
- **Timing Info:** Lines 68-75 (date, format)
- **Content Details:** Lines 267-280 (agenda items)
- **Speaker Info:** Lines 289-322 (names, bios)

### 4. Add More Tracking

Edit `components/analytics-tracker.tsx` to add:
- TikTok Pixel
- Twitter/X Pixel
- Custom analytics
- Error tracking (Sentry)
- Performance monitoring

---

## Testing

### Test Form Submission

1. Start dev server: `pnpm dev`
2. Navigate to http://localhost:3000
3. Scroll to registration form
4. Fill out all fields and submit
5. Check:
   - Success message appears
   - Form clears
   - Console shows registration data (in development)
   - Check browser DevTools → Network tab to see API request

### Test Analytics

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) extension
2. Enable it in your browser
3. Open DevTools → Console
4. Navigate pages and submit form
5. Check console logs to verify event tracking

---

## Deployment Checklist

Before deploying to production:

- [ ] Update `NEXT_PUBLIC_GA_ID` with production Analytics ID
- [ ] Update `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` with production Pixel ID
- [ ] Implement backend API logic (don't leave placeholders)
- [ ] Set up email service for confirmations
- [ ] Configure CRM/database integration
- [ ] Test form submission end-to-end
- [ ] Update footer contact info (email, phone)
- [ ] Update privacy policy and terms links
- [ ] Review and update all copy/content
- [ ] Test on mobile devices
- [ ] Set up monitoring/error tracking
- [ ] Configure CORS headers if needed

---

## Support

For questions or custom implementations, refer to:

- **Google Analytics:** https://support.google.com/analytics
- **Facebook Pixel:** https://developers.facebook.com/docs/facebook-pixel
- **Form Component:** `components/registration-form.tsx`
- **API Endpoint:** `app/api/register/route.ts`

---

## Files Structure

```
/app
  /api
    /register
      route.ts          # Form submission endpoint
  /page.tsx             # Main landing page
  /layout.tsx           # Layout with metadata
  /globals.css          # Global styles

/components
  /ui
    button.tsx          # UI component (pre-installed)
  analytics-tracker.tsx # Analytics setup
  registration-form.tsx # Registration form component

.env.example            # Environment variables template
```

---

## Notes

- All form data is validated on the client side and server side
- Phone numbers are validated for Vietnamese format
- Email validation uses regex pattern
- GDPR/CCPA compliant with marketing consent checkbox
- Fully responsive design for mobile and desktop
- Built with Next.js 16 and Tailwind CSS v4

