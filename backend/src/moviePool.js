// The pool is intentionally small and curated rather than broad. Two reasons:
// OMDb has no "discover a random movie" endpoint (unlike TMDB's /discover),
// so "give me a movie" has always meant picking from a list we maintain and
// fetching that pick's live data (poster, cast, director, genres) from OMDb
// by title+year. But more importantly, each entry also carries a hand-written
// mansplainSummary — the actual plot, rewritten in "Chad" voice: confidently,
// obliviously condescending, never cruel — used when a player admits (or gets
// caught not having) watched it. Every entry follows the same beat structure:
// credentialing opener, preemptive assumption the listener's read was
// shallow, an unnecessary "obvious thing" explainer, one or two false
// corrections to claims nobody made, a tangent/trivia aside treated as more
// important than the plot point it interrupts, an emotional beat flattened
// into fake logic, and a patronizing sign-off that confirms the *listener*
// needed the help. That can't be done well for an arbitrary movie without an
// LLM rewriting it live, so the tradeoff is deliberately less variety for
// real quality. Add more titles by writing a genuine pass in this voice, not
// a summary of the plot.
export const MOVIE_POOL = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    mansplainSummary:
      "Oh, Shawshank — yeah, this is basically my favorite movie, I've probably watched it a dozen times. I know it probably just reads as 'sad prison movie' to you, but there's a lot more going on structurally than that. It's based on a Stephen King novella, actually — he didn't only write horror, people forget that. Everyone assumes Andy's innocence is the big reveal, but the real tell is how calm he stays through the whole thing, that's what people miss. It's also not really an 'escape movie' the way it gets filed — it's a hope movie, the escape's just the mechanism. Random fact, they shot it in an actual decommissioned Ohio penitentiary, which is honestly wilder than most of the plot. And Andy doesn't befriend Red because he's lonely, it's really more of a transactional trust thing that pays off later. See? Not as simple as 'guy escapes prison' once someone actually walks you through it.",
  },
  {
    title: "The Godfather",
    year: 1972,
    mansplainSummary:
      "Oh, The Godfather — yeah, I've got the whole trilogy on Blu-ray, this one's basically required viewing. I know it probably just looks like a gangster shoot-em-up to you, but it's really more of a business allegory than an action movie. It's adapted from a novel too, people forget that — Mario Puzo wrote it before he even co-wrote the screenplay. Everyone thinks Michael gets dragged into the family business against his will, but he actually volunteers for the first hit himself, nobody forces his hand there. It's also not really 'about crime' if you think about it, more of a succession-planning story that happens to involve crime. Random fact, Brando reportedly improvised the bit with the cat in the opening scene, which ended up more iconic than half the actual dialogue. And Michael doesn't go cold because of trauma, really — it's more a rational adaptation to his environment. See? A lot more going on than 'mob boss movie' once someone actually breaks it down.",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    mansplainSummary:
      "Oh, The Dark Knight — yeah, I've probably seen this one more times than I've seen most movies I actually like. I know it probably just looks like a superhero movie to you, but it's really more of a crime epic that happens to have a guy in a bat costume. So it's a sequel, obviously, which just means it continues the story from the first one with the same actor. Everyone thinks the Joker's plan is chaos for chaos's sake, but he's actually got a very specific philosophy about it — chaos isn't the goal, it's the method, he wants to prove order is fake. It's also not really about Batman, if you think about it, Harvey Dent's arc is the actual tragedy here. Random fact, Heath Ledger reportedly locked himself in a hotel room for weeks to get the voice right, more dedication than most of the plot requires. See? Not just 'guy in bat suit fights clown' once someone actually explains it.",
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    mansplainSummary:
      "Oh, Pulp Fiction — yeah, I've probably seen this one enough times to recite half the dialogue. I know it probably just reads as a bunch of random violent scenes to you, but it's actually a really tight structure once you see it properly. So it's non-linear, which just means the scenes aren't shown in the order they happen, that's the whole trick. Everyone thinks the briefcase has something supernatural in it, but Tarantino's actually said it's just a MacGuffin, it doesn't matter what's inside, people way overthink that detail. It's also not really about the hitmen, structurally — the boxer's storyline is honestly the emotional spine of the whole thing. Random fact, John Travolta's entire career got revived off this one role, which is a bigger plot twist than most of the actual movie. And Jules doesn't quit crime out of guilt, really, it's more a logical response to what he reads as a miracle. See? Cleaner than it looks once someone actually maps it out for you.",
  },
  {
    title: "Inception",
    year: 2010,
    mansplainSummary:
      "Oh, Inception — yeah, I've watched this one enough times that I stopped needing the recap videos a while ago. I know it probably just seems like a heist movie with dreams to you, but it's actually way more about grief than the marketing let on. So it's Christopher Nolan, obviously, which just means expect nonlinear structure and a guy quietly diagramming his own memories a lot. Everyone thinks the ending's ambiguous because the top might still be spinning, but the actual clue is his wedding ring, people always miss that and fixate on the top instead. It's also not really about the heist mechanically, if you think about it — the heist is just the vehicle for him processing his wife's death. Random fact, the hallway fight scene was shot in an actual rotating set, no CGI, which took longer to build than most sequences take to film. See? Not just 'dream heist movie' once someone actually walks you through what it's doing.",
  },
  {
    title: "Jurassic Park",
    year: 1993,
    mansplainSummary:
      "Oh, Jurassic Park — yeah, I've probably rewatched this one more than any other Spielberg movie, honestly. I know it probably just looks like a monster movie to you, but it's really more of a cautionary tale about unchecked ambition dressed up as a theme park disaster. So it's based on a novel too, people forget that, Michael Crichton wrote it before the screenplay existed. Everyone thinks the power outage is what lets the dinosaurs escape, but the actual failure point is the employee sabotaging the systems on purpose, the outage is just a symptom. It's also not really about dinosaurs if you think about it, it's about the mathematician being right the entire time and nobody listening. Random fact, they used a mix of animatronics and early CGI, which was genuinely more advanced for its time than most of the plot logic. See? A bit deeper than 'dinosaurs eat people' once someone actually explains the point of it.",
  },
  {
    title: "Titanic",
    year: 1997,
    mansplainSummary:
      "Oh, Titanic — yeah, I've probably seen this one enough times that the runtime doesn't even register for me anymore. I know it probably just looks like a disaster romance to you, but it's actually more of a class commentary wrapped around a sinking ship. So it's a real historical event, obviously, the ship actually existed and actually sank, that part's not fiction. Everyone thinks the door debate is unresolved, but it's actually been settled with buoyancy tests, there genuinely wasn't room for two people, people love to argue about it anyway. It's also not really Jack and Rose's story structurally, if you think about it — old Rose narrating the whole thing is the actual frame we're watching from. Random fact, they built a near-full-scale replica of the ship for filming, which cost more than several other movies combined. See? A bit more going on than 'boat sinks, people kiss' once someone actually breaks it down.",
  },
  {
    title: "The Matrix",
    year: 1999,
    mansplainSummary:
      "Oh, The Matrix — yeah, I've probably seen this one four or five times, so I can walk you through it properly. I know it probably just looks like a sci-fi action movie to you, but it's really more of a philosophy thing wearing a trench coat. So it's the Wachowskis, which just means expect a lot of visual metaphor mixed in with the bullet-dodging. Everyone thinks the red pill/blue pill thing is about choice, but it's actually just about waking up to reality, that's the whole metaphor, people overcomplicate it. It's also not really a love story, if you think about it — Trinity's with him because a prophecy said she would be, that's more of a logic loop than romance. Random fact, the effects team invented 'bullet time' for this movie, which ended up more influential than the plot itself, honestly. See? Not that complicated once someone actually walks you through it properly.",
  },
  {
    title: "Forrest Gump",
    year: 1994,
    mansplainSummary:
      "Oh, Forrest Gump — yeah, I've probably quoted this one more than I've actually watched it, if I'm honest. I know it probably just reads as a feel-good story to you, but it's actually a pretty sharp piece of American history dressed up as a comedy. So it's told mostly in flashback, which just means he's narrating his own life to strangers on a bench, that's the framing device. Everyone thinks Forrest is just lucky, but it's actually more that the movie's using him as a blank slate to walk through real historical events, the luck's beside the point. It's also not really a romance, structurally, if you think about it — Jenny's arc is basically the whole other half of the story running in parallel. Random fact, most of the historical footage he's inserted into was doctored using effects that were genuinely groundbreaking for 1994. See? More going on than 'nice slow guy has adventures' once someone actually explains the structure.",
  },
  {
    title: "Toy Story",
    year: 1995,
    mansplainSummary:
      "Oh, Toy Story — yeah, I've probably seen this one more times than any adult should admit to. I know it probably just looks like a kids' movie about toys to you, but it's actually got a pretty sharp existential angle if you pay attention. So it's the first fully CG-animated feature film ever, people forget that part, it wasn't just a cute story, it was a technical first. Everyone thinks Buzz's whole arc is about accepting he's a toy, but it's actually more about accepting he's replaceable, that's the harder pill, people simplify it to the wrong lesson. It's also not really Woody's story alone, structurally, if you think about it — Buzz's delusion is doing just as much narrative work. Random fact, Pixar had to rebuild the whole movie's tone partway through production after an early cut tested as 'unlikable,' which most people don't know. See? A bit more layered than 'toys go on adventure' once someone actually breaks it down.",
  },
  {
    title: "The Lion King",
    year: 1994,
    mansplainSummary:
      "Oh, The Lion King — yeah, I've probably seen this one more times than most people have seen any movie, honestly. I know it probably just looks like a kids' movie about animals to you, but structurally it's basically Hamlet, people don't always clock that. So it's Disney's original one, not the remake, which just means hand-drawn animation instead of the photorealistic version. Everyone thinks Simba runs away out of fear, but it's actually guilt specifically, Scar engineers that guilt on purpose, it's not really fear driving him. It's also not really about Simba becoming king, if you think about it — the actual arc is him accepting responsibility he was avoiding, the crown's just the symbol. Random fact, the wildebeest stampede scene used some of the earliest CG crowd simulation Disney ever attempted. See? A bit more Shakespearean than 'lion cub has adventure' once someone actually walks you through it.",
  },
  {
    title: "Get Out",
    year: 2017,
    mansplainSummary:
      "Oh, Get Out — yeah, I've probably watched this one closer than most people bother to, there's a lot in the background you'd miss on a first pass. I know it probably just reads as a horror movie to you, but it's really more of a social thriller using horror mechanics. So it's Jordan Peele's directorial debut, people forget that, he was mostly known for comedy before this. Everyone thinks the hypnosis scene is just a scare tactic, but it's actually establishing the exact mechanism the whole plot hinges on later, it's not just atmosphere. It's also not really about the family being evil individually, if you think about it — it's more about a system they're all just participating in. Random fact, the teacup-and-spoon sound design was mixed specifically to hit a frequency most people can't consciously place. See? More going on than 'scary family' once someone actually explains the mechanics.",
  },
  {
    title: "Parasite",
    year: 2019,
    mansplainSummary:
      "Oh, Parasite — yeah, I've probably watched this one more critically than most people watch anything, there's a lot going on in the framing. I know it probably just reads as a heist-y con movie to you, but it's actually more of a class study that happens to have a con in it. So it won Best Picture, people forget it's actually a foreign-language film, first one to ever win that category. Everyone thinks the twist is the hidden bunker, but the real turn is realizing the poor family and the housekeeper's family are competing with each other, not the rich family, that's the actual point. It's also not really about the rich family being villains, if you think about it — they're mostly just oblivious, which is arguably worse. Random fact, the house was built entirely as a set specifically to control the sightlines for the class metaphor. See? A lot more structured than 'poor family cons rich family' once someone actually breaks it down.",
  },
  {
    title: "Interstellar",
    year: 2014,
    mansplainSummary:
      "Oh, Interstellar — yeah, I've probably watched this one enough times to stop needing the relativity explained to me. I know it probably just looks like a space movie to you, but it's really more of a father-daughter story that happens to involve a wormhole. So it's Christopher Nolan again, which just means expect the timeline to fold in on itself at some point. Everyone thinks the black hole sequence is just visual spectacle, but it's actually based on real physics simulations done with an actual theoretical physicist, it's not just CGI for the sake of it. It's also not really about saving humanity structurally, if you think about it — it's about Cooper trying to get back to his daughter, the stakes are personal before they're global. Random fact, the black hole visualization was accurate enough that it led to an actual published science paper. See? More emotionally grounded than 'space movie' once someone actually explains what it's really about.",
  },
  {
    title: "Gladiator",
    year: 2000,
    mansplainSummary:
      "Oh, Gladiator — yeah, I've probably seen this one enough times that I can basically recite the opening battle. I know it probably just looks like a sword-and-sandals action movie to you, but it's really more of a revenge tragedy that happens to be set in Rome. So it's loosely historical, which just means real emperors, fictional plot mostly layered on top. Everyone thinks Commodus kills his father out of ambition alone, but the movie actually frames it more as being passed over for approval his whole life, it's not pure ambition. It's also not really about the arena fights structurally, if you think about it — they're just the mechanism Maximus uses to get close enough for revenge. Random fact, Oliver Reed died during filming and his remaining scenes were finished using early CGI face work. See? A bit more going on than 'guy fights in arena' once someone actually walks you through it.",
  },
  {
    title: "Die Hard",
    year: 1988,
    mansplainSummary:
      "Oh, Die Hard — yeah, I've probably watched this one enough times that I have opinions on it being a Christmas movie, which it is, by the way. I know it probably just looks like a shoot-em-up to you, but it's actually a pretty tightly contained thriller once you notice the structure. So it's based on a novel, people forget that, it was adapted from a book called Nothing Lasts Forever. Everyone thinks Hans Gruber's crew are terrorists, but they're actually just thieves using a fake terrorism angle to cover the actual heist, that's the twist people gloss over. It's also not really about McClane being a hero by nature, if you think about it — he spends half the movie explicitly not wanting to be involved. Random fact, Alan Rickman's fall at the end was filmed by actually dropping him, on cue, before the airbag was ready. See? More going on than 'guy shoots bad guys in a building' once someone actually breaks it down.",
  },
  {
    title: "Back to the Future",
    year: 1985,
    mansplainSummary:
      "Oh, Back to the Future — yeah, I've probably seen this one enough times that the time-travel rules stopped confusing me a long time ago. I know it probably just reads as a fun time-travel comedy to you, but the mechanics are actually a lot tighter than people give it credit for. So it's set in two timelines, obviously, which just means 1985 and 1955, that's the whole gimmick. Everyone thinks Marty just has to get his parents together, but the actual ticking clock is that photo of him and his siblings fading, that's the real stakes tracker, people forget the photo's doing the work. It's also not really a full stand-alone story structurally, if you think about it — practically every detail sets up the sequel hook at the end. Random fact, Michael J. Fox was still filming a TV show during the day and shooting this at night for months. See? Tighter plotting than 'kid goes back in time' once someone actually explains the mechanics.",
  },
  {
    title: "Jaws",
    year: 1975,
    mansplainSummary:
      "Oh, Jaws — yeah, I've probably seen this one enough times that I know exactly when the shark shows up, which, spoiler, is later than you'd think. I know it probably just looks like a monster-attack movie to you, but it's actually more of a small-town politics story for the first half. So it's based on a novel too, people forget that, Peter Benchley wrote it before the screenplay existed. Everyone thinks the shark barely appears because of the plot, but it's actually because the mechanical shark kept malfunctioning during filming, that's the real reason, not some artistic choice originally. It's also not really about the shark as a villain, if you think about it — the mayor refusing to close the beaches is doing just as much damage. Random fact, the shark itself was nicknamed 'Bruce' by the crew, after Spielberg's lawyer. See? More going on than 'shark eats people' once someone actually walks you through it.",
  },
  {
    title: "Whiplash",
    year: 2014,
    mansplainSummary:
      "Oh, Whiplash — yeah, I've probably watched this one closer than most people watch anything, the editing's doing a lot of work you might miss. I know it probably just looks like a music-school drama to you, but it's really more of a psychological duel dressed up as one. So it started as a short film first, people forget that, the feature was expanded from it later. Everyone thinks Fletcher's just a villain, but the movie actually leaves it deliberately unresolved whether his methods are justified, it's not a clean answer, people want it to be one. It's also not really about drumming technically, if you think about it — it's about what someone's willing to sacrifice to be exceptional at anything. Random fact, most of the actual drumming in the intense scenes was performed live by the actor himself, not a double. See? A lot more ambiguous than 'strict teacher, talented student' once someone actually breaks it down.",
  },
  {
    title: "Knives Out",
    year: 2019,
    mansplainSummary:
      "Oh, Knives Out — yeah, I've probably watched this one enough times to catch stuff in the background I missed the first few passes. I know it probably just reads as a straightforward whodunit to you, but it's actually structured to tell you who did it early on purpose, that's the twist on the genre. So it's an original screenplay, people forget that, not based on an existing book despite feeling like a classic mystery novel. Everyone thinks the detective's the one solving the real mystery, but honestly Marta's the one doing most of the actual figuring-out, he's mostly just narrating what she already suspects. It's also not really about the murder mechanically, if you think about it — it's about a will and who's entitled to inherit anything at all. Random fact, the house set was built with a hidden staircase specifically so certain shots wouldn't be geographically possible in a real house. See? Smarter than 'rich family, someone dies' once someone actually walks you through the structure.",
  },
  {
    title: "Mad Max: Fury Road",
    year: 2015,
    mansplainSummary:
      "Oh, Fury Road — yeah, I've probably watched this one enough times that I stopped needing subtitles for half the dialogue, there's barely any anyway. I know it probably just looks like one long car chase to you, but it's actually incredibly tightly storyboarded, almost like a silent film with engines. So it's technically the fourth Mad Max movie, people forget that, it's mostly a soft reboot rather than a direct sequel. Everyone thinks Max is the main character because his name's in the title, but Furiosa's actually driving the entire plot, he's more of a passenger in his own franchise here. It's also not really about escaping, structurally, if you think about it — the second half is entirely about turning around and going back. Random fact, most of the stunts were done practically, minimal CGI, which is honestly rare for a movie this chaotic-looking. See? More deliberate than 'trucks go fast' once someone actually explains what's happening.",
  },
  {
    title: "Coco",
    year: 2017,
    mansplainSummary:
      "Oh, Coco — yeah, I own this on Blu-ray, great movie. I know it probably just reads as a cute kids' movie to you, but it's got a pretty heavy concept buried in it once you look closer. It's set around Día de los Muertos, which just means the holiday where the living and dead can sort of cross paths, that's the whole premise. Everyone thinks Miguel ends up in the Land of the Dead because of some cursed guitar, but that's not it — he steals a photo off his ancestor's memorial altar, the guitar's a separate thing, people always mix those two up. It's also not really about music, if you think about it, it's about memory and who gets remembered at all. Random fact, the animation team built a whole custom lighting system just for the marigold bridge, longer than some studios spend on an entire movie. See? Heavier than 'kid plays guitar in the afterlife' once someone actually walks you through it.",
  },
  {
    title: "La La Land",
    year: 2016,
    mansplainSummary:
      "Oh, La La Land — yeah, I've probably watched this one enough times that the ending doesn't wreck me anymore, mostly. I know it probably just reads as a fun musical romance to you, but it's actually structured as a pretty deliberate argument about ambition versus love. So it's shot mostly in long unbroken takes, which just means the dance numbers are largely one continuous shot, not edited together from pieces. Everyone thinks the ending's just sad for the sake of it, but it's actually the whole point of the movie, they show you the version where they stayed together specifically to make the real ending land harder. It's also not really a traditional love story structurally, if you think about it — it's closer to two people using each other to become who they wanted to be. Random fact, Emma Stone reportedly did her big solo audition scene in very few takes, almost entirely live vocals. See? More deliberate than 'sad ending musical' once someone actually explains the structure.",
  },
  {
    title: "Star Wars",
    year: 1977,
    mansplainSummary:
      "Oh, Star Wars — yeah, I've probably seen this one enough times that I forget not everyone grew up with it on loop. I know it probably just looks like a simple space adventure to you, but it's actually structured almost exactly like a classic hero's-journey myth, on purpose. So it's technically Episode IV, people forget that, it wasn't numbered that way until later films came out. Everyone thinks Obi-Wan just dies in the duel with Vader, but he actually lets it happen on purpose, it's not really a loss, it's a strategic move, he says so directly. It's also not really about the Death Star as a weapon, structurally, if you think about it — it's about Luke choosing to trust instinct over the targeting computer, that's the actual climax. Random fact, George Lucas originally wanted a much bigger, more experienced cast, and most of the leads were largely unknowns at the time. See? A lot more mythic structure than 'space adventure' once someone actually breaks it down.",
  },
  {
    title: "The Silence of the Lambs",
    year: 1991,
    mansplainSummary:
      "Oh, Silence of the Lambs — yeah, I've probably watched this one enough times to stop being unsettled by it, mostly. I know it probably just reads as a serial-killer thriller to you, but it's really more of a two-hander character study that happens to have one. So it's based on a novel, people forget that, Thomas Harris wrote several books with these same characters. Everyone thinks Lecter's the one hunting the killer, but he's actually locked up the entire movie, Clarice does all the actual legwork, he just trades information for it. It's also not really about catching a killer structurally, if you think about it — it's about Clarice proving herself in a system that keeps underestimating her. Random fact, Anthony Hopkins is only on screen for about sixteen minutes total, despite basically defining the whole movie's reputation. See? A lot more going on than 'creepy guy in a cell' once someone actually walks you through it.",
  },
  {
    title: "Fight Club",
    year: 1999,
    mansplainSummary:
      "Oh, Fight Club — yeah, I've probably watched this one enough times that the twist stopped landing for me a while ago. I know it probably just looks like a movie about guys punching each other to you, but it's really more of a critique of consumerism that happens to have punching in it. So it's based on a novel, people forget that, Chuck Palahniuk wrote it before the movie existed. Everyone thinks Tyler Durden's just a cool alter-ego, but he's actually a symptom of the narrator's dissociation, not someone to root for, people misread that constantly. It's also not really about fighting, structurally, if you think about it — the fight club itself is basically a metaphor that spirals into an actual terrorist plot. Random fact, the twist was seeded so heavily that the director's confirmed almost every scene has a visual clue in it on rewatch. See? Deeper than 'guys start a fight club' once someone actually explains what it's doing.",
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    mansplainSummary:
      "Oh, Endgame — yeah, I've probably seen this one enough times that I stopped needing to have seen the other twenty movies to follow it, mostly. I know it probably just looks like a big superhero team-up to you, but it's actually structured more like a heist movie for the middle act. So it's a direct sequel, which just means it picks up right after the last one where half of everyone got erased. Everyone thinks the time travel just undoes everything from the last movie, but it actually doesn't erase anything, they're collecting stones from parallel points without changing their own past, that's a common misunderstanding. It's also not really about beating Thanos in a fight, structurally, if you think about it — the actual climax is a sacrifice, not a punch. Random fact, they filmed the final battle with basically every character actor under contract at the same time, apparently a scheduling nightmare. See? More going on than 'heroes fight bad guy' once someone actually explains it.",
  },
  {
    title: "Barbie",
    year: 2023,
    mansplainSummary:
      "Oh, Barbie — yeah, I've probably watched this one more critically than most people watch anything, there's a lot layered in that gets memed past. I know it probably just looks like a toy commercial to you, but it's actually got a pretty direct feminist critique running underneath the pink. So it's directed by Greta Gerwig, which just means expect the tone to swing between genuinely funny and genuinely sincere without much warning. Everyone thinks Ken's arc is just comic relief, but he's actually the one delivering most of the movie's commentary on fragile masculinity, that's doing more work than people give it credit for. It's also not really about Barbie fixing Barbieland structurally, if you think about it — it's about her choosing to become human despite it being the harder, worse option. Random fact, the sets reportedly caused a real-world shortage of a specific shade of pink paint during production. See? More going on than 'toy commercial' once someone actually breaks it down.",
  },
];
