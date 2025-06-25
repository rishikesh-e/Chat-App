export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface PasswordRecoveryBody {
  email: string;
}

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordHandler {
  email: string;
  newPassword: string;
}

export interface OtpHandlerBody {
  email: string;
  otp: string;
}
