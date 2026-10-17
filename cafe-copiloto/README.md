# Café Copiloto

Assistente de preparo de café para iniciantes. O sistema transforma quatro escolhas — perfil sensorial, volume final, método e torra — em uma receita reproduzível com quantidades, temperatura, moagem, etapas e timer.

## Funcionalidades

- cálculo da dose com compensação da água retida pelo café;
- receitas para filtro de papel, filtro de aço e prensa francesa;
- perfis doce, brilhante e equilibrado;
- passo a passo com timer integrado;
- diagnóstico de café azedo, amargo, fraco, forte ou adstringente;
- histórico armazenado no navegador do usuário;
- interface responsiva para celular e computador.

## Executar localmente

O projeto é uma aplicação web estática, sem dependências ou etapa de compilação.

Com Python instalado:

```powershell
python -m http.server 4173 --directory dist
```

Depois, abra `http://localhost:4173` no navegador.

Também é possível abrir `dist/index.html` diretamente, embora um servidor local seja recomendado.

## Estrutura

```text
dist/
  index.html    Interface da aplicação
  styles.css    Estilos e layout responsivo
  app.js        Motor de receitas, timer e histórico
docs/
  relatorio_sistema_cafe_mvp.md
```

## Privacidade

O histórico fica salvo apenas no `localStorage` do navegador. Nenhum preparo é enviado a um servidor.

## Regras do motor

Os cálculos e as heurísticas utilizadas pelo MVP estão documentados em [`docs/relatorio_sistema_cafe_mvp.md`](docs/relatorio_sistema_cafe_mvp.md).
