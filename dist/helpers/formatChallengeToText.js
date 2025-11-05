export function formatChallengeToText(challenge) {
    if (!challenge)
        return 'No challenge content available.';
    return `
💻 ${challenge.title}

${challenge.description}

Difficulty: ${challenge.difficulty}
Estimated Time: ${challenge.estimated_time}

Requirements:
${challenge.requirements?.map((r, i) => `${i + 1}. ${r}`).join('\n')}
`;
}
//# sourceMappingURL=formatChallengeToText.js.map