// ! Global Variables
const BASE_URL = "http://localhost:3000/monsters/"
// ?_limit=50&_page=1

// ! Global Dom Elements
const container = document.getElementById("monster-container")
const forward = document.getElementById("forward")
const back = document.getElementById("back")

// ! Communcating with the Server
const fetchMonsters = () => {
	fetch(`${BASE_URL}?_limit=3&_page=1`)
		.then((res) => res.json())
		.then((monsterData) => {
			console.log(monsterData)
			monsterData.forEach((monsterObj) => {
				renderMonster(monsterObj)
			})
		})
}

const renderMonster = (monster) => {
	// build manualling for the first monster in the debugger,
	// then move the code over here
	const monsterDiv = document.createElement("div")
	const nameTag = document.createElement("h2")
	const ageTag = document.createElement("h3")
	const descTag = document.createElement("p")
	const abilityList = document.createElement("ul")

	nameTag.textContent = monster.name
	ageTag.textContent = monster.age
	descTag.textContent = monster.description
  // imgTag.src = monster.image

	monster.abilities.forEach((ability) => {
		const li = document.createElement("li")
    li.textContent = ability
    abilityList.append(li)
	})

	monsterDiv.append(nameTag, ageTag, descTag, abilityList)

	container.prepend(monsterDiv)
}

const handleSubmit = (e) => {
	e.preventDefault()
	const newMonsterObj = {
		name: e.target["name-input"].value,
		age: e.target.age.value,
		description: e.target.description.value,
	}
	console.log(newMonsterObj)
	renderMonster(newMonsterObj)
}

const init = () => {
	fetchMonsters()
	document
		.getElementById("monster-form")
		.addEventListener("submit", handleSubmit)
}
init()
