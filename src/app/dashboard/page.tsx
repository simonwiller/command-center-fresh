'use client'

import { useEffect, useState } from 'react'
import { 
  Activity, 
  Users, 
  CheckSquare, 
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Circle,
  Calendar
} from 'lucide-react'

interface DashboardStats {
  totalAgents: number
  activeTasks: number
  completedToday: number
  projectsActive: number
}

interface Project {
  id: number
  name: string
  domain: string
  status: string
  priority: number
  progress: number
}

interface Agent {
  id: number
  name: string
  status: string
  tasks_completed: number
  type: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAgents: 3,
    activeTasks: 8,
    completedToday: 5,
    projectsActive: 4
  })
  const [projects, setProjects] = useState<Project[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls - replace with real data
    const loadData = async () => {
      try {
        // Mock data for now - replace with actual API calls
        setProjects([
          {
            id: 1,
            name: 'Command Center V2',
            domain: 'personal',
            status: 'active',
            priority: 1,
            progress: 75
          },
          {
            id: 2,
            name: 'Personalized Campaigns',
            domain: 'elkjop',
            status: 'active',
            priority: 1,
            progress: 40
          },
          {
            id: 3,
            name: 'Affiliate Site Optimization',
            domain: 'affiliate',
            status: 'active',
            priority: 2,
            progress: 20
          },
          {
            id: 4,
            name: 'Dolk Customer Service',
            domain: 'ecommerce',
            status: 'active',
            priority: 3,
            progress: 10
          }
        ])

        setAgents([
          {
            id: 1,
            name: 'Svend',
            status: 'active',
            tasks_completed: 15,
            type: 'coordinator'
          },
          {
            id: 2,
            name: 'Anders',
            status: 'active',
            tasks_completed: 8,
            type: 'development'
          },
          {
            id: 3,
            name: 'Content Agent',
            status: 'inactive',
            tasks_completed: 5,
            type: 'content'
          }
        ])
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getProjectIcon = (domain: string) => {
    switch (domain) {
      case 'elkjop': return '⚡'
      case 'affiliate': return '📈'
      case 'ecommerce': return '🛒'
      case 'personal': return '🦞'
      default: return '📊'
    }
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'border-red-500 bg-red-50'
      case 2: return 'border-yellow-500 bg-yellow-50'
      default: return 'border-green-500 bg-green-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive': return <Circle className="w-4 h-4 text-gray-400" />
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back, Simon. Here's what's happening with your projects and agents.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">AI Agents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAgents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckSquare className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.projectsActive}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Active Projects
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(project.priority)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getProjectIcon(project.domain)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{project.domain}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agents Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              AI Agents Status
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getStatusIcon(agent.status)}
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{agent.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{agent.tasks_completed}</p>
                    <p className="text-sm text-gray-600">tasks completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left">
            <CheckSquare className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Create New Task</h3>
            <p className="text-sm text-gray-600">Add a task to agent or personal board</p>
          </button>
          <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-left">
            <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Review Progress</h3>
            <p className="text-sm text-gray-600">Check project status and metrics</p>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors text-left">
            <Calendar className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Schedule Review</h3>
            <p className="text-sm text-gray-600">Plan weekly agent coordination</p>
          </button>
        </div>
      </div>
    </div>
  )
}