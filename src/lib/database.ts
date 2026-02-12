import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'dbopcwiii6f9mh',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export { pool };

export interface Agent {
  id: number;
  name: string;
  type: 'coordinator' | 'development' | 'content' | 'monitor';
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  capabilities: string[];
  tasks_completed: number;
  last_seen: Date;
  created_at: Date;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  domain: 'elkjop' | 'affiliate' | 'ecommerce' | 'personal';
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  priority: number;
  progress: number;
  start_date?: Date;
  deadline?: Date;
  created_at: Date;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  project_id?: number;
  assigned_agent_id?: number;
  assigned_user_id?: number;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  kanban_position: number;
  priority: number;
  estimated_hours?: number;
  actual_hours?: number;
  due_date?: Date;
  completed_at?: Date;
  created_at: Date;
  project_name?: string;
  agent_name?: string;
}

export interface PersonalTodo {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  position: number;
  priority: number;
  due_date?: Date;
  completed_at?: Date;
  created_at: Date;
}

// Database query functions with proper error handling
export async function getAgents(): Promise<Agent[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT id, name, type, description, status, capabilities, tasks_completed, last_seen, created_at 
      FROM agents ORDER BY created_at DESC
    `);
    return (rows as any[]).map(row => ({
      ...row,
      capabilities: typeof row.capabilities === 'string' ? JSON.parse(row.capabilities) : (row.capabilities || [])
    }));
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT * FROM projects ORDER BY priority ASC, created_at DESC
    `);
    return rows as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getTasks(): Promise<Task[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT t.*, p.name as project_name, a.name as agent_name 
      FROM tasks t 
      LEFT JOIN projects p ON t.project_id = p.id 
      LEFT JOIN agents a ON t.assigned_agent_id = a.id 
      ORDER BY t.kanban_position ASC, t.created_at DESC
    `);
    return rows as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function getPersonalTodos(): Promise<PersonalTodo[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT * FROM personal_todos ORDER BY position ASC, created_at DESC
    `);
    return rows as PersonalTodo[];
  } catch (error) {
    console.error('Error fetching personal todos:', error);
    return [];
  }
}

export async function updateTaskStatus(taskId: number, status: string, position: number): Promise<boolean> {
  try {
    await pool.execute(
      'UPDATE tasks SET status = ?, kanban_position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, position, taskId]
    );
    return true;
  } catch (error) {
    console.error('Error updating task status:', error);
    return false;
  }
}

export async function updatePersonalTodoStatus(todoId: number, status: string, position: number): Promise<boolean> {
  try {
    await pool.execute(
      'UPDATE personal_todos SET status = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, position, todoId]
    );
    return true;
  } catch (error) {
    console.error('Error updating personal todo status:', error);
    return false;
  }
}