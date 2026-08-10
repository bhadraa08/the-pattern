import { VictimRecord } from '../config/gameConfig';

export const generateCsvContent = (records: VictimRecord[]): string => {
  if (!records || records.length === 0) return '';

  const headers = [
    'Victim_ID',
    'Name',
    'Age',
    'Occupation',
    'City',
    'Blood_Group',
    'Favorite_Color',
    'Day_of_Week',
    'Birth_Month',
    'Education',
    'Commute_Mode',
    'Hobby',
    'Last_Contact',
    'Status'
  ];

  const rows = records.map(r => {
    return [
      r.Victim_ID,
      `"${r.Name.replace(/"/g, '""')}"`,
      r.Age,
      `"${r.Occupation.replace(/"/g, '""')}"`,
      `"${r.City.replace(/"/g, '""')}"`,
      r.Blood_Group,
      `"${r.Favorite_Color.replace(/"/g, '""')}"`,
      r.Day_of_Week,
      r.Birth_Month,
      `"${r.Education.replace(/"/g, '""')}"`,
      `"${r.Commute_Mode.replace(/"/g, '""')}"`,
      `"${r.Hobby.replace(/"/g, '""')}"`,
      `"${r.Last_Contact.replace(/"/g, '""')}"`,
      `"${r.Status.replace(/"/g, '""')}"`
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
};

export const downloadCsvFile = (records: VictimRecord[], filename: string = 'THE_PATTERN_VICTIM_DATASET.csv'): void => {
  const csvContent = generateCsvContent(records);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
