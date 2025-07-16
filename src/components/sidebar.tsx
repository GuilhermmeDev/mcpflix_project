import { Heart, Home, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserInfo } from '@/auth/useUserInfo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SideItemProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isBeta?: boolean;
}

function SideItem({ name, path, icon, isActive, isBeta }: SideItemProps) {
  return (
    <Button
      asChild
      className={`w-full justify-start gap-3 transition-all duration-200 hover:scale-105 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'hover:bg-muted/50'
      }`}
      variant={isActive ? 'default' : 'ghost'}
    >
      <Link href={path}>
        <span className="flex-shrink-0">{icon}</span>
        <span className="hidden truncate font-medium md:block">{name}</span>
        {isBeta && <Badge variant={'secondary'}>BETA</Badge>}
      </Link>
    </Button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { name, email, favs } = useUserInfo();

  const navigationItems = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'Favoritos',
      path: '/fav',
      icon: <Heart className="h-5 w-5" />,
    },
  ];

  const bottomItems = [
    {
      name: 'Perfil',
      path: '/dev/profile',
      icon: <User className="h-5 w-5" />,
    },
    {
      name: 'Configurações',
      path: '/dev/config',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <Card className="-translate-x-1/2 fixed bottom-4 left-1/2 z-50 transform border-0 bg-card/80 shadow-2xl backdrop-blur-lg md:hidden">
        <div className="flex min-w-80 items-center justify-around p-2">
          {navigationItems.slice(0, 4).map((item) => (
            <Button
              asChild
              className={`h-12 w-16 flex-col gap-1 transition-all duration-200 ${
                pathname === item.path
                  ? 'scale-105 bg-primary text-primary-foreground'
                  : 'hover:bg-muted/50'
              }`}
              key={item.path}
              size="sm"
              variant={pathname === item.path ? 'default' : 'ghost'}
            >
              <Link href={item.path}>
                {item.icon}
                <span className="truncate font-medium text-xs">
                  {item.name}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </Card>

      {/* Desktop Sidebar */}
      <Card className="fixed top-4 bottom-4 left-4 z-40 hidden w-64 border-0 bg-card/50 shadow-2xl backdrop-blur-lg md:flex">
        <aside className="flex h-full flex-col p-6">
          {/* Logo Section */}
          <div className="mb-8 flex items-center justify-center">
            <Link className="group flex items-center gap-2" href="/">
              <Image
                alt="MCPFlix Logo"
                className="transition-transform duration-300 group-hover:scale-110"
                height={40}
                src="/logo_mcpflix.svg"
                width={120}
              />
              <Badge className="ml-2 text-xs" variant="secondary">
                v2.0
              </Badge>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            <div className="space-y-1">
              <p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Navegação
              </p>
              {navigationItems.map((item) => (
                <SideItem
                  icon={item.icon}
                  isActive={pathname === item.path}
                  key={item.path}
                  name={item.name}
                  path={item.path}
                />
              ))}
            </div>

            <Separator className="my-6" />

            {/* Bottom Items */}
            <div className="space-y-1">
              <p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Conta
              </p>
              {bottomItems.map((item) => (
                <SideItem
                  icon={item.icon}
                  isActive={pathname === item.path}
                  isBeta={true}
                  key={item.path}
                  name={item.name}
                  path={item.path}
                />
              ))}
            </div>
          </nav>

          {/* User Profile Card */}
          <Card className="mt-auto border-0 bg-muted/30">
            <div className="max-w-48 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">
                    {name || 'User'}
                  </p>
                  <p className="truncate text-muted-foreground text-xs">
                    {email || 'email'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="mt-4 text-center">
            <Card className="border-0 bg-primary/5">
              <div className="p-3 text-center">
                <div className="font-bold text-lg text-primary">{favs}</div>
                <div className="text-muted-foreground text-xs">Favoritos</div>
              </div>
            </Card>
          </div>
        </aside>
      </Card>

      {/* Content Spacer for Desktop */}
      <div className="hidden w-64 flex-shrink-0 md:block" />
    </>
  );
}
