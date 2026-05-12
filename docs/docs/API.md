# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend-lake.vercel.app/`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

    ## Auth

    ### POST /auth/register

    Cria uma nova conta de aluno.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "senha": "minhasenha123",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `409` — Email já cadastrado

      ### POST /auth/login

    Autentica um aluno e retorna um token JWT.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "email": "maria@email.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)

      


       ## Alunos

    ### GET /alunos/
    Lista todos os alunos.

    - **Autenticação:** Não
    - **Body:** Nenhum
    - **Resposta de sucesso:** `200 OK`

    ```json
 [
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
 ]
    ```

    - **Erros:**
      - `401` — Credenciais inválidas 

    ### GET /alunos/:id

    Busca um aluno pelo ID.

    - **Autenticação:** Não
    - **Body:** Nenhum
    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `404` — ID inexistente.
       
    ### PUT /alunos/:id

    Atualiza o próprio perfil.

    - **Autenticação:** Sim (Bearer token)
    - **Body:** 

     ```json
    {
      "nome": "Lúcia Almeida",
      "cidade": "Salinas",
      "frase": "Aqui começa uma nova jornada.",
      "planosFuturos": "Cursar Letras na UFMG",
      "fotoUrl": null
    }
    ```
    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `401` - Não está logado.
      - `403` - Sem permissão para atualizar esse perfil.


    ### DELETE /alunos/:id

    Remove um aluno.

    - **Autenticação:** Sim (Bearer token(admin))
    - **Body:** Nenhum
    - **Resposta de sucesso:** `204 (sem conteúdo)`

    - **Erros:**
      - `403` - Sem permissão para deletar esse perfil.
      - `401` - Não está logado.

    
     ## Mensagens

    ### GET /mensagens/
    Lista todas as mensagens do mural.

    - **Autenticação:** Não
    - **Body:** Nenhum
    - **Resposta de sucesso:** `200 OK`

    ```json
 [
    { 
      "id": 6,
      "conteudo" : "Parabéns pela sua formatura ! Estou muito feliz por você !",
      "autorId" : 6,
      "alunoId" : 5,
      "criadoEm": "2026-04-03T10:30:00.000Z",
      "autor": {
      "id": 1,
      "nome": "Maria Silva",
      "fotoUrl": null
      }
    }
 ]
    ```

    - **Erros:**
      - `400` — Informações incompletas 

    ### POST /mensagens/

    Cria uma nova mensagem.

    - **Autenticação:** Sim (Bearer token)
    - **Body:** 
     ```json
    {
      "alunoId": 8,
      "conteudo": "Parabéns pelo seu sucesso !"
    }
    ```

    - **Resposta de sucesso:** `201 Created`
   
    ```json
    {
       "id": 6,
      "conteudo" : "Parabéns pela sua formatura ! Estou muito feliz por você !",
      "autorId" : 6,
      "alunoId" : 5,
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Dados inválidos.
      - `401` — Sem permissão.


    ### DELETE /mensagens/:id

    Exclui uma mensagem.

    - **Autenticação:** Sim (Bearer token(admin))
    - **Body:** Nenhum
   - **Resposta de sucesso:** `204 (sem conteúdo)`

    - **Erros:**
      - `403` - Sem permissão para deletar esse perfil.
      - `401` - Não está logado.


