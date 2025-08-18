// 火灾类型字典
export const fireTypeDict = [
  { label: '森林火灾', value: 1 },
  { label: '建筑火灾', value: 2 },
  { label: '工业火灾', value: 3 },
  { label: '其他', value: 4 }
] as const;

// 报警等级字典
export const alarmLevelDict = [
  { label: '一级(最低)', value: 1 },
  { label: '二级', value: 2 },
  { label: '三级', value: 3 },
  { label: '四级', value: 4 },
  { label: '五级(最高)', value: 5 }
] as const;

// 状态字典
export const statusDict = [
  { label: '未处理', value: 0 },
  { label: '处理中', value: 1 },
  { label: '已处理', value: 2 },
  { label: '误报', value: 3 }
] as const;

// 获取字典标签的函数
export function getFireTypeLabel(value: number): string {
  const item = fireTypeDict.find(item => item.value === value);
  return item ? item.label : `未知类型(${value})`;
}

export function getAlarmLevelLabel(value: number): string {
  const item = alarmLevelDict.find(item => item.value === value);
  return item ? item.label : `未知等级(${value})`;
}

export function getStatusLabel(value: number): string {
  const item = statusDict.find(item => item.value === value);
  return item ? item.label : `未知状态(${value})`;
}

// 类型定义
export type FireTypeValue = typeof fireTypeDict[number]['value'];
export type AlarmLevelValue = typeof alarmLevelDict[number]['value'];
export type StatusValue = typeof statusDict[number]['value'];
