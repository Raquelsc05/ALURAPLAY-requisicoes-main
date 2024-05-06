import { conectaAPI } from './conectaAPI.js'
import constroiCard from './mostrarVideos.js'

async function buscarVideo(evento) {
  evento.preventDefault()
  const dadosDePesquisa = document.querySelector('[data-pesquisa]').value
  const busca = await conectaAPI.buscaVideo(dadosDePesquisa)
  const botaoDePesquisa = document.querySelector('[data-botao-pesquisa]')

  botaoDePesquisa.addEventListener('click', evento => buscarVideo(evento))

  console.log(botaoDePesquisa)
  // Dentro do arquivo buscarVideos.js, antes de adicionar os novos resultados de busca:
  const lista = document.querySelector('[data-lista]')

  // Limpa a lista de vídeos existente
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild)
  }

  // Continuação do código para adicionar os vídeos buscados à lista
  busca.forEach(elemento => {
    lista.appendChild(
      constroiCard(
        elemento.titulo,
        elemento.descricao,
        elemento.url,
        elemento.imagem
      )
    )
  })

  if (busca.length === 0) {
    lista.innerHTML = `<h2 class="mensagem__titulo">Nao exitem videos com estes termos</h2>`
  }
}

const botaoDePesquisa = document.querySelector('[data-botao-pesquisa]')

botaoDePesquisa.addEventListener('click', evento => buscarVideo(evento))
