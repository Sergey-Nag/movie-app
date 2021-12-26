import { URL_DOMAIN } from "../core/constants/regExp.constants";

export const isDomainTMDB = (url: string) : boolean => {
  const domain = url.match(URL_DOMAIN);
  if (!domain) return false;

  return domain[0] === 'api.themoviedb.org';
}

export const isConfigRequest = (url: string) : boolean => {
  return url.search('configuration') !== -1;
}