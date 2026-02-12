'use client'

import { useState, useEffect } from 'react'
import { User, Plus, Clock, AlertCircle, CheckCircle, Calendar } from 'lucide-react'

interface PersonalTodo {
  id: number
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  priority: number
  due_date?: string
  created_at: string
}

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-50 border-blue-200', icon: AlertCircle },
  { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-50 border-yellow-200', icon: Clock },
  { id: 'done', title: 'Done', color: 'bg-green-50 border-green-200', icon: CheckCircle }
]

export default function PersonalBoardPage() {
  const [todos, setTodos] = useState<PersonalTodo[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedTodo, setDraggedTodo] = useState<PersonalTodo | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 2,
    due_date: ''
  })

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      // Mock data for now - replace with actual API call
      setTodos([
        {
          id: 1,
          title: 'Review Q1 OKRs',
          description: 'Quarterly review of objectives and key results',
          status: 'todo',
          priority: 1,
          due_date: '2026-02-15',
          created_at: '2026-02-10T10:00:00Z'
        },
        {
          id: 2,
          title: 'Plan affiliate content calendar',
          description: 'Create content schedule for next month',
          status: 'todo',
          priority: 2,
          due_date: '2026-02-20',
          created_at: '2026-02-11T14:00:00Z'
        },
        {
          id: 3,
          title: 'Test Command Center features',
          description: 'Validate all kanban and dashboard functionality',
          status: 'in_progress',
          priority: 1,
          created_at: '2026-02-12T09:00:00Z'
        },
        {
          id: 4,
          title: 'Update team on project status',
          description: 'Weekly status update for all active projects',
          status: 'done',
          priority: 2,
          created_at: '2026-02-08T16:00:00Z'
        }
      ])
    } catch (error) {
      console.error('Error loading todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (todo: PersonalTodo) => {
    setDraggedTodo(todo)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (draggedTodo && draggedTodo.status !== newStatus) {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === draggedTodo.id
            ? { ...todo, status: newStatus as PersonalTodo['status'] }
            : todo
        )
      )
      // Here you would also update the database
    }
    setDraggedTodo(null)
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const todo: PersonalTodo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: newTodo.title,
      description: newTodo.description,
      status: 'todo',
      priority: newTodo.priority,
      due_date: newTodo.due_date || undefined,
      created_at: new Date().toISOString()
    }

    setTodos(prev => [...prev, todo])
    setNewTodo({ title: '', description: '', priority: 2, due_date: '' })
    setShowAddForm(false)
    
    // Here you would also save to the database
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'border-l-red-500 bg-red-50'
      case 2: return 'border-l-yellow-500 bg-yellow-50'
      default: return 'border-l-green-500 bg-green-50'
    }
  }

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return 'High'
      case 2: return 'Medium'
      default: return 'Low'
    }
  }

  const getTodosByStatus = (status: string) => {
    return todos.filter(todo => todo.status === status)
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
          <User className="w-8 h-8 mr-3" />
          Personal Board
        </h1>
        <p className="text-gray-600">
          Manage your personal todos and tasks
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Todos</p>
              <p className="text-2xl font-bold text-gray-900">{todos.length}</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">
                {getTodosByStatus('in_progress').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {getTodosByStatus('done').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {todos.filter(t => t.priority === 1 && t.status !== 'done').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col h-[600px]">
            <div className={`flex items-center justify-between p-4 rounded-t-lg border ${column.color}`}>
              <div className="flex items-center">
                <column.icon className="w-5 h-5 mr-2 text-gray-600" />
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {getTodosByStatus(column.id).length}
                </span>
              </div>
              {column.id === 'todo' && (
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
            
            <div 
              className={`flex-1 p-4 space-y-3 border-l border-r border-b ${column.color} rounded-b-lg overflow-y-auto`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {getTodosByStatus(column.id).map((todo) => (
                <div
                  key={todo.id}
                  draggable
                  onDragStart={() => handleDragStart(todo)}
                  className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow kanban-card border-l-4 ${getPriorityColor(todo.priority)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 flex-1">{todo.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      todo.priority === 1 ? 'bg-red-100 text-red-700' :
                      todo.priority === 2 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {getPriorityText(todo.priority)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{todo.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(todo.created_at).toLocaleDateString()}
                    </div>
                    
                    {todo.due_date && (
                      <div className={`flex items-center ${isOverdue(todo.due_date) ? 'text-red-600' : ''}`}>
                        <Clock className="w-3 h-3 mr-1" />
                        Due: {new Date(todo.due_date).toLocaleDateString()}
                        {isOverdue(todo.due_date) && (
                          <AlertCircle className="w-3 h-3 ml-1 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {getTodosByStatus(column.id).length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  <div className="text-center">
                    <column.icon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No tasks</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Todo Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Todo</h3>
            
            <form onSubmit={handleAddTodo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({...newTodo, priority: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={3}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={1}>High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTodo.due_date}
                    onChange={(e) => setNewTodo({...newTodo, due_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <div className="fixed bottom-8 right-8">
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}