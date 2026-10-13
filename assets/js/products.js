/**
 * RetroSpin - Product Database
 * Curated catalog of Vintage Vinyl Records and High-Fidelity Audio Equipment
 * Currency: INR (₹)
 */

const PRODUCTS = [
  // ==========================================
  // VINYL RECORDS (Catalog: Rock, Jazz, Pop, Blues, Soul, Classical)
  // ==========================================
  {
    id: "vinyl-001",
    type: "vinyl",
    title: "Kind of Blue (180g Audiophile Pressing)",
    artist: "Miles Davis",
    genre: "Jazz",
    decade: "1950s",
    releaseYear: 1959,
    price: 3499,
    originalPrice: 4200,
    rating: 5.0,
    reviewCount: 148,
    badge: "Rare Masterpiece",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Heavyweight Vinyl",
    inStock: true,
    stockCount: 7,
    image: "https://i.pinimg.com/1200x/8d/74/a5/8d74a5f7b686207247eae84f6e292668.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/8d/74/a5/8d74a5f7b686207247eae84f6e292668.jpg",
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
      "https://i.pinimg.com/1200x/f2/da/70/f2da70ca61b60277c25887316ef64379.jpg"
    ],
    description: "Miles Davis' legendary masterpiece captured from original Columbia analog master tapes. Featuring John Coltrane, Cannonball Adderley, Bill Evans, and Paul Chambers. Pure modal jazz perfection that redefined modern music.",
    tracklist: [
      { side: "Side A", tracks: ["1. So What (9:22)", "2. Freddie Freeloader (9:46)", "3. Blue in Green (5:37)"] },
      { side: "Side B", tracks: ["1. All Blues (11:33)", "2. Flamenco Sketches (9:26)"] }
    ],
    pressInfo: "Mastered from original analog tapes at Sterling Sound. Pressed at Pallas, Germany.",
    isFeatured: true,
    isRare: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "vinyl-002",
    type: "vinyl",
    title: "The Dark Side of the Moon (50th Anniversary Remaster)",
    artist: "Pink Floyd",
    genre: "Rock",
    decade: "1970s",
    releaseYear: 1973,
    price: 4199,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 230,
    badge: "Best Seller",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Gatefold Vinyl",
    inStock: true,
    stockCount: 15,
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546707012-c46675f12716?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The seminal progressive rock album of all time. Deluxe gatefold package with original posters and stickers faithfully reproduced. Remastered under the direct supervision of James Guthrie.",
    tracklist: [
      { side: "Side A", tracks: ["1. Speak to Me / Breathe (3:58)", "2. On the Run (3:35)", "3. Time (6:53)", "4. The Great Gig in the Sky (4:44)"] },
      { side: "Side B", tracks: ["1. Money (6:23)", "2. Us and Them (7:49)", "3. Any Colour You Like (3:26)", "4. Brain Damage (3:46)", "5. Eclipse (2:12)"] }
    ],
    pressInfo: "Abbey Road Studios Half-Speed Master. Original Harvest Records packaging.",
    isFeatured: true,
    isRare: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "vinyl-003",
    type: "vinyl",
    title: "A Love Supreme (Impulse! Gatefold Edition)",
    artist: "John Coltrane",
    genre: "Jazz",
    decade: "1960s",
    releaseYear: 1965,
    price: 3899,
    originalPrice: 4500,
    rating: 4.9,
    reviewCount: 95,
    badge: "Collector Gem",
    condition: "Near Mint (NM)",
    speed: "33 1/3 RPM",
    weight: "180g Vinyl",
    inStock: true,
    stockCount: 4,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Coltrane's four-part spiritual suite recorded in a single historic December session at Van Gelder Studio. Rich acoustic overtone reproduction and emotional gravitas.",
    tracklist: [
      { side: "Side A", tracks: ["Part 1: Acknowledgement (7:47)", "Part 2: Resolution (7:22)"] },
      { side: "Side B", tracks: ["Part 3: Pursuance (10:45)", "Part 4: Psalm (7:08)"] }
    ],
    pressInfo: "Analogue Productions series, pressed on SuperVinyl at QRP.",
    isFeatured: true,
    isRare: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "vinyl-004",
    type: "vinyl",
    title: "Abbey Road (Original Master Recording)",
    artist: "The Beatles",
    genre: "Rock",
    decade: "1960s",
    releaseYear: 1969,
    price: 4499,
    originalPrice: 5200,
    rating: 5.0,
    reviewCount: 312,
    badge: "Essential Classic",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Heavyweight Vinyl",
    inStock: true,
    stockCount: 18,
    image: "https://i.pinimg.com/736x/5e/d1/09/5ed10987c9e14e8549c98c2a27ece09a.jpg",
    gallery: [
      "https://i.pinimg.com/736x/5e/d1/09/5ed10987c9e14e8549c98c2a27ece09a.jpg"
    ],
    description: "The timeless swan song of the Fab Four, featuring the legendary Side B medley. Pristine separation of George Harrison's guitars and Paul McCartney's warm bass lines.",
    tracklist: [
      { side: "Side A", tracks: ["1. Come Together (4:20)", "2. Something (3:03)", "3. Maxwell's Silver Hammer (3:27)", "4. Oh! Darling (3:26)", "5. Octopus's Garden (2:51)", "6. I Want You (She's So Heavy) (7:47)"] },
      { side: "Side B", tracks: ["1. Here Comes The Sun (3:05)", "2. Because (2:45)", "3. You Never Give Me Your Money (4:02)", "4. Sun King / Mean Mr Mustard (3:32)", "5. Polythene Pam / She Came In Through The Bathroom Window (2:50)", "6. Golden Slumbers / Carry That Weight / The End (5:45)"] }
    ],
    pressInfo: "Apple Records official 50th-anniversary mix by Giles Martin.",
    isFeatured: false,
    isRare: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "vinyl-005",
    type: "vinyl",
    title: "Rumours (Textured Sleeve Reissue)",
    artist: "Fleetwood Mac",
    genre: "Pop",
    decade: "1970s",
    releaseYear: 1977,
    price: 3299,
    originalPrice: 3800,
    rating: 4.8,
    reviewCount: 189,
    badge: "Best Seller",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "140g Standard Vinyl",
    inStock: true,
    stockCount: 22,
    image: "https://i.pinimg.com/736x/2a/b5/63/2ab5631953bb18698d369b0dc0c43d2a.jpg",
    gallery: [
      "https://i.pinimg.com/736x/2a/b5/63/2ab5631953bb18698d369b0dc0c43d2a.jpg"
    ],
    description: "Over 40 million copies sold worldwide. Experience Stevie Nicks and Lindsey Buckingham's raw harmonies and acoustic textures with true analog presence.",
    tracklist: [
      { side: "Side A", tracks: ["1. Second Hand News (2:53)", "2. Dreams (4:14)", "3. Never Going Back Again (2:14)", "4. Don't Stop (3:13)", "5. Go Your Own Way (3:43)", "6. Songbird (3:21)"] },
      { side: "Side B", tracks: ["1. The Chain (4:30)", "2. You Make Loving Fun (3:31)", "3. I Don't Want to Know (3:15)", "4. Oh Daddy (3:56)", "5. Gold Dust Woman (4:56)"] }
    ],
    pressInfo: "Warner Records release, pressed at RTI with lacquer cut by Kevin Gray.",
    isFeatured: true,
    isRare: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "vinyl-006",
    type: "vinyl",
    title: "What's Going On (Tamla Motown Original Style)",
    artist: "Marvin Gaye",
    genre: "Soul",
    decade: "1970s",
    releaseYear: 1971,
    price: 3699,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 115,
    badge: "Soul Pioneer",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Vinyl",
    inStock: true,
    stockCount: 6,
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A soul landmark meditating on love, war, urban struggles, and ecology. Features Motown's iconic rhythm section The Funk Brothers, strings, and multi-tracked vocal layers.",
    tracklist: [
      { side: "Side A", tracks: ["1. What's Going On (3:53)", "2. What's Happening Brother (2:43)", "3. Flyin' High (In the Friendly Sky) (3:49)", "4. Save the Children (4:03)", "5. God Is Love (1:41)", "6. Mercy Mercy Me (The Ecology) (3:14)"] },
      { side: "Side B", tracks: ["1. Right On (7:31)", "2. Wholy Holy (3:08)", "3. Inner City Blues (Make Me Wanna Holler) (5:26)"] }
    ],
    pressInfo: "Direct metal mastering from original Motown analog source tapes.",
    isFeatured: false,
    isRare: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "vinyl-007",
    type: "vinyl",
    title: "Born Under a Bad Sign (Stax Records Classic)",
    artist: "Albert King",
    genre: "Blues",
    decade: "1960s",
    releaseYear: 1967,
    price: 3199,
    originalPrice: 3700,
    rating: 4.8,
    reviewCount: 78,
    badge: "Blues Essential",
    condition: "Very Good Plus (VG+)",
    speed: "33 1/3 RPM",
    weight: "150g Vinyl",
    inStock: true,
    stockCount: 5,
    image: "https://i.pinimg.com/736x/76/10/e7/7610e7042b3c2bc8d1ee66d3a701e724.jpg",
    gallery: [
      "https://i.pinimg.com/736x/76/10/e7/7610e7042b3c2bc8d1ee66d3a701e724.jpg"
    ],
    description: "Accompanied by Booker T. & the M.G.'s and the Memphis Horns, Albert King delivers scorching electric blues guitar riffs that directly inspired Jimi Hendrix and Eric Clapton.",
    tracklist: [
      { side: "Side A", tracks: ["1. Born Under a Bad Sign (2:47)", "2. Crosscut Saw (2:35)", "3. Born Blind (2:32)", "4. Down Don't Bother Me (2:10)", "5. The Hunter (2:45)"] },
      { side: "Side B", tracks: ["1. I Almost Lost My Mind (3:30)", "2. Personal Manager (4:31)", "3. Laundromat Blues (3:21)", "4. As the Years Go Passing By (3:48)"] }
    ],
    pressInfo: "Stax 60th Anniversary collection. Mastered by Ron McMaster.",
    isFeatured: false,
    isRare: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: "vinyl-008",
    type: "vinyl",
    title: "The Four Seasons (Herbert von Karajan & Berliner Philharmoniker)",
    artist: "Antonio Vivaldi",
    genre: "Classical",
    decade: "1970s",
    releaseYear: 1972,
    price: 2999,
    originalPrice: 3500,
    rating: 4.9,
    reviewCount: 64,
    badge: "Audiophile Classical",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Deutsche Grammophon",
    inStock: true,
    stockCount: 8,
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The definitive Deutsche Grammophon recording with Karajan leading the Berlin Philharmonic. Exceptional dynamic range, orchestral depth, and violin virtuosity.",
    tracklist: [
      { side: "Side A", tracks: ["1. Spring (La Primavera) - Concerto No. 1", "2. Summer (L'Estate) - Concerto No. 2"] },
      { side: "Side B", tracks: ["1. Autumn (L'Autunno) - Concerto No. 3", "2. Winter (L'Inverno) - Concerto No. 4"] }
    ],
    pressInfo: "Original DG yellow label pressing faithfully recut from the analogue masters.",
    isFeatured: false,
    isRare: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "vinyl-009",
    type: "vinyl",
    title: "Led Zeppelin IV (ZoSo Vintage Pressing)",
    artist: "Led Zeppelin",
    genre: "Rock",
    decade: "1970s",
    releaseYear: 1971,
    price: 3999,
    originalPrice: 4600,
    rating: 5.0,
    reviewCount: 280,
    badge: "Rare Find",
    condition: "Near Mint (NM)",
    speed: "33 1/3 RPM",
    weight: "180g Vinyl",
    inStock: true,
    stockCount: 3,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Featuring 'Stairway to Heaven', 'Black Dog', and 'When the Levee Breaks'. Recorded at Headley Grange using the Rolling Stones Mobile Studio for unmatched acoustic drum room reverb.",
    tracklist: [
      { side: "Side A", tracks: ["1. Black Dog (4:56)", "2. Rock and Roll (3:40)", "3. The Battle of Evermore (5:52)", "4. Stairway to Heaven (8:02)"] },
      { side: "Side B", tracks: ["1. Misty Mountain Hop (4:38)", "2. Four Sticks (4:46)", "3. Going to California (3:31)", "4. When the Levee Breaks (7:07)"] }
    ],
    pressInfo: "Remastered by Jimmy Page at Metropolis Studios, London.",
    isFeatured: true,
    isRare: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: "vinyl-010",
    type: "vinyl",
    title: "Blue Train (Blue Note Tone Poet Series)",
    artist: "John Coltrane",
    genre: "Jazz",
    decade: "1950s",
    releaseYear: 1958,
    price: 4599,
    originalPrice: 5300,
    rating: 5.0,
    reviewCount: 88,
    badge: "Tone Poet Edition",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Audiophile SuperVinyl",
    inStock: true,
    stockCount: 5,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The only album Coltrane recorded as a leader for Blue Note. Featuring Lee Morgan, Curtis Fuller, Kenny Drew, Paul Chambers, and Philly Joe Jones. Mastered by Kevin Gray from original mono/stereo master tapes.",
    tracklist: [
      { side: "Side A", tracks: ["1. Blue Train (10:41)", "2. Moment's Notice (9:10)"] },
      { side: "Side B", tracks: ["1. Locomotion (7:14)", "2. I'm Old Fashioned (7:58)", "3. Lazy Bird (7:05)"] }
    ],
    pressInfo: "Blue Note Tone Poet Series; Stoughton gatefold tip-on jacket.",
    isFeatured: false,
    isRare: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "vinyl-011",
    type: "vinyl",
    title: "Thriller (Epic Gatefold 25th Edition)",
    artist: "Michael Jackson",
    genre: "Pop",
    decade: "1980s",
    releaseYear: 1982,
    price: 3499,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 340,
    badge: "All-Time Best Seller",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Vinyl",
    inStock: true,
    stockCount: 20,
    image: "https://i.pinimg.com/1200x/9e/b0/dc/9eb0dc26b198f37b88f4c2d958907249.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/9e/b0/dc/9eb0dc26b198f37b88f4c2d958907249.jpg"
    ],
    description: "Produced by Quincy Jones, Thriller is the best-selling album of all time. Packed with bass grooves like 'Billie Jean' and horn attacks on 'Beat It'.",
    tracklist: [
      { side: "Side A", tracks: ["1. Wanna Be Startin' Somethin' (6:03)", "2. Baby Be Mine (4:20)", "3. The Girl Is Mine (3:42)", "4. Thriller (5:57)"] },
      { side: "Side B", tracks: ["1. Beat It (4:18)", "2. Billie Jean (4:54)", "3. Human Nature (4:06)", "4. P.Y.T. (Pretty Young Thing) (3:59)", "5. The Lady in My Life (4:59)"] }
    ],
    pressInfo: "Sony Music Legacy release with pristine dynamic separation.",
    isFeatured: false,
    isRare: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "vinyl-012",
    type: "vinyl",
    title: "At Folsom Prison (Columbia Live Mono)",
    artist: "Johnny Cash",
    genre: "Blues",
    decade: "1960s",
    releaseYear: 1968,
    price: 2899,
    originalPrice: 3400,
    rating: 4.8,
    reviewCount: 92,
    badge: "Live Legend",
    condition: "Very Good Plus (VG+)",
    speed: "33 1/3 RPM",
    weight: "140g Vinyl",
    inStock: true,
    stockCount: 6,
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The raw electric energy of Cash performing before inmates at Folsom State Prison. A visceral slice of American roots, country blues, and folk history.",
    tracklist: [
      { side: "Side A", tracks: ["1. Folsom Prison Blues (2:42)", "2. Dark as the Dungeon (3:04)", "3. I Still Miss Someone (1:38)", "4. Cocaine Blues (3:01)", "5. 25 Minutes to Go (3:37)"] },
      { side: "Side B", tracks: ["1. Orange Blossom Special (3:06)", "2. The Long Black Veil (3:58)", "3. Send a Picture of Mother (2:05)", "4. The Wall (1:36)", "5. Jackson (duet with June Carter) (2:55)"] }
    ],
    pressInfo: "Original Columbia mono master transfer.",
    isFeatured: false,
    isRare: false,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: "vinyl-013",
    type: "vinyl",
    title: "Are You Experienced (Jimi Hendrix Experience)",
    artist: "Jimi Hendrix",
    genre: "Rock",
    decade: "1960s",
    releaseYear: 1967,
    price: 3799,
    originalPrice: 4400,
    rating: 4.9,
    reviewCount: 164,
    badge: "Psychedelic Rock",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Vinyl",
    inStock: true,
    stockCount: 9,
    image: "https://i.pinimg.com/736x/cb/96/b2/cb96b2bcf886e206e209797813341eac.jpg",
    gallery: [
      "https://i.pinimg.com/736x/cb/96/b2/cb96b2bcf886e206e209797813341eac.jpg"
    ],
    description: "The groundbreaking debut that shook rock guitar playing forever. Includes 'Purple Haze', 'Hey Joe', and 'The Wind Cries Mary'.",
    tracklist: [
      { side: "Side A", tracks: ["1. Purple Haze (2:50)", "2. Manic Depression (3:42)", "3. Hey Joe (3:30)", "4. Love or Confusion (3:12)", "5. May This Be Love (3:10)", "6. I Don't Live Today (3:55)"] },
      { side: "Side B", tracks: ["1. The Wind Cries Mary (3:20)", "2. Fire (2:43)", "3. 3rd Stone from the Sun (6:44)", "4. Foxey Lady (3:18)", "5. Are You Experienced? (4:14)"] }
    ],
    pressInfo: "All-analog remaster by Eddie Kramer and George Marino.",
    isFeatured: false,
    isRare: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "vinyl-014",
    type: "vinyl",
    title: "Lady in Satin (Original Mono Fidelity)",
    artist: "Billie Holiday",
    genre: "Soul",
    decade: "1950s",
    releaseYear: 1958,
    price: 3599,
    originalPrice: 4100,
    rating: 4.8,
    reviewCount: 67,
    badge: "Vocal Masterpiece",
    condition: "Near Mint (NM)",
    speed: "33 1/3 RPM",
    weight: "180g Vinyl",
    inStock: true,
    stockCount: 4,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Billie Holiday's poignant penultimate album backed by Ray Ellis' lush orchestral arrangements. Heart-wrenching emotive delivery on 'I'm a Fool to Want You'.",
    tracklist: [
      { side: "Side A", tracks: ["1. I'm a Fool to Want You (3:23)", "2. For Heaven's Sake (3:26)", "3. You Don't Know What Love Is (3:48)", "4. I Get Along Without You Very Well (2:59)"] },
      { side: "Side B", tracks: ["1. For All We Know (2:53)", "2. Violets for Your Furs (3:24)", "3. You've Changed (3:17)", "4. It's Easy to Remember (2:45)"] }
    ],
    pressInfo: "Columbia Masterworks 60th anniversary high fidelity press.",
    isFeatured: false,
    isRare: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: "vinyl-015",
    type: "vinyl",
    title: "Nevermind (30th Anniversary Gatefold)",
    artist: "Nirvana",
    genre: "Rock",
    decade: "1990s",
    releaseYear: 1991,
    price: 3699,
    originalPrice: 4300,
    rating: 4.9,
    reviewCount: 220,
    badge: "Grunge Essential",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "180g Vinyl + 7-inch Bonus",
    inStock: true,
    stockCount: 11,
    image: "https://i.pinimg.com/1200x/6f/5f/cf/6f5fcfbe8b63f0402a159ffc461e8edf.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/6f/5f/cf/6f5fcfbe8b63f0402a159ffc461e8edf.jpg"
    ],
    description: "The generational lightning bolt produced by Butch Vig. Exploding dynamics from acoustic introspection to ferocious guitar roar. Includes bonus 7-inch single.",
    tracklist: [
      { side: "Side A", tracks: ["1. Smells Like Teen Spirit (5:01)", "2. In Bloom (4:14)", "3. Come As You Are (3:38)", "4. Breed (3:03)", "5. Lithium (4:16)", "6. Polly (2:57)"] },
      { side: "Side B", tracks: ["1. Territorial Pissings (2:22)", "2. Drain You (3:43)", "3. Lounge Act (2:36)", "4. Stay Away (3:32)", "5. On a Plain (3:16)", "6. Something in the Way (3:52)"] }
    ],
    pressInfo: "Geffen Records half-speed mastering from analog safety copies.",
    isFeatured: true,
    isRare: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "vinyl-016",
    type: "vinyl",
    title: "Beethoven: Symphony No. 9 'Choral'",
    artist: "Leonard Bernstein & Vienna Philharmonic",
    genre: "Classical",
    decade: "1970s",
    releaseYear: 1979,
    price: 3999,
    originalPrice: 4800,
    rating: 4.8,
    reviewCount: 52,
    badge: "2xLP Box Set",
    condition: "Mint (M)",
    speed: "33 1/3 RPM",
    weight: "2x 180g Double LP",
    inStock: true,
    stockCount: 6,
    image: "https://i.pinimg.com/736x/43/61/9e/43619edcb2ad862c82bdc35f76a419c0.jpg",
    gallery: [
      "https://i.pinimg.com/736x/43/61/9e/43619edcb2ad862c82bdc35f76a419c0.jpg"
    ],
    description: "The monumental Viennese recording captured live at the Golden Hall of the Musikverein. Glorious vocal climaxes and Bernstein's passionate interpretation.",
    tracklist: [
      { side: "LP 1", tracks: ["Side 1: Allegro ma non troppo, un poco maestoso", "Side 2: Molto vivace - Presto"] },
      { side: "LP 2", tracks: ["Side 3: Adagio molto e cantabile", "Side 4: Presto - Allegro assai (Ode to Joy)"] }
    ],
    pressInfo: "Deutsche Grammophon collector double LP with full booklet.",
    isFeatured: false,
    isRare: true,
    isBestSeller: false,
    isNewArrival: false
  },

  // ==========================================
  // AUDIO EQUIPMENT (Turntables, Amplifiers, Speakers, Headphones, Accessories)
  // ==========================================
  {
    id: "eq-001",
    type: "equipment",
    category: "Turntables",
    title: "RetroSpin Artisan Walnut Belt-Drive Turntable",
    brand: "RetroSpin Signature",
    condition: "Brand New",
    price: 24999,
    originalPrice: 28500,
    rating: 4.9,
    reviewCount: 89,
    badge: "Store Flagship",
    speed: "33 1/3 & 45 RPM",
    connectivity: "Switchable Phono/Line Preamp, RCA Out, Ground Terminal",
    cartridge: "Audio-Technica AT-VM95E Dual Magnet",
    driveType: "Precision Belt-Drive",
    platter: "Heavy Solid Die-Cast Aluminum Platter with Anti-Vibration Felt Mat",
    inStock: true,
    stockCount: 8,
    image: "https://i.pinimg.com/1200x/5b/2e/f3/5b2ef3d038300b306764d8d363db2ec8.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1546707012-c46675f12716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crafted from real walnut hardwood plinth with isolated DC motor to eliminate unwanted resonance. Includes precision carbon-fiber tonearm, adjustable counterweight, and pre-aligned AT-VM95E elliptical diamond cartridge for jaw-dropping vinyl clarity.",
    specs: {
      "Motor Type": "Isolated Low-Noise DC Motor",
      "Rotation Speeds": "33 1/3, 45 RPM (Electronic Speed Switch)",
      "Tonearm": "8.6\" Carbon Fiber, Static Balanced",
      "Cartridge Included": "Audio-Technica AT-VM95E Elliptical Diamond",
      "Signal-to-Noise Ratio": "> 68 dB",
      "Built-in Preamp": "Yes (Switchable Line / Phono Out)",
      "Plinth Material": "Solid Acoustic Grade Walnut MDF Core",
      "Dimensions": "420 x 360 x 140 mm",
      "Weight": "7.8 kg"
    },
    isFeatured: true,
    isBestSeller: true,
    isStaffPick: true
  },
  {
    id: "eq-002",
    type: "equipment",
    category: "Turntables",
    title: "Technics SL-1200MK2 Direct-Drive Legend",
    brand: "Technics",
    condition: "Vintage Refurbished",
    price: 54999,
    originalPrice: 62000,
    rating: 5.0,
    reviewCount: 42,
    badge: "Rare Vintage Icon",
    speed: "33 1/3 & 45 RPM",
    connectivity: "Gold-Plated RCA with Ground Cable",
    cartridge: "Ortofon 2M Red Included",
    driveType: "Quartz Direct Drive",
    platter: "Heavyweight Rubber Damped Aluminum",
    inStock: true,
    stockCount: 2,
    image: "https://images.unsplash.com/photo-1542395118-9d95347995bc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542395118-9d95347995bc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The gold standard of direct-drive turntables since 1979. Professionally overhauled and calibrated by our master audio technicians: new pitch fader, re-lubricated spindle bearing, fresh tone arm wiring, and polished aluminum chassis.",
    specs: {
      "Motor Type": "Quartz-Locked Direct Drive",
      "Speed Accuracy": "0.01% Wow & Flutter",
      "Tonearm": "S-shaped Universal Static Balanced Gimbal Suspension",
      "Pitch Adjustment": "±8% Continuous Quartz Pitch Slider",
      "Cartridge": "Ortofon 2M Red MM Cartridge",
      "Chassis": "Die-Cast Aluminum with Heavy Rubber Vibration Base",
      "Weight": "12.5 kg"
    },
    isFeatured: true,
    isBestSeller: false,
    isStaffPick: true
  },
  {
    id: "eq-003",
    type: "equipment",
    category: "Amplifiers",
    title: "Golden Glow Tube Integrated Amplifier 35W",
    brand: "RetroSpin Acoustics",
    condition: "Brand New",
    price: 38999,
    originalPrice: 45000,
    rating: 4.9,
    reviewCount: 56,
    badge: "Warm Tube Sound",
    speed: "N/A",
    connectivity: "Phono (MM), 3x AUX Inputs, Bluetooth 5.1 aptX HD, Headphone Jack",
    cartridge: "N/A",
    driveType: "Class A/B Vacuum Tube & Solid State Hybrid",
    platter: "N/A",
    inStock: true,
    stockCount: 5,
    image: "https://i.pinimg.com/1200x/96/4f/3a/964f3a29e1a6b8cfcbc5ac3e62e2dade.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/96/4f/3a/964f3a29e1a6b8cfcbc5ac3e62e2dade.jpg"
    ],
    description: "Experience the organic warmth that only glowing vacuum tubes can provide. Dual 12AX7 preamp tubes paired with a muscular Class A/B amplifier stage that drives vintage and modern speakers with effortless grace.",
    specs: {
      "Power Output": "35W RMS per channel @ 8Ω / 50W @ 4Ω",
      "Preamp Tubes": "2x 12AX7 / ECC83 Matched Pair",
      "Phono Preamp": "Built-in High Signal-to-Noise MM Stage",
      "Frequency Response": "18 Hz - 32,000 Hz (±1 dB)",
      "Inputs": "Phono, CD, Aux, Bluetooth 5.1 (aptX HD / AAC)",
      "Casing": "Brushed Amber Aluminum Faceplate with Dark Walnut Sides",
      "Weight": "9.2 kg"
    },
    isFeatured: true,
    isBestSeller: false,
    isStaffPick: true
  },
  {
    id: "eq-004",
    type: "equipment",
    category: "Speakers",
    title: "Heritage Monitor Bookshelf Speakers (Pair)",
    brand: "Vintage Acoustic Labs",
    condition: "Brand New",
    price: 29999,
    originalPrice: 34000,
    rating: 4.8,
    reviewCount: 71,
    badge: "Audiophile Grade",
    speed: "N/A",
    connectivity: "Gold-Plated 5-Way Binding Posts (Bi-wireable)",
    cartridge: "N/A",
    driveType: "Passive 2-Way Bass Reflex",
    platter: "N/A",
    inStock: true,
    stockCount: 10,
    image: "https://i.pinimg.com/736x/83/97/be/8397bee641584084928a69d7340d481b.jpg",
    gallery: [
      "https://i.pinimg.com/736x/83/97/be/8397bee641584084928a69d7340d481b.jpg"
    ],
    description: "Handcrafted real wood veneer enclosures housing a 6.5-inch woven paper pulp woofer and a 1-inch silk dome tweeter. Voiced specifically for natural acoustic vinyl reproduction, open soundstage, and sweet midrange.",
    specs: {
      "Configuration": "2-Way Ported Bookshelf Design",
      "Drivers": "6.5\" Damped Paper Cone Woofer + 1\" Soft Silk Dome Tweeter",
      "Impedance": "6 Ohms (compatible with 4-8 Ohm amps)",
      "Sensitivity": "88 dB (2.83V @ 1m)",
      "Cabinet": "18mm MDF with Genuine Teak Wood Veneer",
      "Dimensions (each)": "350 x 210 x 280 mm",
      "Weight (pair)": "14.4 kg"
    },
    isFeatured: true,
    isBestSeller: true,
    isStaffPick: false
  },
  {
    id: "eq-005",
    type: "equipment",
    category: "Headphones",
    title: "Velvet Studio Open-Back Audiophile Headphones",
    brand: "RetroSpin Reference",
    condition: "Brand New",
    price: 16999,
    originalPrice: 19500,
    rating: 4.9,
    reviewCount: 110,
    badge: "Personal Listening",
    speed: "N/A",
    connectivity: "3.5mm Gold Plug with 6.35mm Screw-on Adapter",
    cartridge: "N/A",
    driveType: "50mm Neodymium Dynamic Drivers",
    platter: "N/A",
    inStock: true,
    stockCount: 14,
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Designed for immersive late-night vinyl sessions. Open-back walnut wood earcups create an expansive 3D acoustic stage. Memory foam velour pads ensure hours of fatigue-free listening comfort.",
    specs: {
      "Transducer Type": "50mm Dynamic Beryllium-Coated Diaphragm",
      "Design": "Open-Back Circumaural",
      "Frequency Range": "10 Hz - 40,000 Hz",
      "Impedance": "32 Ohms (Easy to drive)",
      "Ear Cushions": "Breathable Memory Foam with Soft Velour",
      "Cable": "2.5m Detachable Braided Oxygen-Free Copper Cable",
      "Weight": "310 grams"
    },
    isFeatured: false,
    isBestSeller: true,
    isStaffPick: true
  },
  {
    id: "eq-006",
    type: "equipment",
    category: "Turntables",
    title: "RetroSpin Classic Suitcase Turntable with Bluetooth",
    brand: "RetroSpin Lifestyle",
    condition: "Brand New",
    price: 8999,
    originalPrice: 11500,
    rating: 4.6,
    reviewCount: 165,
    badge: "Beginner Friendly",
    speed: "33 1/3, 45, 78 RPM",
    connectivity: "Bluetooth 5.0 Receiver, RCA Line Out, 3.5mm AUX, Headphone Out",
    cartridge: "Ceramic Stereo Stylus with Diamond Needle",
    driveType: "Belt-Drive 3-Speed",
    platter: "Vibration-Isolated Resin Turntable",
    inStock: true,
    stockCount: 25,
    image: "https://i.pinimg.com/1200x/b2/69/5f/b2695f830765c3564febe9e7cf8c02f3.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/b2/69/5f/b2695f830765c3564febe9e7cf8c02f3.jpg"
    ],
    description: "Vintage suitcase design wrapped in distressed faux leather with antique brass hardware. Includes built-in dynamic full-range stereo speakers and Bluetooth receiver for streaming music from your smartphone when not spinning records.",
    specs: {
      "Speeds": "33 1/3, 45, 78 RPM",
      "Built-in Speakers": "2x 5W Stereo Dynamic Drivers",
      "Bluetooth": "Bluetooth 5.0 Input Receiver",
      "Outputs": "RCA Line Out, 3.5mm Headphone Jack",
      "Finish": "Vintage Saddle Brown Leatherette with Brass Latches",
      "Weight": "3.5 kg"
    },
    isFeatured: false,
    isBestSeller: true,
    isStaffPick: false
  },
  {
    id: "eq-007",
    type: "equipment",
    category: "Accessories",
    title: "Master Vinyl Care Kit (Anti-Static Brush & Cleaner)",
    brand: "RetroSpin Labs",
    condition: "Brand New",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 310,
    badge: "Must-Have",
    speed: "N/A",
    connectivity: "N/A",
    cartridge: "N/A",
    driveType: "Cleaning & Maintenance",
    platter: "N/A",
    inStock: true,
    stockCount: 40,
    image: "https://i.pinimg.com/1200x/f2/da/70/f2da70ca61b60277c25887316ef64379.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/f2/da/70/f2da70ca61b60277c25887316ef64379.jpg"
    ],
    description: "Complete 5-in-1 vinyl preservation system. Includes anti-static carbon fiber brush, velvet groove scrubber pad, 100ml alcohol-free vinyl cleaning fluid, stylus needle gel cleaner, and microfiber cloth.",
    specs: {
      "Contents": "Carbon Fiber Brush, Velvet Pad, 100ml Solution, Stylus Gel, Cloth",
      "Solution Formula": "Non-Toxic, Alcohol-Free, Anti-Static Deionized Base",
      "Effect": "Eliminates dust, surface grime, pops, clicks, and static charge",
      "Safe for": "All 33, 45, and 78 RPM vinyl records"
    },
    isFeatured: false,
    isBestSeller: true,
    isStaffPick: true
  },
  {
    id: "eq-008",
    type: "equipment",
    category: "Accessories",
    title: "Solid Brass Heavyweight Record Weight Stabilizer (400g)",
    brand: "RetroSpin Labs",
    condition: "Brand New",
    price: 2499,
    originalPrice: 3200,
    rating: 4.8,
    reviewCount: 84,
    badge: "Audio Enhancer",
    speed: "N/A",
    connectivity: "N/A",
    cartridge: "N/A",
    driveType: "Vibration Damping",
    platter: "N/A",
    inStock: true,
    stockCount: 18,
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Precision CNC-machined solid brass record clamp with built-in bubble level and protective soft velvet base. Flattens slightly warped records and stabilizes rotational speed for deeper, punchier bass response.",
    specs: {
      "Material": "Solid Turned Brass with Anti-Oxidation Coating",
      "Weight": "415 grams",
      "Base": "Non-scratch Protective Velvet Pad",
      "Feature": "Integrated High-Precision Circular Bubble Spirit Level"
    },
    isFeatured: false,
    isBestSeller: false,
    isStaffPick: false
  },
  {
    id: "eq-009",
    type: "equipment",
    category: "Turntables",
    title: "Marantz TT-15S1 Reference Turntable with Clearaudio Cartridge",
    brand: "Marantz",
    condition: "Brand New",
    price: 119999,
    originalPrice: 135000,
    rating: 5.0,
    reviewCount: 19,
    badge: "Ultra Audiophile",
    speed: "33 1/3 & 45 RPM",
    connectivity: "Pure Copper Direct Phono Interconnects",
    cartridge: "Clearaudio Virtuoso Ebony Wood MM Cartridge",
    driveType: "Isolated Endless Silicon Belt Drive",
    platter: "30mm High-Density Frosted Acrylic",
    inStock: true,
    stockCount: 2,
    image: "https://i.pinimg.com/1200x/79/7a/8f/797a8fdc867f349e63b02df51b2eda98.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/79/7a/8f/797a8fdc867f349e63b02df51b2eda98.jpg"
    ],
    description: "The pinnacle of analog purity. Low-resonance high-density acrylic chassis and platter, decoupled AC asynchronous motor, magnetic anti-skating tone arm, and Clearaudio Virtuoso wood cartridge.",
    specs: {
      "Chassis & Platter": "Solid High-Density Frosted Acrylic",
      "Motor": "Asynchronous Motor Fully Decoupled from Plinth",
      "Tonearm": "Anodized Aluminum with Magnetic Anti-Skate",
      "Cartridge": "Clearaudio Virtuoso Ebony Wood Body",
      "Bearing": "Hardened Steel Shaft with Polished Ceramic Ball",
      "Weight": "8.9 kg"
    },
    isFeatured: false,
    isRare: true,
    isBestSeller: false,
    isStaffPick: true
  },
  {
    id: "eq-010",
    type: "equipment",
    category: "Amplifiers",
    title: "Vintage Solid State Stereo Receiver 60W (1978 Style)",
    brand: "Pioneer Heritage Series",
    condition: "Vintage Refurbished",
    price: 42999,
    originalPrice: 48000,
    rating: 4.9,
    reviewCount: 38,
    badge: "Refurbished Gem",
    speed: "N/A",
    connectivity: "Phono 1 & 2, Tuner, Aux, 2x Tape Monitors, A+B Speaker Terminals",
    cartridge: "N/A",
    driveType: "Pure Analog Solid State Class A/B",
    platter: "N/A",
    inStock: true,
    stockCount: 3,
    image: "https://i.pinimg.com/1200x/ad/9c/f8/ad9cf832ed76c3bc116105467fc7ab12.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/ad/9c/f8/ad9cf832ed76c3bc116105467fc7ab12.jpg"
    ],
    description: "Authentic late 70s powerhouse receiver with backlit amber VU meters, milled aluminum tactile knobs, and genuine walnut veneer cabinet. Recapped with premium Nichicon audio-grade capacitors.",
    specs: {
      "Power Output": "60W RMS per channel into 8Ω",
      "THD": "< 0.05% at rated power",
      "Phono Sensitivity": "2.5mV / 47kΩ",
      "Frequency Response": "10 Hz to 50,000 Hz",
      "Cabinet": "Walnut Wooden Enclosure with Backlit Meters",
      "Weight": "11.2 kg"
    },
    isFeatured: false,
    isBestSeller: false,
    isStaffPick: false
  },
  {
    id: "eq-011",
    type: "equipment",
    category: "Speakers",
    title: "Retro 3-Way Standmount Floor Speakers (Pair)",
    brand: "Wharfedale Classics",
    condition: "Brand New",
    price: 74999,
    originalPrice: 85000,
    rating: 4.9,
    reviewCount: 29,
    badge: "Warm Vintage Voicing",
    speed: "N/A",
    connectivity: "Heavy Duty Bi-Wireable Binding Posts",
    cartridge: "N/A",
    driveType: "3-Way Bass Reflex Standmount",
    platter: "N/A",
    inStock: true,
    stockCount: 4,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Classic British audio voicing. A massive 8-inch Kevlar woofer delivers thunderous acoustic kick, coupled with a 5-inch midrange and soft dome tweeter for unparalleled vocal clarity.",
    specs: {
      "Configuration": "3-Way Standmount Speaker Pair",
      "Bass Driver": "200mm (8\") Black Woven Kevlar Cone",
      "Midrange Driver": "135mm (5\") Woven Kevlar Cone",
      "Treble Driver": "25mm (1\") Soft Dome",
      "Sensitivity": "90 dB",
      "Frequency Response": "40 Hz - 20,000 Hz",
      "Weight (each)": "18.4 kg"
    },
    isFeatured: false,
    isBestSeller: false,
    isStaffPick: true
  },
  {
    id: "eq-012",
    type: "equipment",
    category: "Accessories",
    title: "Ortofon 2M Blue Moving Magnet Phono Cartridge",
    brand: "Ortofon Denmark",
    condition: "Brand New",
    price: 18499,
    originalPrice: 21000,
    rating: 5.0,
    reviewCount: 94,
    badge: "Upgrade Stylus",
    speed: "N/A",
    connectivity: "Standard 1/2\" Mount 4-Pin",
    cartridge: "Nude Elliptical Diamond",
    driveType: "Moving Magnet (MM)",
    platter: "N/A",
    inStock: true,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Featuring a Nude Elliptical diamond stylus that tracks record grooves with incredible precision. Delivers an open, transparent sound with enhanced dynamics and silky highs.",
    specs: {
      "Stylus Type": "Nude Elliptical Diamond",
      "Output Voltage": "5.5 mV at 1000 Hz, 5cm/sec",
      "Frequency Range": "20 Hz - 25,000 Hz",
      "Tracking Force Range": "1.6 - 2.0 g (Recommended 1.8 g)",
      "Cartridge Weight": "7.2 g"
    },
    isFeatured: false,
    isBestSeller: true,
    isStaffPick: true
  }
];

// Helper Functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function getAllVinyl() {
  return PRODUCTS.filter(p => p.type === "vinyl");
}

function getAllEquipment() {
  return PRODUCTS.filter(p => p.type === "equipment");
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.isFeatured);
}

function getRareVinyl() {
  return PRODUCTS.filter(p => p.type === "vinyl" && p.isRare);
}

function getBestSellers() {
  return PRODUCTS.filter(p => p.isBestSeller);
}

function getNewArrivals() {
  return PRODUCTS.filter(p => p.isNewArrival);
}

function formatPriceINR(amount) {
  return "₹" + Number(amount).toLocaleString('en-IN');
}
