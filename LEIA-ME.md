# 100 Receitas Saudáveis — versão para público frio

Atualização: 13/11/2026. Base: arquivo `brigadeiros-saudaveis-2.zip` enviado nesta conversa.

## O que foi melhorado

### Primeiro bloco (HERO)

**Headline:** Seus doces favoritos, em versões mais saudáveis.

**Subheadline:** Bolos, brigadeiros, tortas, pudins e geleias: 100 receitas com ingredientes, medidas e passo a passo para preparar em casa e variar os doces da sua rotina.

- A abertura apresenta um benefício específico e identifica a oferta como uma coleção digital com 100 receitas e 3 bônus.
- O botão aparece junto à apresentação do produto, antes da lista de receitas. Ele continua levando à oferta na mesma página.
- O formato PDF, o acesso após o pagamento e a garantia de 7 dias estão próximos do botão.
- No desktop, texto e mockup ficam lado a lado. No celular, os elementos se organizam em uma coluna, com o botão antes da imagem.
- A lista original das 100 receitas foi mantida integralmente e passou para um bloco próprio após o primeiro carrossel. São as mesmas cinco categorias, com 20 receitas em cada uma.
- A mensagem sobre os ingredientes passou a ser “Opções sem adição de açúcar, sem glúten e sem lactose”, acompanhada da condição “Conforme os ingredientes e as substituições de cada receita”. As prévias do próprio produto indicam que algumas preparações exigem substituições; a página não promete que toda receita atende às três condições automaticamente.
- O fechamento foi alinhado à proposta: “Escolha seu próximo doce. A receita está aqui.”
- A descrição para mecanismos de busca foi atualizada e a referência de versão do CSS foi alterada para carregar os novos estilos.

O objetivo é tornar a oferta compreensível para quem chega por um anúncio e ainda não conhece o produto. A melhoria de conversão deve ser medida com tráfego real; não houve teste A/B nesta tarefa.

## Identidade e conteúdo preservados

- Paleta original: marrom, vinho, dourado e creme.
- Fontes Playfair Display e Outfit.
- Todos os 36 arquivos da pasta `assets`, sem alterações nos bytes.
- Os três carrosséis, com as mesmas imagens, repetições, ordem e velocidades: 16, 24 e 32 slides.
- Scripts `main.js`, `conversion.js`, `tracking.js` e `api/capi.js`, sem alterações.
- Arquivo `styles.css`, sem alterações. As regras novas estão isoladas no fim de `conversion.css`.
- Preço exibido de R$ 37,90, parcelamento anunciado, bônus, garantia, apresentação da autora, FAQ e checkout Greenn.
- Os dois links de compra, incluindo seus parâmetros e order bumps, são exatamente os do arquivo recebido.
- Meta Pixel, TikTok, UTMify e os identificadores existentes foram preservados.
- Contador e data dos bônus mantêm a lógica original.

## Arquivos modificados

1. `index.html`: HERO, posição do catálogo, mensagem final e descrição da página.
2. `conversion.css`: estilos específicos do HERO e do catálogo.
3. `LEIA-ME.md`: este documento, atualizado para a versão atual do projeto.

Os demais arquivos do projeto foram mantidos. O pacote não inclui dependências instaladas ou histórico local de Git, que não são necessários para servir esta página.

## Como aplicar

Para atualizar a mesma versão do site enviada nesta conversa, substitua `index.html` e `conversion.css` pelos arquivos desta pasta. A referência ao novo CSS já está no HTML.

Para publicar a pasta completa, mantenha sua estrutura: HTML, os dois CSS, os três JavaScript da página, `assets/`, `api/` e a configuração de hospedagem existente. A página não exige build. A rota `/api/capi` depende do ambiente de servidor e das configurações já utilizadas no projeto.

Os scripts antigos de reorganização e edição são auxiliares e não precisam ser executados para publicar. Executá-los pode sobrescrever a página com regras de versões anteriores.

## Validação realizada

- Comparação de todos os arquivos com o ZIP original, identificando apenas os três arquivos modificados acima.
- Comparação exata dos três trilhos de carrossel, de todos os assets, dos scripts de funcionamento/rastreamento e dos dois links de checkout.
- Conferência de IDs únicos, destinos das âncoras e existência dos arquivos locais referenciados.
- Verificação de sintaxe dos quatro scripts JavaScript de funcionamento/rastreamento.
- Inspeção visual em navegador no desktop e em larguras responsivas de 320, 360, 390, 768 e 1280 px, sem transbordamento horizontal nos títulos, textos e controles.
- Botão do HERO testado: foco na oferta e rolagem até ela, com espaço para a barra fixa.
- Os três carrosséis iniciam em movimento. Pausa, estabilidade durante a pausa e retomada foram conferidas individualmente.
- As cinco categorias de receitas abrem uma por vez, com 20 itens em cada uma, sem corte das listas na menor largura testada.
- Menus de receitas e FAQ testados por clique e teclado, com estado de expansão acessível.
- Contador e data dos bônus observados em funcionamento.

Esta entrega não publica o site nem faz uma compra de teste. A confirmação de recebimento de eventos no Meta/TikTok, a execução da CAPI no servidor e o processamento do pagamento não foram validados em produção.

## Pontos já existentes no material recebido

- Algumas prévias do produto trazem o crédito “Escrito por: Guilherme de C. Cintra”, enquanto a página apresenta Amanda Souza. As imagens e a apresentação da autora foram preservadas.
- Os links de Termos de Uso e Política de Privacidade continuam apontando para `#`; não foram inventados documentos ou URLs.
- O contador reinicia a cada dia conforme o código recebido. Não houve alteração das condições comerciais ou da regra de encerramento da oferta.
