addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
      nt:new Decimal(1),
      rt:new Decimal(1),
      t:new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
  tabFormat: {
    "Main": {
        content: [
          ["display-text",
        function() { return 'n(t) = ' + format(player.p.nt) },
        { "color": "yellow", "font-size": "30px", "font-family": "Consolas" }],
          ["display-text",
        function() { return 'r(t) = ' + format(player.p.rt) },
        { "color": "yellow", "font-size": "30px", "font-family": "Consolas" }],
          ["display-text",
        function() { return 't = ' + format(player.p.t) },
        { "color": "yellow", "font-size": "30px", "font-family": "Consolas" }],
          "buyables"
        ],
    },
},
  buyables: {
    11: {
        cost(x) { return new Decimal.pow(2, x).pow(x.div(115).add(1)).mul(1) },
        display() { return "<h2>Lemma 1</h2><br>HERES MULITIPLER GAIN + 0.0001" },
        canAfford() { return player[this.layer].nt.gte(this.cost()) },
        buy() {
            player[this.layer].nt = player[this.layer].nt.div(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player[this.layer].rt = player[this.layer].rt.add(0.0001)
        },
    },
    12: {
        cost(x) { return new Decimal.pow(2, x).pow(x.div(113).add(1)).mul(10) },
        display() { return "<h2>Lemma 2</h2><br>HERES MULITIPLER GAIN + 0.001" },
        canAfford() { return player[this.layer].nt.gte(this.cost()) },
        buy() {
            player[this.layer].nt = player[this.layer].nt.div(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player[this.layer].rt = player[this.layer].rt.add(0.001)
        },
    },
    13: {
        cost(x) { return new Decimal.pow(2, x).pow(x.div(109).add(1)).mul(1e3) },
        display() { return "<h2>Lemma 3</h2><br>HERES MULITIPLER GAIN + 0.01" },
        canAfford() { return player[this.layer].nt.gte(this.cost()) },
        buy() {
            player[this.layer].nt = player[this.layer].nt.div(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player[this.layer].rt = player[this.layer].rt.add(0.01)
        },
    },
    14: {
        cost(x) { return new Decimal.pow(2, x).pow(x.div(100).add(1)).mul(1e10) },
        display() { return "<h2>Lemma 4</h2><br>HERES MULITIPLER GAIN + 0.1" },
        canAfford() { return player[this.layer].nt.gte(this.cost()) },
        buy() {
            player[this.layer].nt = player[this.layer].nt.div(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player[this.layer].rt = player[this.layer].rt.add(0.1)
        },
    },
    15: {
        cost(x) { return new Decimal.pow(2, x).pow(x.div(100).add(1)).mul("1e750") },
        display() { return "<h2>Lemma 5</h2><br>HERES MULITIPLER GAIN + 1" },
        canAfford() { return player[this.layer].nt.gte(this.cost()) },
        buy() {
            player[this.layer].nt = player[this.layer].nt.div(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player[this.layer].rt = player[this.layer].rt.add(1)
        },
    },
},
  automate() {
    player.p.nt = player.p.nt.mul(player.p.rt)
    player.p.t = player.p.t.add(1)
  }
})

addLayer("sa", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "green",
    resource: "Goals", 
    symbol: "G",
    row: "side",
    layerShown(){return player[this.layer].best.gt(0)},
    achievements: {
        11: {
            name: "Unlock Goals!",
            done() {return player.p.nt.gte("10")},
            tooltip: "Hmm...",
        },
        21: {
            name: "In Thousands",
            done() {return player.p.nt.gte("1e3")},
            goalTooltip: "Reach 1,000 n(t).",
            doneTooltip: "Reach 1,000 n(t). (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
        22: {
            name: "In Billions",
            done() {return player.p.nt.gte("1e9")},
            goalTooltip: "Reach 1e9 n(t).",
            doneTooltip: "Reach 1e9 n(t). (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      23: {
            name: "A Be Googolgly now...",
            done() {return player.p.nt.gte("1e100")},
            goalTooltip: "Reach 1e100 n(t).",
            doneTooltip: "Reach 1e100 n(t). (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      24: {
            name: "Im Centillions",
            done() {return player.p.nt.gte("1e303")},
            goalTooltip: "Reach 1e303 n(t).",
            doneTooltip: "Reach 1e303 n(t). (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      25: {
            name: "Burj Greej When Spectating.",
            done() {return player.p.nt.gte("1.8e308")},
            goalTooltip: "Reach 1.8e308 n(t).",
            doneTooltip: "Reach 1.8e308 n(t). (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      31: {
            name: "Im Googolchime",
            done() {return player.p.nt.gte("1e1000")},
            goalTooltip: "Reach 1e1,000 n(t).",
            doneTooltip: "Reach 1e1,000 n(t). (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
    },
},
)
