export type CatStyle = 'cloud-step-snow' | 'orange-tabby' | 'cow-cat' | 'black-panther' | 'calico' | 'ragdoll';

export interface PromptEntry {
  term: string;
  style: CatStyle;
}

export const PROMPTS: PromptEntry[] = [
  { term: '乌云踏雪', style: 'cloud-step-snow' },
  { term: '橘里橘气', style: 'orange-tabby' },
  { term: '奶牛猫', style: 'cow-cat' },
  { term: '小黑煤球', style: 'black-panther' },
  { term: '三花福星', style: 'calico' },
  { term: '布偶仙子', style: 'ragdoll' }
];

export const LEVEL_SIZES = [4, 9, 16, 25, 36, 49, 64, 82, 100];
