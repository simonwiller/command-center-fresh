'use client'

import { useState, useEffect } from 'react'
import { Users, Plus, Clock, User, AlertCircle, CheckCircle } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done'
  priority: number
  agent_name?: string
  project_name?: string
  due_date?: string
}

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'bg-gray-50 border-gray-200' },
  { id: 'todo', title: 'To Do', color: 'bg-blue-50 border-blue-200' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'review', title: 'Review', color: 'bg-purple-50 border-purple-200' },
  { id: 'done', title: 'Done', color: 'bg-green-50 border-green-200' }
]

export default function AgentBoardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      // Mock data for now - replace with actual API call
      setTasks([
        {
          id: 1,
          title: 'Database Schema Design',
          description: 'Create enhanced MySQL schema with kanban functionality',
          status: 'done',
          priority: 1,
          agent_name: 'Anders',
          project_name: 'Command Center V2'
        },
        {
          id: 2,
          title: 'Authentication System',
          description: 'Implement NextAuth.js with password protection',
          status: 'done',
          priority: 1,
          agent_name: 'Anders',
          project_name: 'Command Center V2'
        },
        {
          id: 3,
          title: 'Kanban Board UI',
          description: 'Build drag-and-drop kanban boards for task management',
          status: 'in_progress',
          priority: 1,
          agent_name: 'Anders',
          project_name: 'Command Center V2'
        },
        {
          id: 4,
          title: 'Campaign Analytics',
          description: 'Analyze current Elkjøp campaign performance',
          status: 'todo',
          priority: 1,
          agent_name: 'Svend',
          project_name: 'Personalized Campaigns'
        },
        {
          id: 5,
          title: 'SEO Content Pipeline',
          description: 'Automate content generation for affiliate sites',
          status: 'backlog',
          priority: 2,
          agent_name: 'Content Agent',
          project_name: 'Affiliate Optimization'
        }
      ])
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === draggedTask.id
            ? { ...task, status: newStatus as Task['status'] }
            : task
        )
      )
      // Here you would also update the database
    }
    setDraggedTask(null)
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'border-l-red-500'
      case 2: return 'border-l-yellow-500'
      default: return 'border-l-green-500'
    }
  }

  const getAgentColor = (agentName?: string) => {
    switch (agentName) {
      case 'Svend': return 'bg-blue-100 text-blue-800'
      case 'Anders': return 'bg-purple-100 text-purple-800'
      case 'Content Agent': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Users className="w-8 h-8 mr-3" />
          Agent Board
        </h1>
        <p className="text-gray-600">
          Manage and track tasks across all AI agents
        </p>
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
            <div>
              <p className="font-semibold text-gray-900">Svend (Coordinator)</p>
              <p className="text-sm text-gray-600">
                {tasks.filter(t => t.agent_name === 'Svend').length} active tasks
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div>
            <div>
              <p className="font-semibold text-gray-900">Anders (Development)</p>
              <p className="text-sm text-gray-600">
                {tasks.filter(t => t.agent_name === 'Anders').length} active tasks
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
            <div>
              <p className="font-semibold text-gray-900">Content Agent</p>
              <p className="text-sm text-gray-600">
                {tasks.filter(t => t.agent_name === 'Content Agent').length} active tasks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col h-[600px]">
            <div className={`flex items-center justify-between p-4 rounded-t-lg border ${column.color}`}>
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>
              {column.id === 'backlog' && (
                <button className="p-1 hover:bg-white rounded">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
            
            <div 
              className={`flex-1 p-4 space-y-3 border-l border-r border-b ${column.color} rounded-b-lg overflow-y-auto`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {getTasksByStatus(column.id).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow kanban-card ${getPriorityColor(task.priority)} border-l-4`}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{task.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {task.agent_name && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentColor(task.agent_name)}`}>
                          {task.agent_name}
                        </span>
                      )}
                      {task.priority === 1 && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    
                    {task.due_date && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  {task.project_name && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">{task.project_name}</p>
                    </div>
                  )}
                </div>
              ))}
              
              {getTasksByStatus(column.id).length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No tasks</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}