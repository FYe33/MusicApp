import storage from 'good-storage'

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index > -1) { return }
  arr.unshift(val)
  // 如果收藏歌曲大于 maxLen 条，则删除队头的歌曲
  if (maxLen && arr.length > maxLen) { arr.pop() }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) { arr.splice(index, 1) }
}

// storage.get(key, default) default: key对应的val为空时的默认返回
export function save (item, key, compare, maxLen) {
  const items = storage.get(key, [])
  insertArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items
}

export function remove (key, compare) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

export function load (key) {
  return storage.get(key, [])
}

export function clear (key) {
  storage.remove(key)
  return []
}

export function saveAll (items, key) {
  storage.set(key, items)
}
