import { Alert } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DevPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Página em desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4" variant="default">
            Esta página está em construção. Em breve novidades!
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
