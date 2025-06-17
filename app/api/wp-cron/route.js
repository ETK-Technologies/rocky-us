import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[CRON] GET /api/wp-cron triggered at', new Date().toISOString());

  try {
    const res = await fetch('https://myrocky.ca/wp-cron.php?doing_wp_cron', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (res.ok) {
      console.log('[CRON] wp-cron.php executed successfully');
      return NextResponse.json({ status: 'success', message: 'wp-cron triggered' });
    } else {
      console.warn('[CRON] wp-cron.php failed with status', res.status);
      return NextResponse.json(
        { status: 'fail', message: 'Request to wp-cron failed', code: res.status },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error('[CRON] Exception during wp-cron fetch:', error);
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
