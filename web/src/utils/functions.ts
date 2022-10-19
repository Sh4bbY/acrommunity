export function resolveDifficulty(difficulty: number, context: any) {
  switch (difficulty) {
    case 0:
    case 1:
      return context.$t('difficulty.veryEasy');
    case 2:
    case 3:
      return context.$t('difficulty.easy');
    case 4:
    case 5:
      return context.$t('difficulty.intermediate');
    case 6:
    case 7:
      return context.$t('difficulty.challenging');
    case 8:
      return context.$t('difficulty.hard');
    case 9:
      return context.$t('difficulty.veryHard');
    case 10:
      return context.$t('difficulty.expert');
  }
  return '-';
}
