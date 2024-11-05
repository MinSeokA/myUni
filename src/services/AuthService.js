import api from '@/plugins/axios' // 설정된 Axios 인스턴스

export async function login(credentials) {
  try {
    const response = await api.post('/auth/google', credentials)
    const token = response.data.access_token

    if (token) {
      localStorage.setItem('token', token) // 토큰 저장
      console.log('JWT token saved:', token)
    }

    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}
