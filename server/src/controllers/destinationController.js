import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destinationsPath = path.join(__dirname, '../../data/destinations_seeds.json');
const hardwarePath = path.join(__dirname, '../../data/hardware_seeds.json');

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getAllDestinations = (req, res, next) => {
  try {
    const destinations = readJSON(destinationsPath);
    const hardware = readJSON(hardwarePath);

    // Enrich each destination with counts of resident hardware
    const enriched = destinations.map((dest) => {
      const residentHardware = hardware.filter((h) => h.destination_slug === dest.slug);
      const activeCount = residentHardware.filter((h) => h.operational_status === 'OPERATIONAL').length;
      return {
        ...dest,
        hardware_count: residentHardware.length,
        active_hardware_count: activeCount
      };
    });

    res.json({
      success: true,
      data: enriched,
      meta: { total: enriched.length }
    });
  } catch (error) {
    next(error);
  }
};

export const getDestinationBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const destinations = readJSON(destinationsPath);
    const hardware = readJSON(hardwarePath);

    const destination = destinations.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: `Destination '${slug}' not found`
      });
    }

    const residentHardware = hardware.filter((h) => h.destination_slug === destination.slug);

    res.json({
      success: true,
      data: {
        ...destination,
        hardware: residentHardware
      }
    });
  } catch (error) {
    next(error);
  }
};
