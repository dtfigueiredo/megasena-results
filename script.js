//* dom elements
const $resultList = document.querySelector('.result-list')
const $gameNumber = document.querySelector('.game-number')
const $gameAccumulated = document.querySelector('.game-accumulated')
const $gamePrize = document.querySelector('.game-prize')

//* RESULTS
const getResults = async () => {
  const result = await fetch('https://loteriascaixa-api.herokuapp.com/api/mega-sena/latest')
  const data = await result.json()

  //actual game number
  $gameNumber.textContent = `Sorteio: ${data.concurso}`

  //
  let accumulatedFlag = ''
  if (data.acumulou === true) {
    accumulatedFlag = './assets/svgs/true.svg'
  } else {
    accumulatedFlag = './assets/svgs/false.svg'
  }
  $gameAccumulated.innerHTML = `Sorteio acumulado? <img src='${accumulatedFlag}' alt='true or false icons'/>`

  //next game prize
  if (data.acumulou === true) {
    $gamePrize.textContent = `Acumulado em ${data.acumuladaProxConcurso}`
  } else {
    $gamePrize.textContent = `-`
  }

  //results
  data.dezenas.map((dezena) => {
    const li = document.createElement('li')
    li.classList.add('result')
    li.innerHTML = dezena

    $resultList.appendChild(li)
  })
}

getResults()
