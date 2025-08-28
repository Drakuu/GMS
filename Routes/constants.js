// lib/constants.js
export const ROLES = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  TRAINER: "Trainer",
  MEMBER: "Member"
};

export const ROLE_PREFIXES = {
  [ROLES.SUPER_ADMIN]: 'super-admin',
  [ROLES.ADMIN]: 'admin',
  [ROLES.TRAINER]: 'trainer',
  [ROLES.MEMBER]: 'member'
};

// export const PERMISSIONS = {
//   [ROLES.SUPER_ADMIN]: ['*'],
//   [ROLES.ADMIN]: ['dashboard', 'users', 'settings'],
//   [ROLES.USER]: ['dashboard', 'profile']
// };