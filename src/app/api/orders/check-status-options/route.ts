import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { AirtableService } from '@/lib/airtable';

export async function GET() {
  try {
    // 사용자 인증 확인
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    console.log('=== Orders 테이블 Status 필드 옵션 확인 시작 ===');

    try {
      // Orders 테이블에 접근 시도
      const table = AirtableService.getOrdersTable();
      
      // 테이블의 첫 번째 레코드 조회 시도
      const records = await table.select({ maxRecords: 1 }).firstPage();
      
      if (records.length > 0) {
        const firstRecord = records[0];
        const statusValue = firstRecord.fields.Status;
        
        console.log('✅ Orders 테이블 Status 필드 확인 성공');
        console.log('Status 필드 값:', statusValue);
        console.log('Status 필드 타입:', typeof statusValue);
        
        return NextResponse.json({
          success: true,
          message: 'Orders 테이블 Status 필드 정보를 성공적으로 가져왔습니다.',
          tableExists: true,
          recordCount: records.length,
          statusField: {
            value: statusValue,
            type: typeof statusValue
          },
          sampleRecord: firstRecord.fields,
          recommendation: 'Status 필드가 Multiple Choice인 경우, Airtable에서 허용된 옵션만 사용할 수 있습니다. 현재 정의된 옵션: "생성중", "완료", "취소", "에러종료"'
        });
      } else {
        return NextResponse.json({
          success: true,
          message: 'Orders 테이블이 존재하지만 레코드가 없습니다.',
          tableExists: true,
          recordCount: 0,
          statusField: null,
          sampleRecord: null
        });
      }

    } catch (tableError) {
      console.error('❌ Orders 테이블 Status 필드 확인 실패:', tableError);
      
      return NextResponse.json({
        success: false,
        message: 'Orders 테이블에 접근할 수 없습니다.',
        tableExists: false,
        error: tableError instanceof Error ? tableError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Status 필드 옵션 확인 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Status 필드 옵션 확인 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 