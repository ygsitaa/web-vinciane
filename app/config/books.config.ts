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
    title: 'Pour les mamans fatiguées',
    author: 'Vinciane Hodiamont',
    description: 'Un espace pour respirer.',
    frontCoverImage: 'images/book1-front.jpg',
    backCoverImage: 'images/book1-back.jpg',
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
    title: 'Pour les enfants tornades',
    author: 'Vinciane Hodiamont',
    description: 'Un espace pour déposer tes émotions.',
    frontCoverImage: 'images/book2-front.jpg',
    backCoverImage: 'images/book2-back.jpg',
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
  }
]
