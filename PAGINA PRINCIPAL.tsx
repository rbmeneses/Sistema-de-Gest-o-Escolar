import React, { useState } from 'react';
import { 
  Menu,
  Save,
  File,
  Clock,
  Building2,
  Layout,
  Plus,
  FolderOpen,
  History,
  Settings,
  BookOpen,
  Tag,
  Users,
  User,
  Calendar,
  List,
  Grid,
  Printer,
  AlertTriangle,
  Lock
} from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const AppHeader = () => (
  <div className="bg-primary text-primary-foreground p-4">
    <h1 className="text-2xl font-bold">Sistema de Gestão Escolar</h1>
  </div>
);

const TabButton = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg w-full text-left">
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

const FileTab = () => (
  <div className="space-y-2">
    <TabButton icon={Plus} label="Novo" />
    <TabButton icon={FolderOpen} label="Abrir" />
    <TabButton icon={History} label="Recente" />
    <TabButton icon={Save} label="Salvar" />
    <TabButton icon={Save} label="Salvar como" />
  </div>
);

const DataTab = () => (
  <div className="space-y-2">
    <TabButton icon={Settings} label="Básico" />
    <TabButton icon={BookOpen} label="Disciplinas" />
    <TabButton icon={Tag} label="Marcadores" />
    <TabButton icon={Users} label="Professores" />
    <TabButton icon={User} label="Alunos" />
    <TabButton icon={Building2} label="Espaços" />
    <TabButton icon={Calendar} label="Atividades" />
    <TabButton icon={List} label="Subatividades" />
    <TabButton icon={Settings} label="Avançado" />
  </div>
);

const TimeTab = () => (
  <div className="space-y-2">
    <TabButton icon={Clock} label="Todos" />
    <TabButton icon={Clock} label="Intervalos" />
    <TabButton icon={Users} label="Professores" />
    <TabButton icon={User} label="Alunos" />
    <TabButton icon={Calendar} label="Atividades" />
    <TabButton icon={Settings} label="Avançado" />
  </div>
);

const SpacesTab = () => (
  <div className="space-y-2">
    <TabButton icon={Building2} label="Todos" />
    <TabButton icon={BookOpen} label="Disciplinas" />
    <TabButton icon={Tag} label="Marcadores" />
    <TabButton icon={Users} label="Professores" />
    <TabButton icon={User} label="Alunos" />
    <TabButton icon={Building2} label="Salas" />
    <TabButton icon={Calendar} label="Atividades" />
    <TabButton icon={Tag} label="Disciplinas e marcadores" />
  </div>
);

const GridTab = () => (
  <div className="space-y-2">
    <TabButton icon={Grid} label="Gerar" />
    <TabButton icon={Layout} label="Múltiplos" />
    <TabButton icon={AlertTriangle} label="Conflitos" />
    <TabButton icon={Users} label="Professores" />
    <TabButton icon={User} label="Alunos" />
    <TabButton icon={Building2} label="Salas" />
    <TabButton icon={Printer} label="Imprimir" />
    <TabButton icon={Lock} label="Bloqueio" />
    <TabButton icon={Settings} label="Avançado" />
  </div>
);

const NotificationPanel = () => (
  <div className="fixed bottom-4 right-4 w-80">
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Atenção</AlertTitle>
      <AlertDescription>
        Existem conflitos de horário que precisam ser resolvidos.
      </AlertDescription>
    </Alert>
  </div>
);

const MainContent = () => (
  <Card className="m-4">
    <CardHeader>
      <CardTitle>Bem-vindo ao Sistema de Gestão Escolar</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Selecione uma opção nas abas para começar.</p>
    </CardContent>
  </Card>
);

const SchoolManagementApp = () => {
  const [showNotification] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <Tabs defaultValue="arquivo" className="w-64 border-r bg-white">
          <TabsList className="w-full justify-start flex-col h-auto">
            <TabsTrigger value="arquivo" className="w-full">
              <File className="w-4 h-4 mr-2" />
              Arquivo
            </TabsTrigger>
            <TabsTrigger value="dados" className="w-full">
              <Menu className="w-4 h-4 mr-2" />
              Dados
            </TabsTrigger>
            <TabsTrigger value="tempo" className="w-full">
              <Clock className="w-4 h-4 mr-2" />
              Tempo
            </TabsTrigger>
            <TabsTrigger value="espacos" className="w-full">
              <Building2 className="w-4 h-4 mr-2" />
              Espaços
            </TabsTrigger>
            <TabsTrigger value="grade" className="w-full">
              <Grid className="w-4 h-4 mr-2" />
              Grade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="arquivo" className="m-0 p-2">
            <FileTab />
          </TabsContent>
          <TabsContent value="dados" className="m-0 p-2">
            <DataTab />
          </TabsContent>
          <TabsContent value="tempo" className="m-0 p-2">
            <TimeTab />
          </TabsContent>
          <TabsContent value="espacos" className="m-0 p-2">
            <SpacesTab />
          </TabsContent>
          <TabsContent value="grade" className="m-0 p-2">
            <GridTab />
          </TabsContent>
        </Tabs>

        <div className="flex-1 overflow-auto">
          <MainContent />
        </div>
      </div>

      {showNotification && <NotificationPanel />}
    </div>
  );
};

export default SchoolManagementApp;
