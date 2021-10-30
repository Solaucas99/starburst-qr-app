import { toast } from 'react-toastify';

type StatusMessage = 'error' | 'success' | 'warn' | 'info';

export default function showToastMessage(
  message: string,
  status: StatusMessage
): void {
  toast[status](message);
}
