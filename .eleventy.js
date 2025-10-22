module.exports = function(eleventyConfig) {
  // passthroughs...
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
  eleventyConfig.addPassthroughCopy({"src/admin": "admin"});
  eleventyConfig.addPassthroughCopy({"src/robots.txt": "robots.txt"});

  // filters
  eleventyConfig.addFilter("dateIso", (d) => new Date(d).toISOString().slice(0,10));

  // ✅ ADD THIS: converts "now" or any input into a Date object
  eleventyConfig.addFilter("date", (input) => {
    if (!input || input === "now") return new Date();
    return new Date(input);
  });

  eleventyConfig.addFilter("excerpt", (s) => (s || "").replace(/<[^>]*>/g, '').slice(0, 180));

  // collections...
  eleventyConfig.addCollection("articles", (c) => c.getFilteredByGlob("src/content/articles/*.md"));
  eleventyConfig.addCollection("news", (c) => c.getFilteredByGlob("src/content/news/*.md"));
  eleventyConfig.addCollection("terms", (c) => c.getFilteredByGlob("src/content/terms/*.md"));
  eleventyConfig.addCollection("faq", (c) => c.getFilteredByGlob("src/content/faq/*.md"));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk","md","html"]
  };
};
