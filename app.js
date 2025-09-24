// Application State
let currentUser = null;
let currentView = 'dashboard';
let isAuthenticated = false;

// Sample Data from JSON
const sampleData = {
  users: [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@student.com",
      role: "student",
      skills: ["JavaScript", "React", "Node.js"],
      interests: ["Web Development", "AI", "Data Science"],
      progress: 65,
      courses_enrolled: [1, 2],
      peer_matches: [2, 3]
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@student.com",
      role: "student",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      interests: ["AI", "Data Science", "Deep Learning"],
      progress: 78,
      courses_enrolled: [2, 3],
      peer_matches: [1, 4]
    },
    {
      id: 3,
      name: "Dr. Sarah Wilson",
      email: "sarah@teacher.com",
      role: "teacher",
      expertise: ["Computer Science", "Machine Learning", "Education Technology"],
      courses_created: [1, 2, 3],
      rating: 4.8
    },
    {
      id: 4,
      name: "Mike Chen",
      email: "mike@student.com",
      role: "student",
      skills: ["Java", "Spring Boot", "Database Design"],
      interests: ["Backend Development", "System Architecture"],
      progress: 72,
      courses_enrolled: [1],
      peer_matches: [1, 2]
    }
  ],
  courses: [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      instructor: "Dr. Sarah Wilson",
      description: "Learn the fundamentals of ML algorithms and their applications",
      difficulty: "Beginner",
      duration: "8 weeks",
      enrolled: 245,
      rating: 4.7,
      modules: ["Linear Regression", "Classification", "Neural Networks", "Deep Learning"],
      progress: 0
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      instructor: "Prof. Mike Chen",
      description: "Master MERN stack development from frontend to backend",
      difficulty: "Intermediate",
      duration: "12 weeks",
      enrolled: 189,
      rating: 4.6,
      modules: ["React Basics", "Node.js & Express", "MongoDB", "Deployment"],
      progress: 0
    },
    {
      id: 3,
      title: "AI Ethics and Society",
      instructor: "Dr. Emily Rodriguez",
      description: "Explore the ethical implications of AI in modern society",
      difficulty: "Advanced",
      duration: "6 weeks",
      enrolled: 156,
      rating: 4.9,
      modules: ["AI Bias", "Privacy Concerns", "Regulatory Frameworks", "Future Implications"],
      progress: 0
    }
  ],
  aiResponses: [
    "I'd be happy to help you with that topic! Let me break it down for you...",
    "That's a great question! Based on your learning progress, I recommend...",
    "I notice you're struggling with this concept. Would you like me to connect you with a peer who excels in this area?",
    "Your progress is excellent! Here are some advanced resources to challenge yourself further...",
    "Let me help you understand this better with a practical example..."
  ],
  chatMessages: []
};

// Utility Functions
function showLoading() {
  document.getElementById('loading-spinner').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loading-spinner').style.display = 'none';
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Authentication Functions
function showAuthModal(isRegister = false) {
  const modal = document.getElementById('auth-modal');
  const title = document.getElementById('auth-title');
  const submitBtn = document.getElementById('auth-submit');
  const registerFields = document.getElementById('register-fields');
  const toggleLink = document.getElementById('toggle-register');
  
  if (isRegister) {
    title.textContent = 'Register for IPLP';
    submitBtn.textContent = 'Register';
    registerFields.style.display = 'block';
    toggleLink.textContent = 'Login here';
    toggleLink.setAttribute('data-mode', 'login');
  } else {
    title.textContent = 'Welcome Back';
    submitBtn.textContent = 'Login';
    registerFields.style.display = 'none';
    toggleLink.textContent = 'Register here';
    toggleLink.setAttribute('data-mode', 'register');
  }
  
  modal.classList.add('show');
}

function hideAuthModal() {
  document.getElementById('auth-modal').classList.remove('show');
}

function authenticateUser(email, password, isRegister = false, name = '', role = 'student') {
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    
    if (isRegister) {
      // Create new user
      const newUser = {
        id: sampleData.users.length + 1,
        name: name,
        email: email,
        role: role,
        skills: [],
        interests: [],
        progress: 0,
        courses_enrolled: [],
        peer_matches: []
      };
      sampleData.users.push(newUser);
      currentUser = newUser;
    } else {
      // Find existing user or use demo user
      currentUser = sampleData.users.find(u => u.email === email) || sampleData.users[0];
    }
    
    isAuthenticated = true;
    localStorage.setItem('iplp_user', JSON.stringify(currentUser));
    hideAuthModal();
    showMainApp();
  }, 1000);
}

function logout() {
  currentUser = null;
  isAuthenticated = false;
  localStorage.removeItem('iplp_user');
  showLandingPage();
}

function checkAuth() {
  const savedUser = localStorage.getItem('iplp_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    isAuthenticated = true;
    showMainApp();
  }
}

// View Management
function showLandingPage() {
  document.getElementById('landing-page').style.display = 'flex';
  document.getElementById('main-navbar').style.display = 'none';
  document.getElementById('app-container').style.display = 'none';
}

function showMainApp() {
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('main-navbar').style.display = 'block';
  document.getElementById('app-container').style.display = 'block';
  
  // Update user info in navbar
  document.getElementById('user-name').textContent = currentUser.name;
  
  // Show appropriate view
  showView('dashboard');
}

function showView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.style.display = 'none';
  });
  
  // Remove active class from nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Show selected view
  document.getElementById(`${viewName}-view`).style.display = 'block';
  
  // Add active class to current nav link
  const activeLink = document.querySelector(`[data-view="${viewName}"]`);
  if (activeLink) activeLink.classList.add('active');
  
  currentView = viewName;
  
  // Initialize view-specific content
  switch(viewName) {
    case 'dashboard':
      initializeDashboard();
      break;
    case 'courses':
      initializeCourses();
      break;
    case 'peers':
      initializePeerMatching();
      break;
    case 'chat':
      initializeChat();
      break;
    case 'analytics':
      initializeAnalytics();
      break;
    case 'profile':
      initializeProfile();
      break;
  }
}

// Dashboard Functions
function initializeDashboard() {
  updateProgressCircle();
  populateDashboardCourses();
  populateDashboardPeers();
}

function updateProgressCircle() {
  const progressNumber = document.getElementById('user-progress');
  const progressCircle = document.querySelector('.progress-circle');
  
  if (progressNumber && progressCircle) {
    const progress = currentUser.progress || 65;
    progressNumber.textContent = progress;
    progressCircle.style.background = `conic-gradient(var(--color-primary) ${progress}%, var(--color-secondary) 0)`;
  }
}

function populateDashboardCourses() {
  const container = document.getElementById('dashboard-courses');
  const userCourses = sampleData.courses.filter(course => 
    currentUser.courses_enrolled && currentUser.courses_enrolled.includes(course.id)
  );
  
  container.innerHTML = userCourses.map(course => `
    <div class="course-item">
      <div>
        <strong>${course.title}</strong>
        <div class="course-progress">
          <div class="course-progress-bar" style="width: ${course.progress}%"></div>
        </div>
      </div>
      <button class="btn btn--sm btn--outline" onclick="openCourse(${course.id})">Continue</button>
    </div>
  `).join('');
}

function populateDashboardPeers() {
  const container = document.getElementById('dashboard-peers');
  const userPeers = sampleData.users.filter(user => 
    currentUser.peer_matches && currentUser.peer_matches.includes(user.id) && user.id !== currentUser.id
  );
  
  container.innerHTML = userPeers.map(peer => `
    <div class="peer-item">
      <div>
        <strong>${peer.name}</strong>
        <p style="margin: 0; font-size: var(--font-size-sm); color: var(--color-text-secondary);">${peer.skills.join(', ')}</p>
      </div>
      <button class="btn btn--sm btn--outline" onclick="startChat('${peer.name}')">Chat</button>
    </div>
  `).join('');
}

// Course Functions
function initializeCourses() {
  populateCoursesGrid();
  setupCourseSearch();
  
  // Show create course button for teachers
  const createBtn = document.getElementById('create-course-btn');
  if (currentUser.role === 'teacher') {
    createBtn.style.display = 'block';
  }
}

function populateCoursesGrid() {
  const container = document.getElementById('courses-grid');
  
  container.innerHTML = sampleData.courses.map(course => {
    const isEnrolled = currentUser.courses_enrolled && currentUser.courses_enrolled.includes(course.id);
    return `
      <div class="course-card" onclick="openCourse(${course.id})">
        <div class="course-header">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-instructor">by ${course.instructor}</p>
        </div>
        <div class="course-body">
          <p class="course-description">${course.description}</p>
          <div class="course-meta">
            <span class="course-difficulty">${course.difficulty}</span>
            <span class="course-duration">${course.duration}</span>
          </div>
          <div class="course-stats">
            <span>${course.enrolled} enrolled</span>
            <span>⭐ ${course.rating}</span>
          </div>
          ${isEnrolled ? `
            <div class="course-progress">
              <div class="course-progress-bar" style="width: ${course.progress}%"></div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function setupCourseSearch() {
  const searchInput = document.getElementById('course-search');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredCourses = sampleData.courses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query)
    );
    
    const container = document.getElementById('courses-grid');
    container.innerHTML = filteredCourses.map(course => {
      const isEnrolled = currentUser.courses_enrolled && currentUser.courses_enrolled.includes(course.id);
      return `
        <div class="course-card" onclick="openCourse(${course.id})">
          <div class="course-header">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-instructor">by ${course.instructor}</p>
          </div>
          <div class="course-body">
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
              <span class="course-difficulty">${course.difficulty}</span>
              <span class="course-duration">${course.duration}</span>
            </div>
            <div class="course-stats">
              <span>${course.enrolled} enrolled</span>
              <span>⭐ ${course.rating}</span>
            </div>
            ${isEnrolled ? `
              <div class="course-progress">
                <div class="course-progress-bar" style="width: ${course.progress}%"></div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  });
}

function openCourse(courseId) {
  const course = sampleData.courses.find(c => c.id === courseId);
  const isEnrolled = currentUser.courses_enrolled && currentUser.courses_enrolled.includes(courseId);
  
  const modal = document.getElementById('course-modal');
  const title = document.getElementById('course-modal-title');
  const body = document.getElementById('course-modal-body');
  
  title.textContent = course.title;
  body.innerHTML = `
    <div class="course-details">
      <div class="course-meta-detail">
        <p><strong>Instructor:</strong> ${course.instructor}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p><strong>Difficulty:</strong> ${course.difficulty}</p>
        <p><strong>Rating:</strong> ⭐ ${course.rating} (${course.enrolled} students)</p>
      </div>
      <div class="course-description-detail">
        <h3>About this course</h3>
        <p>${course.description}</p>
      </div>
      <div class="course-modules">
        <h3>Course Modules</h3>
        <ul>
          ${course.modules.map((module, index) => `
            <li>${index + 1}. ${module}</li>
          `).join('')}
        </ul>
      </div>
      <div class="course-actions" style="margin-top: 24px;">
        ${isEnrolled ? `
          <button class="btn btn--primary" onclick="continueCourse(${courseId})">Continue Learning</button>
          <button class="btn btn--outline" onclick="dropCourse(${courseId})">Drop Course</button>
        ` : `
          <button class="btn btn--primary" onclick="enrollCourse(${courseId})">Enroll Now</button>
        `}
      </div>
    </div>
  `;
  
  modal.classList.add('show');
}

function enrollCourse(courseId) {
  if (!currentUser.courses_enrolled) currentUser.courses_enrolled = [];
  currentUser.courses_enrolled.push(courseId);
  localStorage.setItem('iplp_user', JSON.stringify(currentUser));
  
  // Update course progress
  const course = sampleData.courses.find(c => c.id === courseId);
  course.progress = 0;
  
  document.getElementById('course-modal').classList.remove('show');
  showView('courses');
}

function continueCourse(courseId) {
  // Simulate course progress
  const course = sampleData.courses.find(c => c.id === courseId);
  course.progress = Math.min(course.progress + 25, 100);
  
  document.getElementById('course-modal').classList.remove('show');
  showView('courses');
}

function dropCourse(courseId) {
  currentUser.courses_enrolled = currentUser.courses_enrolled.filter(id => id !== courseId);
  localStorage.setItem('iplp_user', JSON.stringify(currentUser));
  document.getElementById('course-modal').classList.remove('show');
  showView('courses');
}

// Peer Matching Functions
function initializePeerMatching() {
  populatePeerMatches();
  populatePeerConnections();
}

function populatePeerMatches() {
  const container = document.getElementById('peer-matches');
  const availablePeers = sampleData.users.filter(user => 
    user.id !== currentUser.id && 
    (!currentUser.peer_matches || !currentUser.peer_matches.includes(user.id))
  );
  
  if (availablePeers.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--color-text-secondary); padding: var(--space-20);">
        <p>No new peer recommendations available at the moment.</p>
        <p>Check back later for more matches!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = availablePeers.map(peer => {
    const compatibilityScore = Math.floor(Math.random() * 30) + 70; // 70-99%
    return `
      <div class="peer-card">
        <div class="peer-header">
          <div class="peer-avatar">${getInitials(peer.name)}</div>
          <div class="peer-info">
            <h4>${peer.name}</h4>
            <p>${peer.role}</p>
          </div>
          <span class="compatibility-score">${compatibilityScore}% match</span>
        </div>
        <div class="peer-skills">
          ${peer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        <div class="peer-actions">
          <button class="btn btn--primary btn--sm" onclick="connectPeer(${peer.id})">Connect</button>
          <button class="btn btn--outline btn--sm" onclick="viewPeerProfile(${peer.id})">View Profile</button>
        </div>
      </div>
    `;
  }).join('');
}

function populatePeerConnections() {
  const container = document.getElementById('peer-connections');
  const connectedPeers = sampleData.users.filter(user => 
    currentUser.peer_matches && currentUser.peer_matches.includes(user.id)
  );
  
  if (connectedPeers.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--color-text-secondary); padding: var(--space-20);">
        <p>No peer connections yet.</p>
        <p>Connect with recommended peers to start collaborating!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = connectedPeers.map(peer => `
    <div class="peer-card">
      <div class="peer-header">
        <div class="peer-avatar">${getInitials(peer.name)}</div>
        <div class="peer-info">
          <h4>${peer.name}</h4>
          <p>${peer.role}</p>
        </div>
        <span class="status--success">Connected</span>
      </div>
      <div class="peer-skills">
        ${peer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
      <div class="peer-actions">
        <button class="btn btn--primary btn--sm" onclick="startChat('${peer.name}')">Message</button>
        <button class="btn btn--outline btn--sm" onclick="viewPeerProfile(${peer.id})">Profile</button>
      </div>
    </div>
  `).join('');
}

function connectPeer(peerId) {
  showLoading();
  
  setTimeout(() => {
    if (!currentUser.peer_matches) currentUser.peer_matches = [];
    currentUser.peer_matches.push(peerId);
    localStorage.setItem('iplp_user', JSON.stringify(currentUser));
    
    hideLoading();
    initializePeerMatching();
    
    const peer = sampleData.users.find(u => u.id === peerId);
    alert(`Successfully connected with ${peer.name}! You can now message them and collaborate on projects.`);
  }, 1000);
}

function viewPeerProfile(peerId) {
  const peer = sampleData.users.find(u => u.id === peerId);
  alert(`Profile: ${peer.name}\nRole: ${peer.role}\nSkills: ${peer.skills.join(', ')}\nInterests: ${peer.interests.join(', ')}`);
}

// Chat Functions
function initializeChat() {
  populateChatList();
  initializeAIChat();
}

function populateChatList() {
  const container = document.getElementById('chat-list');
  const connectedPeers = sampleData.users.filter(user => 
    currentUser.peer_matches && currentUser.peer_matches.includes(user.id)
  );
  
  // Clear existing content except AI assistant
  const aiAssistant = container.querySelector('[data-chat="ai-assistant"]');
  container.innerHTML = '';
  if (aiAssistant) {
    container.appendChild(aiAssistant);
  }
  
  // Add peer chats to the list
  connectedPeers.forEach(peer => {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.dataset.chat = peer.name.toLowerCase().replace(' ', '-');
    chatItem.innerHTML = `
      <div class="chat-avatar">${getInitials(peer.name)}</div>
      <div class="chat-info">
        <div class="chat-name">${peer.name}</div>
        <div class="chat-preview">Click to start chatting...</div>
      </div>
    `;
    container.appendChild(chatItem);
  });
}

function initializeAIChat() {
  const messagesContainer = document.getElementById('chat-messages');
  messagesContainer.innerHTML = `
    <div class="message bot">
      <div class="message-content">Hello ${currentUser.name}! I'm your AI learning assistant. How can I help you today?</div>
      <div class="message-time">Just now</div>
    </div>
  `;
}

function startChat(peerName) {
  showView('chat');
  
  // Update chat header
  const header = document.getElementById('chat-header');
  header.innerHTML = `
    <div class="chat-avatar">${getInitials(peerName)}</div>
    <div class="chat-name">${peerName}</div>
  `;
  
  // Clear messages and show initial message
  const messagesContainer = document.getElementById('chat-messages');
  messagesContainer.innerHTML = `
    <div class="message bot">
      <div class="message-content">You're now connected with ${peerName}. Start your conversation!</div>
      <div class="message-time">Just now</div>
    </div>
  `;
  
  // Set active chat item
  document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
  const chatId = peerName.toLowerCase().replace(' ', '-');
  const chatItem = document.querySelector(`[data-chat="${chatId}"]`);
  if (chatItem) {
    chatItem.classList.add('active');
  }
}

function sendMessage(content) {
  const messagesContainer = document.getElementById('chat-messages');
  const currentChat = document.querySelector('.chat-item.active')?.dataset.chat || 'ai-assistant';
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.innerHTML = `
    <div class="message-content">${content}</div>
    <div class="message-time">Just now</div>
  `;
  messagesContainer.appendChild(userMessage);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Generate AI response if talking to AI assistant
  if (currentChat === 'ai-assistant') {
    setTimeout(() => {
      const aiResponse = sampleData.aiResponses[Math.floor(Math.random() * sampleData.aiResponses.length)];
      const botMessage = document.createElement('div');
      botMessage.className = 'message bot';
      botMessage.innerHTML = `
        <div class="message-content">${aiResponse}</div>
        <div class="message-time">Just now</div>
      `;
      messagesContainer.appendChild(botMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
  } else {
    // Simulate peer response
    setTimeout(() => {
      const peerResponses = [
        "That's a great point! I hadn't thought about it that way.",
        "I agree! Let's work on this together.",
        "Have you tried looking at it from this angle?",
        "That reminds me of something we covered in class.",
        "Thanks for sharing! This is really helpful."
      ];
      const peerResponse = peerResponses[Math.floor(Math.random() * peerResponses.length)];
      const botMessage = document.createElement('div');
      botMessage.className = 'message bot';
      botMessage.innerHTML = `
        <div class="message-content">${peerResponse}</div>
        <div class="message-time">Just now</div>
      `;
      messagesContainer.appendChild(botMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
  }
}

// Analytics Functions
function initializeAnalytics() {
  createProgressChart();
  createStreakCalendar();
}

function createProgressChart() {
  const ctx = document.getElementById('progress-chart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Learning Progress',
        data: [10, 25, 40, 55, 65, 78],
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

function createStreakCalendar() {
  const calendar = document.querySelector('.streak-calendar');
  if (!calendar) return;
  
  const days = [];
  const today = new Date();
  
  for (let i = 20; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const isActive = Math.random() > 0.3; // 70% chance of being active
    
    const dayElement = document.createElement('div');
    dayElement.className = `streak-day ${isActive ? 'active' : ''}`;
    dayElement.textContent = day.getDate();
    days.push(dayElement);
  }
  
  calendar.replaceChildren(...days);
}

// Profile Functions
function initializeProfile() {
  updateProfileInfo();
  populateProfileTags();
}

function updateProfileInfo() {
  document.getElementById('profile-name').textContent = currentUser.name;
  document.getElementById('profile-role').textContent = currentUser.role;
  document.getElementById('profile-initials').textContent = getInitials(currentUser.name);
}

function populateProfileTags() {
  const skillsContainer = document.getElementById('skills-tags');
  const interestsContainer = document.getElementById('interests-tags');
  
  skillsContainer.innerHTML = (currentUser.skills || []).map(skill => `
    <span class="tag">
      ${skill}
      <button class="tag-remove" onclick="removeSkill('${skill}')">&times;</button>
    </span>
  `).join('');
  
  interestsContainer.innerHTML = (currentUser.interests || []).map(interest => `
    <span class="tag">
      ${interest}
      <button class="tag-remove" onclick="removeInterest('${interest}')">&times;</button>
    </span>
  `).join('');
}

function addSkill(skill) {
  if (!currentUser.skills) currentUser.skills = [];
  if (!currentUser.skills.includes(skill)) {
    currentUser.skills.push(skill);
    localStorage.setItem('iplp_user', JSON.stringify(currentUser));
    populateProfileTags();
  }
}

function removeSkill(skill) {
  currentUser.skills = currentUser.skills.filter(s => s !== skill);
  localStorage.setItem('iplp_user', JSON.stringify(currentUser));
  populateProfileTags();
}

function addInterest(interest) {
  if (!currentUser.interests) currentUser.interests = [];
  if (!currentUser.interests.includes(interest)) {
    currentUser.interests.push(interest);
    localStorage.setItem('iplp_user', JSON.stringify(currentUser));
    populateProfileTags();
  }
}

function removeInterest(interest) {
  currentUser.interests = currentUser.interests.filter(i => i !== interest);
  localStorage.setItem('iplp_user', JSON.stringify(currentUser));
  populateProfileTags();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication on load
  checkAuth();
  
  // Landing page buttons
  const getStartedBtn = document.getElementById('get-started-btn');
  const demoLoginBtn = document.getElementById('demo-login-btn');
  
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => showAuthModal(true));
  }
  
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      authenticateUser('alice@student.com', 'password');
    });
  }
  
  // Auth modal events
  const authForm = document.getElementById('auth-form');
  const toggleRegister = document.getElementById('toggle-register');
  const closeAuth = document.getElementById('close-auth');
  
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value;
      const password = document.getElementById('auth-password').value;
      const name = document.getElementById('auth-name').value;
      const role = document.getElementById('auth-role').value;
      const isRegister = toggleRegister.dataset.mode === 'login';
      
      authenticateUser(email, password, isRegister, name, role);
    });
  }
  
  if (toggleRegister) {
    toggleRegister.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyRegister = e.target.dataset.mode === 'register';
      showAuthModal(isCurrentlyRegister);
    });
  }
  
  if (closeAuth) {
    closeAuth.addEventListener('click', hideAuthModal);
  }
  
  // Navigation events
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      if (view) showView(view);
    });
  });
  
  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
  
  // Chat form
  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const message = input.value.trim();
      if (message) {
        sendMessage(message);
        input.value = '';
      }
    });
  }
  
  // Chat items
  document.addEventListener('click', (e) => {
    if (e.target.closest('.chat-item')) {
      document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
      e.target.closest('.chat-item').classList.add('active');
      
      const chatType = e.target.closest('.chat-item').dataset.chat;
      if (chatType === 'ai-assistant') {
        initializeAIChat();
        document.getElementById('chat-header').innerHTML = `
          <div class="chat-avatar">🤖</div>
          <div class="chat-name">AI Assistant</div>
        `;
      }
    }
  });
  
  // Profile form
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Profile updated successfully!');
    });
  }
  
  // Skills and interests input
  const skillsInput = document.getElementById('skills-input');
  const interestsInput = document.getElementById('interests-input');
  
  if (skillsInput) {
    skillsInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const skill = e.target.value.trim();
        if (skill) {
          addSkill(skill);
          e.target.value = '';
        }
      }
    });
  }
  
  if (interestsInput) {
    interestsInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const interest = e.target.value.trim();
        if (interest) {
          addInterest(interest);
          e.target.value = '';
        }
      }
    });
  }
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('show');
    });
  });
  
  // Close modals on background click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('show');
    }
  });
  
  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.show').forEach(modal => {
        modal.classList.remove('show');
      });
    }
  });
});

// Global functions for onclick handlers
window.openCourse = openCourse;
window.enrollCourse = enrollCourse;
window.continueCourse = continueCourse;
window.dropCourse = dropCourse;
window.connectPeer = connectPeer;
window.viewPeerProfile = viewPeerProfile;
window.startChat = startChat;
window.removeSkill = removeSkill;
window.removeInterest = removeInterest;