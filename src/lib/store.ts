export const changeLog: {
  id: string;
  date: string;
  user: string;
  componentId: string;
  version: string;
  description: string;
}[] = [
  { id: "CHG-001", date: "2024-07-20", user: "Alice", componentId: "COMP-005", version: "1.1", description: "Changed material from Polyurethane to Silicone." },
  { id: "CHG-002", date: "2024-07-18", user: "Bob", componentId: "COMP-006", version: "1.2", description: "Updated bearing tolerance specifications." },
  { id: "CHG-003", date: "2024-07-15", user: "Alice", componentId: "SUB-ASM-001", version: "1.1", description: "Increased quantity of Truck Assembly to 2." },
  { id: "CHG-004", date: "2024-07-11", user: "Charlie", componentId: "BOM-001", version: "1.0", description: "Initial BOM creation." },
];
