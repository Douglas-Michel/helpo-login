# Helpo

Este projeto é um sistema web para gerenciamento de atendimentos e funcionários, desenvolvido para facilitar o controle de registros, cadastros e fluxos de trabalho em ambientes de atendimento.

## Funcionalidades

- Cadastro, edição e exclusão de atendimentos
- Cadastro, edição e exclusão de funcionários
- Controle de acesso: apenas funcionários ativos podem acessar o sistema
- Modal de confirmação para exclusão de registros
- Interface responsiva e amigável
- Campos de formulário padronizados e com validação
- Listagem dinâmica de atendimentos e funcionários
- Página de planos (pricing) com botão de retorno para a Home

## Estrutura de Pastas

```
/
├── assets/
│   └── img/           # Imagens e logotipos
├── css/               # Arquivos de estilos (CSS)
├── js/                # Scripts JavaScript
├── index.html         # Página inicial (login)
├── home.html          # Página principal após login
├── cadastrar-atendimento.html
├── lista-atendimentos.html
├── cadastrar-funcionario.html
├── lista-funcionarios.html
├── pricing.html       # Página de planos
└── README.md
```

## Como usar

1. **Abra o arquivo `index.html` em seu navegador.**
2. **Cadastre funcionários e atendimentos conforme necessário.**
3. **Apenas funcionários ativos podem acessar o sistema.**
4. **Utilize os botões de navegação para acessar as diferentes funcionalidades.**

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)

## Observações

- Todos os dados são armazenados no `localStorage` do navegador.
- Para redefinir o sistema, limpe o armazenamento local do navegador.
- O sistema é totalmente client-side (não requer backend).

---

Desenvolvido por Douglas Michel.
