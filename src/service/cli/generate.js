'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);

const {ExitCode} = require(`../../constants`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateDate = () => {
  const startDate = new Date();
  const nowDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
  return new Date(getRandomInt(startDate.getTime(), nowDate.getTime()));
};

const generatePublications = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: generateDate(),
    announce: shuffle(sentences).slice(0, 5).join(` `),
    fullText: shuffle(sentences).slice(0, 10).join(` `),
    сategory: shuffle(sentences).slice(0, getRandomInt(2, categories.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countPublication > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generatePublications(countPublication, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  }
};
