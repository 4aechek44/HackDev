export function parseCommand(input) {
  const raw = input.trim();
  const [name = "", ...args] = raw.split(/\s+/);

  return {
    raw,
    name,
    args,
  };
}
