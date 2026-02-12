-- Command Center V2 Enhanced Database Schema
-- MySQL Database for Simon's Command Center with Kanban Functionality

-- Users table (enhanced for NextAuth)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    emailVerified TIMESTAMP NULL,
    image TEXT,
    password VARCHAR(255),
    role ENUM('admin', 'agent', 'viewer') DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- NextAuth tables
CREATE TABLE IF NOT EXISTS accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    providerAccountId VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    token_type VARCHAR(255),
    scope VARCHAR(255),
    id_token TEXT,
    session_state VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sessionToken VARCHAR(255) UNIQUE NOT NULL,
    userId INT NOT NULL,
    expires TIMESTAMP NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    domain ENUM('elkjop', 'affiliate', 'ecommerce', 'personal') NOT NULL,
    status ENUM('active', 'paused', 'completed', 'cancelled') DEFAULT 'active',
    priority INT DEFAULT 3, -- 1=high, 2=medium, 3=low
    start_date DATE,
    deadline DATE,
    progress INT DEFAULT 0, -- 0-100 percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Agents table (enhanced)
CREATE TABLE IF NOT EXISTS agents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('coordinator', 'development', 'content', 'monitor') NOT NULL,
    description TEXT,
    api_endpoint VARCHAR(500),
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    capabilities JSON, -- ["web_scraping", "content_generation", etc.]
    config JSON, -- Agent-specific configuration
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tasks_completed INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Enhanced Tasks table with Kanban functionality
CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id INT,
    assigned_agent_id INT,
    assigned_user_id INT,
    status ENUM('backlog', 'todo', 'in_progress', 'review', 'done') DEFAULT 'backlog',
    kanban_position INT DEFAULT 0,
    priority INT DEFAULT 3, -- 1=high, 2=medium, 3=low
    estimated_hours DECIMAL(4,1),
    actual_hours DECIMAL(4,1),
    due_date DATETIME,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Personal todos table for Simon
CREATE TABLE IF NOT EXISTS personal_todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
    position INT DEFAULT 0,
    priority INT DEFAULT 3, -- 1=high, 2=medium, 3=low
    due_date DATETIME,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Agent logs table
CREATE TABLE IF NOT EXISTS agent_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    agent_id INT NOT NULL,
    task_id INT,
    action VARCHAR(255) NOT NULL,
    message TEXT,
    level ENUM('info', 'warning', 'error', 'success') DEFAULT 'info',
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

-- Deployments table
CREATE TABLE IF NOT EXISTS deployments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    agent_id INT,
    version VARCHAR(50),
    status ENUM('pending', 'building', 'deploying', 'success', 'failed') DEFAULT 'pending',
    commit_hash VARCHAR(40),
    branch VARCHAR(100) DEFAULT 'main',
    deploy_url VARCHAR(500),
    error_message TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL
);

-- Site monitoring table
CREATE TABLE IF NOT EXISTS site_monitoring (
    id INT PRIMARY KEY AUTO_INCREMENT,
    site_name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    status_code INT,
    response_time_ms INT,
    is_up BOOLEAN DEFAULT TRUE,
    last_check TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial data
INSERT IGNORE INTO users (email, name, role, password) VALUES 
('simon@simonwiller.dk', 'Simon Willer', 'admin', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewHjkD4k1p3QJqAi'); -- password: admin123

INSERT IGNORE INTO agents (name, type, description, capabilities, tasks_completed) VALUES 
('Svend', 'coordinator', 'Central AI Coordinator - OpenClaw integration', '["task_management", "coordination", "monitoring"]', 15),
('Anders', 'development', 'Development Agent - Code generation and deployment', '["code_generation", "github_integration", "deployment", "typescript", "nextjs"]', 8),
('Content Agent', 'content', 'SEO and content generation for affiliate sites', '["seo", "content_writing", "wordpress_integration"]', 5);

INSERT IGNORE INTO projects (name, description, domain, priority, progress) VALUES 
('Command Center V2', 'Advanced AI Command Center for task and agent management', 'personal', 1, 75),
('Personalized Campaigns', 'Elkjøp CRO project - campaign effectiveness optimization', 'elkjop', 1, 40),
('Affiliate Site Optimization', 'SEO and content pipeline for affiliate sites', 'affiliate', 2, 20),
('Dolk Customer Service', 'Automated customer service for dolk.dk', 'ecommerce', 3, 10),
('Site Monitoring', 'Monitor uptime and performance of all sites', 'personal', 2, 60);

INSERT IGNORE INTO tasks (title, description, project_id, assigned_agent_id, status, priority, kanban_position) VALUES 
('Database Schema Design', 'Create enhanced MySQL schema with kanban functionality', 1, 2, 'done', 1, 1),
('Authentication System', 'Implement NextAuth.js with password protection', 1, 2, 'done', 1, 2),
('Kanban Board UI', 'Build drag-and-drop kanban boards for task management', 1, 2, 'in_progress', 1, 1),
('Campaign Analytics', 'Analyze current Elkjøp campaign performance', 2, 1, 'todo', 1, 1),
('SEO Content Pipeline', 'Automate content generation for affiliate sites', 3, 3, 'backlog', 2, 1);

INSERT IGNORE INTO personal_todos (title, description, priority, status, position) VALUES 
('Review Q1 OKRs', 'Quarterly review of objectives and key results', 1, 'todo', 1),
('Plan affiliate content calendar', 'Create content schedule for next month', 2, 'todo', 2),
('Test Command Center features', 'Validate all kanban and dashboard functionality', 1, 'in_progress', 1);

INSERT IGNORE INTO site_monitoring (site_name, url) VALUES 
('Akasser.dk', 'https://akasser.dk'),
('Pejs.dk', 'https://pejs.dk'),
('Barnevogne.dk', 'https://barnevogne.dk'),
('Postkasse.dk', 'https://postkasse.dk'),
('Dolk.dk', 'https://dolk.dk'),
('Command Center', 'https://cc.willer-hansen.dk');