//constructeur des produits
var item = [];
class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
//name: nom de l'article
//sellIn:  nb de jours pour vendre l'article
//quallity : qualitée de l'article


class Shop {
  constructor(items=[]){
    this.items = items;
  }

  




  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {

      if (this.items[i].name == ("Aged Brie")) {
        item = this.items[i];
        ChangeBrie(item);
      }

      else if (this.items[i].name == ("Backstage passes to a TAFKAL80ETC concert")) {
        item = this.items[i];
        Backstage(item);
      }

      else if (this.items[i].name == "Sulfuras") {
        item = this.items[i];
        Sulfuras(item);
      }

      else if (this.items[i].name.includes("Conjured")) {
        item = this.items[i];
        ConjuredQuality(item);
      }

          else   {
            item = this.items[i];
            NormalChange(item);
          }
    }

    return this.items;
  }
}

function Sulfuras(item) {   
  return item;
}

function ConjuredQuality(item) {
  item.sellIn -= 1;
  if (item.sellIn >= 0) {
      item.quality -= 2;
    }
    else {
      if (item.quality >4 ){
      item.quality -= 4;
    }
    else {
      item.quality = 0;
    }
    }
  return item;
}

function NormalChange(item) {
  item.sellIn -= 1;
  if (item.sellIn >= 0) {
    item.quality -= 1;
  }
  else {
    if (item.quality >2 ){
    item.quality -= 2;
  }
  else {
    item.quality = 0;
  }
  }
return item;
}


function ChangeBrie(item) {
  item.sellIn -= 1;
    if (item.sellIn > 10) {
      if (item.quality < 50){
      item.quality += 1;
    }
    else {
      item.quality = 50;
    }
    }
    else {
      if (item.sellIn > 5) {
        if (item.quality < 48){
        item.quality += 2;
        }
        else {
          item.quality = 50;
        }
      } 
      else {
        if (item.quality < 47){
        item.quality += 3;
        }
        else {
          item.quality = 50;
        }
      }
    }
}

function Backstage(item) {
  item.sellIn -= 1;
  if (item.sellIn >= 0) {
    
    if (item.sellIn > 10) {
      if (item.quality < 50){
      item.quality += 1;
    }
    else {
      item.quality = 50;
    }
    }
    else {
      if (item.sellIn > 5) {
        if (item.quality < 48){
        item.quality += 2;
        }
        else {
          item.quality = 50;
        }
      } 
      else {
        if (item.quality < 47){
        item.quality += 3;
        }
        else {
          item.quality = 50;
        }
      }
    }
    }
    else {
      item.quality = 0;
    }
}

module.exports = {
  Item,
  Shop
}
