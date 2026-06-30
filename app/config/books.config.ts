export interface StoreLink {
  name: string
  url: string
  icon?: string
}

export interface BookPage {
  title?: string
  content: string
}

export interface Book {
  id: string
  title: string
  author: string
  description: string
  frontCoverImage: string
  backCoverImage: string
  pages: BookPage[]
  stores: StoreLink[]
}

export const booksConfig: Book[] = [
  {
    id: 'book-1',
    title: 'The Digital Odyssey',
    author: 'Vinciane',
    description: 'A journey through the virtual realms of modern storytelling, where digital and physical worlds converge.',
    frontCoverImage: '/images/book1_front.png',
    backCoverImage: '/images/book1_back.png',
    pages: [
      { title: 'Chapter 1', content: 'The screen flickered once, then resolved into something that was neither here nor there — a landscape painted in light, breathing with the rhythm of forgotten code.' },
      { title: 'Chapter 2', content: 'She walked the corridors of data as if they were ancient hallways, each doorway leading to memories stored not in minds but in machines.' },
      { content: 'The boundary between reader and story dissolved. Words became worlds. Sentences became streets. Paragraphs became entire civilizations rising and falling in the space between breaths.' },
      { content: '"What is real?" she asked the algorithm. It paused — an eternity in machine time — then answered: "What you choose to remember."' },
      { content: 'In the end, the odyssey was not about reaching a destination. It was about the transformation that happened along the way — becoming both the map and the territory.' }
    ],
    stores: [
      { name: 'Amazon', url: 'https://amazon.com' },
      { name: 'Fnac', url: 'https://fnac.com' },
    ]
  },
  {
    id: 'book-2',
    title: 'Neon Shadows',
    author: 'Vinciane',
    description: 'Cyberpunk aesthetics meet classical literature in a neon-drenched exploration of identity.',
    frontCoverImage: '/images/book2_front.png',
    backCoverImage: '/images/book2_back.png',
    pages: [
      { title: 'Prologue', content: 'The city never slept, but it dreamed. Neon hieroglyphs pulsed on every surface, telling stories in a language only the lonely could read.' },
      { title: 'Part One', content: 'Rain fell through holographic advertisements, each droplet catching fragments of desire, aspiration, and the quiet desperation of a million connected souls.' },
      { content: 'He found the book in the last physical library — a relic of ink and paper, smelling of centuries. Its pages whispered secrets that no digital copy could hold.' },
      { content: 'The shadows had names here. They wore neon like armor and spoke in frequencies that made the heart resonate with truths better left unheard.' }
    ],
    stores: [
      { name: 'Amazon', url: 'https://amazon.com' },
      { name: 'Fnac', url: 'https://fnac.com' }
    ]
  },
  {
    id: 'book-3',
    title: 'Minimalist Futures',
    author: 'Vinciane',
    description: 'Exploring the beauty of simplicity in a complex world. Less is not just more — it is everything.',
    frontCoverImage: '/images/book3_front.png',
    backCoverImage: '/images/book3_back.png',
    pages: [
      { title: 'On Simplicity', content: 'Strip away the unnecessary. What remains is not emptiness but essence — the irreducible core of what it means to exist, to create, to be.' },
      { content: 'In a world drowning in noise, silence became the most revolutionary act. She chose it deliberately, like an artist choosing the perfect shade of white.' },
      { content: 'The future arrived not with a bang but with a gentle subtraction. Each day, something was removed. Each day, what remained became more precious.' },
      { content: 'Minimalism was never about having less. It was about making room for what matters. And what matters, she discovered, was always simpler than she thought.' },
      { content: 'The final page was blank. Not empty — full of possibility. The reader understood: the most important story was the one they would write themselves.' }
    ],
    stores: [
      { name: 'Amazon', url: 'https://amazon.com' },
      { name: 'Apple Books', url: 'https://books.apple.com' }
    ]
  }
]
