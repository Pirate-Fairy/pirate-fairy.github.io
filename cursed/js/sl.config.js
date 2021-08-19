/*
  Cursed Boardgame v.4 
  Updated by Blondeh
  August 2021

  Cursed Boardgame Interactive NSFWCYOA
  Created by /u/chinesesilklanterns
  May 2020
    
  I hope you enjoyed playing this as much as I did making it. 
  If you want to contact me, find me on Reddit (https://reddit.com/u/chinesesilklanterns)
  If you've found content that you think I might enjoy, do share it with me!
  
  License: You are free to use and redistribute this game, associated code and files entirely free of charge in a non-commercial setting, so long as proper attribution is given to me. 
  I do not own the copyright to the illustrated images in the 'icons' folder used in this game, they belong to various artists found online.
  You agree not to hold me responsible for any damages that may result from your use of these files, use at your own risk.
  You may create derivative works, using all or parts of the files provided here, as long as the abovementioned acknowledgement is retained.
  
  Basically, if you share or modify this, be nice and credit me.
*/

//cell types
//Teleportation Portal - Provides the option of moving forward X number of steps or staying put
//Cursed Teleportation Portal - Provides the option of staying put with a penalty, or moving back X number of steps 
//Transformation Shrine - Provides a standard perk to choose
//Cursed Transformation Shrine - Provides a different kind of perk to choose
//Treasure Chest - Contains unknown items or currency. May be trapped. Items may be cursed.
//Item Shop - Sells items.
//Wild Magic - Applies unpredictable effect


var configCells = [
{cellid:[3,6,9,18,25,32,41,49,56,70,71,83], category: "Transformation", imagebig:"shrine1big.png", image:"shrine1.png", title:"Transformation Shrine", prompt: "Glowing letters appear in the air, forming a phrase.<br/><br/><span style='color:yellow'><em>\"Out with the old, in with the new, now you can be, a better version of you.\"</em></span><br/><br/>Looks like you'll have to make a choice...", numans: 3},
{cellid:[2,4,5,8,10,12,14,16,19,21,23,26,28,34,37,38,40,45,47,50,52,53,58,61,65,66,69,74,77,82,84,89,92,93,96,97], category: "CursedTransformation", imagebig:"shrine2big.png", image:"shrine2.png", title:"Cursed Transformation Shrine", prompt: "Glowing letters appear in the air, forming a phrase.<br/><br/><span style='color:yellow'><em>\"Life may be dull, but stay here with me. You shall soon see, how fun it can be.\"</em></span><br/><br/>Looks like you'll have to make a choice...", numans: 3},
{cellid:[11,24,35,51,72], category: "Teleport", imagebig:"portal1big.jpg", image:"portal1.png", title:"Teleportation Portal", prompt: "Glowing letters appear in the air, forming a phrase.<br/><br/><span style='color:yellow'><em>\"A choice you must make, the path you will take. To stay or to go, you're still in control.\"</em></span><br/><br/>A blue portal materializes, offering a shortcut.", numans: 0},
{cellid:[29,36,44,54,60,63,73,76,79,87,88,90,95,99], category: "CursedTeleport", imagebig:"portal2big.jpg", image:"portal2.png", title:"Cursed Teleportation Portal", prompt: "Glowing letters appear in the air, forming a phrase.<br/><br/><span style='color:yellow'><em>\"If you wish to stay ahead, a price to pay you'll leave to fate.\"</em></span><br/><br/>The nebulous pink portal seems to swirls, beckoning you closer...",  numans: 0},
{cellid:[7,13,17,27,30,33,39,43,48,55,59,64,68,78,85,91], category: "TreasureChest", imagebig:"chestbig.png", image:"chest.png", title:"Mysterious Chest", prompt: "Glowing letters appear in the air, forming a phrase.<br/><br/><span style='color:yellow'><em>\"A chance to claim treasures untold, beware, all that glitters isn't gold.\"</em></span><br/><br/>You see a treasure chest appear before you. Do you dare claim what lies inside?", numans: 0},
{cellid:[15,20,22,31,42,46,57,62,67,75,80,81,86,94,98], category: "WildMagic", imagebig:"chaosbig.jpg", image:"chaos.png", title:"Wild Magic Surge", prompt: "Glowing letters appear in the air, forming a phrase.<br/><br/><span style='color:yellow'><em>\"Alas, this choice you cannot make. It's time to leave change up to fate.\"</em></span><br/><br/>Magical energies twist and surge around you...", numans: 0},

//{cellid:[26,27,28], category: "CursedItemShop", imagebig:"shop2big.jpg", image:"shop2.png", title:"Sketchy Dealer", prompt: "A shady looking guy appears out of nowhere.<br/><br/><span style='color:yellow'><em>\"Listen, I've some good stuff I gotta ditch quick. Take your pick - it's on the house. No refunds.\"</em></span><br/><br/>He offers you the choice of a single item.", numans: 0},

];

var itemshopdata = {cellid:[], category: "ItemShop", imagebig:"shop1big.jpg", image:"shop1.png", title:"Item Shop", prompt: "A strange wizard appears from nowhere in a puff of smoke.<br/><br/><span style='color:yellow'><em>\"Welcome to my shop. We're out of riddles today. Care to buy something?\"</em></span><br/><br/>He presents a selection of items for your perusal, and asks if you'd like to buy one.", numans: 3};

//cell values range from 0 to max

var configAttribDescs = [
{attribname: "gender", descs: ["M","F"]},
{attribname: "strength", descs: ["Your limbs are slender and delicate. You might need help lifting more than a few pounds.","","You're pretty strong physically, your body is fit and well-toned.","You feel incredibly strong, your muscular form is chiseled and firm. You feel like you could lift hundreds of pounds effortlessly."]},
{attribname: "stamina", descs: ["You get easily tired from physical activity, you'll frequently need time to rest and catch your breath.","","Your stamina is higher than average, you could run a mile without breaking a sweat.","Your stamina is inexhaustible, you could easily keep going for days."]},
{attribname: "dexterity", descs: ["You're kinda clumsy at times, but in an adorable way.","","You're nimble and light on your feet, your movements are graceful and precise.","You're extremely dexterous and flexible, you move with unmatched grace and your reflexes are swift as lightning."]},
{attribname: "eyesight", descs: ["You're rather short sighted. You'll need to wear glasses.","","You have perfect vision, you'll be able to see objects clearly from miles away."]},
{attribname: "constitution", descs: ["","You're more hardy than normal, you get sick less often and recover faster.","You'll always have perfect health, age much slower, and are immune to all illnesses and diseases."]},
{attribname: "intelligence", descs: ["","You're quick-witted, have a good memory, and often catch the little details others might miss","You're easily a genius, you have an eidetic memory, and you're capable of recognizing patterns and drawing deductions that no one else can."]},
{attribname: "charisma", descs: ["You are kind of shy and socially awkward, finding it more difficult to approach or talk to others, especially unfamiliar people.","","You're generally likable and good with people, socializing comes naturally to you.","You're a social butterfly. Wherever you go, you'll find that everyone adores and respects you."]},
{attribname: "talent", descs: ["","You're naturally talented in many things. Whether it's music, the arts, or another hobby, so long as you put in some effort, you'll find yourself picking it up intuitively.","You're astoundingly gifted at whatever you do. From learning a new language, picking up a skill, to playing an instrument, it all comes easily and instinctively to you."]},
{attribname: "luck", descs: ["You seem to have the worst luck, you often find yourself being caught in compromising situations.","","You find that things generally tend to go well for you in small, subtle ways.","You're favored by the universe. You have inexplicable luck that always seems to kick in at just the right moment. Good things regularly happen to you and those around you."]},
{attribname: "hair length", descs: ["Short and neatly trimmed","Neck length","Shoulder length","Long and flowing", "Really long", "Rapunzal would be jealous"]},
{attribname: "breast size", descs: ["","A-Cup. Tiny, fun sized mounds.","B-Cup. Small and perky.","C-Cup. Round and perky.","D-Cup. Snug and filling.","E-Cup. Large and squishy.","F-Cup. Huge and pillowy.","G-Cup. Absolutely massive.","Gigantic. Off the charts."]},
{attribname: "ass size", descs: ["","Cute and petite","Toned and round","Curvy and bubbly","Thicc and juicy","Extra thicc"]},
{attribname: "physique", descs: ["","You're definitely a chick now, with everything that entails. You've got boobs and an adorably cute face.","You've become a very feminine and sexy woman. Every part of you oozes sensuality, from your boobs down to your curvy waist, hips and ass, and your sultry, smooth face."]},
{attribname: "orientation", descs: ["Attracted to Women","Attracted to Men","Bisexual"]},
{attribname: "increased libido", descs: ["","Your libido is higher than normal. You're going to find yourself feeling the need for release every so often.","Your libido is significantly higher than normal. You'll get hot and bothered many times a day, as you feel an almost irresistable urge for an orgasm.","Your libido is completely out of control. Your body is near-constantly horny and aching with a desperate need multiple times a day."]},
{attribname: "increased sensitivity", descs: ["","Your body is especially sensitive to touch, a careless brush across your skin sends pleasant shivers all the way down.","Your body's is extremely sensitive to touch, a gentle carass would leave you squirming and panting. Moving about in tight clothing might leave you a sticky mewling mess."]},
{attribname: "increased fluids", descsM: ["","Your body produces much more fluids than normal. You'll produce huge loads whenever you cum."], descsF: ["","Your body produces much more fluids than normal. You'll get wet easily, and lubrication will never be a problem, although cleanup might be."]},
{attribname: "always ready", descsM: ["","Your body is always ready for sex. Your cock is perpetually rock hard and erect."], descsF: ["","Your body is always ready for sex. Your nipples are perpetually stiff, and your pussy dripping wet and gooey."]},
{attribname: "enhanced orgasms", descs: ["","Your orgasms last longer and more powerful and pleasurable than normal. It'll be hard to stay quiet or maintain your composure whenever they happen.","Your orgasms are mind-blowingly intense and incredibly drawn out. When they hit, you'll be incapacitated as your mind goes blank, unable to stop yourself from writhing and moaning in bliss."]},
{attribname: "submissiveness", descs: ["","You are naturally submissive, often seeking to obey and please, especially in sexual situations.","You're very submissive, always seeking to obey and please. You get turned on and find it really hard to resist being ordered around."]},
{attribname: "hypnotic susceptibility", descs: ["","You're surprisingly vulnerable to slipping into a trance, a few rhythmic words and motions might put you under into a highly suggestible hypnotic state."]},
{attribname: "multiple orgasms", descs: ["","Your refractory period is basically non-existent, you're ready to go again right after you come. Get too excited and you might experience a wave of multiple orgasms cascading over you, one after the other, with no respite."]},
{attribname: "random orgasms", descs: ["","You'll occasionally experience random, uncontrollable orgasms at unpredictable times of the day, coming with little or no warning. "]},
{attribname: "triggered orgasms", descs: ["","You now have a magic trigger word <b>'Pineapple'</b>. Whenever you read or hear it, you'll immediately find yourself experiencing a powerful, uncontrollable orgasm."]},
{attribname: "triggered arousal", descs: ["","You now have a magic trigger word <b>'Nutmeg'</b>. Whenever you read or hear it, you'll suddenly find yourself extremely horny."]},
{attribname: "easily aroused", descs: ["","It's much easier to get you hot and bothered now. Seeing a provocative pose or accidental exposure will get you all riled up, blushing and thinking of sex."]},
{attribname: "hair trigger", descs: ["","It's really easy to make you orgasm now. Any sexual stimulation would have you quickly going over the edge."]},
{attribname: "flexible", descs: ["","Your body is very flexible and has great range of motion. All your orifices are a lot more stretchy, you'll be able to accomodate anything without much pain."]},
{attribname: "cheerful", descs: ["", "You have a naturally upbeat and bubbly disposition. Your cheerful and optimistic attitude makes it hard to get you down."]},
{attribname: "tasty fluids", descs: ["", "Your sexual fluids are super delicious, and anyone tasting them would be eager for more."]},
{attribname: "pheromones", descs: ["","Your body constantly emits special pheromones, gradually making everyone around you hornier and hornier. Especially potent in enclosed spaces."]},
{attribname: "no gag reflex", descs: ["","Your gag reflex is greatly suppressed, making you able to take any size of dick in your throat without choking."]},
{attribname: "oral lover", descs: ["","You love oral sex. The thought of tasting and sucking with your sensitive lips and tongue greatly excites you."]},
{attribname: "anal lover", descs: ["","You love taking it from behind. The thought getting fucked in the ass greatly excites you - and it'll feel amazing too.","You prefer it in the ass over any other orifice. You will beg for something in your ass at every chance.","You wear a buttplug 24/7. Without something in your ass you are upset and feel empty."]},
{attribname: "infertile", descsM: ["","You are shooting blanks. You'll never have to worry about accidentally impregnating someone."], descsF: ["","You are completely barren. You'll never have to worry about getting pregnant."]},
{attribname: "very fertile", descsM: ["","Your seed is especially potent. Going without contraception would almost guarantee pregnancy."],descsF: ["","You are exceptionally fertile. Going without contraception would almost guarantee pregnancy."]},
{attribname: "pent up", descs: ["","Whenever you get aroused, you cannot 'cool down' and will remain in an aroused state until you've had an orgasm."]},
{attribname: "masochistic", descs: ["","Pain and degradation inflicted on you triggers pleasure and involuntary sexual arousal."]},
{attribname: "exhibitionist", descs: ["","You crave the risk of being exposed in public. You love the thought of being caught naked or getting off where you shouldn't."]},
{attribname: "lewd dreams", descs: ["","You often have highly passionate and erotic dreams. You'll wake up each day a horny mess."]},
{attribname: "heat", descs: ["","Once a month for a day you enter a state of animalistic heat, barely able to focus on anything but fucking during this time."]},
{attribname: "dependent", descs: ["","You find it much harder to get off on your own, whether with toys or your own hands. It'll feel good, but you won't quite get there. You'll need to find someone else to help you out."]},
{attribname: "fluid addiction", descs: ["","You're physically addicted to cum, if you go without it, you'll crave it and feel withdrawl symptoms."]},
{attribname: "lactation", descs: ["","Your breasts are constantly producing milk, they'll have to be milked regularly or they'll drip and feel sore."]},
{attribname: "incontinence", descs: ["","You often have trouble controlling your weak bladder.","You have completely lost control over your bladder.","You often have trouble controlling both your bladder and your bowels.","You have completely lost control of your bladder and your bowels. You will have have accidents without careful planning.","You have become diaper dependent and will need to wear them at all times. Better find someone willing to change you."]},
{attribname: "hair removal", descs: ["","You're completely hairless from the neck down, permanently. You won't ever have to worry about body hair."]},
{attribname: "sleepy", descs: ["","You need more sleep than normal. You may find yourself dozing off without noticing."]},
{attribname: "ditzy", descs: ["","You're kind of scatterbrained at times. You get distracted easily and find it hard to focus for long.","You are a completely bimbo. You can't remember anything complicated, do basic math, or read anything above a certain level. Good thing you're pretty."]},
{attribname: "noisy", descs: ["","You're can't help but whimper and moan when pleasured. It'll be impossible for you to stay quiet when you orgasm."]},
{attribname: "denial", descs: ["","Whenever you're about to orgasm there's a 10% chance you'll instead be unable to cum for the next hour. You'll feel good but you won't be able to get over the edge, which will leave you horny and frustrated.","Whenever you're about to orgasm there's a 30% chance you'll instead be unable to cum for the next 2 hours. You'll feel good but you won't be able to get over the edge, which will leave you horny and frustrated."]},
{attribname: "palette swap", descs: ["",""]},
{attribname: "name change", descs: ["",""]},
];

var configChangeDescs = [ //used to describe detailed changing to this level
{attribname: "strength", descs:["","You flex apprehensively, feeling a little stronger.","You flex apprehensively, feeling a little stronger.","You can feel the power flowing through and shaping the muscles in your limbs, transforming them."]},
{attribname: "hair length", descs:["","Your hair lengthens slightly, stopping just at the base of your neck.","Your hair lengthens, stopping at your shoulders.","Your feel your hair lengthening, flowing down past your upper back as you brush it back.","Your hair grows, extending down to your waist in lush, lustrous strands. Your fingers run through it, trying your best to keep it from getting in the way."]},
{attribname: "breast size", descs:["","Two soft, small mounds form from your chest. You've got boobs!","Your small breasts expand a little more.","Your small breasts expand a little more.","You can really feel the weight of your boobs now, as they expand.","You can really feel the weight of your boobs now, as they expand.","Your voluptuous boobs jiggle as they expand to huge proportions.","Your voluptuous boobs jiggle as they expand to massive proportions.","Your voluptuous boobs jiggle as they balloon to gigantic proportions."]},
{attribname: "ass size", descs:["","Your formerly flat butt seems to swell and round out a little as it grows.","Your ass expands further, as soft and jiggly flesh fills and forms into a nice bubble butt.","Your ass jiggles and expands further, ballooning into even thicker and curvier proportions.","Your ass inflates up to a gigantic size, a huge fleshy mass that jiggles and sways every time you move."]},
{attribname: "increased libido", descs:["","It doesn't feel like much has changed, but you start to notice a pleasant, warm hunger in your loins.","The tingle in your loins grows, and you feel the pulsing desire inside you grow more urgent, a warm heat now increasingly craving for relief.","An intense, uncontrollable passion fills your trembling body. It's hard to focus on anything but your burning need for an orgasm, as your hands reach down to pleasure yourself."]},
{attribname: "increased sensitivity", descs:["","You brush your chest experimentally, and are surprised by how good it feels.","You gingerly run your fingers across your skin, feeling an unexpected wave of pleasure that makes your knees buckle. The sensations are overwhelming."]},
{attribname: "random orgasms", descs:["","Sometimes, you might be hanging around, and suddenly you'll feel pleasantly flushed, as your breath quickens. When that happens, you'd better excuse yourself quickly."]},
{attribname: "triggered orgasms", descs:["","You hear a voice whispering a word, and your body tenses up as a warmth builds. You try to resist, but you're soon quivering uncontrollably as an orgasm hits you."]},
{attribname: "triggered arousal", descs:["","You hear a voice whispering a word, and suddenly you're feeling flushed and horny, an intense arousal rapidly warming your loins."]},
{attribname: "easily aroused", descsM:["","As the change washes over you, you feel your cock stirring and slowly getting stiff and erect."],descsF:["","As the change washes over you, you feel your nipples become a little hard as your pussy begins to wet itself."]},
{attribname: "incontinence", descs:["","Your body starts to change invisibly. Your bladder shrinks and you lose sensitivity down there.","Your mind draws a blank when you try to remember you need to get to the bathroom to go.","Why is your stomach rumbling? Oh no, this is urgent.","You feel your body tense and your knees bend into a familar squat.","Why are you like this? Why can't you control yourself like other people.","You feel your knees bend and you release. It's a good thing that pillowy softness is there to help."]}
];

var configChangeImgs = [ //used to show icons for attribute at this level
{attribname: "strength", imgsM:["enfeebledM.jpg","strengthM.jpg"], imgsF:["enfeebledF.jpg","strengthF.jpg"]},
{attribname: "stamina", imgsM:["enervatedM.jpg","staminaM.jpg"], imgsF:["enervatedF.jpg","staminaF.jpg"]},
{attribname: "dexterity", imgsM:["clumsyM.jpg","dexterityM.jpg"], imgsF:["clumsyF.jpg","dexterityF.jpg"]},
{attribname: "eyesight", imgsM:["eyesightM.jpg","eyesight.jpg"], imgsF:["eyesightF.jpg","eyesight.jpg"]},
{attribname: "constitution", imgs:["constitution.jpg"]},
{attribname: "intelligence", imgs:["intelligence.jpg"]},
{attribname: "charisma", imgsM:["wallflowerM.jpg","charisma.jpg"], imgsF:["wallflowerF.jpg","charisma.jpg"]},
{attribname: "talent", imgsM:["talentM.jpg"], imgsF:["talentF.jpg"]},
{attribname: "luck", imgs:["unlucky.jpg","luck.jpg"]},
{attribname: "breast size", imgs:["","chest1.jpg","chest2.jpg","chest3.jpg","chest4.jpg","chest5.jpg","chest6.jpg","chest7.jpg","chest8.jpg"]},
{attribname: "hair length", imgs:["","hair1.jpg","hair2.jpg","hair3.jpg","hair4.jpg"]},
{attribname: "ass size", imgs:["","ass1.jpg","ass2.jpg","ass3.jpg","ass4.jpg","ass5.jpg"]},
{attribname: "physique", imgs:["","physique1.jpg","physique2.jpg"]},
{attribname: "height", imgsM:["shrinkM.jpg"], imgsF:["shrinkF.jpg"]},
{attribname: "age", imgsM:["regressM.jpg"], imgsF:["regressF.jpg"]},
{attribname: "orientation", imgs:[]},
{attribname: "increased libido", imgsF:["","libidoF1.jpg","libidoF2.jpg","libidoF3.jpg"],imgsM:["","libidoM1.jpg","libidoM2.jpg","libidoM3.jpg"]},
{attribname: "increased sensitivity", imgs:["sensitive.jpg"]},
{attribname: "increased fluids", imgsM:["increasedfluidsM.jpg"], imgsF:["increasedfluidsF.jpg"]},
{attribname: "always ready", imgsM:["alwaysreadyM.jpg"], imgsF:["alwaysreadyF.jpg"]},
{attribname: "enhanced orgasms", imgsM:["enhancedM1.jpg","enhancedM1.jpg","enhancedM2.jpg"], imgsF:["enhancedF1.jpg","enhancedF1.jpg","enhancedF2.jpg"]},
{attribname: "submissiveness", imgs:["submissive.jpg"]},
{attribname: "hypnotic susceptibility",imgsM:["hypnoM.jpg"], imgsF:["hypnoF.jpg"]},
{attribname: "multiple orgasms", imgs:["multipleorgasms.jpg"]},
{attribname: "random orgasms", imgs:["randomorgasms.jpg"]},
{attribname: "triggered orgasms", imgs:["triggeredorgasms.jpg"]},
{attribname: "triggered arousal", imgs:["triggeredarousal.jpg"]},
{attribname: "easily aroused", imgsM:["easilyarousedM.jpg"], imgsF:["easilyarousedF.jpg"]},
{attribname: "hair trigger", imgsM:["hairtriggerM.jpg"], imgsF:["hairtriggerF.jpg"]},
{attribname: "flexible", imgsM:["flexibleM.jpg"], imgsF:["flexibleF.jpg"]},
{attribname: "cheerful", imgsM:["cheerfulM.jpg"], imgsF:["cheerfulF.jpg"]},
{attribname: "tasty fluids", imgs:["tastyfluids.jpg"]},
{attribname: "pheromones", imgs:["pheromones.jpg"]},
{attribname: "no gag reflex", imgs:["nogag.jpg"]},
{attribname: "oral lover", imgsM:["oralloverM.jpg"], imgsF:["oralloverF.jpg"]},
{attribname: "anal lover", imgs:["anallover.jpg"]},
{attribname: "infertile", imgs:["infertile.jpg"]},
{attribname: "very fertile", imgs:["veryfertile.jpg"]},
{attribname: "pent up", imgs:["pentup.jpg"]},
{attribname: "masochistic", imgsM:["masochistM.jpg"], imgsF:["masochistF.jpg"]},
{attribname: "exhibitionist", imgs:["exhibitionist.jpg"]},
{attribname: "lewd dreams", imgs:["lewddreams.jpg"]},
{attribname: "heat", imgs:["heat.jpg"]},
{attribname: "dependent", imgs:["dependent.jpg"]},
{attribname: "fluid addiction", imgs:["fluidaddiction.jpg"]},
{attribname: "lactation", imgs:["lactation.jpg"]},
{attribname: "incontinence", imgs:["incontinence.jpg","incontinence1.jpg","incontinence2.jpg","incontinence3.jpg","incontinence4.jpg","incontinence5.jpg","incontinence6.jpg"]},
{attribname: "hair removal", imgs:["hairremoval.jpg"]},
{attribname: "sleepy", imgsM:["sleepyM.jpg"], imgsF:["sleepyF.jpg"]},
{attribname: "ditzy", imgsM:["ditzyM.jpg"], imgsF:["ditzyF.jpg","bimbo.jpg"]},
{attribname: "noisy", imgs:["noisy.jpg"]},
{attribname: "denial", imgs:["denial.jpg"]}
];


var configEffects = [
{category: "Transformation", effectname: "Strength Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"Heavy burdens seem so light, all shall tremble at your might.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a surge of power flow through your limbs.</span><br/><br/><span style='color:lime'>(Strength Improved!)</span>", requiresattribnotmax:"strength"},
{category: "Transformation", effectname: "Stamina Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"A marathon would be a breeze, the extra miles just go with ease.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a surge of newfound endurance flow through your limbs, like you've found new energy reserves just waiting to be tapped.</span><br/><br/><span style='color:lime'>(Stamina Improved!)</span>", requiresattribnotmax:"stamina"},
{category: "Transformation", effectname: "Dexterity Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"Some are nimble, some are quick, you'll be both, and that's the trick.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a surge of agility flow through your limbs. You feel quicker, your movements more coordinated and precise.</span><br/><br/><span style='color:lime'>(Dexterity Improved!)</span>", requiresattribnotmax:"dexterity"},
{category: "Transformation", effectname: "Eyesight Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"What view could be more sublime, than what you see with your own eyes.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your vision dramatically improve.</span><br/><br/><span style='color:lime'>(Eyesight Improved!)</span>", requiresattribnotmax:"eyesight"},
{category: "Transformation", effectname: "Constitution Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"Health is important, I'm sure you'll agree. Fit as a fiddle, you too shall be\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your body being rejuvinated and revitalized.</span><br/><br/><span style='color:lime'>(Constitution Improved!)</span>", requiresattribnotmax:"constitution"},
{category: "Transformation", effectname: "Intelligence Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"When time grows short, you'll think with haste, the mind is a terrible thing to waste.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your mind sharpen, your thoughts expanding to a whole new level.</span><br/><br/><span style='color:lime'>(Intelligence Improved!)</span>",requiresattribnotmax:"intelligence"},
{category: "Transformation", effectname: "Charisma Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"The pen is mightier than the sword, your words win hearts and so much more.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a surge of confidence and poise.</span><br/><br/><span style='color:lime'>(Charisma Improved!)</span>",requiresattribnotmax:"charisma"},
{category: "Transformation", effectname: "Talent Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"No matter what you seek to grow, within yourself you'll find your goal.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a surge of inspiration. You feel more capable, more competent.</span><br/><br/><span style='color:lime'>(Talent Improved!)</span>",requiresattribnotmax:"talent"},
{category: "Transformation", effectname: "Luck Enhancement", img:"none", desc: "<span style='color:yellow'><em>\"Through thick and thin, through peace and strife, the hands of fate are on your side.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel luckier than before, though you can't quite explain how so.</span><br/><br/><span style='color:lime'>(Luck Improved!)</span>",requiresattribnotmax:"luck"},
{category: "CursedTransformation", effectname: "Hair Growth", img:"none", desc: "<span style='color:yellow'><em>\"Your hair's a silky sight to behold. Lush and smooth, you'll watch as it grows.\"</em></span><br/><br/><span style='float:right'>As the words form, your scalp itches slightly as you feel your hair rapidly growing longer.</span><br/><br/><span style='color:lime'>(Hair Length Increased!)</span>",requiresattribnotmax:"hair length",randwt:1},
{category: "CursedTransformation", effectname: "Enfeeblement", img:"none", desc: "<span style='color:yellow'><em>\"Weak as a kitten, give up your exertion. It's okay if you can't carry this burden. \"</em></span><br/><br/><span style='float:right'>As the words form, you feel the muscles in your arms and legs shrinking, becoming soft and smooth.</span><br/><br/><span style='color:lime'>(Enfeebled!)</span>", requiresattribnotmin:"strength"},
{category: "CursedTransformation", effectname: "Breast Growth", img:"none", desc: "<span style='color:yellow'><em>\"Soft to the touch, and a fun thing to hold, soon you'll have more assets to extoll.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a slight tenderness in your chest as it seems to swell and expand.</span><br/><br/><span style='color:lime'>(Breast Size Increased!)</span>",requiresattribnotmax:"breast size",randwt:4},
{category: "CursedTransformation", effectname: "Gender Change", img:"tg.jpg", desc: "<span style='color:yellow'><em>\"Get set, you're in for a wild ride, it's time to play from the other side.\"</em></span><br/><br/><span style='float:right'>As the words form, your flesh shifts, as your waist and limbs constrict. Your face feels different, strands of hair tickling your cheeks. You feel two bumps poking of your chest. Your dainty hands shoot down to your crotch, and you gasp in a high pitch as you notice a smooth flatness.</span><br/><br/><span style='color:lime'>(Gender Changed!)</span>",requiresattribnotmax:"gender",randwt:9},
{category: "CursedTransformation", effectname: "Extra Feminization", img:"physique2.jpg", desc: "<span style='color:yellow'><em>\"Get set, you're in for another roound. In for a penny, in for a pound.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your body transform, your waist narrowing further as your hips widen. Your face and skin feel even softer and smoother. You let out a soft squeak, as your chest and butt feel a little tighter and fuller. </span><br/><br/><span style='color:lime'>(Extra Feminization!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"physique",randwt:4},
{category: "CursedTransformation", effectname: "Shrinking", img:"none", desc: "<span style='color:yellow'><em>\"You'll stand to lose, but don't be sad, being short's not so bad.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel the room seem to get a little larger... until you realise you've gotten just a little shorter.</span><br/><br/><span style='color:lime'>(Height Decreased!)</span>",requiresattribcustom:"height"},
{category: "CursedTransformation", effectname: "Ass Expansion", img:"none", desc: "<span style='color:yellow'><em>\"Soft to the touch, and a fun thing to hold, soon you'll have more assets to extoll.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your ass expanding, soft fat forming into shape.</span><br/><br/><span style='color:lime'>(Ass Expansion!)</span>",requiresattribnotmax:"ass size",randwt:2},
{category: "CursedTransformation", effectname: "Orientation Change", img:"orientation.jpg", desc: "<span style='color:yellow'><em>\"Things aren't always what they seem, why not pick a different team?\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a subtle shift within your mind... and as you reflect, you're slightly unsettled to discover your sexual orientations have changed.</span><br/><br/><span style='color:lime'>(Orientation Changed!)</span>",requiresattribcustom:"orientation",randwt:3},
{category: "CursedTransformation", effectname: "Increased Libido", img:"none", desc: "<span style='color:yellow'><em>\"Soon you'll start to feel the need, an ache inside that must be freed.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a strange tingle rush through your body. </span><br/><br/><span style='color:lime'>(Libido Increased!)</span>",requiresattribnotmax:"increased libido",randwt:3},
{category: "CursedTransformation", effectname: "Increased Sensitivity", img:"none", desc: "<span style='color:yellow'><em>\"A litte touch will make you shiver. It's be much easier to make you quiver.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a strange tingle rush over your skin.</span><br/><br/><span style='color:lime'>(Sensitivity Increased!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"increased sensitivity",randwt:1},
{category: "CursedTransformation", effectname: "Increased Fluids", img:"none", desc: "<span style='color:yellow'><em>\"When the going gets rough, this makes it better, you're gonna find things just a bit wetter.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your body change in a subtle way and a drop of juices runs down the inside of your legs.</span><br/><br/><span style='color:lime'>(Fluid Production Increased!)</span>",requiresattribnotmax:"increased fluids"},
{category: "CursedTransformation", effectname: "Always Ready", img:"none", desc: "<span style='color:yellow'><em>\"Anytime, anywhere, sun, rain or snow, you'll be all ready to go.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Always Ready!)</span>",requiresattribnotmax:"always ready"},
{category: "CursedTransformation", effectname: "Enhanced Orgasms", img:"none", desc: "<span style='color:yellow'><em>\"Twice the length, and triple the high, this new change will blow your mind.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Orgasms Enhanced!)</span>",requiresattribnotmax:"enhanced orgasms"},
{category: "CursedTransformation", effectname: "Submissiveness", img:"none", desc: "<span style='color:yellow'><em>\"Whenever you're standing at a crossroad, they will lead and you will follow.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Submissiveness Increased!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"submissiveness"},
{category: "CursedTransformation", effectname: "Hypnotic Susceptibility", img:"none", desc: "<span style='color:yellow'><em>\"Beware the rhythmic voice and hands, or soon you'll find yourself in a trance.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel yourself relax as a nice fuzzy feeling washes over your mind, before you manage to snap back to alertness.</span><br/><br/><span style='color:lime'>(Hypnotic Susceptibility Increased!)</span>",requiresattribnotmax:"hypnotic susceptibility"},
{category: "CursedTransformation", effectname: "Multiple Orgasms", img:"none", desc: "<span style='color:yellow'><em>\"Keep going again, right from the top. Once you pop, you just can't stop.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Multiple Orgasms!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"multiple orgasms"},
{category: "CursedTransformation", effectname: "Random Orgasms", img:"none", desc: "<span style='color:yellow'><em>\"Noon or night, evening or morning. Some things just happen without warning.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Random Orgasms!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"random orgasms"},
{category: "CursedTransformation", effectname: "Triggered Orgasms", img:"none", desc: "<span style='color:yellow'><em>\"When you hear the magic words droning, you won't be able to keep from moaning.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Triggered Orgasms!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"triggered orgasms"},
{category: "CursedTransformation", effectname: "Triggered Arousal", img:"none", desc: "<span style='color:yellow'><em>\"When you hear the magic words spoken, you'll find within a fire awoken.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Triggered Arousal!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"triggered arousal"},
{category: "CursedTransformation", effectname: "Easily Aroused", img:"none", desc: "<span style='color:yellow'><em>\"Beware the things you find provoking, it doesn't take much to get you going.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Easily Aroused!)</span>",requiresattribnotmax:"easily aroused"},
{category: "CursedTransformation", effectname: "Hair Trigger", img:"none", desc: "<span style='color:yellow'><em>\"Try your best to hold it back, you won't last long before you crack.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Hair Trigger!)</span>",requiresattribnotmax:"hair trigger"},
{category: "CursedTransformation", effectname: "Flexible",img:"none", desc: "<span style='color:yellow'><em>\"Stretchy like rubber and supple as a reed, your flexibility's guaranteed.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your body changing slightly as your joints seem to loosen.</span><br/><br/><span style='color:lime'>(Flexible!)</span>",requiresattribnotmax:"flexible"},
{category: "CursedTransformation", effectname: "Cheerful", img:"none", desc: "<span style='color:yellow'><em>\"Whenever you go, you'll have a smile. Nothing will ever bring you down.\"</em></span><br/><br/><span style='float:right'>As the words form, you giggle as an inexplicable wave of happiness and contentment fills you.</span><br/><br/><span style='color:lime'>(Cheerful!)</span>",requiresattribnotmax:"cheerful"},
{category: "CursedTransformation", effectname: "Tasty Fluids", img:"none", desc: "<span style='color:yellow'><em>\"Don't be shy, just have a taste. Not a drop will be left to waste.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Tasty Fluids!)</span>",requiresattribnotmax:"tasty fluids"},
{category: "CursedTransformation", effectname: "Pheromones", img:"none", desc: "<span style='color:yellow'><em>\"If you smell it in the air, you'll start to tingle under there.\"</em></span><br/><br/><span style='float:right'>As the words form, you catch a whiff of a faint pleasant smell in the air.</span><br/><br/><span style='color:lime'>(Pheromones!)</span>",requiresattribnotmax:"pheromones"},
{category: "CursedTransformation", effectname: "No Gag Reflex", img:"none", desc: "<span style='color:yellow'><em>\"Not much to say, but this ain't joking. You'll enjoy it more without the choking.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a subtle odd sensation in your throat that quickly disappears.</span><br/><br/><span style='color:lime'>(No Gag Reflex!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"no gag reflex"},
{category: "CursedTransformation", effectname: "Oral Lover", img:"none", desc: "<span style='color:yellow'><em>\"An improvement is sure to follow, there's no better truth to swallow.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a tingling that runs from your head down to your lips and mouth.</span><br/><br/><span style='color:lime'>(Oral Lover!)</span>",requiresattribnotmax:"oral lover"},
{category: "CursedTransformation", effectname: "Anal Lover", img:"none", desc: "<span style='color:yellow'><em>\"Another pleasure you will find, now you'll love it from behind.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a pleasant tingling in your butt, which suddenly feels more sensitive.</span><br/><br/><span style='color:lime'>(Anal Lover!)</span>",requiresattribnotmax:"anal lover"},
{category: "CursedTransformation", effectname: "Infertile", img:"none", desc: "<span style='color:yellow'><em>\"There's no danger to be frank, all the guns are loaded with blanks.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a brief cramp in your genitals which disappears quickly.</span><br/><br/><span style='color:lime'>(Infertile!)</span>",requiresattribcustom:"infertile"},
{category: "CursedTransformation", effectname: "Very Fertile", img:"none", desc: "<span style='color:yellow'><em>\"Be careful where the white seed goes, it doesn't take much for it to grow.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a brief cramp in your genitals which disappears quickly.</span><br/><br/><span style='color:lime'>(Very Fertile!)</span>",requiresattribcustom:"very fertile"},
{category: "CursedTransformation", effectname: "Pent Up", img:"none", desc: "<span style='color:yellow'><em>\"A fire that starts will stay throughout, burning until you can put it out\"</em></span><br/><br/><span style='float:right'>As the words form, you feel warm and notice your body feeling a little tense in a good way.</span><br/><br/><span style='color:lime'>(Pent Up!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"pent up"},
{category: "CursedTransformation", effectname: "Masochistic", img:"none", desc: "<span style='color:yellow'><em>\"Every sting shall be your gain, you'll find pleasure in the pain.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a slight tingle in your head and you feel different.</span><br/><br/><span style='color:lime'>(Masochistic!)</span>",requiresattribnotmax:"masochistic"},
{category: "CursedTransformation", effectname: "Exhibitionist", img:"none", desc: "<span style='color:yellow'><em>\"The world's your stage, and it's such a thrill. Put on a show, and flaunt your skill.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a slight tingle in your head and you feel different.</span><br/><br/><span style='color:lime'>(Exhibitionist!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"exhibitionist"},
{category: "CursedTransformation", effectname: "Lewd Dreams", img:"none", desc: "<span style='color:yellow'><em>\"In sleep and dreams you'll often find, dark desires fill your mind.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a slight tingle in your head and you feel different.</span><br/><br/><span style='color:lime'>(Lewd Dreams!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"lewd dreams"},
{category: "CursedTransformation", effectname: "Age Regression", img:"none", desc: "<span style='color:yellow'><em>\"Time for a lesson you must hear, sometimes you must go back a year.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel yourself getting younger - the years just slipping away from your body.</span><br/><br/><span style='color:lime'>(Age Regression!)</span>",requiresattribcustom:"age",randwt:1},
{category: "CursedTransformation", effectname: "Heat", img:"none", desc: "<span style='color:yellow'><em>\"Once a month when the moon emerges, you will give in to your urges\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Heat!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"heat"},
{category: "CursedTransformation", effectname: "Wallflower", img:"none", desc: "<span style='color:yellow'><em>\"A crowd can be stressful with all the attention, so stick to the sidelines in every convention.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a slight tingle in your head and you suddenly feel a bit nervous.</span><br/><br/><span style='color:lime'>(Wallflower!)</span>",requiresattribnotmin:"charisma"},
{category: "CursedTransformation", effectname: "Dependent", img:"none", desc: "<span style='color:yellow'><em>\"It takes two to tango, I'm sure you're aware. Don't do it alone, it's more fun to share.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Dependent!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"dependent"},
{category: "CursedTransformation", effectname: "Fluid Addiction", img:"none", desc: "<span style='color:yellow'><em>\"The juice that flows like honey sweet, every day you'll long to eat.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a tingling that runs from your head down to your lips and mouth.</span><br/><br/><span style='color:lime'>(Fluid Addiction!)</span>",requiresattribnotmax:"fluid addiction"},
{category: "CursedTransformation", effectname: "Lactation", img:"none", desc: "<span style='color:yellow'><em>\"A wellspring full of liquid gold, flows forth emerging from the fold.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel a tingle and a dampness forms around two spots on your chest.</span><br/><br/><span style='color:lime'>(Lactation!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"lactation"},
{category: "CursedTransformation", effectname: "Incontinence", img:"none", desc: "<span style='color:yellow'><em>\"Just relax and let it out, there's no need to fret. You can't help but let it get nice and warm and wet.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your bladder suddenly get very relaxed. Your mind goes blank and you lose control.</span><br/><br/><span style='color:lime'>(Incontinence!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"incontinence"},
{category: "CursedTransformation", effectname: "Hair Removal", img:"none", desc: "<span style='color:yellow'><em>\"If you're worried about a tangle, you'll find it smooth from every angle.\"</em></span><br/><br/><span style='float:right'>As the words form, there is a prickling sensation as all your body hair except on your head rapidly flakes away.</span><br/><br/><span style='color:lime'>(Hair Removal!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"hair removal"},
{category: "CursedTransformation", effectname: "Sleepy", img:"none", desc: "<span style='color:yellow'><em>\"When it's time to take a break, you'll find it hard to stay awake.\"</em></span><br/><br/><span style='float:right'>As the words form, your eyelids droop as you suddenly feel very sleepy, before you manage to shake yourself awake.</span><br/><br/><span style='color:lime'>(Sleepy!)</span>",requiresattribnotmax:"sleepy"},
{category: "CursedTransformation", effectname: "Ditzy", img:"none", desc: "<span style='color:yellow'><em>\"Time's much harder not to squander, when your thoughts are left to wander.\"</em></span><br/><br/><span style='float:right'>As the words form, your head feels a little fuzzy as a brief headache washes over you.</span><br/><br/><span style='color:lime'>(Ditzy!)</span>",requiresattribnotmax:"ditzy"},
{category: "CursedTransformation", effectname: "Noisy", img:"none", desc: "<span style='color:yellow'><em>\"You can't really hide your feelings, when you can't stop yourself from squealing.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Noisy!)</span>",requiresattribnotmin:"gender",requiresattribnotmax:"noisy"},
{category: "CursedTransformation", effectname: "Orgasm Denial", img:"none", desc: "<span style='color:yellow'><em>\"No matter the number of times you have tried, sometimes you'll find release denied.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you feel different.</span><br/><br/><span style='color:lime'>(Orgasm Denial!)</span>",requiresattribnotmax:"denial"},
{category: "CursedTransformation", effectname: "Clumsy", img:"none", desc: "<span style='color:yellow'><em>\"Watch your step, lest you stumble, you'd best be careful not to fumble.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you fumble, feeling slightly disorientated.</span><br/><br/><span style='color:lime'>(Clumsy!)</span>",requiresattribnotmin:"dexterity"},
{category: "CursedTransformation", effectname: "Enervation", img:"none", desc: "<span style='color:yellow'><em>\"Your stamina's not quite the best. Catch your breath and take a rest.\"</em></span><br/><br/><span style='float:right'>As the words form, a slight tingle runs over your body and you suddenly feel exhausted.</span><br/><br/><span style='color:lime'>(Enervated!)</span>",requiresattribnotmin:"stamina"},
{category: "CursedTransformation", effectname: "Glasses", img:"none", desc: "<span style='color:yellow'><em>\"If you find it hard to see, maybe glasses are what you need.\"</em></span><br/><br/><span style='float:right'>As the words form, you feel your vision suddenly blur. A moment later, a pair of thick glasses materializes on your face, and you can see clearly again.</span><br/><br/><span style='color:lime'>(Glasses!)</span>",requiresattribnotmin:"eyesight"},
{category: "CursedTransformation", effectname: "Palette Swap", img:"paletteswap.jpg", desc: "<span style='color:yellow'><em>\"Red, Yellow, Green and Blue. Here's some colors just for you.\"</em></span><br/><br/><span style='float:right'>As the words form, a dazzling wave of colors ripples through the air, your hair and eyes shift in color.</span><br/><br/><span style='color:lime'>(Palette Swap!)</span>",requiresattribnotmax:"palette swap"},
{category: "CursedTransformation", effectname: "Name Change", img:"namechange.jpg", desc: "<span style='color:yellow'><em>\"The words that others will soon repeat, a rose by any name would smell as sweet.\"</em></span><br/><br/><span style='float:right'>As the words form, the air seems to ripple and shift for a moment.</span><br/><br/><span style='color:lime'>(Name Change!)</span>",requiresattribnotmin:"gender", requiresattribnotmax:"name change",randwt:4},
{category: "CursedTransformation", effectname: "Bad Luck", img:"none", desc: "<span style='color:yellow'><em>\"At the wrong place, at the wrong time, slip of the fingers, caught in the crime\"</em></span><br/><br/><span style='float:right'>As the words form, the air seems to ripple and shift for a moment.</span><br/><br/><span style='color:lime'>(Bad Luck!)</span>",requiresattribnotmin:"luck"},

];


var playerTemplates = [
{"name":"James","last name":"Carter","age":33,"height":183,"gender":0,"hair color":"Blonde","eye color":"Blue",
"desc":"An explorer at heart, James Carter has spent much of his life travelling the world, moving from country to country and freelancing for a living.<br/><br/><span style='color:yellow'>(Difficulty: Easy)</span>", 
"gear":[{name:"Glyph of Protection", qty:3},{name:"Glyph of Unlocking", qty:2},{name:"Glyph of Jaunting", qty:2},{name:"Silver Coin", qty:5}],
"strength":2,
"stamina":2,
"dexterity":1,
"eyesight":1,
"constitution":0,
"intelligence":0,
"charisma":1,
"talent":0,
"luck":1,
"breast size":0,
"hair length":0,
"physique":0,
"ass size":0,},
{"name":"Colin","last name":"Winters","age":30,"height":174,"gender":0,"hair color":"Brown","eye color":"Hazel",
"desc":"Colin Winters is a mild mannered but extremely dedicated accountant with many years of professional work experience.<br/><br/><span style='color:yellow'>(Difficulty: Normal)</span>", 
"gear":[{name:"Glyph of Protection", qty:2},{name:"Glyph of Unlocking", qty:1},{name:"Silver Coin", qty:3}],
"strength":1,
"stamina":1,
"dexterity":1,
"eyesight":0,
"constitution":0,
"intelligence":1,
"charisma":1,
"talent":0,
"luck":1,
"breast size":0,
"hair length":0,
"physique":0,
"ass size":0,},
{"name":"Jeremy","last name":"Davis","age":27,"height":177,"gender":0,"hair color":"Blonde","eye color":"Blue",
"desc":"Jeremy is a cheerful and free-spirited, he enjoys painting and considers himself an aspiring artist.<br/><br/><span style='color:yellow'>(Difficulty: Normal)</span>", 
"gear":[{name:"Glyph of Protection", qty:2},{name:"Glyph of Jaunting", qty:1},{name:"Silver Coin", qty:3}],
"strength":1,
"stamina":1,
"dexterity":1,
"eyesight":1,
"constitution":0,
"intelligence":0,
"charisma":2,
"talent":0,
"luck":1,
"breast size":0,
"hair length":0,
"physique":0,
"ass size":0,},
{"name":"Trevon","last name":"Smith","age":25,"height":180,"gender":0,"hair color":"Black","eye color":"Brown",
"desc":"Trevon leads an active lifestyle, he embraces all manner of sports, and supports his favorite teams vehemently.<br/><br/><span style='color:yellow'>(Difficulty: Hard)</span>", 
"gear":[{name:"Glyph of Protection", qty:1}],
"strength":1,
"stamina":2,
"dexterity":2,
"eyesight":1,
"constitution":0,
"intelligence":0,
"charisma":1,
"talent":0,
"luck":1,
"breast size":0,
"hair length":0,
"physique":0,
"ass size":0,},
{"name":"Justin","last name":"Andrews","age":22,"height":171,"gender":0,"hair color":"Brunette","eye color":"Dark brown",
"desc":"Having recently graduated college, Justin is hardworking and studious. He loves to read and often gets lost in a book.<br/><br/><span style='color:yellow'>(Difficulty: Very Hard)</span>", 
"gear":[],
"strength":1,
"stamina":1,
"dexterity":1,
"eyesight":0,
"constitution":0,
"intelligence":0,
"charisma":0,
"talent":0,
"luck":1,
"breast size":0,
"hair length":0,
"physique":0,
"ass size":0,},
{"name":"John","last name":"Smith","age":24,"height":180,"gender":0,"hair color":"Brown","eye color":"Hazel",
"desc":"", //hidden sandbox character, do not remove
"gear":[],
"strength":1,
"stamina":1,
"dexterity":1,
"eyesight":1,
"constitution":0,
"intelligence":0,
"charisma":1,
"talent":0,
"luck":1,
"breast size":0,
"hair length":0,
"physique":0,
"ass size":0,}
];

var items = [
//valuable consumables
{name:"Silver Coin",desc:"A valuable old coin.", effect:"May be used to purchase glyphs.", img:"silvercoin.png", usable:false, stacks:true, randwt:3, gameitm:1},
{name:"Cash",desc:"Money in the form of various dollar bills.", effect:"Genuine currency. You win it, you keep it.", img:"cash.jpg", usable:false, stacks:true, randwt:7},

//glyphs sold by shop
{name:"Glyph of Jaunting", desc:"A pebble etched with a faded glyph", effect:"Teleports you exactly 6 steps forward when activated.",  img:"glyph2.jpg", usable:true, stacks:true, gameitm:1},
{name:"Glyph of Protection", desc:"A pebble etched with a faded glyph", effect:"Triggers a temporary shield around you, granting protection against some magical effects when activated.",  img:"glyph1.jpg", usable:false, stacks:true, gameitm:1},
{name:"Glyph of Unlocking", desc:"A pebble etched with a faded glyph", effect:"Used to disarm potential traps in treasure chests.",  img:"glyph3.jpg", usable:false, stacks:true, gameitm:1},

// These were item concepts once, but they've been removed during the streamlining of the game

//cursed items, single use, no stack
//{name:"Juliet's Amulet", desc:"A tarnished brass amulet set with a pink gemstone.", effect:"When equipped, transforms you into a girl named Juliet.",  img:"", usable:true, cursed:true, isconsumed:false, multiuse:false, stacks:false},
//{name:"Mood Ring", desc:"A plain ring that seems to be stuck on the color red.", effect:"When equipped, this ring puts you in the mood... by making you horny.",  img:"", usable:true, cursed:true, isconsumed:false, multiuse:false, stacks:false},
//single use useful, no stack
//{name:"Blue Loaded Die", desc:"A six sided plastic die.", effect:"When equipped, adds a -1 modifier to all future dice rolls (except 1s).",  img:"", usable:true, cursed:false, isconsumed:false, multiuse:false, stacks:false},
//{name:"Green Loaded Die", desc:"A six sided plastic die.", effect:"When equipped, adds a +1 modifier to all future dice rolls (except 6s).",  img:"", usable:true, cursed:false, isconsumed:false, multiuse:false, stacks:false},
//{name:"Reset Button", desc:"A big red button labelled 'RESET'", effect:"When activated, Teleports you back to square one.",  img:"", usable:true, cursed:false, isconsumed:false, multiuse:false, stacks:false},
//{name:"Disguise Kit", desc:"A box filled with vibrantly colored powders.", effect:"When equipped, gives you brown hair and eyes.",  img:"", usable:true, cursed:false, isconsumed:true, multiuse:true, stacks:true},
//{name:"Growth Serum", desc:"A vial containing a green liquid.", effect:"Drink this potion to grow taller. Also ages you slightly.",  img:"", usable:true, cursed:false, isconsumed:true, multiuse:true, stacks:true},
//{name:"Yin-Yang Scroll", desc:"A crumpled old scroll with the yin-yang symbol drawn on it.", effect:"When activated, switches your orientation.",  img:"", usable:true, cursed:false, isconsumed:true, multiuse:true, stacks:false},
//{name:"Hair Scissors", desc:"A pair of steel haircut scissors.", effect:"When activated, trims your hair short.",  img:"", usable:true, cursed:false, isconsumed:false, multiuse:false, stacks:false},
//flavor items, single use, no stack
//{name:"Leather Briefcase", desc:"A nondescript leather briefcase.", effect:"Contains $20,000 in legitimate unmarked bills.",  img:"", usable:false, stacks:false},
//{name:"Toy Wand", desc:"A short stick made of cheap plastic.", effect:"Allows the user to conjure any object made of plastic that's smaller than a toaster. Objects disappear in 24 hours.",  img:"", usable:false, stacks:false},
//{name:"Thinking Cap", desc:"A blue baseball cap.", effect:"Allows the wearer to hear the surface thoughts of anyone within 10 feet.",  img:"", usable:false, stacks:false},
//{name:"Unbreakable Rope", desc:"A coil of thin rope, about 10 feet.", effect:"This rope is unbreakable, and also excellect for tying knots and binding things.",  img:"", usable:false, stacks:false},
//{name:"Hand Mirror", desc:"A handheld mirror with a polished surface.", effect:"This mirror shows a reflection of the environment, but from a week ago.",  img:"", usable:false, stacks:false},
//{name:"Sunglasses", desc:"A pair of stylish sunglasses.", effect:"Allows the wearer to see through clothing.",  img:"", usable:false, stacks:false},

];
