import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hardwarePath = path.join(__dirname, '../data/hardware_seeds.json');

const hw = JSON.parse(fs.readFileSync(hardwarePath, 'utf-8'));

// 1. Update Voyager 1 visited destinations
const v1 = hw.find(h => h.slug === 'voyager-1');
if (v1) {
  v1.visited_destination_slugs = ['jupiter', 'saturn', 'interstellar-space'];
}

// 2. Update Voyager 2 visited destinations (includes Uranus & Neptune!)
const v2 = hw.find(h => h.slug === 'voyager-2');
if (v2) {
  v2.visited_destination_slugs = ['jupiter', 'saturn', 'uranus', 'neptune', 'interstellar-space'];
  if (v2.sources.length === 1) {
    v2.sources.push({
      title: 'NASA JPL Voyager 2 Science & Status Archives',
      source_type: 'JPL',
      url: 'https://voyager.jpl.nasa.gov/mission/status/',
      quotation_or_reference: 'Voyager 2 Telemetry & Grand Tour Ephemeris'
    });
  }
}

// 3. Update New Horizons visited destinations
const nh = hw.find(h => h.slug === 'new-horizons');
if (nh) {
  nh.visited_destination_slugs = ['jupiter', 'kuiper-belt'];
  if (nh.sources.length === 1) {
    nh.sources.push({
      title: 'NASA JHUAPL New Horizons Mission Portal',
      source_type: 'JPL',
      url: 'http://pluto.jhuapl.edu/',
      quotation_or_reference: 'New Horizons Science Payload & Kuiper Belt Observations'
    });
  }
}

// 4. Update Pioneer 10 & 11 visited destinations
const p10 = hw.find(h => h.slug === 'pioneer-10');
if (p10) {
  p10.visited_destination_slugs = ['jupiter', 'interstellar-space'];
  if (p10.sources.length === 1) {
    p10.sources.push({
      title: 'NASA Ames Pioneer 10 Mission Summary',
      source_type: 'JPL',
      url: 'https://www.nasa.gov/centers-and-facilities/ames/pioneer-10-background/',
      quotation_or_reference: 'Pioneer 10 Final Telemetry & Trajectory'
    });
  }
}

const p11 = hw.find(h => h.slug === 'pioneer-11');
if (p11) {
  p11.visited_destination_slugs = ['jupiter', 'saturn', 'interstellar-space'];
  if (p11.sources.length === 1) {
    p11.sources.push({
      title: 'NASA Ames Pioneer 11 Mission Summary',
      source_type: 'JPL',
      url: 'https://www.nasa.gov/centers-and-facilities/ames/pioneer-11-background/',
      quotation_or_reference: 'Pioneer 11 Final Telemetry Record'
    });
  }
}

// 5. Update Apollo 11 LM verification date & LRO reference
const a11 = hw.find(h => h.slug === 'apollo-11-lm');
if (a11) {
  a11.status_verified_date = '2012-03-07';
  a11.status_summary = "Rests permanently at Tranquility Base (0.67408 deg N, 23.47297 deg E) on the Moon. High-resolution orbital photography by NASA's Lunar Reconnaissance Orbiter (LRO) in 2009 and 2012 confirmed the descent stage, scientific equipment (EASEP), and astronaut footpaths remain undisturbed in the lunar vacuum.";
  if (a11.sources.length === 1) {
    a11.sources.push({
      title: 'NASA Lunar Reconnaissance Orbiter (LRO) Apollo 11 Site Confirmation',
      source_type: 'NASA_NSSDCA',
      url: 'https://www.nasa.gov/mission/lunar-reconnaissance-orbiter/',
      quotation_or_reference: 'LRO Narrow Angle Camera (NAC) Feature: Tranquility Base Coordinates Confirmed'
    });
  }
}

// 6. Add Magellan (Venus) and Hubble (Earth)
if (!hw.some(h => h.slug === 'magellan')) {
  hw.push({
    slug: 'magellan',
    name: 'Magellan',
    category: 'ORBITER',
    destination_slug: 'venus',
    launch_date: '1989-05-04',
    launch_vehicle: 'Space Shuttle Atlantis (STS-30)',
    operational_status: 'ATMOSPHERIC_ENTRY_DESTROYED',
    status_verified_date: '1994-10-13',
    status_summary: "Concluded its mission on October 13, 1994, when ground controllers commanded it to plunge into Venus's dense carbon dioxide atmosphere during Project Windmill, collecting atmospheric drag data until vaporization.",
    mission_purpose: "Map 98% of Venus's surface through its thick cloud cover using synthetic aperture radar at high resolution.",
    historical_significance: "First planetary spacecraft launched from a Space Shuttle. Revolutionized planetary geology by proving Venus has a relatively young volcanic surface with towering shield volcanoes and extensive lava rivers.",
    power_source: 'Gallium Arsenide solar arrays',
    mass_kg: 3445.0,
    image_url: 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg',
    is_featured: false,
    instruments: [
      {
        name: 'Synthetic Aperture Radar',
        acronym: 'SAR',
        purpose_student_friendly: "Pierced through Venus's impenetrable acid clouds using radar waves to draw razor-sharp surface maps.",
        technical_description: 'S-band radar operating at 2.385 GHz creating radar swaths with 75-120 meter resolution.'
      },
      {
        name: 'Radar Altimeter',
        acronym: 'ALT',
        purpose_student_friendly: 'Measured the exact elevation of mountains and craters like a space tape measure.',
        technical_description: 'Nadir-pointing radar altimeter measuring surface topography to 30 meter vertical precision.'
      }
    ],
    milestones: [
      {
        date: '1989-05-04',
        title: 'Deployed from Shuttle Atlantis',
        description: 'First planetary spacecraft released from a Space Shuttle cargo bay.',
        event_type: 'LAUNCH'
      },
      {
        date: '1990-08-10',
        title: 'Venus Orbit Insertion',
        description: 'Fired solid rocket motor to enter polar elliptical orbit around Venus.',
        event_type: 'ORBIT_INSERTION'
      },
      {
        date: '1994-10-13',
        title: 'Project Windmill Atmospheric Entry',
        description: 'Guided into the upper atmosphere to measure aerodynamic torque before destruction.',
        event_type: 'FINAL_SIGNAL'
      }
    ],
    discoveries: [
      {
        title: 'Venusian Surface Dominated by Volcanism',
        plain_english_summary: 'Discovered that 85% of Venus is covered in volcanic basalt plains with hundreds of giant shield volcanoes and molten pancake domes.',
        why_it_matters: 'Revealed how rocky planets evolve geologically without Earth-like plate tectonics.',
        scientific_domain: 'GEOLOGY'
      }
    ],
    sources: [
      {
        title: 'NASA NSSDCA Master Catalog: Magellan',
        source_type: 'NASA_NSSDCA',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1989-033B',
        quotation_or_reference: 'NSSDC ID: 1989-033B | Magellan Mission Profile'
      },
      {
        title: 'NASA JPL Magellan Venus Mission Archives',
        source_type: 'JPL',
        url: 'https://www.jpl.nasa.gov/missions/magellan',
        quotation_or_reference: 'JPL Magellan Mission Summary & Radar Datasets'
      }
    ]
  });
}

if (!hw.some(h => h.slug === 'hubble')) {
  hw.push({
    slug: 'hubble',
    name: 'Hubble Space Telescope',
    category: 'OBSERVATORY',
    destination_slug: 'earth',
    launch_date: '1990-04-24',
    launch_vehicle: 'Space Shuttle Discovery (STS-31)',
    operational_status: 'OPERATIONAL',
    status_verified_date: '2026-11-01',
    status_summary: 'Operating in low Earth orbit (~535 km altitude) for over 36 years. Continues delivering breakthrough astronomical observations following five astronaut servicing missions.',
    mission_purpose: "Gather ultra-sharp optical, ultraviolet, and near-infrared images of planets, stars, and distant galaxies free from Earth's atmospheric distortion.",
    historical_significance: 'One of the most transformative scientific instruments ever built; measured the age and expansion rate of the universe and proved supermassive black holes exist at galaxy centers.',
    power_source: 'Two 25-foot solar arrays generating ~2,800 W with nickel-hydrogen batteries',
    mass_kg: 11110.0,
    image_url: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001828/GSFC_20171208_Archive_e001828~orig.jpg',
    is_featured: true,
    instruments: [
      {
        name: 'Wide Field Camera 3',
        acronym: 'WFC3',
        purpose_student_friendly: "The telescope's primary high-resolution camera, taking dazzling wide-angle color photos across optical, UV, and infrared light.",
        technical_description: 'Panchromatic camera spanning 200 nm to 1700 nm wavelengths.'
      },
      {
        name: 'Cosmic Origins Spectrograph',
        acronym: 'COS',
        purpose_student_friendly: 'Breaks ultraviolet starlight into rainbows to study the chemical composition and temperature of intergalactic gas.',
        technical_description: 'Far-ultraviolet and near-ultraviolet high-throughput spectrograph.'
      }
    ],
    milestones: [
      {
        date: '1990-04-24',
        title: 'Launch aboard Shuttle Discovery',
        description: 'Deployed into low Earth orbit at an altitude of 600 kilometers.',
        event_type: 'LAUNCH'
      },
      {
        date: '1993-12-02',
        title: 'Historic First Servicing Mission (STS-61)',
        description: 'Spacewalking astronauts installed COSTAR corrective optics, restoring crystal-clear vision.',
        event_type: 'MILESTONE'
      },
      {
        date: '1995-12-18',
        title: 'The Hubble Deep Field',
        description: 'Stared at an empty patch of space for 10 days, revealing thousands of previously unseen distant galaxies.',
        event_type: 'DISCOVERY'
      }
    ],
    discoveries: [
      {
        title: 'Accelerating Expansion of the Universe (Dark Energy)',
        plain_english_summary: 'By observing distant exploding stars (supernovae), Hubble helped prove that the expansion of the universe is speeding up due to mysterious dark energy.',
        why_it_matters: 'Fundamentally transformed cosmology, proving that 68% of the universe consists of unknown dark energy.',
        scientific_domain: 'COSMOLOGY'
      }
    ],
    sources: [
      {
        title: 'NASA NSSDCA Master Catalog: Hubble',
        source_type: 'NASA_NSSDCA',
        url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1990-037B',
        quotation_or_reference: 'NSSDC ID: 1990-037B | Hubble Mission Overview'
      },
      {
        title: 'NASA Goddard Hubble Space Telescope Portal',
        source_type: 'JPL',
        url: 'https://science.nasa.gov/mission/hubble/',
        quotation_or_reference: 'NASA Science Mission Directorate: Hubble Operations'
      }
    ]
  });
}

// 7. Ensure Curiosity, InSight, Opportunity, Galileo, Viking 1 have 2 sources
const curiosity = hw.find(h => h.slug === 'curiosity');
if (curiosity && curiosity.sources.length === 1) {
  curiosity.sources.push({
    title: 'NASA NSSDCA: Mars Science Laboratory (Curiosity)',
    source_type: 'NASA_NSSDCA',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2011-070A',
    quotation_or_reference: 'NSSDC ID: 2011-070A'
  });
}

const insight = hw.find(h => h.slug === 'insight');
if (insight && insight.sources.length === 1) {
  insight.sources.push({
    title: 'NASA NSSDCA: InSight Lander',
    source_type: 'NASA_NSSDCA',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A',
    quotation_or_reference: 'NSSDC ID: 2018-042A'
  });
}

const oppy = hw.find(h => h.slug === 'opportunity');
if (oppy && oppy.sources.length === 1) {
  oppy.sources.push({
    title: 'NASA NSSDCA: Mars Exploration Rover - Opportunity',
    source_type: 'NASA_NSSDCA',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A',
    quotation_or_reference: 'NSSDC ID: 2003-032A'
  });
}

const galileo = hw.find(h => h.slug === 'galileo');
if (galileo && galileo.sources.length === 1) {
  galileo.sources.push({
    title: 'NASA JPL Galileo Legacy Archive',
    source_type: 'JPL',
    url: 'https://science.nasa.gov/mission/galileo/',
    quotation_or_reference: 'JPL Galileo Jupiter Tour Science Summary'
  });
}

const viking = hw.find(h => h.slug === 'viking-1');
if (viking && viking.sources.length === 1) {
  viking.sources.push({
    title: 'NASA JPL Viking 1 Mission Archive',
    source_type: 'JPL',
    url: 'https://science.nasa.gov/mission/viking-1/',
    quotation_or_reference: 'JPL Viking 1 Lander Summary'
  });
}

const psp = hw.find(h => h.slug === 'parker-solar-probe');
if (psp && psp.sources.length === 1) {
  psp.sources.push({
    title: 'JHUAPL Parker Solar Probe Science Operations',
    source_type: 'JPL',
    url: 'http://parkersolarprobe.jhuapl.edu/',
    quotation_or_reference: 'Parker Solar Probe Telemetry & Science Instruments'
  });
}

const juno = hw.find(h => h.slug === 'juno');
if (juno && juno.sources.length === 1) {
  juno.sources.push({
    title: 'NASA NSSDCA: Juno Jupiter Orbiter',
    source_type: 'NASA_NSSDCA',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2011-040A',
    quotation_or_reference: 'NSSDC ID: 2011-040A'
  });
}

fs.writeFileSync(hardwarePath, JSON.stringify(hw, null, 2), 'utf-8');
console.log('SUCCESSFULLY ENRICHED HARDWARE SEEDS. Total count:', hw.length);
