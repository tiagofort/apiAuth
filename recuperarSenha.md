1- criar tela para inserir e-mail e botão enviar
2- Criar Rota que recebe esse email para recuperação de senhra e usar jwt parar criar um token (10 minutos) de autenticação temporaria.
2.1 - Receber o e-mail e consultar a exitencia no banco. Se existe e estiver ativo, gerar o token (10 min). 
3- Gerar um link e enviar para o cliente (http://localhost:8080/recuperar/:token)
4- Ao carregar a tela, extrair o token da URL e enviar o token para validacao em outra rota. Se o token for valido, carregar a tela de troca de senha. Se nao, token invalido.
4.1 - Pergunta pro JWT se eh um toquem valido. Verifica se o usuario esta ativo
5- Criar uma rota de PUT para atualizar a senha.



colocar e-mail e senha nas variaveis de ambiente