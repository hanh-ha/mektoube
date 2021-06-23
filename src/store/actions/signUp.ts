export const ENTRYFORM = 'ENTRYFORM';
export const ENTRYFORM_SUCCESS = 'ENTRYFORM_SUCCESS';
export const ENTRYFORM_FALSE = 'ENTRYFORM_FALSE';
export const BIRTHDAY_FORM = 'BIRTHDAY_FORM';
export const ORIGIN_FORM = 'ORIGIN_FORM';
export const COUNTRY_FORM = 'COUNTRY_FORM';
export const REGION_FORM = 'REGION_FORM';
export const CITY_FORM = 'CITY_FORM';

export const EntryForm = value => {
  return {
    type: ENTRYFORM,
    value,
  };
};
export const BirthDay = value => {
  return {
    type: BIRTHDAY_FORM,
    value,
  };
};
export const originForm = value => {
  return {
    type: ORIGIN_FORM,
    value,
  };
};
export const Country = value => {
  return {
    type: COUNTRY_FORM,
    value,
  };
};
export const Region = value => {
  return {
    type: REGION_FORM,
    value,
  };
};
export const City = value => {
  return {
    type: CITY_FORM,
    value,
  };
};
