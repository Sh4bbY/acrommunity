export function resolveDifficulty(difficulty: number, context: any) {
  switch (difficulty) {
    case 1:
      return context.$t('difficulty.veryEasy');
    case 2:
      return context.$t('difficulty.easy');
    case 3:
      return context.$t('difficulty.intermediate');
    case 4:
      return context.$t('difficulty.hard');
    case 5:
      return context.$t('difficulty.veryHard');
    case 6:
      return context.$t('difficulty.expert');
  }
  return '-';
}
