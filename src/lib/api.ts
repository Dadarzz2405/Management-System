// API configuration for connecting to Flask backend
// Update BASE_URL to point to your Python backend server

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'member' | 'ketua' | 'pembina';
  division_id?: number;
}

interface Session {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  division_id?: number;
}

interface Attendance {
  id: number;
  user_id: number;
  session_id: number;
  status: 'hadir' | 'izin' | 'sakit' | 'alpha';
  notes?: string;
  created_at: string;
}

interface Division {
  id: number;
  name: string;
  description?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'An error occurred',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiCall<{ user: User }>('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    apiCall<void>('/api/logout', {
      method: 'POST',
    }),

  getCurrentUser: () => apiCall<User>('/api/me'),

  register: (userData: {
    username: string;
    password: string;
    name: string;
    role?: string;
    division_id?: number;
  }) =>
    apiCall<{ user: User }>('/api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// Users API
export const usersApi = {
  getAll: () => apiCall<User[]>('/api/users'),

  getById: (id: number) => apiCall<User>(`/api/users/${id}`),

  create: (userData: Partial<User> & { password: string }) =>
    apiCall<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  update: (id: number, userData: Partial<User>) =>
    apiCall<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  delete: (id: number) =>
    apiCall<void>(`/api/users/${id}`, {
      method: 'DELETE',
    }),
};

// Sessions API
export const sessionsApi = {
  getAll: () => apiCall<Session[]>('/api/sessions'),

  getById: (id: number) => apiCall<Session>(`/api/sessions/${id}`),

  create: (sessionData: Partial<Session>) =>
    apiCall<Session>('/api/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    }),

  update: (id: number, sessionData: Partial<Session>) =>
    apiCall<Session>(`/api/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sessionData),
    }),

  delete: (id: number) =>
    apiCall<void>(`/api/sessions/${id}`, {
      method: 'DELETE',
    }),
};

// Attendance API
export const attendanceApi = {
  getAll: () => apiCall<Attendance[]>('/api/attendance'),

  getBySession: (sessionId: number) =>
    apiCall<Attendance[]>(`/api/attendance/session/${sessionId}`),

  getByUser: (userId: number) =>
    apiCall<Attendance[]>(`/api/attendance/user/${userId}`),

  mark: (attendanceData: {
    session_id: number;
    user_id: number;
    status: string;
    notes?: string;
  }) =>
    apiCall<Attendance>('/api/attendance', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    }),

  update: (id: number, attendanceData: Partial<Attendance>) =>
    apiCall<Attendance>(`/api/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(attendanceData),
    }),
};

// Divisions API
export const divisionsApi = {
  getAll: () => apiCall<Division[]>('/api/divisions'),

  getById: (id: number) => apiCall<Division>(`/api/divisions/${id}`),

  create: (divisionData: Partial<Division>) =>
    apiCall<Division>('/api/divisions', {
      method: 'POST',
      body: JSON.stringify(divisionData),
    }),

  update: (id: number, divisionData: Partial<Division>) =>
    apiCall<Division>(`/api/divisions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(divisionData),
    }),

  delete: (id: number) =>
    apiCall<void>(`/api/divisions/${id}`, {
      method: 'DELETE',
    }),
};

// Dashboard stats API
export const dashboardApi = {
  getStats: () =>
    apiCall<{
      totalMembers: number;
      totalSessions: number;
      upcomingSessions: number;
      attendanceRate: number;
    }>('/api/dashboard/stats'),
};

export type { User, Session, Attendance, Division, ApiResponse };
