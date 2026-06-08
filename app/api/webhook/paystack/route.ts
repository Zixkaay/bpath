import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received Mock Paystack Webhook:', body);

    if (body.event === 'charge.success') {
      const { amount, metadata } = body.data;
      const { participantId, votesAdded } = metadata;
      
      console.log(`[PAYSTACK WEBHOOK VALID] Processed successfully for participant ${participantId}, distributing ${votesAdded} votes for an amount of ${amount} kobo.`);
      
      return NextResponse.json({ message: 'Webhook successfully simulated' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Event ignored' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
