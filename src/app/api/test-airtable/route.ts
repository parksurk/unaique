import { NextResponse } from 'next/server';
import { AirtableService, CustomerData } from '@/lib/airtable';

export async function GET() {
  try {
    console.log('=== Airtable 연결 테스트 시작 ===');
    
    // Airtable 연결 테스트
    const isConnected = await AirtableService.testConnection();

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'Airtable connection successful',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Airtable connection failed',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error testing Airtable connection:', error);
    return NextResponse.json({
      success: false,
      message: 'Error testing Airtable connection',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log('=== 테스트 고객 생성 시작 ===');
    
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email) {
      return NextResponse.json({
        success: false,
        message: 'Name and email are required',
        received: { name, email, phone }
      }, { status: 400 });
    }

    // 새로운 syncUserToAirtable 메서드 사용
    const customerData = {
      email: email,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || undefined,
      phone: phone || undefined
    };

    console.log('동기화할 고객 데이터:', customerData);

    const syncedCustomer = await AirtableService.syncUserToAirtable(customerData);
    console.log('고객 동기화 성공:', syncedCustomer);

    return NextResponse.json({
      success: true,
      message: 'Test customer synced successfully',
      customer: syncedCustomer,
      action: 'created'
    });
  } catch (error) {
    console.error('Error syncing test customer:', error);
    return NextResponse.json({
      success: false,
      message: 'Error syncing test customer',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 