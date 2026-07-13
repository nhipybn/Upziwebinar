import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/register
 * 
 * Handles webinar registration form submissions
 * 
 * Request body:
 * {
 *   fullName: string
 *   email: string
 *   phone: string
 *   company: string
 *   position: string
 *   department: string
 *   companySize: string
 *   marketingConsent: boolean
 * }
 * 
 * TODO: Configure your backend service:
 * 1. Replace with your database/CRM API
 * 2. Add email notification sending
 * 3. Integrate with your webinar platform (Zoom, Google Meet, etc.)
 * 4. Add data validation and sanitization
 */

export async function POST(request: NextRequest) {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      )
    }

    // Parse request body
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'company', 'position', 'department', 'companySize']
    const missingFields = requiredFields.filter(field => !data[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare registration data
    const registrationData = {
      fullName: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      company: data.company.trim(),
      position: data.position,
      department: data.department,
      companySize: data.companySize,
      marketingConsent: data.marketingConsent === true,
      registeredAt: new Date().toISOString(),
      source: 'webinar_landing_page',
    }

    // TODO: Implement your actual backend logic here
    // Example integrations:
    
    // 1. Save to database (Neon, Supabase, etc.)
    // const savedRegistration = await db.webinarRegistrations.create(registrationData)
    
    // 2. Send to CRM (HubSpot, Pipedrive, etc.)
    // await crm.createContact(registrationData)
    
    // 3. Send confirmation email
    // await sendEmail({
    //   to: registrationData.email,
    //   subject: 'Xác Nhận Đăng Ký Webinar Tuyển Dụng Gen Z',
    //   template: 'webinar-registration-confirmation',
    //   data: registrationData
    // })
    
    // 4. Add to email list/automation (Mailchimp, Klaviyo, etc.)
    // await emailProvider.addToList(registrationData)
    
    // 5. Create event in webinar platform (Zoom, Google Meet, etc.)
    // await webinarPlatform.addAttendee(registrationData)

    // Placeholder: Log the registration (Replace with actual implementation)
    console.log('[v0] New webinar registration:', registrationData)

    // TODO: Remove this placeholder response after implementing actual backend
    // This is just a demo response
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  Backend is not configured. Registration data:', registrationData)
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        registrationId: `REG_${Date.now()}`,
        data: {
          email: registrationData.email,
          company: registrationData.company,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Registration error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred during registration',
      },
      { status: 500 }
    )
  }
}

/**
 * Optional: GET endpoint for testing
 * Remove in production
 */
export async function GET() {
  return NextResponse.json(
    {
      message: 'Webinar Registration API',
      method: 'POST',
      endpoint: '/api/register',
    },
    { status: 200 }
  )
}
