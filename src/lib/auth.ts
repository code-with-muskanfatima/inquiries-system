export async function authenticateUser(email: string, password: string) {
  if (email && password) {
    return { success: true };
  } else {
    return { success: false };
  }
}
