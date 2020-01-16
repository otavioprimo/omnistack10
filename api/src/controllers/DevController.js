const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async update(req, res) {
    const { id } = req.params;
    const { techs, latitude, longitude } = req.body;

    let dev = await Dev.findById(id);

    if (!dev) {
      return res.status(404).json({ message: "Dev not found" });
    }

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    dev.techs = techsArray;
    dev.location = location;
    await dev.save();

    const updatedDev = await Dev.findById(id);

    return res.json(updatedDev);
  },

  async destroy(req, res) {
    const { id } = req.params;

    let dev = await Dev.findById(id);

    if (!dev) {
      return res.status(404).json({ message: "Dev not found" });
    }

    await Dev.deleteOne({ _id: id });

    return res.json({ message: "Delete with success" });
  }
};
