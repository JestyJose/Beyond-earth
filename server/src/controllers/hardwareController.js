import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hardwarePath = path.join(__dirname, '../../data/hardware_seeds.json');
const destinationsPath = path.join(__dirname, '../../data/destinations_seeds.json');

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getAllHardware = (req, res, next) => {
  try {
    const { status, destination, category, search, featured, sort } = req.query;
    let hardware = readJSON(hardwarePath);
    const destinations = readJSON(destinationsPath);

    // Map destination names for quick frontend display
    const destMap = Object.fromEntries(destinations.map(d => [d.slug, d.name]));
    hardware = hardware.map(item => ({
      ...item,
      destination_name: destMap[item.destination_slug] || item.destination_slug
    }));

    // Filter by operational status
    if (status) {
      const statusUpper = status.toUpperCase();
      hardware = hardware.filter(h => h.operational_status === statusUpper);
    }

    // Filter by destination slug
    if (destination) {
      hardware = hardware.filter(h => h.destination_slug.toLowerCase() === destination.toLowerCase());
    }

    // Filter by hardware category (ROVER, LANDER, ORBITER, DEEP_SPACE_PROBE)
    if (category) {
      hardware = hardware.filter(h => h.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by featured
    if (featured === 'true') {
      hardware = hardware.filter(h => h.is_featured === true);
    }

    // Text search on name, purpose, or historical significance
    if (search) {
      const q = search.toLowerCase();
      hardware = hardware.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.mission_purpose.toLowerCase().includes(q) ||
        h.historical_significance.toLowerCase().includes(q) ||
        (h.destination_name && h.destination_name.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sort) {
      const [field, direction] = sort.split(':');
      const order = direction === 'desc' ? -1 : 1;
      hardware.sort((a, b) => {
        if (a[field] < b[field]) return -1 * order;
        if (a[field] > b[field]) return 1 * order;
        return 0;
      });
    } else {
      // Default: sort by launch date ascending (chronological exploration)
      hardware.sort((a, b) => new Date(a.launch_date) - new Date(b.launch_date));
    }

    res.json({
      success: true,
      data: hardware,
      meta: {
        total: hardware.length,
        filtersApplied: { status, destination, category, search, featured, sort }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getHardwareBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const hardware = readJSON(hardwarePath);
    const destinations = readJSON(destinationsPath);

    const item = hardware.find(h => h.slug.toLowerCase() === slug.toLowerCase());
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Hardware with slug '${slug}' not found`
      });
    }

    const destination = destinations.find(d => d.slug === item.destination_slug);
    const destMap = Object.fromEntries(destinations.map(d => [d.slug, d.name]));

    // Resolve sibling missions
    const relatedMissions = (item.related_mission_slugs || [])
      .map(s => hardware.find(h => h.slug === s))
      .filter(Boolean)
      .map(h => ({
        slug: h.slug,
        name: h.name,
        category: h.category,
        image_url: h.image_url,
        operational_status: h.operational_status,
        destination_slug: h.destination_slug,
        destination_name: destMap[h.destination_slug] || h.destination_slug
      }));

    res.json({
      success: true,
      data: {
        ...item,
        destination_details: destination || null,
        related_missions: relatedMissions
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedHardware = (req, res, next) => {
  try {
    const hardware = readJSON(hardwarePath);
    const featured = hardware.filter(h => h.is_featured);

    res.json({
      success: true,
      data: featured,
      meta: { total: featured.length }
    });
  } catch (error) {
    next(error);
  }
};
