import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sciencePath = path.join(__dirname, '../../data/science_seeds.json');
const hardwarePath = path.join(__dirname, '../../data/hardware_seeds.json');

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getAllConcepts = (req, res, next) => {
  try {
    const concepts = readJSON(sciencePath);
    res.json({
      success: true,
      data: concepts,
      meta: { total: concepts.length }
    });
  } catch (error) {
    next(error);
  }
};

export const getConceptBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const concepts = readJSON(sciencePath);
    const concept = concepts.find(c => c.slug.toLowerCase() === slug.toLowerCase());

    if (!concept) {
      return res.status(404).json({
        success: false,
        message: `Science concept '${slug}' not found`
      });
    }

    // Enrich with associated hardware details
    const hardwareList = readJSON(hardwarePath);
    const relatedHardware = hardwareList.filter(h =>
      concept.related_hardware_slugs && concept.related_hardware_slugs.includes(h.slug)
    );

    res.json({
      success: true,
      data: {
        ...concept,
        related_hardware: relatedHardware
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDiscoveries = (req, res, next) => {
  try {
    const { domain } = req.query;
    const hardwareList = readJSON(hardwarePath);

    let discoveries = [];
    hardwareList.forEach(h => {
      if (h.discoveries && Array.isArray(h.discoveries)) {
        h.discoveries.forEach(d => {
          discoveries.push({
            ...d,
            hardware_slug: h.slug,
            hardware_name: h.name,
            destination_slug: h.destination_slug
          });
        });
      }
    });

    if (domain) {
      discoveries = discoveries.filter(d => d.scientific_domain.toLowerCase() === domain.toLowerCase());
    }

    res.json({
      success: true,
      data: discoveries,
      meta: { total: discoveries.length }
    });
  } catch (error) {
    next(error);
  }
};
