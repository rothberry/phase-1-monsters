const MONSTER_BASE_URL = "http://localhost:3000/monsters/"
const monsterContainer = document.getElementById("monster-container")
const monsterForm = document.getElementById("monster-form")
const back = document.getElementById("back")
const forward = document.getElementById("forward")
let pageNum = 1

// let allMonstersArr =

const fetchMonstersByPage = () => {
	fetch(MONSTER_BASE_URL + "?_limit=2&_page=" + pageNum)
		.then((response) => response.json())
		.then((monsterData) => {
			console.log(monsterData)
			resetContainer()
			monsterData.forEach((monster) => {
				// create our individual monster card
				createMonsterCard(monster)
			})
		})
}

const createMonsterCard = (monster) => {
	const div = document.createElement("div")
	const nameTag = document.createElement("h1")
	const ageTag = document.createElement("h2")
	const descTag = document.createElement("p")

	// div.addEventListener("click", (e) => console.log(e.target))

	nameTag.textContent = monster.name
	ageTag.textContent = monster.age
	descTag.textContent = monster.description

	div.append(nameTag, ageTag, descTag)
	monsterContainer.append(div)
}

const fetchPostMonster = (newMonsterObj) => {
	const postReqObj = {
		method: "POST",
		headers: {
			"content-type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(newMonsterObj),
		// body: JSON.stringify({name, age, desc}),
	}

	fetch(MONSTER_BASE_URL, postReqObj)
		.then((response) => response.json())
		.then((monsterObj) => {
			console.log(monsterObj)
			createMonsterCard(monsterObj)
		})
}

const handleForward = () => {
	// resend the fetch req for the current page plus 1 (if it exists)
	console.log("FORWARD")
	// console.log((pageNum += 1))
	pageNum += 1
	fetchMonstersByPage()
}

const handleBack = () => {
	// resend the fetch req for the current page minus 1 (if it exists)
	console.log("BACKWARDS")
	// console.log((pageNum -= 1))
	pageNum -= 1
	if (pageNum < 1) {
		pageNum = 1
	} else {
		fetchMonstersByPage()
	}
}

const handleAddMonster = (event) => {
	event.preventDefault()
	const name = event.target[0].value
	const age = event.target[1].value
	const description = event.target[2].value
	fetchPostMonster({ name, age, description })
}

const resetContainer = () => {
	monsterContainer.innerHTML = ""
}

const init = () => {
	fetchMonstersByPage()
	monsterForm.addEventListener("submit", handleAddMonster)
	forward.addEventListener("click", handleForward)
	back.addEventListener("click", handleBack)
}

init()
