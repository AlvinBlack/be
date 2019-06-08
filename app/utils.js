module.exports  = {
  convertTimeToKey(time){
    let arr = time.split(':');
    return (arr[0] - 9) * 4 + (arr[1] / 15);
  },
  convertKeyToTime(key){
    return (Math.floor(key / 4) + 9) + ':' + (key % 4 * 15 || '00');
  }
}