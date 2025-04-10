interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface LoginResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type { RegisterResponse, LoginResponse, LoginRequest, RegisterRequest };
