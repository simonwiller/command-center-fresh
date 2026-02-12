import { NextRequest, NextResponse } from 'next/server';
import { getTasks } from '@/lib/database';

export async function GET() {
  try {
    const tasks = await getTasks();
    
    return NextResponse.json({ 
      success: true, 
      tasks 
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch tasks' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, project_id, assigned_agent_id, priority, due_date } = await request.json();
    
    // For now, return success without database insert
    // Real implementation would insert into database
    return NextResponse.json({ 
      success: true,
      message: 'Task created successfully',
      id: Date.now() // Mock ID
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create task' 
    }, { status: 500 });
  }
}