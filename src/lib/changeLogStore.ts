import fs from "fs";
import path from "path";

export type ChangeLogEntry = {
  id: string;
  date: string;
  user: string;
  componentId: string;
  version: string;
  description: string;
};

const filePath = path.join(process.cwd(), "data", "changeLog.json");

// Ensure the file exists
function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
}

export async function getChangeLog(): Promise<ChangeLogEntry[]> {
  ensureFile();
  const file = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export async function addChangeLogEntry(entry: ChangeLogEntry) {
  ensureFile();
  const logs = await getChangeLog();
  logs.unshift(entry);
  await fs.promises.writeFile(filePath, JSON.stringify(logs, null, 2), "utf-8");
}
