const patchItem = (oldItem, newItem) => {
  for(let key in newItem) {
    if(newItem[key] !== oldItem[key]) {
      oldItem[key] = newItem[key];
    }
  }
}

const deleteItem = (index, itemArr) => {
  itemArr.splice(index,1);
}

module.exports = { patchItem, deleteItem }