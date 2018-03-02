Vue.config.productionTip = false

var myApp = new Vue({
    el: '#app',
    data: {
	screen: 0,
	lastResultIsWin: false,
	isGameOver: false,
	turn: null,
	playerData: {
	    one: {
		symbol: 'X'
	    },
	    two: {
		symbol: 'O',
		isComputer: true
	    }
	},
	winner: [],
	gameData: [
	    ['', '', ''],
	    ['', '', ''],
	    ['', '', '']
	],
	winCombos: [
	    [1, 2, 3],
	    [4, 5, 6],
	    [7, 8, 9],
	    [1, 4, 7],
	    [2, 5, 8],
	    [3, 6, 9],
	    [1, 5, 9],
	    [7, 5, 3]
	]
    },
    created () {},
    mounted () {},
    watch: {},
    computed: {
	winnerMessage () {
	    let lastWinner = this.winner[this.winner.length - 1]
	    if (lastWinner === 'one') {
		return 'Congratulations!<br/> Player One has won the game.'
	    } else {
		if (this.playerData.two.isComputer) {
		    return 'Awww... You lost!'
		} else {
		    return 'Congratulations! Player Two has won the game.'
		}
	    }
	},
	playerOneScore () {
	    return this.winner.filter((item) => {
		return item === 'one'
	    }).length
	},
	vlayerTwoScore () {
	    return this.winner.filter((item) => {
		return item === 'two'
	    }).length
	},
	playerTwoName () {
	    return this.playerData.two.isComputer ? 'Computer' : 'Player Two'
	}
    },
    methods: {
    validateStatus () {
	let players = ['one', 'two']
	let emptyPos = []
	let isWin = false
	let row
	let cell
	let i

	players.forEach((player) => {
	    for (i = 0; i < this.winCombos.length; i++) {
		let winCombo = this.winCombos[i]

		let sequence = winCombo.filter((val) => {
		    val--
		    row = Math.floor(val / 3)
		    cell = Math.floor(val % 3)

		    return this.gameData[row][cell] === this.playerData[player].symbol
		}, this)

		if (sequence.length === 3) {
		    isWin = true
		    this.winner.push(player)
		    break
		}
	    }
	}, this)

	if (!isWin) {
	    this.gameData.forEach((row, i) => {
		row.forEach((cell, j) => {
		    if (cell === '') {
			emptyPos.push({
			    row: i,
			    cell: j
			})
		    }
		})
	    })

	    if (emptyPos.length === 0) {
		this.isGameOver = true
		this.lastResultIsWin = false
	    } else {
		this.nextTurn()
	    }
	} else {
	    this.isGameOver = true
	    this.lastResultIsWin = true
	}
    },
    nextTurn () {
	if (this.turn === 'one') {
	    this.turn = 'two'
	    // simulate computer trun
	    if (this.playerData.two.isComputer) {
		this.playComputerTurn()
		this.validateStatus()
	    }
	} else {
	    this.turn = 'one'
	}
    },
    playComputerTurn () {
	let emptyPos = []
	let emptyPosValue

	this.gameData.forEach((row, i) => {
	    row.forEach((cell, j) => {
		if (cell === '') {
		    emptyPos.push({
			row: i,
			cell: j
		    })
		}
	    })
	})

	if (emptyPos.length === 0) return
	emptyPosValue = emptyPos[Math.floor(Math.random() * (emptyPos.length - 1))]
	this.gameData[emptyPosValue.row][emptyPosValue.cell] = this.playerData.two.symbol
    },
    startGame () {
	this.turn = ['one', 'two'][Math.floor(Math.random() * 1)]
	this.isGameOver = false
	this.gameData = [
	    ['','',''],
	    ['','',''],
	    ['','','']
	]
	this.screen = 3
    },
    setPlayerSymbol (symbol) {
	this.playerData.one.symbol = symbol
	this.playerData.two.symbol = symbol === 'X' ? 'O' : 'X'

	this.skipScreen()
	this.startGame()
    },
    setGameType (type) {
	this.playerData.two.isComputer = type
	this.skipScreen()
    },
    skipScreen () {
	this.screen += 1
    },
    resetScreen () {
	this.screen = 0
	this.winner = []
	this.playerData.two.isComputer = true
    },
    cellClick (e, row, cell) {
	let target = e.target
	if (target.innerHTML !== '') return
	if (this.turn === 'two' && this.playerData[this.turn].isComputer) return
	this.gameData[row][cell] = this.playerData[this.turn].symbol
	this.validateStatus()
    },
    cellHighlight (e) {
	let target = e.target
	if (target.innerHTML !== '') return
	if (this.turn === 'two' && this.playerData[this.turn].isComputer) return
	if (e.type === 'mouseenter') {
	    target.className = this.playerData[this.turn].symbol
	} else {
	    target.className = ''
	}
    }
}
})
