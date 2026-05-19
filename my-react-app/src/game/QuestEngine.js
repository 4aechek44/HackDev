export function buildCodeRunResult({ code, logs, scope, repl, error }) {
  const logLines = logs.filter((entry) => entry.type === "log").map((entry) => entry.text);

  return {
    code,
    logs,
    logLines,
    output: logLines.join("\n"),
    scope: { ...scope, __repl__: repl },
    repl,
    error,
  };
}

export function validateQuest(quest, runResult) {
  if (!quest) return false;

  if (quest.validate) {
    return quest.validate(runResult.output, runResult.scope, runResult.code, runResult);
  }

  return runResult.output.trim() === (quest.expected ?? "").trim();
}
