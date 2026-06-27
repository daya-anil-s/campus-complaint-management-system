// src/utils/auth.js

export function getCurrentUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearCurrentUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function getRoleLabel(role) {
  if (!role) return "";

  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}