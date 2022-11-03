/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docSidebar: [
    "Introduction",
    "getting-started",
    {
      type: "category",
      label: "Using Phero",
      items: [
        "using-phero/creating-the-server",
        "using-phero/using-the-client",
        "using-phero/error-handling",
        "using-phero/context-and-middleware",
        "using-phero/going-to-production",
      ],
    },
    {
      type: "category",
      label: "Integration guides",
      items: [
        { type: "doc", label: "Phero with React", id: "integration/react" },
      ],
    },
    // {type: 'autogenerated', dirName: '.'}
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
}

module.exports = sidebars
