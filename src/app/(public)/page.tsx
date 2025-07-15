'use client';
import { motion } from 'framer-motion';
import { Film, Heart, Play, Search, Sparkles, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import useAuth from '@/auth/checkAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Landing() {
  useAuth();

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Favoritos',
      description:
        'Você pode marcar seus filmes como favoritos para ficar mais fácil de encontrá-los',
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: 'Qualidade',
      description:
        'No MCPFlix, você pode contar com uma ótima qualidade de imagem e som dos filmes',
    },
    {
      icon: <Search className="h-8 w-8 text-blue-500" />,
      title: 'Pesquisa',
      description: 'Pesquisa rápida por gênero ou pelo nome do filme',
    },
  ];

  const highlights = [
    {
      icon: <Sparkles className="h-12 w-12 text-purple-500" />,
      title: 'UI/UX',
      subtitle: 'Interface limpa e intuitiva',
      description: 'Responsiva com mobile',
    },
    {
      icon: <Film className="h-12 w-12 text-green-500" />,
      title: 'Conteúdo',
      subtitle:
        'Desfrute de inúmeros filmes feitos pelos alunos da MCPF gratuitamente',
      description: '',
    },
    {
      icon: <Users className="h-12 w-12 text-orange-500" />,
      title: 'Centralizado',
      subtitle: 'Filmes reunidos em só um lugar para você',
      description: '',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Navigation */}
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg"
        initial={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                alt="MCPFlix Logo"
                className="h-8 w-auto"
                height={40}
                src="logo_mcpflix.svg"
                width={150}
              />
              <Link
                href="https://github.com/GuilhermmeDev/mcpflix_project"
                target="_blank"
              >
                <Badge className="hidden sm:inline-flex" variant="secondary">
                  <Play className="mr-1 h-3 w-3" />
                  Open Source
                </Badge>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Registrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypeAnimation
              className="mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text font-bold text-4xl text-transparent sm:text-5xl lg:text-6xl"
              sequence={['Lugar onde o cinema da MCPF ganha vida.']}
              speed={1}
            />

            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
              Um projeto open-source que exibe gratuitamente as obras das turmas
              da Maria Célia Pinheiro Falcão
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild className="px-8 py-6 text-lg" size="lg">
                <Link href="/login">
                  <Play className="mr-2 h-5 w-5" />
                  Comece agora
                </Link>
              </Button>
              <Button className="px-8 py-6 text-lg" size="lg" variant="outline">
                <Film className="mr-2 h-5 w-5" />
                Explorar Filmes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="grid items-center gap-12 lg:grid-cols-2"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-8">
              {highlights.map((highlight, index) => (
                <Card
                  className="border-0 bg-card/50 shadow-lg backdrop-blur-sm"
                  key={index}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start space-x-4">
                      {highlight.icon}
                      <div>
                        <CardTitle className="mb-2 text-2xl">
                          {highlight.title}
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground">
                          {highlight.subtitle}
                        </CardDescription>
                        {highlight.description && (
                          <p className="mt-1 text-muted-foreground text-sm">
                            {highlight.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    alt="MCPFlix Dashboard Preview"
                    className="h-auto w-full rounded-lg"
                    height={600}
                    src="dashboard_photo.svg"
                    width={800}
                  />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Separator className="my-16" />
      </div>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="mb-4 font-bold text-4xl sm:text-5xl">Features</h2>
            <p className="text-muted-foreground text-xl">
              Descubra o que torna o MCPFlix especial
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                key={index}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="h-full border-0 bg-card/50 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="mb-2 text-2xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Card className="border-0 bg-gradient-to-r from-primary/10 to-secondary/10 shadow-2xl backdrop-blur-sm">
              <CardContent className="p-12">
                <h2 className="mb-6 font-bold text-3xl sm:text-4xl">
                  Pronto para descobrir novos filmes?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                  Junte-se à comunidade MCPFlix e explore o talento
                  cinematográfico dos alunos da MCPF
                </p>
                <Button asChild className="px-8 py-6 text-lg" size="lg">
                  <Link href="/register">
                    <Play className="mr-2 h-5 w-5" />
                    Criar Conta Gratuita
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <div className="pb-20" />
    </div>
  );
}
