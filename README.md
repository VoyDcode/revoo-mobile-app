# Revoo – Hábitos, Metas e Bem-Estar no Futuro do Trabalho

## 🎯 Contexto – Global Solution 2025/2

Este projeto foi desenvolvido como parte da **Global Solution 2025/2** do 2º ano de Análise e Desenvolvimento de Sistemas (Turmas de Agosto – FIAP), cujo tema é **“O Futuro do Trabalho”**.  

O desafio proposto é criar uma solução que utilize **tecnologia e inovação** para:

- Melhorar a vida das pessoas no contexto de trabalho;
- Preparar organizações para novos tempos;
- Criar oportunidades **mais justas, inclusivas e sustentáveis**. :contentReference[oaicite:1]{index=1}  

A solução deve dialogar com tendências como:

- Automação, IA e reskilling contínuo;
- Saúde mental e bem-estar no trabalho;
- Modelos híbridos/remotos e flexíveis;
- Inclusão produtiva e redução de desigualdades.

## 💡 Visão Geral da Solução

**Revoo** é uma plataforma focada em **hábitos, metas semanais e registro de progresso**, com gamificação leve, pensada para:

- **Colaboradores**: criarem e acompanharem hábitos saudáveis (pausas, atividade física, foco, estudo, sono, etc.);
- **Gestores/Organizações**: estimularem bem-estar, produtividade sustentável e engajamento de equipes;
- **Futuro do Trabalho**: apoiar a construção de rotinas saudáveis em cenários híbridos, remotos e de alta transformação tecnológica.

Funcionalidades principais:

- Cadastro e gerenciamento de **hábitos**;
- Definição de **metas semanais** ligadas a hábitos;
- **Registro de progresso** diário (quantidade, data, observações);
- Integração entre **API Java**, **Banco Oracle** e **App Mobile React Native**;
- Possibilidade de integração com **IoT** (sensores de ambiente, pausas, ergonomia, etc.) e **dashboards**.

## 🌍 Conexão com os ODS da ONU

A solução se alinha diretamente aos Objetivos de Desenvolvimento Sustentável:

- **ODS 8** – Trabalho decente e crescimento econômico;  
- **ODS 4** – Educação de qualidade (requalificação e aprendizado contínuo);  
- **ODS 10** – Redução das desigualdades;  
- **ODS 9** – Indústria, inovação e infraestrutura. :contentReference[oaicite:2]{index=2}  

---

## 👥 Equipe

- Victor Rodrigues De Lima Lourenco – RM560087 
- Renato Silva Alexandre Bezerra – RM560928

> Atualize com os nomes e RMs reais do grupo.

---

## 🧱 Arquitetura Geral da Solução

A solução completa da Global Solution é composta por:

- **Backend (Java Advanced)**  
  - API REST com **Spring Boot**  
  - Persistência com **Spring Data JPA** em banco relacional (**Oracle**)  
  - Mapeamento entre entidades: `Colaborador`, `Habito`, `MetaSemanal`, `RegistroProgresso`, etc.  
  - Validações com Bean Validation  
  - Paginação, ordenação e filtros  
  - Documentação com Swagger  
  - Autenticação com **JWT**  
  - Deploy em nuvem (ex.: Azure)

- **Aplicativo Mobile (Mobile Application Development)**  
  - Desenvolvido em **React Native** com **Expo**  
  - Uso de **Expo Router** ou React Navigation para navegação  
  - CRUD completo consumindo a API Java:  
    - Hábitos  
    - Metas Semanais  
    - Registros de Progresso  
  - Estilização com identidade visual própria (cores, fontes, imagens)  
  - Organização em pastas: `app/`, `components/`, `lib/`, etc.

- **Banco de Dados (Mastering Relational and Non-Relational Database)**  
  - Modelo lógico e físico em **3FN**  
  - Implementação em **Oracle**  
  - Criação de tabelas, PK/FK, índices  
  - **Procedures** para INSERT/UPDATE/DELETE  
  - **Funções** para cálculos e validações de dados  
  - Integração da aplicação (Java ou .NET) chamando procedures

- **DevOps & Cloud (DevOps Tools & Cloud Computing)**  
  - Ambiente em **Azure** com duas VMs:  
    - VM Windows: ambiente de desenvolvimento/app (frontend/API)  
    - VM Linux: banco de dados / serviços de backend  
  - Configuração de Resource Group, VNet, NSG, regras de acesso (SSH/RDP/DB)  
  - Execução do app direto na nuvem, com persistência real no banco.

- **IoT / IOB / Generative IA (Disruptive Architectures)**  
  - Protótipo IoT (Arduino/ESP32 ou simulado no Wokwi)  
  - Coleta de dados relacionados ao trabalho (ex.: pausas, ambiente, ergonomia)  
  - Uso de MQTT/HTTP + Node-RED / ThingSpeak como gateway  
  - Dashboard para visualização em tempo real e possível integração com o backend.

- **Compliance & Quality Assurance**  
  - Arquitetura da solução baseada em **TOGAF** (modelada no ARCHI)  
  - Visão de negócio, dados, aplicações e tecnologia  
  - Documento de apresentação com stakeholders, objetivos, público-alvo e impacto.

---

## 📱 Repositório Mobile – Estrutura (Exemplo)

> Caso este README esteja no repositório **Mobile**, você pode detalhar assim:

### Tecnologias Utilizadas

- **React Native** (Expo)
- **TypeScript**
- **Expo Router** para navegação
- **Axios** para consumo da API
- **AsyncStorage** para armazenamento do token JWT

### Estrutura de Pastas

```text
app/
  _layout.tsx         # Layout raiz (Stack)
  index.tsx           # Home / Dashboard
  login.tsx           # Tela de login
  habitos/
    index.tsx         # Lista de hábitos
    novo.tsx          # Cadastro de hábito
    editar.tsx        # Edição de hábito
  metas/
    index.tsx         # Lista de metas semanais
    novo.tsx          # Cadastro de meta semanal
  progresso/
    index.tsx         # Registro de progresso
components/
  ui/
    Button.tsx
    Input.tsx
lib/
  api.ts              # Configuração Axios (baseURL + JWT)
