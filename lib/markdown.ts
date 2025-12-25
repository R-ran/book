import fs from 'fs';
import path from 'path';

export function getMarkdownContent(filename: string): string {
  const filePath = path.join(process.cwd(), 'content', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return fileContents;
}

export function parseMarkdown(markdown: string): { title: string; content: string } {
  const lines = markdown.split('\n');
  const titleLine = lines.find(line => line.startsWith('# '));
  const title = titleLine ? titleLine.replace('# ', '') : 'Policy';

  return {
    title,
    content: markdown,
  };
}
