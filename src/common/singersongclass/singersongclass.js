export default class Song {
   constructor({
      id,
      mid,
      singer,
      name,
      album,
      duration,
      image,
      url
   }) {
      this.id = id
      this.album = album
      this.duration = duration
      this.image = image
      this.mid = mid
      this.name = name
      this.url = url
      this.singer = singer
   }
}
export function createsong(singersingdata) {
   /* eslint-disable no-new */
   return new Song({
      id: singersingdata.songid,
      mid: singersingdata.songmid,
      singer: filtersong(singersingdata.singer),
      name: singersingdata.songname,
      album: singersingdata.albumname,
      duration: singersingdata.interval,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${singersingdata.albummid}.jpg?max_age=2592000`,
      url: `http://ws.stream.qqmusic.qq.com/${singersingdata.songid}.m4a?fromtag=46`
   })
}

function filtersong(singer) {
   let res = []
   if (!singer) return ''
   singer.forEach((item) => {
      res.push(item.name)
   })
   return res.join('/')
}
