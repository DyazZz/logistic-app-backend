import { Application } from 'src/customDatatypes';

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(Number(dateStr)));
}

export function formatStatus(statusNum: number | string) {
  switch (statusNum) {
    case 1:
      return '1. Новое';
    case 2:
      return '2. В работе';
    case 3:
      return '3. Завершено';
  }
}

export function sortByFieldname(
  applications: Application[],
  fieldName: string,
) {
  //если фильтр пустой - возвращаем исходный массив
  if (!fieldName) return applications;

  return applications.sort((a, b) => {
    return a[fieldName].toString().localeCompare(b[fieldName].toString());
  });
}

export function searchByQuery(
  applications: Application[],
  searchQuery: string,
) {
  //если поисковой запрос пустой - возвращаем исходный массив
  if (!searchQuery) return applications;
  const splittedQuery = searchQuery.toUpperCase().split(' ');
  const foundApplications = applications.filter((application) => {
    const parseApplication = { ...application };
    parseApplication.date = formatDate(application.date);
    parseApplication.status = formatStatus(application.status);
    if (
      splittedQuery.every((word) =>
        JSON.stringify(parseApplication).toUpperCase().includes(word),
      )
    ) {
      return application;
    }
  });
  return foundApplications;
}
