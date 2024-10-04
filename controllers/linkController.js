// linkController.js
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

// Adding the edit and delete methods
exports.editLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await prisma.link.findUnique({
      where: { id: parseInt(id) },
    });
    if (!link) {
      return res.status(404).send('Link not found');
    }
    res.render('links/edit', { link });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching link for edit');
  }
};

exports.updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, description, readTime, author, tags, screenshot } = req.body;
    await prisma.link.update({
      where: { id: parseInt(id) },
      data: {
        title,
        url,
        description,
        readTime,
        author,
        tags,
        screenshot,
      },
    });
    res.redirect('/links');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating link');
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.link.delete({
      where: { id: parseInt(id) },
    });
    res.redirect('/links');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting link');
  }
};