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
export enum menuItemStatus {
  Available,
  Unavailable
}
export enum notificationRoleType {
  All,
  Admin,
  Employee
}
export enum NotificationType {
  OrderCreated,
  OrderUpdated,
  OrderCompleted,
  OrderCancelled,
  ItemAdded,
  ItemUpdated,
  ItemRemoved,
  EmployeeAssigned,
  EmployeeRemoved
}

export enum NotificationStatus {
  Unread,
  Read
}
export enum ChangeType {
  Add,
  Remove,
  Update
}
export enum permissionType {
  Dashboard,
  Menu,
  Staff,
  Inventory,
  Order,
  Settings
}
export enum TagType {
  Nomarl,
  Special,
  New
}
export enum PositionEmployeeType {
  Waiter, // Nhân viên phục vụ
  Cashier, // Nhân viên thu ngân
  Chef, // Nhân viên bếp
  Cleaner, // Nhân viên dọn dẹp
  Manager, // Quản lý
  Security // Nhân viên bảo vệ
}
