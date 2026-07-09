import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do auto
// buscarAluno: adicione next aos parâmetros, envolva em try/catch
export async function listarMensagens(req, res, next) {
  try {
    const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  // mais recente primeiro
    include: {
      autor: {                        // traz dados do autor junto
        select: {
          nome: true,                 // nome do autor
          fotoUrl: true,              // foto do autor
        },
      },
    },
  });
  res.json(mensagens);
  } catch (erro) {
    next(erro);
  }
}

// --- Stubs para o desafio do aluno ---

// 🎯
  // buscarAluno: adicione next aos parâmetros, envolva em try/catch
export async function criarMensagem(req, res, next) {
  try {
    const{texto, imagemUrl, autorId } = req.body;

    if(!texto){
        return res.status(400).json({erro: 'O campo texto é obrigatório!'});
    } 

    const autorIdInteiro = Number(autorId);
    const novaMensagem = await prisma.mensagem.create({
     data: {
      texto : texto,
      imagemUrl : imagemUrl,
      autorId : autorId
      },
    });
    res.status(201).json(novaMensagem);
  } catch (erro) {
    next(erro);
  }
}
  
    // implemente aqui


// 🎯 DELETE /mensagens/:id — deleta uma mensagem
// Siga o mesmo padrão do deletarAluno
export async function deletarMensagem(req, res, next) {
    try{
    const {id} = req.params;
    await prisma.mensagem.delete({where: {id: Number(id)}});
    res.status(204).end();
  }catch(error){
    console.log(error)
    res.status(404).json({erro:'Mensagem não encontrada'});
  }
  // implemente aqui
}