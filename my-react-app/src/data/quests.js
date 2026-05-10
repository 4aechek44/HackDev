export const quests = [
  {
    id: 0,
    title: 'Hello World',
    quest: 'Выведи "Hello, World!" в консоль',
    reward: { xp: 10, money: 5 },
    expected: 'Hello, World!',
    validate: (output) => output.trim() === 'Hello, World!',
  },
  //console.log("Hello, World!")

  {
    id: 1,
    title: 'Access Granted',
    quest: 'Выведи "Access granted"',
    reward: { xp: 15, money: 10 },
    expected: 'Access granted',
    validate: (output) => output.trim() === 'Access granted',
  },
  //console.log("Access granted")

  {
    id: 2,
    title: 'Agent Name',
    quest: 'Создай переменную agent со значением "Ghost"',
    reward: { xp: 20, money: 15 },
    expected: 'Ghost',
    validate: (_, scope) => scope.agent === 'Ghost',
  },
  //let agent = "Ghost"

  {
    id: 3,
    title: 'Credits',
    quest: 'Создай переменную credits со значением 100',
    reward: { xp: 25, money: 20 },
    expected: '100',
    validate: (_, scope) => scope.credits === 100,
  },
  //let credits = 100

  {
    id: 4,
    title: 'Update Credits',
    quest: 'Измени значение credits на 500',
    reward: { xp: 30, money: 25 },
    expected: '500',
    validate: (_, scope) => scope.credits === 500,
  },
  //let credits = 100
  //credits = 500

  {
    id: 5,
    title: 'Online Status',
    quest: 'Создай переменную online со значением true',
    reward: { xp: 35, money: 30 },
    expected: 'true',
    validate: (_, scope) => scope.online === true,
  },
  //let online = true

  {
    id: 6,
    title: 'Target IP',
    quest: 'Создай переменную target со значением "192.168.0.1"',
    reward: { xp: 40, money: 35 },
    expected: '192.168.0.1',
    validate: (_, scope) => scope.target === '192.168.0.1',
  },
  //let target = "192.168.0.1"

  {
    id: 7,
    title: 'Math Operation',
    quest: 'Выведи результат 50 + 25',
    reward: { xp: 45, money: 40 },
    expected: '75',
    validate: (output) => output.trim() === '75',
  },
  //console.log(50 + 25)

  {
    id: 8,
    title: 'Password Check',
    quest: 'Создай переменную password со значением "root"',
    reward: { xp: 50, money: 45 },
    expected: 'root',
    validate: (_, scope) => scope.password === 'root',
  },
  //let password = "root"

  {
    id: 9,
    title: 'Security Level',
    quest: 'Создай переменную security со значением 5',
    reward: { xp: 55, money: 50 },
    expected: '5',
    validate: (_, scope) => scope.security === 5,
  },
  //let security = 5

  {
    id: 10,
    title: 'If Statement',
    quest: 'Создай if который проверяет password === "root"',
    reward: { xp: 70, money: 60 },
    expected: 'if',
    validate: (_, scope, code) =>
      code.includes('if') && code.includes('password === "root"'),
  },
  // let password = "root"
  // if (password === "root") {
  //   console.log("Access granted")
  // }

  {
    id: 11,
    title: 'Denied Access',
    quest: 'Добавь else в условие',
    reward: { xp: 75, money: 65 },
    expected: 'else',
    validate: (_, scope, code) => code.includes('else'),
  },
  // let password = "root"
  //
  // if (password === "root") {
  //   console.log("Access granted")
  // } else {
  //   console.log("Access denied")
  // }


  {
    id: 12,
    title: 'Loop Scan',
    quest: 'Создай цикл for от 0 до 4',
    reward: { xp: 90, money: 70 },
    expected: 'for',
    validate: (_, scope, code) =>
      code.includes('for') && code.includes('i < 5'),
  },
  //for (let i = 0; i < 5; i++) {
  //console.log(i)
  //}

  {
    id: 13,
    title: 'Loop Output',
    quest: 'Выведи числа от 0 до 4',
    reward: { xp: 100, money: 80 },
    expected: '0\n1\n2\n3\n4',
    validate: (output) =>
      output.trim() === '0\n1\n2\n3\n4',
  },
  //for (let i = 0; i < 5; i++) {
  //console.log(i)
  //}

  {
    id: 14,
    title: 'Create Function',
    quest: 'Создай функцию hack',
    reward: { xp: 120, money: 100 },
    expected: 'function',
    validate: (_, scope) => typeof scope.hack === 'function',
  },
//function hack() {
//}

  {
    id: 15,
    title: 'Hack Function',
    quest: 'Сделай чтобы функция hack возвращала "Hacked"',
    reward: { xp: 140, money: 120 },
    expected: 'Hacked',
    validate: (_, scope) =>
      typeof scope.hack === 'function' &&
      scope.hack() === 'Hacked',
  },
  //function hack() {
  //return "Hacked"
  //}

  {
    id: 16,
    title: 'Targets Array',
    quest: 'Создай массив targets',
    reward: { xp: 150, money: 130 },
    expected: '[]',
    validate: (_, scope) => Array.isArray(scope.targets),
  },
  //let targets = []

  {
    id: 17,
    title: 'Add Targets',
    quest: 'Добавь 2 IP адреса в массив targets',
    reward: { xp: 170, money: 140 },
    expected: '2 targets',
    validate: (_, scope) =>
      Array.isArray(scope.targets) &&
      scope.targets.length === 2,
  },
  //let targets = [
  //"192.168.0.1",
  //"10.0.0.2"
  //]

  {
    id: 18,
    title: 'Server Object',
    quest: 'Создай объект server',
    reward: { xp: 180, money: 150 },
    expected: '{}',
    validate: (_, scope) =>
      typeof scope.server === 'object',
  },
  //let server = {}

  {
    id: 19,
    title: 'Server Properties',
    quest: 'Добавь в server свойства ip и security',
    reward: { xp: 200, money: 170 },
    expected: 'server configured',
    validate: (_, scope) =>
      scope.server?.ip &&
      scope.server?.security !== undefined,
  },
  //let server = {
  //ip: "192.168.0.1",
  //security: 5
  //}

  {
    id: 20,
    title: 'Final Access',
    quest: 'Выведи "ROOT ACCESS GRANTED"',
    reward: { xp: 500, money: 500 },
    expected: 'ROOT ACCESS GRANTED',
    validate: (output) =>
      output.trim() === 'ROOT ACCESS GRANTED',
  }
  //console.log("ROOT ACCESS GRANTED")
]