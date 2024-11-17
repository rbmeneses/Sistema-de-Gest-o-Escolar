import React, { useState } from 'react';
import { 
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Filter,
  Eye,
  Loader2
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ScheduleGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedView, setSelectedView] = useState('class'); // class, teacher, room
  const [conflicts, setConflicts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  // Dados de exemplo
  const timeSlots = [
    "07:00 - 07:50",
    "07:50 - 08:40",
    "08:40 - 09:30",
    "09:50 - 10:40",
    "10:40 - 11:30"
  ];

  const weekDays = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta"
  ];

  const classes = [
    "1º Ano A",
    "1º Ano B",
    "2º Ano A",
    "2º Ano B",
    "3º Ano A"
  ];

  // Configurações de geração
  const [settings, setSettings] = useState({
    maxDailyClasses: 5,
    avoidConsecutiveSubjects: true,
    respectTeacherAvailability: true,
    allowEmptySlots: false,
    prioritizeTeacherPreferences: true,
    maxIterations: 1000
  });

  const handleGenerateSchedule = () => {
    setGenerating(true);
    setProgress(0);
    setAlert(null);

    // Simulação do processo de geração
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setCurrentSchedule(generateSampleSchedule());
          setConflicts(generateSampleConflicts());
          setAlert({
            type: 'success',
            message: 'Horário gerado com sucesso! Verifique os possíveis conflitos.'
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const generateSampleSchedule = () => {
    // Gera uma grade de horários de exemplo
    const schedule = {};
    classes.forEach(className => {
      schedule[className] = {};
      weekDays.forEach(day => {
        schedule[className][day] = timeSlots.map(() => ({
          subject: ["Matemática", "Português", "História", "Geografia", "Física"][
            Math.floor(Math.random() * 5)
          ],
          teacher: `Professor ${Math.floor(Math.random() * 5) + 1}`,
          room: `Sala ${Math.floor(Math.random() * 10) + 101}`
        }));
      });
    });
    return schedule;
  };

  const generateSampleConflicts = () => {
    // Gera conflitos de exemplo
    return [
      {
        type: 'teacher',
        description: 'Professor João tem aulas simultâneas na Segunda-feira, 07:00',
        severity: 'high'
      },
      {
        type: 'room',
        description: 'Sala 101 alocada para duas turmas na Quarta-feira, 10:40',
        severity: 'medium'
      }
    ];
  };

  const ScheduleTable = ({ data, className }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Horário</TableHead>
          {weekDays.map(day => (
            <TableHead key={day}>{day}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeSlots.map((slot, slotIndex) => (
          <TableRow key={slot}>
            <TableCell className="font-medium">{slot}</TableCell>
            {weekDays.map(day => {
              const cell = data?.[className]?.[day]?.[slotIndex];
              return (
                <TableCell key={day} className="p-0">
                  {cell && (
                    <div className="p-2 h-full">
                      <div className="font-medium">{cell.subject}</div>
                      <div className="text-sm text-gray-500">{cell.teacher}</div>
                      <div className="text-sm text-gray-500">{cell.room}</div>
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Controles */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Gerador de Horários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Visualizar</label>
                <Select value={selectedView} onValueChange={setSelectedView}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a visualização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Por Turma</SelectItem>
                    <SelectItem value="teacher">Por Professor</SelectItem>
                    <SelectItem value="room">Por Sala</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Turma</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {classes.map(className => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => handleGenerateSchedule()}
                  disabled={generating}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Gerar Horários
                    </>
                  )}
                </button>
              </div>
            </div>

            {generating && (
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-primary rounded transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-sm text-center mt-2">
                  Gerando horários... {progress}%
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.avoidConsecutiveSubjects}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      avoidConsecutiveSubjects: e.target.checked
                    }))}
                  />
                  <span>Evitar aulas consecutivas da mesma disciplina</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.respectTeacherAvailability}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      respectTeacherAvailability: e.target.checked
                    }))}
                  />
                  <span>Respeitar disponibilidade dos professores</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.allowEmptySlots}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      allowEmptySlots: e.target.checked
                    }))}
                  />
                  <span>Permitir horários vazios</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Máximo de aulas diárias
                </label>
                <input
                  type="number"
                  value={settings.maxDailyClasses}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    maxDailyClasses: parseInt(e.target.value)
                  }))}
                  className="w-full p-2 border rounded"
                  min="1"
                  max="10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grade de Horários */}
      {currentSchedule && (
        <div className="grid grid-cols-1 gap-6">
          {(selectedClass === 'all' ? classes : [selectedClass]).map(className => (
            <Card key={className}>
              <CardHeader>
                <CardTitle>{className}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScheduleTable data={currentSchedule} className={className} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Conflitos */}
      {conflicts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Conflitos Detectados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conflicts.map((conflict, index) => (
                <Alert key={index} variant={conflict.severity === 'high' ? 'destructive' : 'default'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{conflict.description}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alertas */}
      {alert && (
        <Alert 
          className="fixed bottom-4 right-4 w-96"
          variant={alert.type === 'error' ? 'destructive' : 'default'}
        >
          {alert.type === 'error' ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ScheduleGenerator;
