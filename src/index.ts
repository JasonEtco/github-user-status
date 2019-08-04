import getUserStatus from './get-user-status';
import changeUserStatus from './change-user-status';

export interface UserStatus {
  emoji: string;
  message: string;
  expiresAt?: string;
  indicatesLimitedAvailability?: boolean;
}

async function main(): Promise<UserStatus> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('Missing environment variable `GITHUB_TOKEN`.');
  }

  const args = process.argv.slice(2);
  const setOrUser = args[0];

  if (setOrUser) {
    if (setOrUser === 'set') {
      const remainingArgs = args.slice(1).join(' ');
      const input = { emoji: '👍', message: remainingArgs };
      return changeUserStatus(input, token);
    } else {
      return getUserStatus(token, setOrUser);
    }
  }

  return getUserStatus(token);
}

main().then(status => {
  console.log(status.emoji, status.message);
});
