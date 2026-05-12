export const WORDS = {
  technology: {
    easy: ["code","byte","data","wifi","chip","web","app","cpu","ram","gpu"],
    medium: ["python","kernel","router","server","pixel","cursor","binary","cache","array","debug"],
    hard: ["algorithm","blockchain","javascript","cybersecurity","kubernetes","microservice","recursion","polymorphism","encryption","architecture"]
  },
  animals: {
    easy: ["cat","dog","cow","bee","ant","fox","owl","hen","bat","emu"],
    medium: ["tiger","shark","eagle","koala","panda","zebra","llama","whale","snake","gecko"],
    hard: ["chameleon","axolotl","pangolin","platypus","narwhal","wolverine","albatross","salamander","armadillo","jellyfish"]
  },
  countries: {
    easy: ["india","spain","china","japan","egypt","ghana","cuba","peru","mali","fiji"],
    medium: ["brazil","france","turkey","mexico","canada","sweden","norway","poland","greece","angola"],
    hard: ["azerbaijan","mozambique","madagascar","liechtenstein","kyrgyzstan","zimbabwe","tajikistan","suriname","cambodia","nicaragua"]
  },
  movies: {
    easy: ["avatar","alien","jaws","hook","it","us","up","get","her","1917"],
    medium: ["inception","parasite","titanic","interstellar","gladiator","braveheart","memento","prestige","oldboy","whiplash"],
    hard: ["shawshank","apocalypse","schindler","goodfellas","kubrick","clockwork","metropolis","andromeda","casablanca","magnificent"]
  },
  sports: {
    easy: ["golf","polo","swim","run","kick","dunk","bat","race","dive","box"],
    medium: ["cricket","tennis","hockey","skiing","rowing","boxing","judo","cycling","archery","surfing"],
    hard: ["badminton","volleyball","equestrian","gymnastics","weightlifting","skateboarding","bobsleigh","pentathlon","orienteering","trampoline"]
  },
  food: {
    easy: ["rice","cake","soup","taco","pizza","sushi","wrap","bun","pie","jam"],
    medium: ["pasta","burger","noodle","waffle","brisket","falafel","ceviche","samosa","tiramisu","hummus"],
    hard: ["bouillabaisse","chimichanga","ratatouille","wiener schnitzel","bibimbap","moussaka","goulash","paella","shakshuka","bruschetta"]
  }
};

export const HINTS = {
  technology:{python:"Scripting language named after a snake",kernel:"Core of an operating system",blockchain:"Decentralized ledger technology",javascript:"Language of the web browser",algorithm:"Step-by-step problem-solving procedure",recursion:"A function that calls itself",encryption:"Scrambling data for security",router:"Directs network traffic",binary:"Base-2 number system",server:"Hosts and serves resources"},
  animals:{chameleon:"Changes its skin color",axolotl:"A salamander that never grows up",pangolin:"Covered in scales, rolls into a ball",platypus:"Mammal that lays eggs",narwhal:"The unicorn of the sea"},
  countries:{liechtenstein:"Europe's fourth-smallest country",kyrgyzstan:"Landlocked country in Central Asia",azerbaijan:"Country on the Caspian Sea"},
  movies:{inception:"A dream within a dream",parasite:"2019 Oscar Best Picture from South Korea",interstellar:"Wormholes and a black hole called Gargantua",shawshank:"Hope is a good thing"},
  sports:{pentathlon:"Five disciplines in one event",equestrian:"Horse-riding sport",bobsleigh:"Winter sport on an icy track"},
  food:{bouillabaisse:"French fish stew from Marseille",ratatouille:"Provençal vegetable dish",paella:"Spanish saffron rice dish",shakshuka:"Eggs poached in tomato sauce"}
};

export const diffConfig = {
  easy:   {lives:8, time:120, pointsPerLetter:10, bonusTime:5},
  medium: {lives:6, time:90,  pointsPerLetter:20, bonusTime:10},
  hard:   {lives:4, time:60,  pointsPerLetter:35, bonusTime:20},
};
