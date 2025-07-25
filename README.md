# 🎬 Front-end Challenge - Comerc

Interface de gerenciamento de uma locadora de filmes, desenvolvida com **Vue 3**, **TypeScript** e **Tailwind CSS**, consumindo a API pública da **OMDb**.  
O projeto atende aos requisitos definidos no desafio técnico, com foco em responsividade, componentização e clean code.

---

## 🚀 Tecnologias e Ferramentas

| Tecnologia    | Descrição                                   |
| ------------- | ------------------------------------------- |
| Vue 3         | Framework JavaScript progressivo            |
| TypeScript    | Superset do JavaScript com tipagem estática |
| Tailwind CSS  | Framework utilitário para estilização       |
| Pinia         | Gerenciamento de estado                     |
| Vue Router    | Roteamento SPA                              |
| Axios         | Requisições HTTP                            |
| Vue The Mask  | Máscaras para inputs                        |
| Vue Toastify  | Toasts para feedbacks visuais               |
| OMDb API      | Base de dados pública de filmes             |
| ViaCEP        | Consulta de endereços por CEP               |
| Jest          | Framework de testes                         |
| Docker        | Containerização                             |
| Atomic Design | Organização baseada em átomos/componentes   |

---

## 🔧 Configuração de Ambiente

### 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_URL=https://www.omdbapi.com/
VITE_API_KEY=sua_chave_aqui  # Obtenha sua chave em https://www.omdbapi.com/apikey.aspx
VITE_API_ZIPCODE=https://viacep.com.br/ws/
```

---

## 📦 Instalação e Execução Local

### ✅ Pré-requisitos

| Requisito | Versão mínima | Como verificar     |
| --------- | ------------- | ------------------ |
| Node.js   | >= 20         | `node -v`          |
| Yarn      | >= 1.22       | `yarn -v`          |
| npm       | >= 9.x        | `npm -v`           |
| Docker    | >= 24         | `docker --version` |

---

### 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/LeonardoToledo0/front-end_charllenge-comerc.git
cd front-end_charllenge-comerc
```

---

### ▶️ Execução Local

| Ambiente | Comando           | Acesso                |
| -------- | ----------------- | --------------------- |
| Dev      | `yarn dev`        | http://localhost:5173 |
|          | `npm run dev`     | http://localhost:5173 |
| Preview  | `yarn preview`    | http://localhost:4173 |
|          | `npm run preview` | http://localhost:4173 |
| Build    | `yarn build`      | Arquivos em `/dist`   |
|          | `npm run build`   | Arquivos em `/dist`   |

---

### 🐳 Rodando com Docker

| Etapa           | Comando                                                     |
| --------------- | ----------------------------------------------------------- |
| Build da imagem | `docker build -t comerc-app --no-cache .`                   |
| Rodar container | `docker run -d -p 8080:80 --name meu-comerc-app comerc-app` |

---

### ✨ Funcionalidades

| Funcionalidade           | Descrição                     |
| ------------------------ | ----------------------------- |
| Cadastro/Edição/Listagem | CRUD completo com soft delete |
| Autenticação             | Com verificação de ativação   |

---

### 👤 Usuário

| Funcionalidade           | Descrição                     |
| ------------------------ | ----------------------------- |
| Cadastro/Edição/Listagem | CRUD completo com soft delete |
| Filtros                  | Por nome, documento e status  |
| Consulta de endereço     | Automática via ViaCEP         |

---

### 🧍‍♂️ Clientes

| Funcionalidade           | Descrição                     |
| ------------------------ | ----------------------------- |
| Cadastro/Edição/Listagem | CRUD completo com soft delete |
| Filtros                  | Por nome, documento e status  |
| Consulta de endereço     | Automática via ViaCEP         |

---

### 🎬 Filmes

| Funcionalidade     | Descrição                     |
| ------------------ | ----------------------------- |
| Busca              | Por título e filtro por ano   |
| Resultados válidos | Apenas resultados da OMDb API |

---

### 🎥 Locações

| Funcionalidade | Descrição                                 |
| -------------- | ----------------------------------------- |
| Nova locação   | Cadastro com verificação de conflito      |
| Filtros        | Por cliente, data de locação e de entrega |
| Restrição      | Evita múltiplas locações simultâneas      |

---

### 🧩 Considerações Técnicas

| Recurso         | Descrição                                        |
| --------------- | ------------------------------------------------ |
| Responsividade  | Mobile-first com Tailwind                        |
| Atomic Design   | Componentização reutilizável                     |
| Feedback visual | Toasts para ações de sucesso ou erro             |
| Código limpo    | Nomeação padrão, responsabilidades bem definidas |
| Armazenamento   | Uso de `localStorage` para dados principais      |

---

### 📱 Interface Responsiva

| Plataforma | Suporte                |
| ---------- | ---------------------- |
| Mobile     | ✅ Totalmente adaptado |
| Desktop    | ✅ Totalmente adaptado |

---

✍️ Autor
| Nome | Contato |
| --------------- | ------------------------------------------------------- |
| Leonardo Toledo | [leotoledo010@gmail.com](mailto:leotoledo010@gmail.com) |
| GitHub | [@LeonardoToledo0](https://github.com/LeonardoToledo0) |

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.

Veja o arquivo [LICENSE](./LICENSE) para detalhes completos.

---

Você pode usar, modificar e distribuir o código conforme os termos da licença MIT.
