export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
export enum ForgotPasswordVerifyStatus {
  Unverified,
  Verified
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}
export enum RoleType {
  Admin,
  Employee
}
export enum TableStatus {
  Empty,
  Busy
}
export enum OrderStatus {
  Pending,
  Completed,
  Cancelled
}
export enum PaymentStatus {
  Unpaid,
  Paid
}
