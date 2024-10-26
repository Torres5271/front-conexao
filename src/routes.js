import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import Inicio from "./pages/inicio/Inicio";
import Perfil from "./pages/perfil/Perfil";
import EditarPerfil from "./pages/editar-perfil/EditarPerfil";
import Servicos from "./pages/servicos/Servicos";
import Clientes from "./pages/clientes/Clientes";
import AdicionarServico from './pages/adicionar-servico/AdicionarServico';
import Equipe from "./pages/minha-equipe/MinhaEquipe";
import AdicionarFuncionario from "./pages/adicionar-funcionarios/AdicionarFuncionario";
import AdicionarAgendamento from "./pages/adicionar-agendamento/AdicionarAgendamento";
import Agenda from "./pages/agenda/Agenda";
import EditarEmpresa from "./pages/editar-empresa/EditarEmpresa";
import EditarDiasFuncionamento from "./pages/editar-dias-funcionamento/EditarDiasFuncionamento";
import Dashboard from "./pages/dashboard/Dashboard";
import PerfilEstatistica from "./pages/perfil-funcionario-historico/PerfilEstatistica";
import RelatorioAgendamentos from "./pages/relatorio-agendamentos/RelatorioAgendamentos";

function Rotas() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="login" element={<Login />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="servicos/adicionar" element={<AdicionarServico />} />
          <Route path="servicos/editar/:idServico" element={<AdicionarServico />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="usuario/editar/:idUser" element={<EditarPerfil />} />
          <Route path="empresa/editar/:idEmpresa" element={<EditarEmpresa />} />
          <Route path="dias-funcionamento/editar/:idEmpresa" element={<EditarDiasFuncionamento />} />
          <Route path="equipe" element={<Equipe/>}/>
          <Route path="equipe/estatistica/:idProfissional" element={<PerfilEstatistica/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="profissional/adicionar" element={<AdicionarFuncionario/>}/>
          <Route path="profissional/editar/:idProfissional" element={<AdicionarFuncionario/>}/>
          <Route path="agenda" element={<Agenda/>} />
          <Route path="agenda/adicionar" element={<AdicionarAgendamento/>}/>
          <Route path="agenda/editar/:idAgenda" element={<AdicionarAgendamento />} />
          <Route path="agenda/relatorio" element={<RelatorioAgendamentos/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Rotas;
