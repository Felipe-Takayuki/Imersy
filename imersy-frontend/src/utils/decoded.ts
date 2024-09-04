import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
}