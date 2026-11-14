import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hardwarePath = path.join(__dirname, '../../data/hardware_seeds.json');

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getTimelineMilestones = (req, res, next) => {
  try {
    const { era, event_type, hardware_slug } = req.query;
    const hardwareList = readJSON(hardwarePath);

    // Aggregate all milestones across all hardware missions
    let milestones = [];
    hardwareList.forEach(h => {
      if (h.milestones && Array.isArray(h.milestones)) {
        h.milestones.forEach(m => {
          milestones.push({
            ...m,
            hardware_slug: h.slug,
            hardware_name: h.name,
            hardware_category: h.category,
            destination_slug: h.destination_slug
          });
        });
      }
    });

    // Filter by hardware slug
    if (hardware_slug) {
      milestones = milestones.filter(m => m.hardware_slug.toLowerCase() === hardware_slug.toLowerCase());
    }

    // Filter by event type (LAUNCH, LANDING, FLYBY, ORBIT_INSERTION, DISCOVERY, FINAL_SIGNAL, MILESTONE)
    if (event_type) {
      milestones = milestones.filter(m => m.event_type.toLowerCase() === event_type.toLowerCase());
    }

    // Filter by decade/era
    if (era) {
      milestones = milestones.filter(m => {
        const year = parseInt(m.date.split('-')[0], 10);
        if (era === '1960s') return year >= 1960 && year < 1970;
        if (era === '1970s') return year >= 1970 && year < 1980;
        if (era === '1980s') return year >= 1980 && year < 1990;
        if (era === '1990s') return year >= 1990 && year < 2000;
        if (era === '2000s') return year >= 2000 && year < 2010;
        if (era === '2010s') return year >= 2010 && year < 2020;
        if (era === '2020s') return year >= 2020;
        return true;
      });
    }

    // Sort chronologically ascending
    milestones.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      data: milestones,
      meta: {
        total: milestones.length,
        filtersApplied: { era, event_type, hardware_slug }
      }
    });
  } catch (error) {
    next(error);
  }
};
