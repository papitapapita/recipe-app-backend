declare global {
  namespace Express {
    enum Role {
      Admin = 'admin',
      Customer = 'customer',
      Chef = 'chef'
    }
    interface User {
      id: number;
      email: string;
      role: Role;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
