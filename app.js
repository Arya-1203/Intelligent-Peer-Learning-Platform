// Application Data
const APP_DATA = {
  users: [
    {
      id: 1,
      name: "John Student",
      email: "john@student.com",
      password: "password",
      role: "student",
      avatar: "👨‍🎓",
      skills: ["JavaScript", "React", "Node.js"],
      courses: [1, 2],
      progress: 75
    },
    {
      id: 2,
      name: "Sarah Teacher",
      email: "sarah@teacher.com",
      password: "password",
      role: "teacher",
      avatar: "👩‍🏫",
      courses_teaching: [1, 2, 3],
      students: 45
    },
    {
      id: 3,
      name: "Mike Admin",
      email: "mike@admin.com",
      password: "password",
      role: "admin",
      avatar: "👨‍💼"
    }
  ],
  courses: [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Learn MERN stack development from scratch with hands-on projects and real-world applications.",
      instructor: "Sarah Teacher",
      enrolled: 25,
      duration: "12 weeks",
      difficulty: "Intermediate",
      progress: 65,
      modules: [
        { id: 1, title: "React Fundamentals", completed: true, duration: "2 weeks" },
        { id: 2, title: "Node.js Backend", completed: true, duration: "3 weeks" },
        { id: 3, title: "MongoDB Database", completed: false, duration: "2 weeks" },
        { id: 4, title: "Express.js API", completed: false, duration: "3 weeks" }
      ],
      assignments: [
        { id: 1, title: "Build a React Component", dueDate: "2025-10-01", submitted: true, grade: "A" },
        { id: 2, title: "Create REST API", dueDate: "2025-10-15", submitted: false, grade: null }
      ]
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      description: "Introduction to ML algorithms, TensorFlow, and practical applications in real-world scenarios.",
      instructor: "Dr. Smith",
      enrolled: 30,
      duration: "10 weeks",
      difficulty: "Beginner",
      progress: 40,
      modules: [
        { id: 1, title: "ML Fundamentals", completed: true, duration: "2 weeks" },
        { id: 2, title: "Linear Regression", completed: false, duration: "2 weeks" },
        { id: 3, title: "Neural Networks", completed: false, duration: "3 weeks" }
      ],
      assignments: [
        { id: 3, title: "Data Analysis Project", dueDate: "2025-09-30", submitted: true, grade: "B+" }
      ]
    },
    {
      id: 3,
      title: "Advanced Python Programming",
      description: "Deep dive into Python with advanced concepts, design patterns, and optimization techniques.",
      instructor: "Sarah Teacher",
      enrolled: 18,
      duration: "8 weeks",
      difficulty: "Advanced",
      progress: 85,
      modules: [
        { id: 1, title: "Advanced OOP", completed: true, duration: "2 weeks" },
        { id: 2, title: "Design Patterns", completed: true, duration: "2 weeks" },
        { id: 3, title: "Performance Optimization", completed: false, duration: "2 weeks" }
      ]
    }
  ],
  peers: [
    {
      id: 1,
      name: "Alice Johnson",
      skills: ["React", "CSS", "UI/UX"],
      compatibility: 92,
      status: "online",
      avatar: "👩‍💻",
      courses: [1]
    },
    {
      id: 2,
      name: "Bob Wilson",
      skills: ["Node.js", "MongoDB", "API"],
      compatibility: 88,
      status: "offline",
      avatar: "👨‍💻",
      courses: [1, 2]
    },
    {
      id: 3,
      name: "Emma Davis",
      skills: ["Python", "Machine Learning", "Data Science"],
      compatibility: 85,
      status: "online",
      avatar: "👩‍🔬",
      courses: [2]
    }
  ],
  messages: [
    {
      id: 1,
      senderId: 1,
      senderName: "Alice Johnson",
      message: "Hey! Need help with React hooks?",
      time: "10:30 AM",
      avatar: "👩‍💻",
      timestamp: new Date()
    },
    {
      id: 2,
      senderId: "current",
      senderName: "You",
      message: "Yes, I'm struggling with useEffect",
      time: "10:32 AM",
      avatar: "👨‍🎓",
      timestamp: new Date()
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Alice Johnson",
      message: "Let me share some examples with you!",
      time: "10:33 AM",
      avatar: "👩‍💻",
      timestamp: new Date()
    }
  ],
  notifications: [
    {
      id: 1,
      title: "New Assignment",
      message: "Create REST API assignment is due in 3 days",
      time: "2 hours ago",
      type: "warning",
      read: false
    },
    {
      id: 2,
      title: "Peer Match Found",
      message: "Alice Johnson is a 92% compatibility match for React development",
      time: "5 hours ago",
      type: "success",
      read: false
    },
    {
      id: 3,
      title: "Course Update",
      message: "New module added to Machine Learning Basics",
      time: "1 day ago",
      type: "info",
      read: true
    }
  ],
  studyGroups: [
    {
      id: 1,
      name: "React Developers Circle",
      description: "A group focused on mastering React.js and modern frontend development",
      members: 12,
      course: "Full Stack Web Development",
      meetingTime: "Wednesdays 7:00 PM EST",
      avatar: "⚛️",
      isActive: true
    },
    {
      id: 2,
      name: "ML Study Buddies",
      description: "Learning machine learning algorithms and working through TensorFlow tutorials together",
      members: 8,
      course: "Machine Learning Basics",
      meetingTime: "Saturdays 3:00 PM EST",
      avatar: "🤖",
      isActive: true
    },
    {
      id: 3,
      name: "Backend Masters",
      description: "Deep dive into Node.js, APIs, and database design patterns",
      members: 15,
      course: "Full Stack Web Development",
      meetingTime: "Tuesdays 6:30 PM EST",
      avatar: "⚙️",
      isActive: true
    }
  ]
};

// Application State
let currentUser = null;
let currentPage = 'dashboard';
let currentChatUser = null;

// DOM Elements
const loginModal = document.getElementById('login-modal');
const app = document.getElementById('app');
const loadingScreen = document.getElementById('loading-screen');
const pageContent = document.getElementById('page-content');
const pageTitle = document.getElementById('page-title');
const sidebarMenu = document.getElementById('sidebar-menu');
const userInfo = document.getElementById('user-info');
const notificationsPanel = document.getElementById('notifications-panel');
const toastContainer = document.getElementById('toast-container');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is already logged in
  const savedUser = localStorage.getItem('iplp_current_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showApp();
  } else {
    showLoginModal();
  }
  
  // Initialize event listeners
  initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
  // Login form
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('signup-form').addEventListener('submit', handleSignup);
  
  // Sidebar toggle
  document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
  
  // Chat input
  document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Click outside to close notifications
  document.addEventListener('click', function(e) {
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    
    if (notificationsPanel && !notificationsPanel.classList.contains('hidden')) {
      if (!notificationsBtn.contains(e.target) && !notificationsPanel.contains(e.target)) {
        notificationsPanel.classList.add('hidden');
      }
    }
  });
}

// Authentication Functions
function showLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-form').classList.add('hidden');
  document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.auth-tab')[0].classList.add('active');
}

function showSignup() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
  document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.auth-tab')[1].classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  const user = APP_DATA.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    localStorage.setItem('iplp_current_user', JSON.stringify(user));
    closeLoginModal();
    showApp();
    showToast('Login successful!', 'success');
  } else {
    showToast('Invalid credentials. Try demo accounts.', 'error');
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const role = document.getElementById('signup-role').value;
  
  // Check if user already exists
  const existingUser = APP_DATA.users.find(u => u.email === email);
  if (existingUser) {
    showToast('User already exists with this email', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: APP_DATA.users.length + 1,
    name,
    email,
    password,
    role,
    avatar: role === 'student' ? '👨‍🎓' : role === 'teacher' ? '👩‍🏫' : '👨‍💼',
    courses: [],
    skills: []
  };
  
  APP_DATA.users.push(newUser);
  currentUser = newUser;
  localStorage.setItem('iplp_current_user', JSON.stringify(newUser));
  closeLoginModal();
  showApp();
  showToast('Account created successfully!', 'success');
}

function loginDemo(email) {
  document.getElementById('login-email').value = email;
  document.getElementById('login-password').value = 'password';
  document.getElementById('login-form').dispatchEvent(new Event('submit'));
}

function logout() {
  currentUser = null;
  localStorage.removeItem('iplp_current_user');
  app.classList.add('hidden');
  showLoginModal();
  showToast('Logged out successfully', 'success');
}

// Modal Functions
function showLoginModal() {
  hideLoadingScreen();
  loginModal.classList.remove('hidden');
}

function closeLoginModal() {
  loginModal.classList.add('hidden');
}

function showApp() {
  showLoadingScreen();
  setTimeout(() => {
    hideLoadingScreen();
    loginModal.classList.add('hidden');
    app.classList.remove('hidden');
    initializeApp();
  }, 1500);
}

function showLoadingScreen() {
  loadingScreen.classList.remove('hidden');
}

function hideLoadingScreen() {
  loadingScreen.classList.add('hidden');
}

// App Initialization
function initializeApp() {
  updateUserInfo();
  generateSidebarMenu();
  loadDashboard();
}

function updateUserInfo() {
  document.getElementById('user-avatar').textContent = currentUser.avatar;
  document.getElementById('user-name').textContent = currentUser.name;
  document.getElementById('user-role').textContent = currentUser.role;
  
  // Update notification count
  const unreadCount = APP_DATA.notifications.filter(n => !n.read).length;
  document.getElementById('notification-count').textContent = unreadCount;
}

function generateSidebarMenu() {
  const menus = {
    student: [
      {
        section: 'Learning',
        items: [
          { id: 'dashboard', icon: '📊', label: 'Dashboard' },
          { id: 'courses', icon: '📚', label: 'My Courses' },
          { id: 'progress', icon: '📈', label: 'Progress' },
          { id: 'assignments', icon: '📝', label: 'Assignments' }
        ]
      },
      {
        section: 'Social',
        items: [
          { id: 'peers', icon: '👥', label: 'Find Peers' },
          { id: 'chat', icon: '💬', label: 'Messages' },
          { id: 'study-groups', icon: '🤝', label: 'Study Groups' }
        ]
      },
      {
        section: 'Account',
        items: [
          { id: 'profile', icon: '⚙️', label: 'Profile Settings' }
        ]
      }
    ],
    teacher: [
      {
        section: 'Teaching',
        items: [
          { id: 'dashboard', icon: '📊', label: 'Dashboard' },
          { id: 'courses', icon: '📚', label: 'My Courses' },
          { id: 'students', icon: '👨‍🎓', label: 'Students' },
          { id: 'assignments', icon: '📝', label: 'Assignments' },
          { id: 'analytics', icon: '📈', label: 'Analytics' }
        ]
      },
      {
        section: 'Management',
        items: [
          { id: 'create-course', icon: '➕', label: 'Create Course' },
          { id: 'peer-matching', icon: '🤖', label: 'Peer Matching' }
        ]
      }
    ],
    admin: [
      {
        section: 'Administration',
        items: [
          { id: 'dashboard', icon: '📊', label: 'Dashboard' },
          { id: 'users', icon: '👥', label: 'User Management' },
          { id: 'courses', icon: '📚', label: 'Course Management' },
          { id: 'analytics', icon: '📈', label: 'Platform Analytics' }
        ]
      },
      {
        section: 'System',
        items: [
          { id: 'settings', icon: '⚙️', label: 'System Settings' },
          { id: 'moderation', icon: '🛡️', label: 'Content Moderation' }
        ]
      }
    ]
  };

  const userMenu = menus[currentUser.role] || menus.student;
  let menuHTML = '';
  
  userMenu.forEach(section => {
    menuHTML += `
      <div class="menu-section">
        <h3>${section.section}</h3>
        ${section.items.map(item => `
          <div class="menu-item ${item.id === 'dashboard' ? 'active' : ''}" onclick="navigateTo('${item.id}')">
            <span class="menu-item-icon">${item.icon}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>
    `;
  });
  
  sidebarMenu.innerHTML = menuHTML;
}

// Navigation
function navigateTo(page) {
  currentPage = page;
  
  // Update active menu item
  document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
  event.target.closest('.menu-item').classList.add('active');
  
  // Update page title
  const titles = {
    dashboard: 'Dashboard',
    courses: 'Courses',
    progress: 'Progress',
    assignments: 'Assignments',
    peers: 'Find Peers',
    chat: 'Messages',
    'study-groups': 'Study Groups',
    profile: 'Profile Settings',
    students: 'Students',
    analytics: 'Analytics',
    'create-course': 'Create Course',
    'peer-matching': 'Peer Matching',
    users: 'User Management',
    settings: 'System Settings',
    moderation: 'Content Moderation'
  };
  
  pageTitle.textContent = titles[page] || 'Dashboard';
  
  // Load page content
  switch(page) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'courses':
      loadCourses();
      break;
    case 'progress':
      loadProgress();
      break;
    case 'assignments':
      loadAssignments();
      break;
    case 'peers':
      loadPeers();
      break;
    case 'chat':
      loadChat();
      break;
    case 'study-groups':
      loadStudyGroups();
      break;
    case 'students':
      loadStudents();
      break;
    case 'analytics':
      loadAnalytics();
      break;
    case 'create-course':
      loadCreateCourse();
      break;
    case 'users':
      loadUserManagement();
      break;
    case 'profile':
      loadProfile();
      break;
    default:
      loadDashboard();
  }
}

// Dashboard Functions
function loadDashboard() {
  let dashboardHTML = '';
  
  if (currentUser.role === 'student') {
    dashboardHTML = generateStudentDashboard();
  } else if (currentUser.role === 'teacher') {
    dashboardHTML = generateTeacherDashboard();
  } else if (currentUser.role === 'admin') {
    dashboardHTML = generateAdminDashboard();
  }
  
  pageContent.innerHTML = dashboardHTML;
  
  // Initialize charts if analytics are present
  setTimeout(() => {
    initializeCharts();
  }, 100);
}

function generateStudentDashboard() {
  const enrolledCourses = APP_DATA.courses.filter(course => 
    currentUser.courses.includes(course.id)
  );
  
  return `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${enrolledCourses.length}</div>
        <div class="stat-label">Enrolled Courses</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${currentUser.progress || 0}%</div>
        <div class="stat-label">Overall Progress</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${APP_DATA.peers.filter(p => p.status === 'online').length}</div>
        <div class="stat-label">Peers Online</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${APP_DATA.notifications.filter(n => !n.read).length}</div>
        <div class="stat-label">New Notifications</div>
      </div>
    </div>
    
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Recent Courses</h3>
          <span class="card-icon">📚</span>
        </div>
        <div class="courses-list">
          ${enrolledCourses.slice(0, 2).map(course => `
            <div class="course-item" onclick="showCourseDetails(${course.id})">
              <div class="course-title">${course.title}</div>
              <div class="course-progress">
                <div class="progress-text">${course.progress}% Complete</div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--primary btn--sm mt-16" onclick="navigateTo('courses')">View All Courses</button>
      </div>
      
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Recommended Peers</h3>
          <span class="card-icon">👥</span>
        </div>
        <div class="peers-preview">
          ${APP_DATA.peers.slice(0, 2).map(peer => `
            <div class="peer-preview">
              <span class="peer-avatar">${peer.avatar}</span>
              <div class="peer-info">
                <div class="peer-name">${peer.name}</div>
                <div class="peer-compatibility">${peer.compatibility}% match</div>
              </div>
              <button class="btn btn--outline btn--sm" onclick="startChat(${peer.id})">Chat</button>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--primary btn--sm mt-16" onclick="navigateTo('peers')">Find More Peers</button>
      </div>
      
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Progress Overview</h3>
          <span class="card-icon">📈</span>
        </div>
        <div class="chart-container">
          <canvas id="progress-chart"></canvas>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Recent Activity</h3>
          <span class="card-icon">🔔</span>
        </div>
        <div class="activity-list">
          ${APP_DATA.notifications.slice(0, 3).map(notification => `
            <div class="activity-item">
              <div class="activity-title">${notification.title}</div>
              <div class="activity-message">${notification.message}</div>
              <div class="activity-time">${notification.time}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function generateTeacherDashboard() {
  const teachingCourses = APP_DATA.courses.filter(course => 
    currentUser.courses_teaching?.includes(course.id)
  );
  
  return `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${teachingCourses.length}</div>
        <div class="stat-label">Courses Teaching</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${currentUser.students || 0}</div>
        <div class="stat-label">Total Students</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">92%</div>
        <div class="stat-label">Avg. Completion Rate</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">4.8</div>
        <div class="stat-label">Course Rating</div>
      </div>
    </div>
    
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">My Courses</h3>
          <span class="card-icon">📚</span>
        </div>
        <div class="courses-list">
          ${teachingCourses.slice(0, 2).map(course => `
            <div class="course-item">
              <div class="course-title">${course.title}</div>
              <div class="course-stats">
                <span>${course.enrolled} students enrolled</span>
                <span>${course.duration}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--primary btn--sm mt-16" onclick="navigateTo('courses')">Manage Courses</button>
      </div>
      
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Student Performance</h3>
          <span class="card-icon">📊</span>
        </div>
        <div class="chart-container">
          <canvas id="performance-chart"></canvas>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Recent Submissions</h3>
          <span class="card-icon">📝</span>
        </div>
        <div class="submissions-list">
          <div class="submission-item">
            <div class="submission-title">React Component Assignment</div>
            <div class="submission-student">John Student</div>
            <div class="submission-time">2 hours ago</div>
          </div>
          <div class="submission-item">
            <div class="submission-title">API Design Project</div>
            <div class="submission-student">Alice Johnson</div>
            <div class="submission-time">5 hours ago</div>
          </div>
        </div>
        <button class="btn btn--primary btn--sm mt-16" onclick="navigateTo('assignments')">Review All</button>
      </div>
    </div>
  `;
}

function generateAdminDashboard() {
  return `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${APP_DATA.users.length}</div>
        <div class="stat-label">Total Users</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${APP_DATA.courses.length}</div>
        <div class="stat-label">Active Courses</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">95%</div>
        <div class="stat-label">System Uptime</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">1.2k</div>
        <div class="stat-label">Daily Active Users</div>
      </div>
    </div>
    
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Platform Analytics</h3>
          <span class="card-icon">📈</span>
        </div>
        <div class="chart-container">
          <canvas id="platform-chart"></canvas>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">User Distribution</h3>
          <span class="card-icon">👥</span>
        </div>
        <div class="chart-container">
          <canvas id="users-chart"></canvas>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">System Status</h3>
          <span class="card-icon">⚡</span>
        </div>
        <div class="status-list">
          <div class="status-item">
            <span class="status-indicator online"></span>
            <span>API Server: Online</span>
          </div>
          <div class="status-item">
            <span class="status-indicator online"></span>
            <span>Database: Healthy</span>
          </div>
          <div class="status-item">
            <span class="status-indicator online"></span>
            <span>AI Matching: Active</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Study Groups Functions
function loadStudyGroups() {
  const studyGroupsHTML = `
    <div class="study-groups-section">
      <div class="section-header">
        <h2>Study Groups</h2>
        <p>Join collaborative study sessions with peers who share similar learning goals</p>
        <button class="btn btn--primary" onclick="createStudyGroup()">Create New Group</button>
      </div>
      
      <div class="study-groups-grid">
        ${APP_DATA.studyGroups.map(group => `
          <div class="study-group-card">
            <div class="group-header">
              <div class="group-avatar">${group.avatar}</div>
              <div class="group-info">
                <h3 class="group-name">${group.name}</h3>
                <div class="group-course">${group.course}</div>
              </div>
              <div class="group-status ${group.isActive ? 'active' : 'inactive'}">
                ${group.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            
            <div class="group-body">
              <p class="group-description">${group.description}</p>
              
              <div class="group-meta">
                <div class="group-members">
                  <span class="meta-icon">👥</span>
                  <span>${group.members} members</span>
                </div>
                <div class="group-meeting">
                  <span class="meta-icon">📅</span>
                  <span>${group.meetingTime}</span>
                </div>
              </div>
              
              <div class="group-actions">
                <button class="btn btn--primary btn--sm" onclick="joinStudyGroup(${group.id})">Join Group</button>
                <button class="btn btn--outline btn--sm" onclick="viewGroupDetails(${group.id})">View Details</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="create-group-section mt-32">
        <div class="create-group-card">
          <h3>Start Your Own Study Group</h3>
          <p>Can't find the perfect group? Create one and invite peers with similar interests!</p>
          <div class="create-group-features">
            <div class="feature">
              <span class="feature-icon">🎯</span>
              <span>Topic-focused sessions</span>
            </div>
            <div class="feature">
              <span class="feature-icon">📊</span>
              <span>Progress tracking</span>
            </div>
            <div class="feature">
              <span class="feature-icon">💬</span>
              <span>Group chat integration</span>
            </div>
          </div>
          <button class="btn btn--secondary" onclick="createStudyGroup()">Get Started</button>
        </div>
      </div>
    </div>
  `;
  
  pageContent.innerHTML = studyGroupsHTML;
}

function joinStudyGroup(groupId) {
  showToast('Successfully joined the study group!', 'success');
}

function viewGroupDetails(groupId) {
  const group = APP_DATA.studyGroups.find(g => g.id === groupId);
  if (group) {
    showToast(`Viewing details for ${group.name}`, 'info');
  }
}

function createStudyGroup() {
  showToast('Study group creation feature coming soon!', 'info');
}

// Course Functions
function loadCourses() {
  let coursesHTML = '';
  
  if (currentUser.role === 'student') {
    const enrolledCourses = APP_DATA.courses.filter(course => 
      currentUser.courses.includes(course.id)
    );
    const availableCourses = APP_DATA.courses.filter(course => 
      !currentUser.courses.includes(course.id)
    );
    
    coursesHTML = `
      <div class="courses-section">
        <h2>My Courses</h2>
        <div class="courses-grid">
          ${enrolledCourses.map(course => generateCourseCard(course, true)).join('')}
        </div>
      </div>
      
      <div class="courses-section mt-32">
        <h2>Available Courses</h2>
        <div class="courses-grid">
          ${availableCourses.map(course => generateCourseCard(course, false)).join('')}
        </div>
      </div>
    `;
  } else if (currentUser.role === 'teacher') {
    const teachingCourses = APP_DATA.courses.filter(course => 
      currentUser.courses_teaching?.includes(course.id)
    );
    
    coursesHTML = `
      <div class="courses-section">
        <div class="section-header">
          <h2>My Courses</h2>
          <button class="btn btn--primary" onclick="navigateTo('create-course')">Create New Course</button>
        </div>
        <div class="courses-grid">
          ${teachingCourses.map(course => generateTeacherCourseCard(course)).join('')}
        </div>
      </div>
    `;
  }
  
  pageContent.innerHTML = coursesHTML;
}

function generateCourseCard(course, enrolled) {
  return `
    <div class="course-card" onclick="showCourseDetails(${course.id})">
      <div class="course-header">
        <h3 class="course-title">${course.title}</h3>
        <div class="course-instructor">by ${course.instructor}</div>
      </div>
      <div class="course-body">
        <p class="course-description">${course.description}</p>
        <div class="course-meta">
          <span>👥 ${course.enrolled} enrolled</span>
          <span>⏱️ ${course.duration}</span>
          <span class="status status--${course.difficulty.toLowerCase()}">${course.difficulty}</span>
        </div>
        ${enrolled ? `
          <div class="course-progress">
            <div class="progress-text">${course.progress}% Complete</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
          </div>
          <button class="btn btn--primary btn--sm">Continue Learning</button>
        ` : `
          <button class="btn btn--outline btn--sm" onclick="enrollCourse(${course.id}); event.stopPropagation();">Enroll Now</button>
        `}
      </div>
    </div>
  `;
}

function generateTeacherCourseCard(course) {
  return `
    <div class="course-card">
      <div class="course-header">
        <h3 class="course-title">${course.title}</h3>
        <div class="course-actions">
          <button class="btn btn--outline btn--sm" onclick="editCourse(${course.id})">Edit</button>
        </div>
      </div>
      <div class="course-body">
        <p class="course-description">${course.description}</p>
        <div class="course-stats">
          <div class="stat">
            <span class="stat-value">${course.enrolled}</span>
            <span class="stat-label">Students</span>
          </div>
          <div class="stat">
            <span class="stat-value">${course.modules.length}</span>
            <span class="stat-label">Modules</span>
          </div>
          <div class="stat">
            <span class="stat-value">${course.assignments?.length || 0}</span>
            <span class="stat-label">Assignments</span>
          </div>
        </div>
        <div class="course-actions">
          <button class="btn btn--primary btn--sm" onclick="viewStudents(${course.id})">View Students</button>
          <button class="btn btn--secondary btn--sm" onclick="showCourseDetails(${course.id})">Manage Content</button>
        </div>
      </div>
    </div>
  `;
}

// Peer Functions
function loadPeers() {
  const peerHTML = `
    <div class="peers-section">
      <div class="section-header">
        <h2>AI-Recommended Peers</h2>
        <p>Find study partners matched by AI based on your skills, courses, and learning goals</p>
      </div>
      
      <div class="filters-section mb-24">
        <div class="filters-row">
          <select class="form-control" style="width: auto;">
            <option>All Skills</option>
            <option>JavaScript</option>
            <option>React</option>
            <option>Node.js</option>
            <option>Python</option>
          </select>
          <select class="form-control" style="width: auto;">
            <option>All Courses</option>
            <option>Full Stack Web Development</option>
            <option>Machine Learning Basics</option>
          </select>
          <select class="form-control" style="width: auto;">
            <option>All Status</option>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>
      </div>
      
      <div class="peers-grid">
        ${APP_DATA.peers.map(peer => `
          <div class="peer-card">
            <div class="peer-avatar">${peer.avatar}</div>
            <div class="peer-name">${peer.name}</div>
            <div class="peer-skills">
              ${peer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="peer-compatibility">🎯 ${peer.compatibility}% Match</div>
            <div class="peer-status">
              <span class="status-indicator ${peer.status}"></span>
              ${peer.status.charAt(0).toUpperCase() + peer.status.slice(1)}
            </div>
            <div class="peer-actions">
              <button class="btn btn--primary btn--sm" onclick="startChat(${peer.id})">Start Chat</button>
              <button class="btn btn--outline btn--sm" onclick="sendConnectionRequest(${peer.id})">Connect</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  pageContent.innerHTML = peerHTML;
}

// Chat Functions
function loadChat() {
  const chatHTML = `
    <div class="chat-section">
      <div class="chat-list">
        <h3>Recent Conversations</h3>
        <div class="conversations">
          ${APP_DATA.peers.map(peer => `
            <div class="conversation-item" onclick="openChat(${peer.id}, '${peer.name}', '${peer.avatar}')">
              <div class="conversation-avatar">${peer.avatar}</div>
              <div class="conversation-info">
                <div class="conversation-name">${peer.name}</div>
                <div class="conversation-last">Click to start chatting...</div>
              </div>
              <div class="conversation-status">
                <span class="status-indicator ${peer.status}"></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  pageContent.innerHTML = chatHTML;
}

function startChat(peerId) {
  const peer = APP_DATA.peers.find(p => p.id === peerId);
  if (peer) {
    openChat(peer.id, peer.name, peer.avatar);
  }
}

function openChat(peerId, peerName, peerAvatar) {
  currentChatUser = { id: peerId, name: peerName, avatar: peerAvatar };
  
  document.getElementById('chat-modal-title').textContent = `Chat with ${peerName}`;
  
  // Load messages
  const messagesContainer = document.getElementById('chat-messages');
  messagesContainer.innerHTML = APP_DATA.messages.map(msg => `
    <div class="chat-message">
      <div class="message-avatar">${msg.avatar}</div>
      <div class="message-content">
        <div class="message-sender">${msg.senderName}</div>
        <div class="message-text">${msg.message}</div>
        <div class="message-time">${msg.time}</div>
      </div>
    </div>
  `).join('');
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  document.getElementById('chat-modal').classList.remove('hidden');
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (message && currentChatUser) {
    const newMessage = {
      id: APP_DATA.messages.length + 1,
      senderId: "current",
      senderName: "You",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: currentUser.avatar,
      timestamp: new Date()
    };
    
    APP_DATA.messages.push(newMessage);
    
    // Add to chat display
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML += `
      <div class="chat-message">
        <div class="message-avatar">${newMessage.avatar}</div>
        <div class="message-content">
          <div class="message-sender">${newMessage.senderName}</div>
          <div class="message-text">${newMessage.message}</div>
          <div class="message-time">${newMessage.time}</div>
        </div>
      </div>
    `;
    
    // Scroll to bottom and clear input
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
    
    // Simulate response after delay
    setTimeout(() => {
      const response = {
        id: APP_DATA.messages.length + 1,
        senderId: currentChatUser.id,
        senderName: currentChatUser.name,
        message: "Thanks for the message! I'll get back to you soon.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: currentChatUser.avatar,
        timestamp: new Date()
      };
      
      APP_DATA.messages.push(response);
      
      messagesContainer.innerHTML += `
        <div class="chat-message">
          <div class="message-avatar">${response.avatar}</div>
          <div class="message-content">
            <div class="message-sender">${response.senderName}</div>
            <div class="message-text">${response.message}</div>
            <div class="message-time">${response.time}</div>
          </div>
        </div>
      `;
      
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
  }
}

// Course Details Modal
function showCourseDetails(courseId) {
  const course = APP_DATA.courses.find(c => c.id === courseId);
  if (!course) return;
  
  document.getElementById('course-modal-title').textContent = course.title;
  
  const modalBody = document.getElementById('course-modal-body');
  modalBody.innerHTML = `
    <div class="course-details">
      <div class="course-info">
        <p><strong>Instructor:</strong> ${course.instructor}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p><strong>Difficulty:</strong> ${course.difficulty}</p>
        <p><strong>Enrolled:</strong> ${course.enrolled} students</p>
      </div>
      
      <div class="course-description">
        <h4>Description</h4>
        <p>${course.description}</p>
      </div>
      
      <div class="course-modules">
        <h4>Modules</h4>
        <div class="modules-list">
          ${course.modules.map(module => `
            <div class="module-item">
              <div class="module-status">
                ${module.completed ? '✅' : '⭕'}
              </div>
              <div class="module-info">
                <div class="module-title">${module.title}</div>
                <div class="module-duration">${module.duration}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      ${course.assignments ? `
        <div class="course-assignments">
          <h4>Assignments</h4>
          <div class="assignments-list">
            ${course.assignments.map(assignment => `
              <div class="assignment-item">
                <div class="assignment-title">${assignment.title}</div>
                <div class="assignment-due">Due: ${assignment.dueDate}</div>
                <div class="assignment-status">
                  ${assignment.submitted ? 
                    `<span class="status status--success">Submitted</span>` + 
                    (assignment.grade ? ` - Grade: ${assignment.grade}` : '') :
                    `<span class="status status--warning">Pending</span>`
                  }
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('course-modal').classList.remove('hidden');
}

// Notification Functions
function toggleNotifications() {
  const panel = document.getElementById('notifications-panel');
  const isHidden = panel.classList.contains('hidden');
  
  if (isHidden) {
    panel.classList.remove('hidden');
    loadNotifications();
  } else {
    panel.classList.add('hidden');
  }
}

function loadNotifications() {
  const notificationsList = document.getElementById('notifications-list');
  notificationsList.innerHTML = APP_DATA.notifications.map(notification => `
    <div class="notification-item ${notification.read ? '' : 'unread'}" onclick="markNotificationRead(${notification.id})">
      <div class="notification-title">${notification.title}</div>
      <div class="notification-message">${notification.message}</div>
      <div class="notification-time">${notification.time}</div>
    </div>
  `).join('');
}

function markNotificationRead(notificationId) {
  const notification = APP_DATA.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    updateUserInfo(); // Update the notification count
    loadNotifications(); // Refresh the notification list
  }
}

// Utility Functions
function enrollCourse(courseId) {
  if (!currentUser.courses.includes(courseId)) {
    currentUser.courses.push(courseId);
    localStorage.setItem('iplp_current_user', JSON.stringify(currentUser));
    showToast('Successfully enrolled in course!', 'success');
    loadCourses();
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
}

function closeCourseModal() {
  document.getElementById('course-modal').classList.add('hidden');
}

function closeChatModal() {
  document.getElementById('chat-modal').classList.add('hidden');
  currentChatUser = null;
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type} fade-in`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Chart Initialization
function initializeCharts() {
  // Progress Chart (Student Dashboard)
  const progressCanvas = document.getElementById('progress-chart');
  if (progressCanvas) {
    new Chart(progressCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
  
  // Performance Chart (Teacher Dashboard)
  const performanceCanvas = document.getElementById('performance-chart');
  if (performanceCanvas) {
    new Chart(performanceCanvas, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Average Score',
          data: [75, 82, 88, 92],
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
  
  // Platform Analytics Chart (Admin Dashboard)
  const platformCanvas = document.getElementById('platform-chart');
  if (platformCanvas) {
    new Chart(platformCanvas, {
      type: 'bar',
      data: {
        labels: ['Students', 'Teachers', 'Courses', 'Active Sessions'],
        datasets: [{
          label: 'Count',
          data: [120, 25, 15, 85],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  // User Distribution Chart (Admin Dashboard)
  const usersCanvas = document.getElementById('users-chart');
  if (usersCanvas) {
    new Chart(usersCanvas, {
      type: 'pie',
      data: {
        labels: ['Students', 'Teachers', 'Admins'],
        datasets: [{
          data: [80, 18, 2],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}

// Additional page loading functions (simplified implementations)
function loadProgress() {
  pageContent.innerHTML = `
    <div class="progress-section">
      <h2>Learning Progress</h2>
      <div class="chart-container">
        <canvas id="detailed-progress-chart"></canvas>
      </div>
      <div class="progress-details mt-24">
        ${APP_DATA.courses.filter(c => currentUser.courses.includes(c.id)).map(course => `
          <div class="progress-item">
            <h4>${course.title}</h4>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <span>${course.progress}% Complete</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function loadAssignments() {
  const assignments = APP_DATA.courses
    .filter(c => currentUser.courses?.includes(c.id) || currentUser.courses_teaching?.includes(c.id))
    .flatMap(c => c.assignments || []);
  
  pageContent.innerHTML = `
    <div class="assignments-section">
      <h2>Assignments</h2>
      <div class="assignments-grid">
        ${assignments.map(assignment => `
          <div class="assignment-card">
            <h4>${assignment.title}</h4>
            <p>Due: ${assignment.dueDate}</p>
            <div class="assignment-status">
              ${assignment.submitted ? 
                `<span class="status status--success">Submitted</span>` :
                `<span class="status status--warning">Pending</span>`
              }
            </div>
            ${assignment.grade ? `<p>Grade: ${assignment.grade}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function loadStudents() {
  pageContent.innerHTML = `
    <div class="students-section">
      <h2>My Students</h2>
      <div class="students-grid">
        ${APP_DATA.users.filter(u => u.role === 'student').map(student => `
          <div class="student-card">
            <div class="student-avatar">${student.avatar}</div>
            <div class="student-name">${student.name}</div>
            <div class="student-progress">${student.progress || 0}% Average Progress</div>
            <button class="btn btn--outline btn--sm" onclick="viewStudentDetails('${student.id}')">View Details</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function loadAnalytics() {
  pageContent.innerHTML = `
    <div class="analytics-section">
      <h2>Analytics Dashboard</h2>
      <div class="charts-grid">
        <div class="chart-card">
          <h4>Engagement Over Time</h4>
          <div class="chart-container">
            <canvas id="engagement-chart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <h4>Course Performance</h4>
          <div class="chart-container">
            <canvas id="course-performance-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
  
  setTimeout(initializeAnalyticsCharts, 100);
}

function initializeAnalyticsCharts() {
  // Simplified chart initialization
  const engagementCanvas = document.getElementById('engagement-chart');
  if (engagementCanvas) {
    new Chart(engagementCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Active Users',
          data: [300, 350, 400, 380, 420],
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

function loadCreateCourse() {
  pageContent.innerHTML = `
    <div class="create-course-section">
      <h2>Create New Course</h2>
      <form class="create-course-form" onsubmit="createCourse(event)">
        <div class="form-group">
          <label class="form-label">Course Title</label>
          <input type="text" class="form-control" required>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-control" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Duration</label>
          <input type="text" class="form-control" placeholder="e.g., 8 weeks" required>
        </div>
        <div class="form-group">
          <label class="form-label">Difficulty Level</label>
          <select class="form-control" required>
            <option value="">Select difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" class="btn btn--primary">Create Course</button>
      </form>
    </div>
  `;
}

function createCourse(event) {
  event.preventDefault();
  showToast('Course created successfully!', 'success');
  navigateTo('courses');
}

function loadUserManagement() {
  pageContent.innerHTML = `
    <div class="user-management-section">
      <h2>User Management</h2>
      <div class="users-table">
        <div class="table-header">
          <div>User</div>
          <div>Role</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        ${APP_DATA.users.map(user => `
          <div class="table-row">
            <div class="user-cell">
              <span class="user-avatar">${user.avatar}</span>
              <div>
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
              </div>
            </div>
            <div class="role-cell">${user.role}</div>
            <div class="status-cell">
              <span class="status status--success">Active</span>
            </div>
            <div class="actions-cell">
              <button class="btn btn--outline btn--sm">Edit</button>
              <button class="btn btn--secondary btn--sm">Suspend</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function loadProfile() {
  pageContent.innerHTML = `
    <div class="profile-section">
      <h2>Profile Settings</h2>
      <div class="profile-form">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" value="${currentUser.name}">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" value="${currentUser.email}">
        </div>
        <div class="form-group">
          <label class="form-label">Role</label>
          <input type="text" class="form-control" value="${currentUser.role}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Skills</label>
          <input type="text" class="form-control" value="${currentUser.skills ? currentUser.skills.join(', ') : ''}" placeholder="Enter your skills">
        </div>
        <button class="btn btn--primary" onclick="saveProfile()">Save Changes</button>
      </div>
    </div>
  `;
}

function saveProfile() {
  showToast('Profile updated successfully!', 'success');
}

// Initialize tooltips and other interactive elements
function sendConnectionRequest(peerId) {
  showToast('Connection request sent!', 'success');
}