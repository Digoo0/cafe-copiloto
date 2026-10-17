# Relatório-base — Sistema inteligente para preparo de café

## 1. O problema que o produto resolve

Para quem está começando no café especial, preparar café envolve responder várias perguntas ao mesmo tempo:

- Quantos gramas de café devo usar?
- Quanto de água?
- Moagem fina, média ou grossa?
- Qual temperatura?
- Preciso fazer pré-infusão?
- Quanto coloco na pré-infusão?
- Espero quanto tempo?
- Quantos despejos?
- Quanto de água em cada despejo?
- Quando o café deveria terminar de passar?
- Se ficou azedo, o que eu altero?
- Se ficou amargo?
- Se quero mais doçura?
- Se quero sentir mais a acidez/frutas?
- Se troquei de método, tudo isso muda?

Hoje o usuário precisa conhecer essas relações ou pesquisar cada uma separadamente.

O produto pode transformar:

> “Quero 300 ml, mais doce, no filtrado.”

em algo como:

> **Você vai precisar de 22 g de café e aproximadamente 350 g de água.**
>
> Moagem: média-fina.  
> Água: 93 °C.  
> Pré-infusão: 65 g por 45 segundos.  
> Depois, despeje até 200 g.  
> Aguarde alguns segundos e finalize até 350 g.  
> Tempo total esperado: aproximadamente 3 minutos.

Esse é o núcleo do produto.

---

## 2. O conceito mais importante: concentração ≠ extração

O sistema precisa entender duas coisas diferentes.

**Concentração** é o quanto o café está forte na xícara.

**Extração** é quanto dos compostos presentes no grão conseguimos retirar durante o preparo.

É possível ter:

- café forte e subextraído;
- café fraco e bem extraído;
- café forte e bem extraído;
- café fraco e superextraído.

Por isso, simplesmente aumentar café não significa necessariamente “melhor café”.

A SCA utiliza como referência técnica para café filtrado uma faixa aproximada de **18–22% de extração**, com concentração de sólidos dissolvidos na bebida em torno de **1,15–1,45% TDS**. Em testes de certificação, a SCA inicia com aproximadamente **55 g de café por litro de água** e ajusta moagem e contato para chegar à zona desejada.

Para o consumidor comum, porém, não faz sentido mostrar Extraction Yield ou TDS no MVP.

O sistema deve trabalhar com isso **nos bastidores**, traduzindo para:

**azedo → equilibrado → doce → amargo/adstringente.**

---

## 3. Como a extração muda o sabor

Uma simplificação muito útil para ensinar iniciantes é:

### Subextração

Normalmente pode gerar:

- azedo;
- salgado;
- pouco doce;
- vazio;
- sabor curto.

### Extração equilibrada

Tende a apresentar:

- maior integração entre acidez e doçura;
- clareza;
- notas do café mais reconhecíveis;
- finalização agradável.

### Extração excessiva ou desigual

Pode gerar:

- amargor desagradável;
- secura;
- adstringência;
- sensação áspera;
- perda de definição.

Mas existe uma ressalva científica importante: café não segue perfeitamente a ideia antiga de que “ácidos saem primeiro, açúcar depois e amargor por último”. O perfil sensorial depende também de torra, grão, concentração, temperatura e método.

Portanto, o app deve usar essas regras como **heurísticas de preparo**, não como leis químicas absolutas.

---

## 4. “Quero mais acidez” precisa ser tratado corretamente

Em vez de perguntar:

> Mais acidez

é melhor usar:

> **Mais frutado e brilhante**

Porque “acidez” para um iniciante pode significar tanto uma característica desejável quanto café azedo.

A acidez agradável de um café pode lembrar:

- frutas cítricas;
- maçã;
- frutas vermelhas;
- vinho;
- frutas tropicais.

Já um café subextraído pode simplesmente parecer azedo e desagradável.

Além disso, o próprio grão exerce enorme influência. Torras claras apresentam, em geral, mais acidez percebida que torras escuras.

Isso significa que o software **não consegue criar uma acidez de frutas vermelhas em um café que não possui esse potencial**.

Ele consegue apenas preparar aquele café de uma maneira que favoreça determinadas características.

---

## 5. As principais variáveis que o motor precisa controlar

### 5.1 Proporção café : água

Uma faixa extremamente útil para filtrados é aproximadamente:

| Proporção | Resultado típico |
|---|---|
| 1:14 | bastante intenso |
| 1:15 | intenso |
| 1:16 | equilibrado/encorpado |
| 1:16,5 | equilibrado |
| 1:17 | mais delicado |
| 1:18 | mais leve |

Não existe um “1:16 perfeito universal”. O ratio influencia principalmente a concentração da bebida e também interage com a extração.

Para o MVP, **1:16 a 1:17** é uma excelente zona de operação.

---

## 6. O problema que quase toda calculadora ignora

Se a pessoa disser:

> Quero **300 ml de café pronto**.

não podemos usar simplesmente:

`300 ÷ 16 = 18,75 g`

porque parte da água ficará presa no café moído.

Em filtrados, a retenção costuma ficar aproximadamente em **2–2,5 g de água por grama de café**. Em métodos de imersão, como prensa francesa, pode ficar por volta de **3 ml/g** quando a bebida é decantada.

Então existem duas perguntas completamente diferentes:

**A. Quanto de água você vai colocar?**

ou

**B. Quanto café você quer ter pronto na xícara?**

Recomendação para o produto: usar **B**.

É muito mais natural.

> “Quero fazer 300 ml de café.”

### Fórmula do sistema

Se:

- `B` = bebida final desejada;
- `R` = proporção água:café;
- `L` = retenção de líquido;
- `D` = café em gramas;

então:

`D = B ÷ (R − L)`

e:

`Água = D × R`

Para filtrado, pode-se iniciar com:

`L ≈ 2,1`

Essa lógica é muito mais interessante que uma calculadora convencional.

---

## 7. Moagem

A moagem muda principalmente:

- área superficial;
- velocidade de extração;
- resistência ao fluxo;
- tempo de contato.

Quanto mais fina:

- mais área de contato;
- extração tende a acontecer mais rapidamente;
- filtrados tendem a escoar mais lentamente.

Quanto mais grossa:

- menos área de contato;
- extração tende a acontecer mais lentamente;
- água atravessa o leito mais facilmente.

Porém, moer indefinidamente mais fino não melhora o café. Em métodos de percolação, excesso de finos pode gerar fluxo desigual, entupimento e adstringência.

### Para o usuário iniciante

Trabalhar com cinco níveis:

| Nível | Descrição |
|---|---|
| Muito fina | farinha/açúcar de confeiteiro |
| Fina | açúcar fino |
| Média-fina | entre açúcar e areia fina |
| Média | areia |
| Grossa | sal grosso |

### Evolução futura

Permitir que o usuário informe o **modelo do moedor**.

Exemplos:

- Timemore C3
- Kingrinder K6
- Hario Mini Mill
- Comandante C40

A resposta poderia evoluir de:

> Moagem média-fina

para:

> Timemore C3: comece em aproximadamente X clicks.

---

## 8. Temperatura da água

Como ponto de partida, café filtrado costuma operar muito bem aproximadamente entre **92 e 96 °C**.

Uma lógica útil para o sistema:

| Torra | Temperatura inicial |
|---|---:|
| Clara | 94–96 °C |
| Média-clara | 93–95 °C |
| Média | 92–94 °C |
| Média-escura | 90–92 °C |
| Escura | 88–91 °C |

Quanto mais desenvolvida/escura a torra, mais facilmente certos compostos são extraídos e maior a possibilidade de sabores tostados e amargos dominarem.

### Recomendação de produto

O MVP deveria perguntar o nível de torra:

- clara;
- média;
- escura;
- não sei.

Se a pessoa selecionar **não sei**, usar:

`93 °C`

---

## 9. Pré-infusão / bloom

No café filtrado, o bloom serve principalmente para:

- molhar todo o café;
- permitir liberação de CO₂;
- preparar o leito para uma extração mais uniforme.

Uma referência segura é aproximadamente:

`2–3 × a massa de café em água`

Para 20 g de café:

`40–60 g de água`

Tempo:

`30–45 segundos`

Para o sistema, usar como padrão:

`Bloom = 3 × dose`

`Tempo = 45 s`

---

## 10. Agitação

Agitação aumenta o contato da água com as partículas.

Pode acontecer por:

- despejo mais forte;
- colher;
- swirl;
- múltiplos despejos.

Mas mais agitação não é sempre melhor.

Agitação excessiva pode mover partículas finas para regiões do filtro, alterar fluxo e aumentar o risco de entupimento.

Para iniciante:

> **usar pouca agitação e muita consistência.**

O produto deve evitar receitas excessivamente complexas.

---

## 11. Papel vs aço

### Filtro de papel

Tende a reter mais:

- partículas;
- óleos;
- sedimentos.

Resultado típico:

**maior clareza e definição.**

### Filtro metálico

Permite passar mais:

- óleos;
- partículas finas;
- sólidos suspensos.

Resultado:

**mais corpo e textura.**

Resumo:

**papel → clareza**

**metal → corpo**

---

# 12. Os três métodos do MVP

## 12.1 Método 1 — Filtrado em papel

Considerar um pour-over convencional estilo V60/Melitta.

### Receita-base

- Ratio: `1:16 a 1:17`
- Moagem: `média-fina`
- Temperatura: `92–94 °C`
- Bloom: `3× o peso do café`
- Bloom time: `30–45 s`
- Tempo final: `2:30–3:30`

### Perfil equilibrado

**Ratio:** 1:16  
**Moagem:** média-fina  
**Temperatura:** 93 °C  
**Bloom:** 3× café  
**Bloom:** 45 s

Fluxo:

- `0:00` → bloom
- `0:45` → despejo até aproximadamente 60%
- `1:20` → despejo até 100%

Objetivo de término:

`2:45–3:30`

---

## 12.2 Perfil mais doce e redondo

Objetivo:

- destacar doçura;
- equilíbrio;
- maciez;
- extração uniforme.

Configuração inicial:

- **Ratio:** 1:16,5–17
- **Moagem:** média-fina
- **Temperatura:** 92–94 °C
- **Bloom:** 3×
- **Bloom time:** 45 s
- **Agitação:** baixa/média

Usar despejos suaves e consistentes.

Meta:

**extração uniforme**, evitando tanto subextração quanto secura.

---

## 12.3 Perfil frutado / brilhante

Configuração inicial:

- **Ratio:** 1:16,5–17
- **Moagem:** média a média-fina
- **Temperatura:** 94–96 °C para cafés claros
- **Bloom:** 3× / 45 s
- **Agitação:** baixa
- **Tempo:** aproximadamente 2:30–3:15

Objetivos:

- clareza;
- notas de origem;
- sensação mais viva.

Importante:

**não ensinar a moer grosso demais para “gerar acidez”.**

Se passar rápido demais e ficar agressivamente azedo, é subextração.

---

# 13. Método 2 — Prensa francesa

Esse método funciona por **imersão**.

A água não atravessa constantemente o café.

O café fica mergulhado nela.

Por isso, a prensa é muito mais tolerante a pequenas diferenças de despejo.

### Receita-base

- Ratio: `1:16–1:17`
- Moagem: `média-grossa/grossa`
- Temperatura: `93–95 °C`
- Tempo inicial de contato: `4 min`

### Decisão importante de produto

**Não é necessário criar bloom separado na prensa francesa.**

Como toda a água entra praticamente de uma vez, fazer uma pequena pré-infusão separada não oferece a mesma função operacional que em um pour-over.

O sistema deve ser inteligente o suficiente para dizer:

> “Neste método, não faremos pré-infusão separada.”

---

## 14. Receita padrão — prensa francesa

**Ratio:** 1:16–16,5  
**Moagem:** média-grossa/grossa  
**Temperatura:** 93–95 °C

### Processo

**0:00**

Adicionar toda a água.

**4:00**

Quebrar delicadamente a crosta.

Opcional:

Retirar espuma superficial se quiser uma bebida mais limpa.

**4:00–8:00/9:00**

Aguardar partículas assentarem.

Depois:

- baixar o êmbolo devagar;
- evitar comprimir violentamente o café;
- servir.

### Resultado esperado

- corpo alto;
- textura;
- menos clareza que papel;
- mais óleos.

---

## 15. Perfis na prensa

### Doce / equilibrado

- Ratio: `1:16,5`
- Moagem: média-grossa
- Temperatura: 93 °C
- Contato: 4 min + assentamento

### Frutado / brilhante

- Ratio: `1:17`
- Moagem: média-grossa
- Temperatura: 94–95 °C para torra clara
- Menor concentração

### Intenso / encorpado

- Ratio: `1:15`
- Moagem: grossa/média-grossa
- Temperatura: 92–94 °C

Essa opção pode futuramente aparecer no app como:

> **“Quero um café mais intenso.”**

---

# 16. Método 3 — Coador de aço

Esse é provavelmente o método que vai exigir mais calibração do MVP.

“Coador de aço” não é uma especificação padronizada.

Existem:

- telas simples;
- telas duplas;
- furos maiores;
- furos menores;
- cones;
- fundos planos.

Tudo isso muda fluxo.

Por isso, **o motor precisa usar uma receita inicial e depois aprender com o tempo real do usuário.**

---

## 17. Receita inicial — aço

Para o MVP:

- **Ratio:** 1:16
- **Moagem:** média
- **Temperatura:** 93 °C
- **Bloom:** 3× café
- **Bloom time:** 45 s

Depois:

- `0:45` → até aproximadamente 65%
- esperar baixar parcialmente
- `~1:30` → completar até 100%

Tempo esperado:

`2:45–3:30`

Resultado:

- mais corpo e óleos que papel;
- mais clareza que prensa, dependendo da malha.

---

# 18. Os três perfis do MVP

## 🍯 Doce e redondo

> Quero destacar doçura, equilíbrio e maciez.

O sistema tende a favorecer:

- extração uniforme;
- fluxo controlado;
- temperatura moderada;
- concentração moderada.

## 🍊 Frutado e brilhante

> Quero destacar frutas, flores e uma acidez agradável.

O sistema tende a favorecer:

- clareza;
- baixa agitação;
- concentração ligeiramente menor;
- temperaturas adequadas para cafés claros.

## ⚖️ Equilibrado

> Quero sentir um pouco de tudo.

Usar a receita central de cada método.

---

# 19. Fluxo ideal do MVP

## 1. Como você quer seu café?

- 🍯 Doce e redondo
- 🍊 Frutado e brilhante
- ⚖️ Equilibrado

## 2. Quanto café você quer beber?

Sugestões:

- 250 ml
- 300 ml
- 400 ml
- 500 ml
- Outro

Deixar explícito:

> **Quantidade final na xícara.**

## 3. Qual método?

- ☕ Filtrado em papel
- 🫖 Prensa francesa
- ☕ Coador de aço

## 4. Qual a torra?

- Clara
- Média
- Escura
- Não sei

Quatro perguntas.

---

# 20. Estrutura da resposta do sistema

## Sua receita

**Café:** 22 g  
**Água:** 352 g  
**Moagem:** média-fina  
**Temperatura:** 93 °C  
**Tempo esperado:** 3:00

Depois começa um modo guiado.

### 00:00

> Coloque **66 g de água**.

Timer começa automaticamente.

### 00:45

> Agora despeje até chegar a **210 g** na balança.

### 01:20

> Complete até **352 g**.

### 03:00

> Seu café deve estar terminando de passar.

O produto funciona como um **copiloto durante o preparo**.

---

# 21. O sistema precisa entender resultado, não apenas receita

Ao final:

> **Como ficou seu café?**

Opções:

- 😖 Azedo
- 😐 Fraco
- 😍 Gostei
- 😣 Amargo
- 🏜️ Seco/adstringente

A partir disso, o sistema ajusta a próxima receita.

---

# 22. Motor de correção

## Ficou azedo

Primeiro ajuste:

> moagem um pouco mais fina.

Depois, se necessário:

- aumentar temperatura;
- aumentar contato;
- melhorar saturação do bloom.

## Ficou amargo

Primeiro:

> moagem um pouco mais grossa.

Depois:

- reduzir temperatura;
- reduzir agitação;
- reduzir tempo.

## Ficou fraco mas gostoso

Isso é principalmente **concentração**, não necessariamente problema de extração.

Ajuste:

> usar mais café / diminuir ratio.

Exemplo:

`1:17 → 1:16`

## Ficou forte demais mas gostoso

Ajuste:

> aumentar ratio.

Exemplo:

`1:16 → 1:17`

Essa distinção é fundamental.

O app deve entender:

**forte/fraco ≠ amargo/azedo.**

---

# 23. Regra de ouro para o algoritmo

Não deixar o sistema alterar cinco coisas de uma vez.

Depois de uma avaliação ruim:

> **alterar uma variável principal por preparo.**

Ordem sugerida:

1. moagem;
2. proporção;
3. temperatura;
4. técnica/agitação;
5. tempo.

Isso permite que:

- o usuário aprenda;
- o software descubra o que resolveu o problema;
- o histórico fique interpretável.

---

# 24. O sistema deveria aprender cada café

Imagine que o usuário cadastra:

**Café:** Fazenda X  
**Torra:** clara  
**Data da torra:** 10/10  
**Notas:** morango, mel e chocolate

Primeiro preparo:

`22 g / 350 g / grind 18`

Usuário:

> “Um pouco azedo.”

O sistema registra.

Próximo preparo:

> “Da última vez usamos grind 18. Vamos para 17.”

Usuário:

> “Agora ficou perfeito.”

A partir daí:

## Receita salva

**Fazenda X + filtrado + doce**

- 22 g
- 350 g
- Grind 17
- 94 °C

Nesse momento o produto deixa de ser uma calculadora e se transforma em **sistema de dial-in de café**.

---

# 25. Variáveis recomendadas para o banco de dados

Mesmo que o usuário não veja todas:

```text
coffee_id
roast_level
roast_date
process
origin

brew_method
target_profile

desired_beverage_weight
brew_water
coffee_dose
ratio

grind_level
grinder_model
grinder_setting

temperature

bloom_water
bloom_time

pour_1_water
pour_1_time
pour_2_water
pour_2_time
pour_3_water
pour_3_time

expected_drawdown
actual_drawdown

user_result
sour_score
bitter_score
sweet_score
body_score
overall_rating
```

Isso prepara o sistema para virar algo muito maior depois.

---

# 26. Arquitetura inicial do motor

Não usar IA generativa para calcular a receita principal.

Usar um **motor determinístico**.

Exemplo:

```text
method = paper
profile = sweet
drink = 300 ml
roast = medium

ratio = 16.5
retention = 2.1

dose = drink / (ratio - retention)

water = dose × ratio

bloom = dose × 3
temperature = 93
grind = medium-fine
```

Depois a IA pode ser usada para:

- explicar;
- conversar;
- interpretar feedback;
- ensinar;
- tirar dúvidas.

Mas a matemática central fica consistente.

Isso evita um dia a IA dizer:

> use 18 g

e no dia seguinte:

> use 22 g

para a mesma receita.

---

# 27. Precisão versus falsa precisão

Evitar inicialmente:

> moagem = 612 microns.

Um iniciante não tem como medir isso e moedores produzem distribuições de partículas diferentes.

Melhor:

> **Média-fina — semelhante a areia fina.**

Quando ele cadastrar o moedor:

> **Timemore C3: comece em aproximadamente X clicks.**

Depois o sistema calibra com feedback.

---

# 28. Feature fundamental: timer integrado à receita

Não apenas:

> “Faça bloom de 45 segundos.”

Mas:

## COMEÇAR PREPARO

O sistema vai notificando:

**00:00 — despeje 60 g**

**00:45 — próximo despejo**

**01:20 — complete até 330 g**

**02:50 — observe o escoamento**

Isso elimina justamente o problema que motivou a ideia: ter que parar e consultar uma IA durante o preparo.

---

# 29. Segundo diferencial: modo “me salva”

Na tela:

> **Algo deu errado?**

Exemplo:

### Está descendo rápido demais

Resposta:

> Continue este preparo normalmente. Na próxima vez, vamos moer um pouco mais fino.

### Está demorando demais

Resposta:

> Não agite mais o café. Deixe terminar. Na próxima receita vou engrossar sua moagem.

Isso cria sensação real de acompanhamento.

---

# 30. Métodos que podem entrar depois

A arquitetura deve nascer preparada para:

| Categoria | Métodos |
|---|---|
| Percolação | V60, Melitta, Kalita, Origami, Chemex |
| Imersão | Prensa francesa, Clever |
| Pressão/imersão | AeroPress |
| Pressão | Espresso |
| Fogão | Moka |
| Vácuo | Sifão |
| Frio | Cold brew |
| Tradicional | café turco/ibrik |

Esses métodos não deveriam compartilhar a mesma receita genérica.

O **método é uma das classes fundamentais do motor**.

---

# 31. O maior erro que devemos evitar

Criar algo como:

> “Para café doce use moagem fina.”

Isso seria simplificação demais.

O resultado depende da interação:

**grão + torra + moagem + proporção + água + temperatura + método + técnica + tempo.**

O motor precisa trabalhar com **faixas e feedback**, não com verdades universais.

---

# 32. Outra variável futura: água

Água representa praticamente toda a bebida.

Minerais e alcalinidade influenciam:

- extração;
- percepção de acidez;
- sabor;
- consistência.

No MVP, não perguntar isso.

Apenas mostrar:

> **Use preferencialmente água filtrada e sem gosto ou cheiro forte.**

No modo avançado, isso pode virar uma camada inteira do sistema.

---

# 33. Definição recomendada do MVP

## Inputs

### Perfil

- doce;
- brilhante;
- equilibrado.

### Volume final

- 100–1.000 ml.

### Método

- papel;
- prensa;
- aço.

### Torra

- clara;
- média;
- escura;
- não sei.

## Outputs

- café em gramas;
- água total;
- nível de moagem;
- temperatura;
- bloom;
- tempo de bloom;
- quantidade de cada despejo;
- momento de cada despejo;
- tempo final esperado;
- instruções em tempo real.

## Depois do preparo

- azedo;
- amargo;
- fraco;
- forte;
- seco;
- perfeito.

A resposta altera a próxima receita.

---

# 34. Tese do produto

O produto não precisa ser apresentado como:

> “calculadora de café”.

Melhor posicionamento:

> **Um assistente pessoal de preparo que aprende como você gosta do seu café.**

Na primeira utilização ele conhece apenas regras gerais.

Depois de 10 preparos, começa a conhecer:

- seu moedor;
- seu café;
- seu filtro;
- sua preferência;
- seus tempos reais;
- sua percepção sensorial.

E passa de:

> “Use moagem média-fina.”

para:

> “Nesse café você gostou mais usando 17 clicks, 94 °C e 1:16,5.”

Aí existe retenção de usuário e uma justificativa muito maior para o produto existir.

---

# 35. Base técnica recomendada para o MVP

| Método | Ratio inicial | Retenção estimada | Moagem base | Temp. base | Bloom |
|---|---:|---:|---|---:|---|
| Papel | 1:16–17 | 2,1 g/g | média-fina | 93 °C | 3× / 45s |
| Aço | 1:16–17 | 2,1–2,5 g/g | média | 93 °C | 3× / 45s |
| Prensa | 1:16–17 | ~3 g/g | média-grossa | 93–94 °C | não separado |

Esses valores devem funcionar como **defaults**.

O feedback do usuário faz o ajuste fino.

---

# 36. Próxima etapa recomendada

Antes de pensar em tela ou código, criar o **cérebro do produto**:

uma matriz completa que recebe:

```text
volume + método + perfil + torra
```

e retorna:

```text
dose
água
grind
temperatura
bloom
cada despejo
cada timestamp
tempo esperado
```

Depois, adicionar a lógica de correção após o usuário dizer:

```text
ficou azedo
ficou amargo
ficou fraco
ficou forte
ficou seco
ficou perfeito
```

Esse documento de regras pode ser tratado como a **versão 1 do algoritmo**.

---

# 37. Referências-base

- Specialty Coffee Association (SCA) — referências de extração, TDS e preparação.
- Hario — receitas e parâmetros para V60.
- James Hoffmann — técnicas contemporâneas para V60 e prensa francesa.
- Barista Hustle — retenção de água, beverage weight e fundamentos de extração.
- Coffee Ad Astra — moagem, fluxo, extração e limitações da abordagem “quanto mais fino, melhor”.
- Literatura científica sobre influência de torra, temperatura, TDS e método no perfil sensorial.
