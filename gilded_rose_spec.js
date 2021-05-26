var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et sellIn d'item normaux une fois sellIn < 0", function () {
    listItems.push(new Item("+5 Dexterity Vest", -1, 20));
    listItems.push(new Item("Mana Cake", -1, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -2, quality: 18 },
      { sellIn: -2, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 2 pour Aged Brie et Backstage passes si (sellIn <= 11 && sellIn > 5) ", function () {
    listItems.push(new Item("Aged Brie", 7, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 6, quality: 32 },
      { sellIn: 6, quality: 32 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 3 pour Aged Brie et Backstage passes si (sellIn < 5) ", function () {
    listItems.push(new Item("Aged Brie", 4, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 4, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 33 },
      { sellIn: 3, quality: 33 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de Backstage passes si le concert est passé ", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité de pour Aged Brie et Backstage passes ne peux pas dépasser 50", function () {
    listItems.push(new Item("Aged Brie", 20, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 50 },
      { sellIn: 19, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

it("Diminuer la qualité pour Conjured Dark Blade et Conjured Magic Stick se dégrade deux fois plus vite", function () {
  listItems.push(new Item("Conjured Dark Blade", 5, 30));
  listItems.push(new Item("Conjured Magic Stick", 5, 30));

  const gildedRose = new Shop(listItems);
  const items = gildedRose.updateQuality();

  var expected = [
    { sellIn: 4, quality: 28 },
    { sellIn: 4, quality: 28 },
  ];
  expected.forEach(function (testCase, idx) {
    expect(items[idx].quality).toBe(testCase.quality);
    expect(items[idx].sellIn).toBe(testCase.sellIn);
  });
});

it("Un nouvel objet Conjured, possède bien les effets Conjured", function () {
  listItems.push(new Item("Conjured Joker THP", 5, 30));
  listItems.push(new Item("Conjured Redux c'est pas bien", 5, 30));

  const gildedRose = new Shop(listItems);
  const items = gildedRose.updateQuality();

  var expected = [
    { sellIn: 4, quality: 28 },
    { sellIn: 4, quality: 28 },
  ];
  expected.forEach(function (testCase, idx) {
    expect(items[idx].quality).toBe(testCase.quality);
    expect(items[idx].sellIn).toBe(testCase.sellIn);
  });
});

it("Diminuer la qualité de 4 pour Conjured Dark Blade et Conjured Magic Stick une fois sellIn < 0", function () {
  listItems.push(new Item("Conjured Dark Blade", 0, 30));
  listItems.push(new Item("Conjured Magic Stick", 0, 30));

  const gildedRose = new Shop(listItems);
  const items = gildedRose.updateQuality();

  var expected = [
    { sellIn: -1, quality: 26 },
    { sellIn: -1, quality: 26 },
  ];
  expected.forEach(function (testCase, idx) {
    expect(items[idx].quality).toBe(testCase.quality);
    expect(items[idx].sellIn).toBe(testCase.sellIn);
  });
});

it("La qualité et la date de péremption ne change pas pour Sulfuras", function () {
  listItems.push(new Item("Sulfuras", 0, 80));
  

  const gildedRose = new Shop(listItems);
  const items = gildedRose.updateQuality();

  var expected = [
    { sellIn: 0, quality: 80 },
    
  ];
  expected.forEach(function (testCase, idx) {
    expect(items[idx].quality).toBe(testCase.quality);
    expect(items[idx].sellIn).toBe(testCase.sellIn);
  });
});

it("La qualité d'objets normaux et Conjured ne peux pas être négative", function () {
  listItems.push(new Item("Conjured Dark Blade", -2, 0));
  listItems.push(new Item("Quand tu arrives au bout de tes jokers", -2, 0));

  const gildedRose = new Shop(listItems);
  const items = gildedRose.updateQuality();

  var expected = [
    { sellIn: -3, quality: 0 },
    { sellIn: -3, quality: 0 },
  ];
  expected.forEach(function (testCase, idx) {
    expect(items[idx].quality).toBe(testCase.quality);
    expect(items[idx].sellIn).toBe(testCase.sellIn);
  });
});
});
