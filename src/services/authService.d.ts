declare module '@/services/authService' {
    const authService: {
      register(user: { email: string, password: string, role: string }): Promise<any>;
      login(user: { email: string, password: string }): Promise<any>;
      logout(): void;
    };
  
    export default authService;
  }
  