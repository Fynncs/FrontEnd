const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Função para listar os componentes
function listarComponentes() {
  // Utilizando o caminho genérico baseado na variável de ambiente USERPROFILE (Windows)
  const diretorio = path.join(process.env.USERPROFILE || process.env.HOME, 'Documents', 'FrontEnd', 'src', 'app', 'core', 'components');  
  
  console.log("Diretório sendo buscado:", diretorio);  // Verifique o caminho

  const arquivos = glob.sync(`${diretorio}/**/*.ts`);
  console.log("Arquivos encontrados:", arquivos);  // Exibe os arquivos encontrados
  
  let componentes = [];

  arquivos.forEach((arquivo) => {
    console.log(`Lendo arquivo: ${arquivo}`);  // Para ver quais arquivos estão sendo lidos
    const conteudo = fs.readFileSync(arquivo, 'utf8');
    
    if (conteudo.includes('@Component')) {
      componentes.push({
        nome: path.basename(arquivo),
        caminho: arquivo
      });
    }
  });

  const jsonFilePath = 'relatorio_componentes.json';
  console.log("Salvando relatório:", jsonFilePath);  // Verificando o caminho do arquivo JSON
  fs.writeFileSync(jsonFilePath, JSON.stringify(componentes, null, 2));
  console.log('Relatório gerado com sucesso!');

  gerarSnippet(componentes);
}

function gerarSnippet(componentes) {
  const snippet = {
    "Sugestões de Componentes": {
      "prefix": "componente",
      "body": componentes.map(comp => `"${comp.nome}": "${comp.caminho}"`).join(",\n"),
      "description": "Sugestões de Componentes baseadas no arquivo JSON"
    }
  };

  const snippetPath = path.join(__dirname, 'componentes.code-snippets');
  console.log("Salvando snippet:", snippetPath);  // Verificando o caminho do snippet
  fs.writeFileSync(snippetPath, JSON.stringify(snippet, null, 2));
  console.log('Arquivo de snippet gerado com sucesso!');
}

listarComponentes();
