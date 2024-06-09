import fs from 'fs';
import path from 'path';

type TextMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

type ArrayMetadata = {
  tags?: string[];
};

type Metadata = TextMetadata & ArrayMetadata;

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  let linkedString = '';
  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');

    // Composed of multiple lines with front matter
    // If the front matter is more than two lines, the entire content is included in the 'key'
    if (valueArr.length === 0) {
      linkedString += key.trim();
      if (linkedString.includes(']')) {
        [key, ...valueArr] = linkedString.split(':');
        const parsedValue = JSON.parse(
          valueArr.join('').replace(/'/g, '"').replace(/,\]/, ']') // Remove trailing commas
        );
        metadata[key.trim() as keyof ArrayMetadata] = parsedValue;
        linkedString = '';
      }
      return;
    }

    let value = valueArr.join(': ').trim();

    // Composed in one line with front matter
    if (value.startsWith('[') && value.endsWith(']')) {
      const parsedValue: string[] = JSON.parse(value.replace(/'/g, '"')); // Only double quotes are valid in JSON
      metadata[key.trim() as keyof ArrayMetadata] = parsedValue;
      return;
    }

    // Composed only of strings
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof TextMetadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  // TODO: Fix [fs.readFileSync(???*0*, "utf-8") is very dynamic]
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function extractTweetIds(content: string) {
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  if (!tweetMatches) {
    return [];
  }

  // tweetMatches has at least one element including id
  return tweetMatches.map((tweet) => tweet.match(/[0-9]+/g)![0]);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const tweetIds = extractTweetIds(content);
    return {
      metadata,
      slug,
      tweetIds,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'content'));
}
