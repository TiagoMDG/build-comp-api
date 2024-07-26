const prisma = require("../../prisma/client");
const handleError = require("../../utils");

// Get all competitions
exports.getAll = async (req, res) => {
  const { limit = 10, page = 0, include_done = "true" } = req.query;

  // Validate and parse query parameters
  const parsedLimit = parseInt(limit, 10);
  const parsedPage = parseInt(page, 10);
  const includeDone = include_done.toLowerCase() === "true";

  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    return res.status(400).json({ error: "Invalid limit value" });
  }

  if (isNaN(parsedPage) || parsedPage < 0) {
    return res.status(400).json({ error: "Invalid page value" });
  }

  try {
    const competitions = await prisma.competition.findMany({
      where: {
        done: includeDone ? undefined : false,
      },
      skip: parsedPage * parsedLimit, // Pagination: skip the number of items based on the page
      take: parsedLimit, // Pagination: limit the number of items
    });

    const totalCount = await prisma.competition.count({
      where: {
        done: includeDone ? undefined : false,
      },
    });

    res.json({
      data: competitions,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        pageSize: parsedLimit,
      },
    });
  } catch (error) {
    handleError(res, error, "Error fetching competitions");
  }
};

// Get a single competition by ID
exports.getOne = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const competition = await prisma.competition.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (competition) {
      res.json({ data: competition });
    } else {
      res.status(404).json({ error: "Competition not found" });
    }
  } catch (error) {
    handleError(res, error, "Error fetching competition");
  }
};
