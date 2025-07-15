import { Alert, AlertTitle } from './ui/alert';

interface AlertProps {
  error?: string;
  className?: string;
}

export function AlertError({ error, className }: AlertProps) {
  return (
    <Alert className={`${className}`} variant={'destructive'}>
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  );
}
