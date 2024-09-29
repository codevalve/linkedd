const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllLinks = async (req, res) => {
  try {
    const links = await prisma.link.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.render('links/index', { links });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching links');
  }
};

exports.getNewLinkForm = (req, res) => {
  res.render('links/new');
};

exports.createLink = async (req, res) => {
  try {
    const { title, url, description, readTime, author, tags, screenshot } = req.body;
  
    await prisma.link.create({
      data: {
        title,
        url,
        description,
        readTime,
        author,
        tags,
        screenshot
      },
    });
    res.redirect('/links');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating link');
  }
};

// ... (keep other methods like edit, update, and delete)