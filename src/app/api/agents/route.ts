import { NextRequest, NextResponse } from 'next/server';
import { getAgents } from '@/lib/database';

export async function GET() {
  try {
    const agents = await getAgents();
    
    return NextResponse.json({ 
      success: true, 
      agents 
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch agents' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, type, description, capabilities } = await request.json();
    
    // For now, return success without database insert
    // Real implementation would insert into database
    return NextResponse.json({ 
      success: true,
      message: 'Agent created successfully',
      id: Date.now() // Mock ID
    });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create agent' 
    }, { status: 500 });
  }
}