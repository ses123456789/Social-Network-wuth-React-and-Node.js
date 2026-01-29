type TokenPayload = {
  username: string;
};

export const getLoggedUser = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as TokenPayload;
    return payload.username;
  } catch {
    return null;
  }
};
