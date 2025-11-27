import { MOCK_USERS } from '../constants';
import { User } from '../types';

export const login = async (email: string): Promise<{ success: boolean; user?: User; message?: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  // Requirement 2: Validate that the manager has a department assigned
  if (user.role === 'manager' && !user.department) {
    return { success: false, message: 'Configuration Error: Manager has no department assigned. Please contact admin.' };
  }

  return { success: true, user };
};
