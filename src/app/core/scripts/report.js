const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Função para listar os componentes
function listarComponentes() {
  const diretorio = path.join(__dirname, 'src/app');
  const arquivos = glob.sync(`${diretorio}/**/*.ts`); // Busca todos os arquivos .ts
  
  let componentes = [];
  
  arquivos.forEach((arquivo) => {
    const conteudo = fs.readFileSync(arquivo, 'utf8');
    if (conteudo.includes('@Component')) {
      componentes.push({
        nome: path.basename(arquivo),
        caminho: arquivo
      });
    }
  });

  // Salva o relatório em um arquivo JSON
  fs.writeFileSync('relatorio_componentes.json', JSON.stringify(componentes, null, 2));
  console.log('Relatório gerado com sucesso!');
}

listarComponentes();