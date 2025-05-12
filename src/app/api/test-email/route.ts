import { NextResponse } from 'next/server';
import { sendBookingConfirmation } from '@/lib/email';

export async function GET() {
  try {
    const result = await sendBookingConfirmation({
      to: 'your-email@example.com', // Replace this with your email address
      customerName: 'Test Customer',
      restaurantName: 'Test Restaurant',
      bookingDate: new Date().toLocaleDateString(),
      bookingTime: '19:00',
      numberOfGuests: 2,
    });

    if (result.success) {
      return NextResponse.json({ 
        message: 'Test email sent successfully',
        data: result.data 
      });
    } else {
      return NextResponse.json({ 
        message: 'Failed to send test email',
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ 
      message: 'Error sending test email',
      error 
    }, { status: 500 });
  }
} 