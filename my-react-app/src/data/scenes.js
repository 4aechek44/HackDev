export const scenes = [
    {
    id: 'home',
    url: '/first-steps',
    urls: ['/first-steps', 'first-steps', 'hackdev.local/first-steps'],
    title: 'Home',
    description: 'Welcome to the hacking simulation game! Your journey begins here.',
    background: 'home-bg.jpg',
    status: 'online',
    quests: [0, 1]
  },
  {
    id: 'training-node',
    url: '/training-node',
    urls: ['/training-node', 'training-node', 'training.local'],
    title: 'Training Node',
    description: 'A local test server for command and code challenges.',
    background: 'training-node-bg.jpg',
    status: 'idle',
    quests: [2, 3, 4]
  }
]
