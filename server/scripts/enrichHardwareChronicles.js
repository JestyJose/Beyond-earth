import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hardwarePath = path.join(__dirname, '../data/hardware_seeds.json');

const hw = JSON.parse(fs.readFileSync(hardwarePath, 'utf-8'));

const ENRICHMENTS = {
  'voyager-1': {
    image_attribution: 'NASA / JPL-Caltech',
    operational_lifespan: 'Planned: 5 years | Actual: 49+ years (and counting)',
    physical_fate: 'Drifting through the cold interstellar medium over 24.7 billion kilometers (165 AU) from Earth, travelling at 61,000 km/h toward the constellation Ophiuchus. While its cameras were turned off in 1990 to conserve nuclear power, its magnetometer and cosmic ray detectors continue transmitting scientific telemetry across the void via the Deep Space Network.',
    fast_facts: [
      'Carries the Golden Record: a 12-inch gold-plated copper phonograph record containing sounds, music, and greetings from Earth.',
      'It takes over 22 hours and 50 minutes for a radio signal travelling at the speed of light to reach Earth from Voyager 1.',
      'In 1990, Voyager 1 turned its camera back to take the iconic "Pale Blue Dot" portrait from 6 billion km away.'
    ],
    related_mission_slugs: ['voyager-2', 'pioneer-10', 'new-horizons']
  },
  'voyager-2': {
    image_attribution: 'NASA / JPL-Caltech',
    operational_lifespan: 'Planned: 5 years | Actual: 49+ years (and counting)',
    physical_fate: 'Travelling through interstellar space at 138 AU (~20.6 billion km) from Earth toward the constellation Pavo. It remains the only human machine to have visited Uranus and Neptune, with its Plasma Science detector actively tasting interstellar gas.',
    fast_facts: [
      'Launched 16 days before Voyager 1, taking advantage of a once-every-175-years planetary alignment.',
      'Discovered 10 new moons at Uranus and active nitrogen ice geysers on Neptune\'s moon Triton.',
      'Entered interstellar space on November 5, 2018, confirmed by its functioning plasma instrument.'
    ],
    related_mission_slugs: ['voyager-1', 'pioneer-11', 'new-horizons']
  },
  'perseverance': {
    image_attribution: 'NASA / JPL-Caltech',
    operational_lifespan: 'Planned: 1 Mars year (~2 Earth years) | Actual: Operational since Feb 2021',
    physical_fate: 'Actively traversing and drilling in Jezero Crater, climbing the ancient river delta to collect hermetically sealed rock cores stored in sterile titanium tubes on its chassis and on the Martian surface for future return to Earth.',
    fast_facts: [
      'Carried the Ingenuity Mars Helicopter, which achieved 72 powered flights in Mars\'s thin air (designed for just 5!).',
      'MOXIE generated 122 grams of breathable oxygen directly from Martian carbon dioxide.',
      'Its wheels feature custom aluminum treads designed to avoid the wheel puncture wear experienced by Curiosity.'
    ],
    related_mission_slugs: ['curiosity', 'opportunity', 'insight']
  },
  'curiosity': {
    image_attribution: 'NASA / JPL-Caltech / MSSS',
    operational_lifespan: 'Planned: 2 years | Actual: 14+ years (over 4,300 Martian sols)',
    physical_fate: 'Steadily ascending the foothills of Mount Sharp (Aeolis Mons) inside Gale Crater, analyzing sediment layers that preserve billions of years of Martian transition from a wet lake world to a frozen desert.',
    fast_facts: [
      'Weighs nearly 900 kg on Earth (about the size of an SUV), but only 340 kg in Mars\'s lower gravity.',
      'Uses the ChemCam laser to zap rocks up to 7 meters away, creating a spark of glowing plasma.',
      'Celebrated its first Martian birthday in 2013 by playing "Happy Birthday" to itself using its SAM instrument frequencies.'
    ],
    related_mission_slugs: ['perseverance', 'opportunity', 'viking-1']
  },
  'cassini-huygens': {
    image_attribution: 'NASA / JPL-Caltech / Space Science Institute',
    operational_lifespan: 'Planned: 4 years at Saturn | Actual: 13 years (2004–2017)',
    physical_fate: 'Vaporized high in Saturn\'s swirling hydrogen-helium atmosphere on September 15, 2017, at 120,000 km/h. Ground controllers executed this sacrificial dive to ensure the spent spacecraft could never accidentally crash into and contaminate pristine ocean moons Enceladus or Titan.',
    fast_facts: [
      'Discovered that tiny moon Enceladus shoots plumes of saltwater ice and organic molecules from deep hydrothermal vents.',
      'Dropped the European Space Agency\'s Huygens probe through Titan\'s orange haze onto a riverbed of water-ice pebbles and liquid methane.',
      'Orbited Saturn 294 times and snapped over 450,000 breathtaking photographs.'
    ],
    related_mission_slugs: ['galileo', 'juno', 'voyager-1']
  },
  'new-horizons': {
    image_attribution: 'NASA / JHUAPL / SwRI',
    operational_lifespan: 'Planned: 10 years | Actual: 20+ years (operational in Kuiper Belt)',
    physical_fate: 'Cruising past 59 AU from the Sun through the outer Kuiper Belt, observing the outer heliophysics environment and measuring cosmic background light from beyond the dust glow of our inner solar system.',
    fast_facts: [
      'Carried a thimble-sized container of the ashes of Clyde Tombaugh, the astronomer who discovered Pluto in 1930.',
      'Fastest spacecraft ever launched from Earth at separation: 58,536 km/h (reached the Moon in just 9 hours).',
      'Discovered that Pluto has active nitrogen glaciers that flow and circulate like a lava lamp.'
    ],
    related_mission_slugs: ['voyager-1', 'voyager-2', 'pioneer-10']
  },
  'insight': {
    image_attribution: 'NASA / JPL-Caltech',
    operational_lifespan: 'Planned: 2 years | Actual: 4 years (2018–2022)',
    physical_fate: 'Resting silently on the flat lava plain of Elysium Planitia on Mars. Its solar arrays are thickly blanketed by reddish atmospheric dust, which gradually starved its batteries of power until final contact on December 15, 2022.',
    fast_facts: [
      'Detected over 1,300 marsquakes using its ultra-sensitive French seismometer (SEIS).',
      'Proved that Mars has a surprisingly large molten iron-sulfur core approximately 3,660 km across.',
      'Its robotic arm picked up a heavy wind-and-thermal shield and placed it carefully over the seismometer on the Martian soil.'
    ],
    related_mission_slugs: ['perseverance', 'curiosity', 'viking-1']
  },
  'opportunity': {
    image_attribution: 'NASA / JPL-Caltech / Cornell',
    operational_lifespan: 'Planned: 90 Martian days | Actual: 14.5 years (5,111 sols)',
    physical_fate: 'Resting in Perseverance Valley on the rim of Endeavour Crater on Mars. In June 2018, a catastrophic global dust storm darkened the sky for months, cutting off sunlight to its solar arrays; NASA officially concluded the mission on February 13, 2019.',
    fast_facts: [
      'Holds the off-world driving record: 45.16 kilometers (more than an Olympic marathon).',
      'Discovered "blueberries" (tiny hematite spheres) that proved liquid water once flowed across ancient Mars.',
      'Survived over 55 times its design lifetime thanks to unexpected Martian dust-cleaning wind gusts.'
    ],
    related_mission_slugs: ['curiosity', 'perseverance', 'viking-1']
  },
  'apollo-11-lm': {
    image_attribution: 'NASA / Neil Armstrong',
    operational_lifespan: 'Planned: 2.5 days on lunar surface | Actual: Preserved permanently',
    physical_fate: 'Rests permanently at Tranquility Base (0.67408° N, 23.47297° E) on the Moon. In the airless lunar vacuum with no wind, rain, or erosion, the gold-foil descent stage, astronaut bootprints, and scientific equipment remain in pristine condition millions of years into the future.',
    fast_facts: [
      'Neil Armstrong and Buzz Aldrin landed with less than 30 seconds of fuel remaining in the descent engine tank.',
      'Its Laser Ranging Retroreflector continues to be targeted by lasers from Earth today, proving the Moon recedes 3.8 cm per year.',
      'Carries a stainless steel plaque signed by the three astronauts and President Nixon: "Here men from the planet Earth first set foot upon the Moon. We came in peace for all mankind."'
    ],
    related_mission_slugs: ['viking-1', 'insight', 'perseverance']
  },
  'juno': {
    image_attribution: 'NASA / JPL-Caltech / SwRI / MSSS',
    operational_lifespan: 'Planned: 2 years | Actual: 15+ years (operational polar orbiter)',
    physical_fate: 'Actively performing close elliptical passes (perijoves) through Jupiter\'s hazardous radiation belts, skimming thousands of kilometers above its ammonia clouds and conducting historic close flybys of moons Ganymede, Europa, and volcanic Io.',
    fast_facts: [
      'Farthest solar-powered spacecraft in history, generating electricity with three 9-meter solar array wings even 800 million km from the Sun.',
      'Carries a titanium radiation vault with 1-cm thick walls to protect its sensitive computer brain from Jupiter\'s lethal magnetic radiation.',
      'Carries three aluminum LEGO figurines representing the Roman god Jupiter, his wife Juno, and the astronomer Galileo Galilei.'
    ],
    related_mission_slugs: ['galileo', 'cassini-huygens', 'voyager-1']
  },
  'parker-solar-probe': {
    image_attribution: 'NASA / Johns Hopkins APL',
    operational_lifespan: 'Planned: 7 years | Actual: Operational since Aug 2018',
    physical_fate: 'Repeatedly diving deep into the Sun\'s blazing outer corona. Protected behind an 11.4 cm carbon-composite heat shield that endures temperatures of 1,400°C while its instruments remain at comfortable room temperature (30°C).',
    fast_facts: [
      'The fastest human-made object in history, reaching speeds exceeding 690,000 km/h (fast enough to fly from New York to Tokyo in under a minute!).',
      'Officially "touched the Sun" on April 28, 2021, by crossing inside the Alfvén critical boundary.',
      'The first NASA spacecraft named after a living scientist: solar astrophysicist Dr. Eugene Parker.'
    ],
    related_mission_slugs: ['messenger', 'new-horizons', 'voyager-1']
  },
  'pioneer-10': {
    image_attribution: 'NASA Ames Research Center',
    operational_lifespan: 'Planned: 21 months | Actual: 30+ years of active telemetry',
    physical_fate: 'Drifting silently on an interstellar trajectory out of our solar system toward the red giant star Aldebaran in the constellation Taurus. It will take approximately 2 million years to reach the vicinity of the star. Its final faint signal was detected on January 23, 2003.',
    fast_facts: [
      'First human spacecraft to traverse the dangerous Asteroid Belt, proving it is mostly empty space.',
      'First spacecraft to obtain close-up images of Jupiter and its Great Red Spot in December 1973.',
      'Carries an iconic gold-anodized aluminum plaque depicting a man, a woman, and a pulsar map revealing Earth\'s cosmic address.'
    ],
    related_mission_slugs: ['pioneer-11', 'voyager-1', 'new-horizons']
  },
  'pioneer-11': {
    image_attribution: 'NASA Ames Research Center',
    operational_lifespan: 'Planned: 2 years | Actual: 22 years of telemetry (1973–1995)',
    physical_fate: 'Cruising silently through interstellar space in the general direction of the constellation Scutum. Telemetry communications permanently ceased on September 30, 1995, after its nuclear generator power degraded below transmitter limits.',
    fast_facts: [
      'First spacecraft in human history to fly past Saturn, skimming within 21,000 km of its cloud tops on September 1, 1979.',
      'Discovered Saturn\'s narrow outer F-ring and confirmed that Saturn has a strong magnetic field.',
      'Paved the safe pathway through Saturn\'s rings for the subsequent Voyager 1 and 2 spacecraft.'
    ],
    related_mission_slugs: ['pioneer-10', 'cassini-huygens', 'voyager-2']
  },
  'galileo': {
    image_attribution: 'NASA / JPL-Caltech',
    operational_lifespan: 'Planned: 2 years at Jupiter | Actual: 14 years (1989–2003)',
    physical_fate: 'Deliberately guided into a high-speed dive into Jupiter\'s crushing atmosphere on September 21, 2003, at 173,700 km/h. Like Cassini at Saturn, Galileo was intentionally vaporized to protect Europa\'s subsurface ocean from any risk of biological contamination.',
    fast_facts: [
      'Carried the first descent probe to enter the atmosphere of a gas giant planet, surviving 61 minutes under crushing pressures.',
      'Discovered that Jupiter\'s icy moon Europa hides a global liquid saltwater ocean beneath its cracked ice crust.',
      'Observed Comet Shoemaker-Levy 9 smashing violently into Jupiter\'s night side in July 1994.'
    ],
    related_mission_slugs: ['juno', 'cassini-huygens', 'voyager-1']
  },
  'viking-1': {
    image_attribution: 'NASA / JPL-Caltech',
    operational_lifespan: 'Planned: 90 days | Actual: Over 6 years (1976–1982)',
    physical_fate: 'Rests permanently on the rocky desert plain of Chryse Planitia on Mars. Transmitted the historic first clear photographs from the Martian surface until November 13, 1982, when an antenna pointing software command inadvertently severed communication.',
    fast_facts: [
      'First American spacecraft to safely land on Mars and complete its mission.',
      'Carried a robotic scoop that dug into the red Martian soil to conduct the first automated biological metabolism tests on another planet.',
      'Its companion Viking 1 Orbiter took over 50,000 photos, mapping 97% of the Martian globe.'
    ],
    related_mission_slugs: ['curiosity', 'perseverance', 'opportunity']
  },
  'messenger': {
    image_attribution: 'NASA / JHUAPL / Carnegie Institution of Washington',
    operational_lifespan: 'Planned: 1 year in orbit | Actual: Over 4 years (2011–2015)',
    physical_fate: 'Impacted the solid rocky surface of Mercury at 14,000 km/h on April 30, 2015, on the planet\'s northern volcanic plains. Because Mercury has no atmosphere to burn up in, the propellant-exhausted spacecraft excavated a new impact crater estimated at 16 meters wide.',
    fast_facts: [
      'First spacecraft to ever orbit the Sun\'s innermost planet, completing 4,105 orbits.',
      'Discovered billions of tons of water ice hidden in permanently shadowed, freezing polar craters.',
      'Protected from the searing 430°C solar glare by a ceramic cloth sunshade.'
    ],
    related_mission_slugs: ['parker-solar-probe', 'magellan', 'voyager-1']
  },
  'magellan': {
    image_attribution: 'NASA / JPL-Caltech',
    operational_lifespan: 'Planned: 1 year | Actual: Over 4 years (1990–1994)',
    physical_fate: 'Guided into Venus\'s dense, crushing carbon dioxide atmosphere on October 13, 1994, during "Project Windmill", transmitting aerodynamic drag and upper-atmosphere data before vaporizing.',
    fast_facts: [
      'First planetary spacecraft deployed from the Space Shuttle cargo bay (Atlantis, STS-30).',
      'Used Synthetic Aperture Radar (SAR) to penetrate thick sulfuric acid clouds, mapping 98% of Venus.',
      'Revealed that 85% of Venus is covered in volcanic basalt plains with hundreds of giant shield volcanoes.'
    ],
    related_mission_slugs: ['messenger', 'cassini-huygens', 'viking-1']
  },
  'hubble': {
    image_attribution: 'NASA / ESA / STScI',
    operational_lifespan: 'Planned: 15 years | Actual: 36+ years (operating continuously)',
    physical_fate: 'Operating in low Earth orbit (~535 km altitude) travelling at 27,000 km/h, completing an orbit around Earth every 95 minutes. It has made over 1.6 million scientific observations of stars and deep galaxies.',
    fast_facts: [
      'Serviced five times in orbit by spacewalking Space Shuttle astronauts who repaired and upgraded its instruments.',
      'Helped determine that the expansion of the universe is accelerating due to mysterious Dark Energy.',
      'The Hubble Deep Field image revealed thousands of previously invisible galaxies in a patch of sky the size of a grain of sand held at arm\'s length.'
    ],
    related_mission_slugs: ['voyager-1', 'juno', 'new-horizons']
  }
};

hw.forEach(item => {
  const enrich = ENRICHMENTS[item.slug];
  if (enrich) {
    item.image_attribution = enrich.image_attribution;
    item.operational_lifespan = enrich.operational_lifespan;
    item.physical_fate = enrich.physical_fate;
    item.fast_facts = enrich.fast_facts;
    item.related_mission_slugs = enrich.related_mission_slugs;
  }
});

fs.writeFileSync(hardwarePath, JSON.stringify(hw, null, 2), 'utf-8');
console.log('ENRICHED HARDWARE CHRONICLES DATASETS FOR ALL 18 MISSIONS SUCCESSFULLY.');
