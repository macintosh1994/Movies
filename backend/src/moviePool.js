// The pool is intentionally small and curated rather than broad. Two reasons:
// OMDb has no "discover a random movie" endpoint (unlike TMDB's /discover),
// so "give me a movie" has always meant picking from a list we maintain and
// fetching that pick's live data (poster, cast, director, genres) from OMDb
// by title+year. But more importantly, each entry also carries a hand-written
// mansplainSummary — the actual plot, rewritten in a condescending,
// over-explaining voice — used when a player admits (or gets caught not
// having) watched it. That can't be done well for an arbitrary movie pulled
// from a big catalog without an LLM rewriting it live; a small hand-authored
// set keeps the quality real. Add more titles by writing a genuine
// mansplaining pass on the plot, not by summarizing it.
export const MOVIE_POOL = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    mansplainSummary:
      "Okay so there's this banker, Andy, who gets sent to prison for killing his wife — which, spoiler, he didn't do, but stick with me. He befriends another inmate, obviously, because that's how prison movies work, and very slowly — like, over two decades slowly, I know, take a seat — he starts tunneling out of his cell with a tiny rock hammer he's hidden behind a poster on his wall THE WHOLE TIME. Nobody notices. For twenty years. I don't make the rules. Eventually he escapes through a sewage pipe, which is exactly as unglamorous as it sounds, and reunites with his buddy on a beach in Mexico. It's a movie about hope, in case the two-decade tunnel wasn't a big enough clue.",
  },
  {
    title: "The Godfather",
    year: 1972,
    mansplainSummary:
      "So there's a mob boss, Vito, and someone tries to have him killed, which pulls his son Michael — the 'good one' who wanted nothing to do with the family business, very predictable arc, don't worry I'll explain — into taking over. Michael starts off saying he's different. He is not different. By the end he's personally arranged the murder of basically everyone who crossed his family and he's lying to his own wife's face about it in the very last scene, door closing on her, very dramatic, you'll know it when you see it. It's three hours long. I promise it earns it.",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    mansplainSummary:
      "Batman's trying to clean up Gotham with the help of a DA named Harvey Dent, and this attracts the attention of the Joker, who — and this took me a while to get too, don't feel bad — doesn't actually want anything. No plan, no money, just chaos, which is somehow the scariest option, I know, very deep for a guy in clown makeup. He manipulates Dent into becoming the villain Two-Face after his fiancée dies, and Batman ends up taking the blame for Dent's crimes so Gotham keeps believing in its 'white knight.' There's a whole thing with two ferries and a detonator I won't get into, we'd be here all day.",
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    mansplainSummary:
      "Two hitmen go pick up a briefcase for their boss, and along the way there's a boxer who's supposed to throw a fight and doesn't, a drug overdose, and an accidental shooting in the back of their own car — very messy, very on brand. Here's the part that trips people up, so pay attention: it's not told in order. A character who dies early in the movie is alive again later, because chronologically that scene actually happens first. I know, wild. One of the hitmen has a whole religious epiphany midway through and decides to quit the murder business; the other one, notably, does not, which is why he's the one who gets shot on a toilet later. Try to keep the timeline straight, it's honestly not that hard once you see it.",
  },
  {
    title: "Inception",
    year: 2010,
    mansplainSummary:
      "Okay, so there's this guy, Cobb, and his job is breaking into people's dreams to steal secrets, which I promise makes sense in context. He gets offered a deal: instead of stealing an idea, plant one — that's 'inception,' hence the title, they do explain that part on-screen in case anyone needed the help. To pull it off they go into a dream inside a dream inside a dream, because each layer runs slower than the one above it, so more time passes the deeper you go — there's a guy just falling in a van for what feels like twenty minutes of movie time while everyone else has an entire action sequence. At the end his little spinning top — it tells him if he's dreaming — just keeps spinning, forever, on purpose. That's not a mistake you missed. That IS the ending.",
  },
  {
    title: "Jurassic Park",
    year: 1993,
    mansplainSummary:
      "A billionaire clones dinosaurs for a theme park and invites a few scientists to sign off on it before it opens to the public, which, already, terrible idea, but stay with me. An underpaid employee shuts off the security systems to smuggle out some embryos, and — shockingly — this also turns off the fences keeping the actual dinosaurs contained. Everyone spends the rest of the movie being hunted by a T. rex and a pack of velociraptors, which, again, a mathematician on staff specifically warned would happen. He was right. He gets to say so, a lot.",
  },
  {
    title: "Titanic",
    year: 1997,
    mansplainSummary:
      "Jack's a poor artist, Rose is engaged to a rich guy she doesn't love, they meet on a boat, they fall for each other, the boat is the Titanic, so — and I feel like this part doesn't need much explaining — it sinks. Two and a half hours of runtime just for the sinking part, so pace yourself. At the end Jack dies of hypothermia in the water instead of fitting on the floating door next to Rose, and no, before you ask, there genuinely was not room for two — people have done the math, it's settled, we can move on.",
  },
  {
    title: "The Matrix",
    year: 1999,
    mansplainSummary:
      "Neo's a hacker who finds out the entire world he's living in is a computer simulation, run by machines, to keep humans docile while they're harvested for energy — I know, a lot, we'll get through it together. He's offered a red pill, which shows him the truth, or a blue pill, which lets him forget the whole conversation and go back to his cubicle. He picks the red one. Obviously. There's no movie otherwise. He spends the rest of it learning to bend the simulation's rules — bullet-dodging, wall-running, the works — and slowly starts to suspect he might be 'the One' everyone keeps talking about. Spoiler: he is. It's in the title of the franchise, basically.",
  },
  {
    title: "Forrest Gump",
    year: 1994,
    mansplainSummary:
      "Forrest isn't the sharpest guy, but he's got a good heart, and he just sort of... accidentally ends up present for every major event in twentieth-century America — Vietnam, Watergate, he apparently helped start Apple, the whole thing — while spending decades in love with his childhood friend Jenny, who keeps leaving and coming back. He runs across the country for no particular reason at one point, which I promise is exactly as random as it sounds. It all wraps up with him raising their son after Jenny passes away, and the whole story's framed as him just telling all this to random strangers on a park bench, who, for some reason, keep listening.",
  },
  {
    title: "Toy Story",
    year: 1995,
    mansplainSummary:
      "Woody's a cowboy doll and Andy's favorite toy, until Buzz Lightyear shows up — a space ranger action figure who genuinely, unironically believes he's a real astronaut, not a toy, which is the whole joke, in case that wasn't clear. Jealousy gets the better of Woody and he accidentally knocks Buzz out a window, and the two end up stranded together, first at a gas station, then in the hands of a kid next door who mutilates toys for fun, delightful. They team up to get home before the family moves, and along the way Buzz has to come to terms with the fact that he is, in fact, a toy. It's more emotionally complicated than it has any right to be for a movie about action figures.",
  },
  {
    title: "The Lion King",
    year: 1994,
    mansplainSummary:
      "Simba's a lion cub whose uncle Scar tells him he caused his father Mufasa's death in a stampede — which Scar himself actually engineered, but sure, blame the cub — so Simba runs off into exile out of guilt. He grows up under the philosophy of 'no worries for the rest of your days,' living with a warthog and a meerkat, until his childhood friend Nala tracks him down and, essentially, shames him into going home and being an adult about it. He returns, fights Scar, reclaims the throne after Scar's own hyenas turn on him — turns out being a jerk to your henchmen has consequences, who knew. It's Hamlet. With more singing. I didn't say that to sound smart, it's just true.",
  },
  {
    title: "Get Out",
    year: 2017,
    mansplainSummary:
      "Chris goes to meet his white girlfriend's family for the first time, and the Black staff on the property are acting... off, like unsettlingly off, almost like they're not fully themselves, which — and I promise this isn't as much of a stretch as it sounds — turns out to be because they aren't. The family's been auctioning off Black bodies to wealthy buyers who then have their own minds transplanted in. Chris figures this out later than you'd like, honestly, but he does get out, hence the title, they're not being subtle about it.",
  },
  {
    title: "Parasite",
    year: 2019,
    mansplainSummary:
      "A poor family cons their way into working for a wealthy family, one job at a time, each of them pretending to be an unrelated, highly qualified professional — a tutor, a driver, a housekeeper, very elaborate, very illegal. Things get complicated when they find out the previous housekeeper has been hiding her husband in a secret bunker under the house this entire time, and it all boils over at a birthday party in a way I'm not going to fully explain because it needs to just happen to you. By the end, one of them is living in that same bunker, and the son dreams up a plan to buy the house and free him someday — a plan the movie makes pretty clear is never actually going to happen. It's not a hopeful ending. It just looks like one if you squint.",
  },
  {
    title: "Interstellar",
    year: 2014,
    mansplainSummary:
      "Earth's dying, crops are failing, so a former pilot named Cooper leaves his kids behind to fly through a wormhole near Saturn looking for a new planet to live on — very high stakes, very personal, try to keep up. Because of relativity, which I will not be fully explaining here, one hour on a candidate planet costs the crew decades back on Earth, so when Cooper gets back to the ship his daughter has aged past him. Eventually he falls into a black hole, ends up in a sort of five-dimensional space built by future humans, and realizes HE'S the one who's been sending his own daughter the data that saves humanity, the whole time, from the future. It was him. It was always him. Yes, that tracks, don't overthink it.",
  },
  {
    title: "Gladiator",
    year: 2000,
    mansplainSummary:
      "Maximus is a Roman general, and the new emperor Commodus — who murdered his own father to get the throne, mild guy — has Maximus's wife and son killed and tries to have him killed too. It doesn't take. Maximus survives, ends up enslaved, and works his way back up through the gladiator circuit, under a fake name, all the way to the Colosseum in Rome, because subtlety was not really the plan. He gets his revenge killing Commodus in single combat, then dies from his wounds right after. That's the ending. Not a twist, not a sequel hook, just the ending.",
  },
  {
    title: "Die Hard",
    year: 1988,
    mansplainSummary:
      "John McClane's an off-duty cop visiting his estranged wife's office Christmas party when a group of guys posing as terrorists take over the building to crack the vault, and he's the only one who doesn't get caught. So he spends the rest of the movie barefoot, bleeding, crawling through air ducts, picking them off one at a time, while feeding tips to a cop outside over walkie-talkie. Yes, it counts as a Christmas movie. No, we don't need to relitigate that every December, it's fine, it's settled, everyone can stop.",
  },
  {
    title: "Back to the Future",
    year: 1985,
    mansplainSummary:
      "Marty gets sent thirty years into the past by his friend's time-traveling DeLorean, and while he's there he accidentally interferes with the moment his own parents fall in love, which — and I promise this is the actual plot, not me exaggerating — puts his own future existence at risk. So he spends the rest of the movie awkwardly fending off his mother's romantic interest in him, which is exactly as uncomfortable as it sounds, while also trying to engineer the original meet-cute back into happening. He makes it back to 1985 with seconds to spare, and it turns out his meddling actually improved his family's whole future. Convenient moral, for a movie that's supposedly about not messing with the past.",
  },
  {
    title: "Jaws",
    year: 1975,
    mansplainSummary:
      "A great white shark starts killing swimmers off a small beach town, and the police chief wants to close the beaches, but the mayor says no because tourist season, which, again, this is the actual plot and not a metaphor I'm layering on. After a few more people get eaten the chief finally teams up with a marine biologist and a grizzled shark hunter to go kill the thing themselves, on a boat that turns out to be way too small for the job. The hunter gets eaten, the boat starts sinking, and the chief finishes it off by shooting a scuba tank lodged in the shark's mouth until it explodes. Yes, sharks can do that in movies. No, don't think too hard about the physics.",
  },
  {
    title: "Whiplash",
    year: 2014,
    mansplainSummary:
      "Andrew's an ambitious young drummer at a top music school, and he gets pulled into the studio band run by a conductor named Fletcher, whose entire teaching philosophy is basically screaming at students until they either quit or get good — tough love, extremely tough, arguably just abuse with a metronome. Fletcher eventually gets fired after his methods are linked to a student's death, and Andrew, humiliated, quits drumming altogether. Then Fletcher lures him back for one last show specifically to sabotage him in public, and instead of walking off stage, Andrew just... takes the performance over completely, forcing Fletcher to conduct him instead of the other way around. It's a two-hour argument about whether the ends justify the means, and — I'll save you the suspense — the movie never actually tells you the answer.",
  },
  {
    title: "Knives Out",
    year: 2019,
    mansplainSummary:
      "A wealthy crime novelist is found dead the morning after his birthday party, looks like suicide, and a detective gets anonymously hired to look into it anyway. Basically every family member had a motive, which, if you know anything about wealthy families in mystery movies, tracks. Turns out the actual mechanics involve his nurse, who accidentally gave him the wrong medication and covered it up at his own request, plus a grandson's scheme to frame her and inherit everything himself. She ends up inheriting the whole estate legitimately instead. It's a whodunit that tells you who up front and dares you to keep watching anyway. You will keep watching.",
  },
  {
    title: "Mad Max: Fury Road",
    year: 2015,
    mansplainSummary:
      "Max gets captured by a warlord's army and used as a literal human blood bag, until he crosses paths with Furiosa, who's just made off with the warlord's five captive wives in an armored truck. That's basically the whole plot, by the way — one long chase across the desert, first running away, then, once Furiosa realizes there's nowhere better to go, turning around and driving straight back to take the warlord's fortress. Max helps out, gets his blood back, presumably, and then just disappears into the crowd at the end instead of sticking around for credit. Very on brand for him.",
  },
  {
    title: "Coco",
    year: 2017,
    mansplainSummary:
      "Miguel's family has banned music for generations, ever since his great-great-grandfather supposedly abandoned them to chase a music career, and Miguel accidentally crosses over into the Land of the Dead on the one night of the year that's possible. He needs a family member's blessing to get back before sunrise, so he goes looking for who he assumes is his famous musician ancestor — except it turns out that guy actually murdered Miguel's real great-great-grandfather to steal his songs. So Miguel spends the rest of the movie exposing a decades-old murder to save his real ancestor from fading out of memory forever, which is casually one of the heaviest concepts Pixar has ever put in a kids' movie, and yes, you will cry, that's not optional.",
  },
  {
    title: "La La Land",
    year: 2016,
    mansplainSummary:
      "Mia's an aspiring actress working a coffee shop job, Sebastian's a jazz pianist who wants to open his own club, they meet, they fall for each other, and then their careers slowly start pulling them in opposite directions — very romantic, very sad, classic combination. Sebastian joins a touring band for the steady paycheck, which costs him time with Mia right as her one-woman show is flopping. Years later, the movie jumps forward to show Mia successful and married to someone else, wandering into Sebastian's now-thriving club, and the film gives you an entire imagined version of the life they could've had together before snapping back to reality, where they just... nod at each other. That's it. That's the ending. It's a musical about how the dream sometimes costs you the person, in case the nodding didn't make that clear enough.",
  },
  {
    title: "Star Wars",
    year: 1977,
    mansplainSummary:
      "A farm boy named Luke finds out a princess is being held captive by the Empire, teams up with a smuggler, an old wizard-knight, a wookiee, and two robots to rescue her, and then blows up a planet-sized superweapon by shooting a two-meter-wide exhaust port with the help of, essentially, space magic. The old wizard-knight, Obi-Wan, sacrifices himself in a lightsaber duel partway through, but keeps talking to Luke afterward as a ghost voice, which the movie never really explains and you're just supposed to accept. It's the first of nine, now, in case you didn't know there'd be homework after this.",
  },
  {
    title: "The Silence of the Lambs",
    year: 1991,
    mansplainSummary:
      "Clarice, a trainee FBI agent, gets sent to interview an imprisoned cannibal psychiatrist, Hannibal Lecter, hoping he can help profile a different serial killer who's currently active and skinning his victims. Lecter agrees to help, but only in exchange for personal information about Clarice, which, red flag, obviously, but she does it anyway because the case is urgent. Their conversations end up being more useful than anyone expected, she catches the actual killer just in time, and Lecter, meanwhile, escapes from custody entirely separately and calls her up at the very end just to let her know he's out and about. He does not get recaptured in this movie. That's not an oversight, that's the ending.",
  },
  {
    title: "Fight Club",
    year: 1999,
    mansplainSummary:
      "An unnamed, deeply unhappy office worker meets a guy named Tyler Durden on a plane, and together they start an underground fight club that turns into a full-blown anti-consumerist movement, which spirals into something much more violent and organized than either of them apparently intended. Here's the part I have to be careful with: Tyler isn't real. He's a dissociated alternate personality of the narrator's own mind, and pretty much everything Tyler does, the narrator's been doing, the whole time, to himself, which recontextualizes basically the entire movie once you know it. Yes, this is the twist everyone already knows going in at this point. No, it doesn't ruin the movie to know it beforehand, it's actually built to be rewatched with that in mind.",
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    mansplainSummary:
      "After half of all life in the universe gets erased by the villain Thanos, the surviving Avengers spend five years quietly grieving until they figure out a way to time-travel back and collect the same powerful stones Thanos used, except earlier, before he gets to them — very complicated, very much requires having seen several other movies first, I'm not going to pretend otherwise. It ends with basically every hero from the last decade of movies showing up at once for one giant battle, and Tony Stark sacrificing himself to finally win it. It's a series finale for twenty-some movies. If you haven't seen any of the others, you're going to be lost, and that's kind of the point, honestly.",
  },
  {
    title: "Barbie",
    year: 2023,
    mansplainSummary:
      "Barbie starts having an existential crisis — thoughts of death, flat feet, the whole thing — in an otherwise perfect, plastic Barbieland, so she travels to the real world to fix it and accidentally brings Ken along. In the real world she discovers patriarchy, mostly by having it explained to her by Ken, who takes the concept back to Barbieland and turns it into 'Kendom' while she's gone, which, yes, is exactly as chaotic as it sounds. She ends up having to help the other Barbies undo it, has a whole conversation with her creator about what it means to be a person and not a doll, and chooses, in the end, to become human. It's a toy commercial that somehow also has a lengthy monologue about the impossible expectations placed on women. Both things are true at once.",
  },
];
