import { Calendar, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface movieProps {
  filme: {
    id: number;
    link_cover: string;
    title: string;
    release_year: number;
    category?: { name: string };
  };
}

export default function Movie({ filme }: movieProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative p-0">
        <div className="relative h-72 w-full overflow-hidden rounded-t-lg bg-muted">
          <Image
            alt={filme.title}
            className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
            fill
            sizes="(max-width: 500px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={filme.link_cover}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Category badge */}
          {filme.category?.name && (
            <Badge
              className="absolute top-2 left-2 border-0 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/40"
              variant="secondary"
            >
              {filme.category.name}
            </Badge>
          )}

          {/* Play button overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              asChild
              className="rounded-full border-2 border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30"
              size="lg"
            >
              <Link href={`/movie/${filme.id}`}>
                <Play className="ml-1 h-6 w-6" fill="currentColor" />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="max-w-48 p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 font-semibold text-lg leading-tight transition-colors duration-200 group-hover:text-primary">
            {filme.title}
          </h3>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="h-4 w-4" />
            <span>{filme.release_year}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full transition-colors duration-200 group-hover:bg-primary/10"
          variant="ghost"
        >
          <Link href={`/movie/${filme.id}`}>
            <Play className="mr-2 h-4 w-4" />
            Assistir Agora
          </Link>
        </Button>
      </CardFooter>

      {/* Subtle glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  );
}
