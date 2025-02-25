const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Função para listar os componentes
function listarComponentes() {
  const diretorio = path.join(process.env.USERPROFILE || process.env.HOME, 'Documents', 'FrontEnd', 'src', 'app', 'core', 'components');  

  console.log("Diretório sendo buscado:", diretorio);

  const arquivos = glob.sync(`${diretorio}/**/*.ts`);
  console.log("Arquivos encontrados:", arquivos); 
  
  let componentes = [];

  arquivos.forEach((arquivo) => {
    console.log(`Lendo arquivo: ${arquivo}`);  
    const conteudo = fs.readFileSync(arquivo, 'utf8');
    
    if (conteudo.includes('@Component')) {
      componentes.push({
        nome: path.basename(arquivo),
        caminho: arquivo
      });
    }
  });

  const jsonFilePath = 'relatorio_componentes.json';
  console.log("Salvando relatório:", jsonFilePath);
  fs.writeFileSync(jsonFilePath, JSON.stringify(componentes, null, 2));
  console.log('Relatório gerado com sucesso!');

  gerarSnippet(componentes);
}

function gerarSnippet(componentes) {
  const snippets = {};

  componentes.forEach(comp => {
    snippets[comp.nome] = {
      "prefix": comp.nome.replace('.ts', ''),
      "body": `"${comp.caminho}"`,
      "description": `Caminho do componente ${comp.nome}`
    };
  });

  const snippetPath = path.join(process.env.USERPROFILE || process.env.HOME, 'Documents', 'FrontEnd', '.vscode', 'component.code-snippets');
  console.log("Salvando snippet:", snippetPath); 
  fs.writeFileSync(snippetPath, JSON.stringify(snippets, null, 2));
  console.log('Arquivo de snippet gerado com sucesso!');
}

listarComponentes();
