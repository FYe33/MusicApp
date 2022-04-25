import { get } from './base'

export function processSongs (songs) {
  if (!songs.length) { return Promise.resolve(songs) }

  return get('/api/getSongsUrl', {
    mid: songs.map(song => {
      return song.mid
    })
  }).then(res => {
    const map = res.map

    return songs.map(song => {
      song.url = map[song.mid]

      return song
    }).filter(song => {
      return song.url.indexOf('vkey') > -1
    })
  })
}

const lyricMap = {}
export function getLyric (song) {
  if (song.lyric) { return Promise.resolve(song.lyric) }

  const mid = song.mid

  // 不同页面播放同一首歌歌曲对象可能不同但歌曲的mid是相同的
  const lyric = lyricMap[mid]
  // 判断map中是否已经有歌词，有则直接返回，不请求新的歌词
  if (lyric) { return Promise.resolve(lyric) }

  return get('/api/getLyric', {
    mid
  }).then(res => {
    const lyric = res ? res.lyric : '[00:00:00]该歌曲暂时无法获取歌词'

    lyricMap[mid] = lyric
    return lyric
  }).catch(e => {
    console.log(e)
  })
}
