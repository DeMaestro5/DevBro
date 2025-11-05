export function formatChallengeToText(challenge: any): string {
  if (!challenge) return 'No challenge content available.';

  return `
💻 ${challenge.title}

${challenge.description}

Difficulty: ${challenge.difficulty}
Estimated Time: ${challenge.estimated_time}

Requirements:
${challenge.requirements?.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n')}
`;
}
