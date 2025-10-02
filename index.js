const section1 = document.getElementById('section-1')
const section2 = document.getElementById('section-2')
const jpnText = document.getElementById('jpn-text')
const romajiText = document.getElementById('romaji-text')
const esText = document.getElementById('es-text')
const repeatButton = document.getElementById('repeat-button')
const audio = new Audio('/assets/audio.mp3')

const syncData = [
  {
    start: 0.0,
    jpn: 'ごめんね、愛しい人,',
    romaji: 'Gomen ne, itoshī hito,',
    es: 'Perdóname, mi amor,',
  },
  {
    start: 1.5,
    jpn: '晩御飯を作らなくて。',
    romaji: 'Bangohan o tsukuranakute.',
    es: 'Por no haber hecho la cena.',
  },
  {
    start: 3.5,
    jpn: '私の突撃隊は',
    romaji: 'Watashi no totsugekitai wa',
    es: 'Mi equipo de asalto',
  },
  {
    start: 5.4,
    jpn: '私を頼りにしていたんだ。',
    romaji: 'watashi o tayori ni shiteita n da',
    es: 'dependía de mí.',
  },
  {
    start: 7.5,
    jpn: '一楽のラーメンを頼もう！',
    romaji: 'Ichiraku no rāmen o tanomou!',
    es: '¡Pidamos ramen de Ichiraku!',
  },
]

let currentSyncIndex = -1
let syncInterval = null

const updateText = (index) => {
  if (index !== currentSyncIndex && index >= 0 && index < syncData.length) {
    const data = syncData[index]
    jpnText.textContent = data.jpn
    romajiText.textContent = data.romaji
    esText.textContent = data.es
    currentSyncIndex = index
  }
}

const syncLyrics = () => {
  const currentTime = audio.currentTime

  for (let i = syncData.length - 1; i >= 0; i--) {
    if (currentTime >= syncData[i].start) {
      updateText(i)
      break
    }
  }
}

const startSync = () => {
  repeatButton.disabled = true

  if (syncInterval) {
    clearInterval(syncInterval)
  }
  syncInterval = setInterval(syncLyrics, 100)
  updateText(0)
  audio.play()
}

document.addEventListener('DOMContentLoaded', () => {
  section2.style.display = 'none'
  repeatButton.disabled = true

  section1.addEventListener('click', () => {
    section1.style.display = 'none'
    section2.style.display = 'flex'
    startSync()
  })

  repeatButton.addEventListener('click', () => {
    audio.pause()
    audio.currentTime = 0
    startSync()
  })

  audio.addEventListener('ended', () => {
    if (syncInterval) {
      clearInterval(syncInterval)
    }
    repeatButton.disabled = false
  })
})
