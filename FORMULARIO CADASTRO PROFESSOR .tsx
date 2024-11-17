import React, { useState } from 'react';
import { 
  Save,
  Plus,
  Trash2,
  Search,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const TeacherRegistration = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    registration: '',
    subjects: [],
    workload: '',
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    status: 'active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  const subjects = [
    "Matemática",
    "Português",
    "História",
    "Geografia",
    "Ciências",
    "Física",
    "Química",
    "Educação Física",
    "Artes",
    "Inglês"
  ];

  const timeSlots = [
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectsChange = (selectedSubjects) => {
    setFormData(prev => ({
      ...prev,
      subjects: selectedSubjects
    }));
  };

  const handleAvailabilityChange = (day, slot) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: prev.availability[day].includes(slot)
          ? prev.availability[day].filter(s => s !== slot)
          : [...prev.availability[day], slot]
      }
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.registration) {
      setAlert({
        type: 'error',
        message: 'Por favor, preencha todos os campos obrigatórios.'
      });
      return false;
    }
    if (!formData.subjects.length) {
      setAlert({
        type: 'error',
        message: 'Selecione pelo menos uma disciplina.'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTeacher = {
      ...formData,
      id: formData.id || Date.now().toString()
    };

    setTeachers(prev => {
      const index = prev.findIndex(t => t.id === newTeacher.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = newTeacher;
        return updated;
      }
      return [...prev, newTeacher];
    });

    setAlert({
      type: 'success',
      message: 'Professor salvo com sucesso!'
    });

    // Reset form
    setFormData({
      id: '',
      name: '',
      email: '',
      phone: '',
      registration: '',
      subjects: [],
      workload: '',
      availability: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
      },
      status: 'active'
    });
  };

  const handleEdit = (teacher) => {
    setFormData(teacher);
  };

  const handleDelete = (id) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
    setAlert({
      type: 'success',
      message: 'Professor removido com sucesso!'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex gap-6">
        {/* Formulário */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Cadastro de Professor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campos básicos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Matrícula *</label>
                  <input
                    type="text"
                    name="registration"
                    value={formData.registration}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Disciplinas e Carga Horária */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disciplinas *</label>
                  <Select
                    value={formData.subjects}
                    onValueChange={handleSubjectsChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione as disciplinas" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Carga Horária Semanal</label>
                  <input
                    type="number"
                    name="workload"
                    value={formData.workload}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    min="0"
                    max="40"
                  />
                </div>
              </div>

              {/* Disponibilidade */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Disponibilidade</label>
                <div className="grid grid-cols-5 gap-4">
                  {Object.keys(formData.availability).map(day => (
                    <div key={day} className="space-y-2">
                      <h4 className="font-medium capitalize">{day}</h4>
                      {timeSlots.map(slot => (
                        <label key={slot} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.availability[day].includes(slot)}
                            onChange={() => handleAvailabilityChange(day, slot)}
                            className="rounded"
                          />
                          <span className="text-sm">{slot}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <button
              type="button"
              onClick={() => setFormData({
                id: '',
                name: '',
                email: '',
                phone: '',
                registration: '',
                subjects: [],
                workload: '',
                availability: {
                  monday: [],
                  tuesday: [],
                  wednesday: [],
                  thursday: [],
                  friday: []
                },
                status: 'active'
              })}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Limpar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>
          </CardFooter>
        </Card>

        {/* Lista de Professores */}
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Professores Cadastrados</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar professor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 p-2 border rounded"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers
                    .filter(teacher => 
                      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(teacher => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(teacher)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(teacher.id)}
                              className="p-1 hover:bg-gray-100 rounded text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {alert && (
        <Alert className="fixed bottom-4 right-4 w-96" variant={alert.type === 'error' ? 'destructive' : 'default'}>
          {alert.type === 'error' ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default TeacherRegistration;
