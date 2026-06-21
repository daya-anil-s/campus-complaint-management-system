export const AUTH_USER_KEY = "ccmsUser";
export const REGISTERED_USERS_KEY = "ccmsUsers";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export function getCurrentUser() {
  const user = readJson(AUTH_USER_KEY, null);

  if (!user?.email || !user?.role) return null;

  return {
    name: user.name || "",
    email: user.email,
    role: user.role,
  };
}

export function setCurrentUser(user) {
  const frontendUser = {
    name: user.name?.trim() || "",
    email: user.email.trim().toLowerCase(),
    role: user.role,
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(frontendUser));
  return frontendUser;
}

export function getRegisteredUsers() {
  const users = readJson(REGISTERED_USERS_KEY, []);
  return Array.isArray(users) ? users : [];
}

export function saveRegisteredUser(user) {
  const frontendUser = setCurrentUser(user);
  const users = getRegisteredUsers();
  const existingIndex = users.findIndex(
    (item) =>
      item.email?.toLowerCase() === frontendUser.email &&
      item.role === frontendUser.role,
  );

  if (existingIndex >= 0) users[existingIndex] = frontendUser;
  else users.push(frontendUser);

  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  return frontendUser;
}

export function findRegisteredUser(email, role) {
  const normalizedEmail = email.trim().toLowerCase();
  return getRegisteredUsers().find(
    (user) => user.email?.toLowerCase() === normalizedEmail && user.role === role,
  );
}

export function clearCurrentUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}
