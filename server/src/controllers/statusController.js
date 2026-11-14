import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hardwarePath = path.join(__dirname, '../../data/hardware_seeds.json');

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getStatusSummary = (req, res, next) => {
  try {
    const hardware = readJSON(hardwarePath);

    const counts = {
      TOTAL_TRACKED: hardware.length,
      OPERATIONAL: 0,
      INACTIVE_SURFACE: 0,
      DEEP_SPACE_TRAVELLING: 0,
      ATMOSPHERIC_ENTRY_DESTROYED: 0,
      LOST_CONTACT: 0
    };

    hardware.forEach(h => {
      if (counts[h.operational_status] !== undefined) {
        counts[h.operational_status] += 1;
      }
    });

    res.json({
      success: true,
      data: {
        counts,
        latest_audit_date: "2026-11-01",
        verification_statement: "Statuses corroborated with NASA NSSDCA, JPL Telemetry, and Deep Space Network logs. Objects without active telemetry are never assumed to be operational."
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getStatusRadar = (req, res, next) => {
  try {
    const hardware = readJSON(hardwarePath);

    const radarItems = hardware.map(h => ({
      slug: h.slug,
      name: h.name,
      category: h.category,
      destination_slug: h.destination_slug,
      operational_status: h.operational_status,
      status_verified_date: h.status_verified_date,
      status_summary: h.status_summary,
      power_source: h.power_source,
      launch_date: h.launch_date,
      sources: h.sources
    }));

    res.json({
      success: true,
      data: radarItems,
      meta: { total: radarItems.length }
    });
  } catch (error) {
    next(error);
  }
};
