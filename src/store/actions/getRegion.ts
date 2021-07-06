export const GET_REGION = 'GET_REGION';
export const GET_REGIOM_SUCCESS = 'GET_REGIOM_SUCCESS';
export const REGION_FORM = 'REGION_FORM';

export const getRegion = value => {
  return {
    type: GET_REGION,
    value,
  };
};
export const getRegionSuccess = value => {
  return {
    type: GET_REGIOM_SUCCESS,
    value,
  };
};
export const addRegionSuccess = value => {
  return {
    type: REGION_FORM,
    value,
  };
};
